import { NextRequest, NextResponse } from "next/server";
import { del, list } from "@vercel/blob";
import { sql } from "@vercel/postgres";

// DELETE a project's images from Vercel Blob + media_files table + reset deal imported flag.
// Accepts either:
//   { dealId }              — deletes by DB deal ID (most reliable, resets imported flag)
//   { pathPrefix }          — deletes all blobs under gallery/{builder}/{deal}/ and matching DB rows
//   { dealId, pathPrefix }  — both (best coverage)
export async function POST(req: NextRequest) {
  try {
    const { dealId, pathPrefix, urls } = (await req.json()) as {
      dealId?: string;
      pathPrefix?: string;
      urls?: string[];
    };

    if (!dealId && !pathPrefix && (!urls || urls.length === 0)) {
      return NextResponse.json({ error: "dealId or pathPrefix required" }, { status: 400 });
    }

    const allUrls = new Set<string>();

    // --- Collect via dealId (DB lookup) ---
    if (dealId) {
      const mediaRows = await sql`
        SELECT url, thumb_url FROM media_files WHERE deal_id = ${dealId}
      `;
      for (const row of mediaRows.rows) {
        if (row.url) allUrls.add(row.url);
        if (row.thumb_url) allUrls.add(row.thumb_url);
      }
    }

    // --- Collect via pathPrefix (Vercel Blob listing) ---
    if (pathPrefix) {
      let cursor: string | undefined;
      do {
        const params: { prefix: string; cursor?: string } = { prefix: pathPrefix };
        if (cursor) params.cursor = cursor;
        const result = await list(params);
        for (const blob of result.blobs) allUrls.add(blob.url);
        cursor = result.cursor;
      } while (cursor);

      // Also find matching DB rows by URL pattern
      const prefix = pathPrefix.replace(/\/$/, "");
      const likePattern = `%/${prefix}/%`;
      const dbRows = await sql`
        SELECT url, thumb_url FROM media_files
        WHERE url LIKE ${likePattern} OR thumb_url LIKE ${likePattern}
      `;
      for (const row of dbRows.rows) {
        if (row.url) allUrls.add(row.url);
        if (row.thumb_url) allUrls.add(row.thumb_url);
      }
    }

    // --- Explicit URL list ---
    if (urls) {
      for (const u of urls) allUrls.add(u);
    }

    // 1. Delete from Vercel Blob in batches of 25 (API limit)
    const urlArray = Array.from(allUrls);
    let deletedCount = 0;
    for (let i = 0; i < urlArray.length; i += 25) {
      const batch = urlArray.slice(i, i + 25);
      await del(batch);
      deletedCount += batch.length;
    }

    // 2. Delete from media_files table
    if (dealId) {
      await sql`DELETE FROM media_files WHERE deal_id = ${dealId}`;
    } else if (pathPrefix) {
      const prefix = pathPrefix.replace(/\/$/, "");
      const likePattern = `%/${prefix}/%`;
      await sql`DELETE FROM media_files WHERE url LIKE ${likePattern}`;
    }

    // 3. Reset imported flag (by dealId or by looking up via URL prefix)
    if (dealId) {
      await sql`
        UPDATE deals SET imported = false, imported_at = NULL, updated_at = NOW()
        WHERE id = ${dealId}
      `;
    }

    return NextResponse.json({ success: true, deleted: deletedCount, urls: urlArray.length });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
