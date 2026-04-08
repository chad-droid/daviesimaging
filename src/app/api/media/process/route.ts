/**
 * /api/media/process
 *
 * Called after a client-side direct-to-blob upload completes.
 * Accepts a raw blob URL, runs Sharp optimization (WebP + thumbnail),
 * saves the optimized versions back to Vercel Blob, deletes the raw temp
 * file, and records metadata in the media_files DB table.
 *
 * This is the second step of the two-phase upload flow that bypasses
 * Vercel's 4.5 MB serverless function body limit.
 */

import { NextRequest, NextResponse } from "next/server";
import { put, del } from "@vercel/blob";
import { sql } from "@vercel/postgres";
import sharp from "sharp";

export const maxDuration = 60;

const MAX_WIDTH = 2400;
const QUALITY = 100;
const THUMB_WIDTH = 800;

export async function POST(req: NextRequest) {
  try {
    const { dealId, blobUrl, filename } = (await req.json()) as {
      dealId: string;
      blobUrl: string;
      filename: string;
    };

    if (!dealId || !blobUrl || !filename) {
      return NextResponse.json(
        { error: "dealId, blobUrl, and filename are required" },
        { status: 400 },
      );
    }

    // Determine destination folder from the deal record
    let folder = "gallery/unsorted";
    try {
      const dealRes = await sql`SELECT name, builder FROM deals WHERE id = ${dealId}`;
      if (dealRes.rows.length > 0) {
        const d = dealRes.rows[0];
        const builderSlug = (d.builder || "unknown")
          .replace(/[^a-zA-Z0-9-_ ]/g, "")
          .replace(/\s+/g, "-")
          .toLowerCase();
        const dealSlug = (d.name || "unknown")
          .replace(/[^a-zA-Z0-9-_ ]/g, "")
          .replace(/\s+/g, "-")
          .toLowerCase();
        folder = `gallery/${builderSlug}/${dealSlug}`;
      }
    } catch { /* use default folder */ }

    // Fetch the raw file that was uploaded directly to blob
    const rawResponse = await fetch(blobUrl);
    if (!rawResponse.ok) {
      return NextResponse.json(
        { error: `Failed to fetch uploaded file from blob: ${rawResponse.status}` },
        { status: 500 },
      );
    }
    const rawBuffer = Buffer.from(await rawResponse.arrayBuffer());
    const originalSize = rawBuffer.length;

    // Sharp: resize to max 2400px wide + generate 800px thumbnail, both WebP
    const full = await sharp(rawBuffer)
      .resize(MAX_WIDTH, undefined, { withoutEnlargement: true, fit: "inside" })
      .webp({ quality: QUALITY })
      .toBuffer();

    const thumb = await sharp(rawBuffer)
      .resize(THUMB_WIDTH, undefined, { withoutEnlargement: true, fit: "inside" })
      .webp({ quality: QUALITY })
      .toBuffer();

    const meta = await sharp(full).metadata();

    const baseName = filename
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .toLowerCase();

    // Save optimized full image and thumbnail to final blob location
    const fullBlob = await put(`${folder}/${baseName}.webp`, full, {
      access: "public",
      contentType: "image/webp",
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    const thumbBlob = await put(`${folder}/thumbs/${baseName}.webp`, thumb, {
      access: "public",
      contentType: "image/webp",
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    // Delete the raw temp file to keep blob storage clean
    try {
      await del(blobUrl);
    } catch { /* non-fatal */ }

    // Upsert into media_files
    await sql`
      INSERT INTO media_files (deal_id, url, thumb_url, filename, description, size_bytes, width, height)
      VALUES (${dealId}, ${fullBlob.url}, ${thumbBlob.url}, ${filename}, '', ${full.length}, ${meta.width || 0}, ${meta.height || 0})
      ON CONFLICT (deal_id, url) DO UPDATE SET
        thumb_url = EXCLUDED.thumb_url,
        size_bytes = EXCLUDED.size_bytes,
        width = EXCLUDED.width,
        height = EXCLUDED.height
    `;

    // Mark deal as successfully imported
    await sql`
      UPDATE deals
      SET imported = TRUE, imported_at = NOW(), import_failed = FALSE, import_error = NULL, updated_at = NOW()
      WHERE id = ${dealId}
    `;

    return NextResponse.json({
      success: true,
      fullUrl: fullBlob.url,
      thumbUrl: thumbBlob.url,
      originalSize,
      optimizedSize: full.length,
      savings: originalSize > 0 ? `${Math.round((1 - full.length / originalSize) * 100)}%` : "0%",
    });
  } catch (e) {
    return NextResponse.json({ error: `Processing failed: ${e}` }, { status: 500 });
  }
}
