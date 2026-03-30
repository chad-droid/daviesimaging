import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST() {
  try {
    await sql`ALTER TABLE media_files ADD COLUMN IF NOT EXISTS description TEXT`;
    await sql`ALTER TABLE deals ADD COLUMN IF NOT EXISTS scope TEXT`;

    // Remove duplicate media_files rows (keep the one with the highest id)
    await sql`
      DELETE FROM media_files a USING media_files b
      WHERE a.id < b.id AND a.deal_id = b.deal_id AND a.url = b.url
    `;

    // Add unique constraint for upsert support
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS media_files_deal_url ON media_files(deal_id, url)`;

    return NextResponse.json({ success: true, message: "Migrations applied" });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
