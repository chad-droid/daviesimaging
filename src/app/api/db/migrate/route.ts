import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST() {
  try {
    await sql`ALTER TABLE media_files ADD COLUMN IF NOT EXISTS description TEXT`;
    await sql`ALTER TABLE deals ADD COLUMN IF NOT EXISTS scope TEXT`;
    await sql`ALTER TABLE deals ADD COLUMN IF NOT EXISTS import_failed BOOLEAN DEFAULT FALSE`;
    await sql`ALTER TABLE deals ADD COLUMN IF NOT EXISTS import_error TEXT`;

    // Gallery curation columns
    await sql`ALTER TABLE gallery_assignments ADD COLUMN IF NOT EXISTS cover_image_id INTEGER`;
    await sql`ALTER TABLE gallery_assignments ADD COLUMN IF NOT EXISTS hidden_image_ids JSONB DEFAULT '[]'`;

    // Dedupe and index
    await sql`
      DELETE FROM media_files a USING media_files b
      WHERE a.id < b.id AND a.deal_id = b.deal_id AND a.url = b.url
    `;
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS media_files_deal_url ON media_files(deal_id, url)`;

    // Event photo galleries (Shore Summit and future events). Standalone from the
    // deal-based gallery system: each row is one image in one named gallery, with
    // three optimized sizes (thumb / 1600px display / 2400px download).
    await sql`
      CREATE TABLE IF NOT EXISTS event_gallery_images (
        id SERIAL PRIMARY KEY,
        gallery_slug TEXT NOT NULL,
        thumb_url TEXT NOT NULL,
        display_url TEXT NOT NULL,
        download_url TEXT NOT NULL,
        filename TEXT,
        width INT,
        height INT,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS event_gallery_slug_idx ON event_gallery_images(gallery_slug, sort_order)`;

    return NextResponse.json({ success: true, message: "Migrations applied" });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
