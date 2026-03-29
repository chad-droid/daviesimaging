import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

const ZOHO_ACCOUNTS_URL = "https://accounts.zoho.com/oauth/v2/token";
const ZOHO_API_URL = "https://www.zohoapis.com/crm/v2/Digital_Transactions1";

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
  if (!data.access_token) throw new Error(`Zoho auth failed: ${JSON.stringify(data)}`);
  return data.access_token;
}

interface ZohoRecord {
  id: string;
  Name: string;
  Project_Name: string;
  Account: string;
  Contact?: { name: string };
  Contact_Email: string;
  Transaction_Type: string;
  Selected_Services: string[] | null;
  Status: string | null;
  Project_Address: string | null;
  Project_City_State: string | null;
  Project_Community_Name: string | null;
  Job_Number: string | null;
  Number_of_Resource_Files: number;
  Total_Points: number | null;
  Resource_Files_URL: string | null;
  Final_Assets_URL: string | null;
  Finished_Assets_for_Client: string | null;
  Production_Folder: string | null;
  Project_URL: string | null;
  Target_Completion_Date: string | null;
  Date_Time_Created: string | null;
  Date_Time_Delivered: string | null;
  Job_Submission_Notes: string | null;
  Production_Additional_Services: string | null;
}

export async function POST() {
  try {
    const accessToken = await getAccessToken();
    const allRecords: ZohoRecord[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const res = await fetch(`${ZOHO_API_URL}?page=${page}&per_page=200`, {
        headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
      });
      if (!res.ok) throw new Error(`Zoho API error: ${await res.text()}`);
      const data = await res.json();
      if (data.data) allRecords.push(...data.data);
      hasMore = data.info?.more_records || false;
      page++;
    }

    let newCount = 0;
    let updatedCount = 0;

    for (const r of allRecords) {
      const id = `zdt_${r.id}`;
      const servicesArr = r.Selected_Services || [];
      const services = `{${servicesArr.map((s: string) => `"${s}"`).join(",")}}`;

      const existing = await sql`SELECT id FROM digital_transactions WHERE id = ${id}`;

      if (existing.rows.length === 0) {
        await sql`
          INSERT INTO digital_transactions (
            id, transaction_id, project_name, account, contact, contact_email,
            transaction_type, selected_services, status, project_address,
            project_city_state, community_name, job_number, num_resource_files,
            total_points, resource_files_url, final_assets_url, client_assets_url,
            production_folder, project_url, target_completion, date_created,
            date_delivered, job_notes, additional_services
          ) VALUES (
            ${id}, ${r.Name}, ${r.Project_Name || null}, ${r.Account || null},
            ${r.Contact?.name || null}, ${r.Contact_Email || null},
            ${r.Transaction_Type || null}, ${services}, ${r.Status || null},
            ${r.Project_Address || null}, ${r.Project_City_State || null},
            ${r.Project_Community_Name || null}, ${r.Job_Number || null},
            ${r.Number_of_Resource_Files || 0}, ${r.Total_Points || 0},
            ${r.Resource_Files_URL || null}, ${r.Final_Assets_URL || null},
            ${r.Finished_Assets_for_Client || null}, ${r.Production_Folder || null},
            ${r.Project_URL || null}, ${r.Target_Completion_Date || null},
            ${r.Date_Time_Created || null}, ${r.Date_Time_Delivered || null},
            ${r.Job_Submission_Notes || null}, ${r.Production_Additional_Services || null}
          )
        `;
        newCount++;
      } else {
        await sql`
          UPDATE digital_transactions SET
            project_name = ${r.Project_Name || null},
            account = ${r.Account || null},
            contact = ${r.Contact?.name || null},
            contact_email = ${r.Contact_Email || null},
            status = ${r.Status || null},
            selected_services = ${services},
            final_assets_url = ${r.Final_Assets_URL || null},
            client_assets_url = ${r.Finished_Assets_for_Client || null},
            date_delivered = ${r.Date_Time_Delivered || null},
            total_points = ${r.Total_Points || 0},
            updated_at = NOW()
          WHERE id = ${id}
        `;
        updatedCount++;
      }
    }

    await sql`
      INSERT INTO sync_log (source, deals_synced, deals_new, deals_updated)
      VALUES ('zoho-digital', ${newCount + updatedCount}, ${newCount}, ${updatedCount})
    `;

    return NextResponse.json({
      success: true,
      total: allRecords.length,
      new: newCount,
      updated: updatedCount,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
