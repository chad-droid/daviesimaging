import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { sql } from "@vercel/postgres";
import sharp from "sharp";

export const maxDuration = 60;

const MAX_WIDTH = 2400;
const QUALITY = 100;
const THUMB_WIDTH = 800;
const THUMB_QUALITY = 100;

// ── Client-side upload token handler (bypasses 4.5MB serverless body limit) ──
// Called by @vercel/blob's upload() on the client to:
//   1) generate a signed token for direct-to-blob upload
//   2) receive an upload-completed notification (we use /api/media/process for processing)
async function handleClientUpload(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json()) as HandleUploadBody;
  const result = await handleUpload({
    body,
    request: req,
    onBeforeGenerateToken: async (_pathname: string) => ({
      allowedContentTypes: [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/tiff",
        "image/heic",
        "image/heif",
      ],
      maximumSizeInBytes: 100 * 1024 * 1024, // 100 MB
      addRandomSuffix: false,
    }),
    onUploadCompleted: async () => {
      // Processing (Sharp optimization + DB) is handled separately by /api/media/process
      // after the client receives the blob URL from upload()
    },
  });
  return NextResponse.json(result);
}

// ── Legacy FormData upload path (kept for Media Library, Assets, AdminMediaPicker) ──
// NOTE: This path will 413 for files > 4.5 MB. Those callers should be migrated
// to the client-side upload pattern used by the Gallery Curation panel.
async function handleFormDataUpload(req: NextRequest): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    const dealId = (formData.get("dealId") as string) || "";
    let folder = (formData.get("folder") as string) || "";
    const files = formData.getAll("files") as File[];

    if (!files.length) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    if (dealId && !folder) {
      const dealRes = await sql`SELECT name, builder FROM deals WHERE id = ${dealId}`;
      if (dealRes.rows.length > 0) {
        const d = dealRes.rows[0];
        const builderSlug = (d.builder || "unknown").replace(/[^a-zA-Z0-9-_ ]/g, "").replace(/\s+/g, "-").toLowerCase();
        const dealSlug = (d.name || "unknown").replace(/[^a-zA-Z0-9-_ ]/g, "").replace(/\s+/g, "-").toLowerCase();
        folder = `gallery/${builderSlug}/${dealSlug}`;
      }
    }
    if (!folder) folder = "gallery/unsorted";

    const results: {
      filename: string;
      fullUrl: string;
      thumbUrl: string;
      originalSize: number;
      optimizedSize: number;
    }[] = [];
    const errors: string[] = [];

    for (const file of files) {
      try {
        if (!file.type.startsWith("image/")) {
          errors.push(`Skipped non-image: ${file.name}`);
          continue;
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const originalSize = buffer.length;

        const full = await sharp(buffer)
          .resize(MAX_WIDTH, undefined, { withoutEnlargement: true, fit: "inside" })
          .webp({ quality: QUALITY })
          .toBuffer();

        const thumb = await sharp(buffer)
          .resize(THUMB_WIDTH, undefined, { withoutEnlargement: true, fit: "inside" })
          .webp({ quality: THUMB_QUALITY })
          .toBuffer();

        const meta = await sharp(full).metadata();

        const baseName = file.name
          .replace(/\.[^.]+$/, "")
          .replace(/[^a-zA-Z0-9-_]/g, "-")
          .toLowerCase();

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

        if (dealId) {
          await sql`
            INSERT INTO media_files (deal_id, url, thumb_url, filename, description, size_bytes, width, height)
            VALUES (${dealId}, ${fullBlob.url}, ${thumbBlob.url}, ${file.name}, '', ${full.length}, ${meta.width || 0}, ${meta.height || 0})
            ON CONFLICT (deal_id, url) DO UPDATE SET
              thumb_url = EXCLUDED.thumb_url,
              size_bytes = EXCLUDED.size_bytes,
              width = EXCLUDED.width,
              height = EXCLUDED.height
          `;
        }

        results.push({ filename: file.name, fullUrl: fullBlob.url, thumbUrl: thumbBlob.url, originalSize, optimizedSize: full.length });
      } catch (e) {
        errors.push(`Error: ${file.name} - ${e}`);
      }
    }

    if (dealId && results.length > 0) {
      await sql`
        UPDATE deals
        SET imported = TRUE, imported_at = NOW(), import_failed = FALSE, import_error = NULL, updated_at = NOW()
        WHERE id = ${dealId}
      `;
    }

    const totalOriginal = results.reduce((s, r) => s + r.originalSize, 0);
    const totalOptimized = results.reduce((s, r) => s + r.optimizedSize, 0);

    return NextResponse.json({
      imported: results.length,
      failed: errors.length,
      savings: totalOriginal > 0 ? `${Math.round((1 - totalOptimized / totalOriginal) * 100)}%` : "0%",
      totalOriginalMB: (totalOriginal / 1024 / 1024).toFixed(1),
      totalOptimizedMB: (totalOptimized / 1024 / 1024).toFixed(1),
      results,
      errors,
    });
  } catch (e) {
    return NextResponse.json({ error: `Upload failed: ${e}` }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  const contentType = req.headers.get("content-type") || "";

  // Client-side upload protocol sends JSON (token request or completion notification)
  if (contentType.includes("application/json")) {
    return handleClientUpload(req);
  }

  // Legacy FormData path
  return handleFormDataUpload(req);
}
