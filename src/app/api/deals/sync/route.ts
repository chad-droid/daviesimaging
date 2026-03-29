import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

const ZOHO_ACCOUNTS_URL = "https://accounts.zoho.com/oauth/v2/token";
const ZOHO_API_URL = "https://www.zohoapis.com/crm/v2/Deals";

// State normalization
const stateMap: Record<string, string> = {
  Texas: "TX", California: "CA", Florida: "FL", Colorado: "CO",
  Arizona: "AZ", Nevada: "NV", Georgia: "GA", Ohio: "OH",
  Virginia: "VA", "North Carolina": "NC", "South Carolina": "SC",
  Oregon: "OR", Washington: "WA", Idaho: "ID", Montana: "MT",
  Utah: "UT", "New Mexico": "NM", Wyoming: "WY",
};

async function getAccessToken(): Promise<string> {
  const res = await fetch(ZOHO_ACCOUNTS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: process.env.ZOHO_REFRESH_TOKEN || "",
      client_id: process.env.ZOHO_CLIENT_ID || "",
      client_secret: process.env.ZOHO_CLIENT_SECRET || "",
      grant_type: "refresh_token",
    }),
  });

  const data = await res.json();
  if (!data.access_token) {
    throw new Error(`Zoho auth failed: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

interface ZohoDeal {
  id: string;
  Deal_Name: string;
  Account_Name?: { name: string };
  Amount?: number;
  Stage?: string;
  City?: string;
  State?: string;
  Pipeline?: string;
  Production_Date?: string;
  Closing_Date?: string;
  Model_Name_Description?: string;
  Location_Name?: string;
  Project_Type?: string;
  Scope?: string;
  Project_Deliverables?: string;
  Deliverables?: string;
  Asset_Count?: string;
  Qty_of_Images?: string;
  Finished_Assets_Client?: string;
  Finished_Assets_Internal?: string;
  Matterport_Links?: string;
  Target_Youtube_Preview?: string;
  Target_GIF_Preview?: string;
  Project_Website?: string;
  Google_Maps_Link?: string;
  Street_Address?: string;
}

async function fetchDeals(accessToken: string): Promise<ZohoDeal[]> {
  const allDeals: ZohoDeal[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(
      `${ZOHO_API_URL}?page=${page}&per_page=200&fields=Deal_Name,Account_Name,Amount,Stage,City,State,Pipeline,Production_Date,Closing_Date,Model_Name_Description,Location_Name,Project_Type,Scope,Project_Deliverables,Deliverables,Asset_Count,Qty_of_Images,Finished_Assets_Client,Finished_Assets_Internal,Matterport_Links,Target_Youtube_Preview,Target_GIF_Preview,Project_Website,Google_Maps_Link,Street_Address`,
      {
        headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
      },
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Zoho API error (page ${page}): ${err}`);
    }

    const data = await res.json();
    if (data.data) {
      allDeals.push(...data.data);
    }
    hasMore = data.info?.more_records || false;
    page++;
  }

  return allDeals;
}

export async function POST() {
  try {
    const accessToken = await getAccessToken();
    const zohodeals = await fetchDeals(accessToken);

    let newCount = 0;
    let updatedCount = 0;

    for (const zd of zohodeals) {
      // Only include deals with client-facing assets or matterport or youtube
      const hasAssets =
        zd.Finished_Assets_Client ||
        zd.Matterport_Links ||
        zd.Target_Youtube_Preview;
      if (!hasAssets) continue;

      const id = `zcrm_${zd.id}`;
      const state = stateMap[zd.State || ""] || zd.State || "";
      const address = [zd.Street_Address, zd.City, state]
        .filter(Boolean)
        .join(", ");

      const existing = await sql`SELECT id, status FROM deals WHERE id = ${id}`;

      if (existing.rows.length === 0) {
        // New deal
        await sql`
          INSERT INTO deals (
            id, name, builder, city, state, pipeline, stage,
            production_date, closing_date, model_name, location_name,
            project_type, scope, deliverables, asset_count, qty_images,
            client_assets, internal_assets, matterport, youtube, gif,
            project_website, google_maps, address, amount
          ) VALUES (
            ${id}, ${zd.Deal_Name}, ${zd.Account_Name?.name || null},
            ${zd.City || null}, ${state || null}, ${zd.Pipeline || null},
            ${zd.Stage || null}, ${zd.Production_Date || null},
            ${zd.Closing_Date || null}, ${zd.Model_Name_Description || null},
            ${zd.Location_Name || null}, ${zd.Project_Type || null},
            ${zd.Scope || null}, ${zd.Deliverables || zd.Project_Deliverables || null},
            ${zd.Asset_Count || null}, ${zd.Qty_of_Images || null},
            ${zd.Finished_Assets_Client || null}, ${zd.Finished_Assets_Internal || null},
            ${zd.Matterport_Links || null}, ${zd.Target_Youtube_Preview || null},
            ${zd.Target_GIF_Preview || null}, ${zd.Project_Website || null},
            ${zd.Google_Maps_Link || null}, ${address || null},
            ${zd.Amount || 0}
          )
        `;
        newCount++;
      } else {
        // Update existing deal data (but preserve status and imported flags)
        await sql`
          UPDATE deals SET
            name = ${zd.Deal_Name},
            builder = ${zd.Account_Name?.name || null},
            city = ${zd.City || null},
            state = ${state || null},
            pipeline = ${zd.Pipeline || null},
            stage = ${zd.Stage || null},
            amount = ${zd.Amount || 0},
            client_assets = ${zd.Finished_Assets_Client || null},
            internal_assets = ${zd.Finished_Assets_Internal || null},
            matterport = ${zd.Matterport_Links || null},
            youtube = ${zd.Target_Youtube_Preview || null},
            updated_at = NOW()
          WHERE id = ${id}
        `;
        updatedCount++;
      }
    }

    // Log sync
    await sql`
      INSERT INTO sync_log (source, deals_synced, deals_new, deals_updated)
      VALUES ('zoho-crm', ${newCount + updatedCount}, ${newCount}, ${updatedCount})
    `;

    return NextResponse.json({
      success: true,
      total: zohodeals.length,
      withAssets: newCount + updatedCount,
      new: newCount,
      updated: updatedCount,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
