import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { setupDatabase } from "@/lib/db";
import dealsData from "@/data/deals.json";

export async function POST() {
  try {
    // Create tables
    await setupDatabase();

    // Seed from existing JSON data
    let inserted = 0;
    let skipped = 0;

    for (const deal of dealsData as Record<string, string | boolean>[]) {
      const existing = await sql`SELECT id FROM deals WHERE id = ${deal.id as string}`;
      if (existing.rows.length > 0) {
        skipped++;
        continue;
      }

      await sql`
        INSERT INTO deals (
          id, name, builder, city, state, pipeline, stage,
          production_date, closing_date, model_name, location_name,
          project_type, scope, deliverables, asset_count, qty_images,
          client_assets, internal_assets, matterport, youtube, gif,
          project_website, google_maps, address
        ) VALUES (
          ${deal.id as string}, ${deal.name as string}, ${deal.builder as string},
          ${deal.city as string}, ${deal.state as string}, ${deal.pipeline as string},
          ${deal.stage as string}, ${(deal.productionDate as string) || null},
          ${(deal.closingDate as string) || null}, ${(deal.modelName as string) || null},
          ${(deal.locationName as string) || null}, ${(deal.projectType as string) || null},
          ${(deal.scope as string) || null}, ${(deal.deliverables as string) || null},
          ${(deal.assetCount as string) || null}, ${(deal.qtyImages as string) || null},
          ${(deal.clientAssets as string) || null}, ${(deal.internalAssets as string) || null},
          ${(deal.matterport as string) || null}, ${(deal.youtube as string) || null},
          ${(deal.gif as string) || null}, ${(deal.projectWebsite as string) || null},
          ${(deal.googleMaps as string) || null}, ${(deal.address as string) || null}
        )
      `;
      inserted++;
    }

    // Log the seed
    await sql`
      INSERT INTO sync_log (source, deals_synced, deals_new, deals_updated)
      VALUES ('initial-seed', ${inserted + skipped}, ${inserted}, 0)
    `;

    return NextResponse.json({
      success: true,
      inserted,
      skipped,
      total: dealsData.length,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
