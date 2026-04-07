import { NextRequest, NextResponse } from "next/server";
import { del, list } from "@vercel/blob";
import { sql } from "@vercel/postgres";

// DELETE a project's images from Vercel Blob + media_files table + reset deal imported flag
export async function POST(req: NextRequest) {
  try {
    const { dealId, urls } = (await req.json()) as {
      dealId?: string;
      urls?: string[]; // optionally pass explicit URL list to delete
    };

    if (!dealId) {
      return NextResponse.json({ error: "dealId required" }, { status: 400 });
    }

    // 1. Get all blob URLs for this deal from the DB
    const mediaRows = await sql`
      SELECT url, thumb_url FROM media_files WHERE deal_id = ${dealId}
    `;

    // Collect all URLs to delete (originals + thumbs), plus any explicit URLs passed
    const allUrls = new Set<string>();
    for (const row of mediaRows.rows) {
      if (row.url) allUrls.add(row.url);
      if (row.thumb_url) allUrls.add(row.thumb_url);
    }
    if (urls) {
      for (const u of urls) allUrls.add(u);
    }

    // 2. Delete from Vercel Blob in batches of 25 (API limit)
    const urlArray = Array.from(allUrls);
    let deletedCount = 0;
    for (let i = 0; i < urlArray.length; i += 25) {
      const batch = urlArray.slice(i, i + 25);
      await del(batch);
      deletedCount += batch.length;
    }

    // 3. Delete from media_files table
    await sql`DELETE FROM media_files WHERE deal_id = ${dealId}`;

    // 4. Reset imported flag on the deal so it can be re-imported if needed
    await sql`
      UPDATE deals SET imported = false, imported_at = NULL, updated_at = NOW()
      WHERE id = ${dealId}
    `;

    return NextResponse.json({ success: true, deleted: deletedCount });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
