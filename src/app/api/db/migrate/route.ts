import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST() {
  try {
    await sql`ALTER TABLE media_files ADD COLUMN IF NOT EXISTS description TEXT`;
    await sql`ALTER TABLE deals ADD COLUMN IF NOT EXISTS scope TEXT`;

    // Gallery curation columns
    await sql`ALTER TABLE gallery_assignments ADD COLUMN IF NOT EXISTS cover_image_id INTEGER`;
    await sql`ALTER TABLE gallery_assignments ADD COLUMN IF NOT EXISTS hidden_image_ids JSONB DEFAULT '[]'`;

    // Dedupe and index
    await sql`
      DELETE FROM media_files a USING media_files b
      WHERE a.id < b.id AND a.deal_id = b.deal_id AND a.url = b.url
    `;
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS media_files_deal_url ON media_files(deal_id, url)`;

    return NextResponse.json({ success: true, message: "Migrations applied" });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
