import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";
import sharp from "sharp";

// Optimization settings: high quality, reasonable sizes
const MAX_WIDTH = 2400; // Large enough for full-width hero, retina
const MAX_HEIGHT = 1600;
const QUALITY = 82; // Sweet spot: visually lossless, ~60-70% smaller than original
const FORMAT = "webp" as const;

// Thumbnail for grid views
const THUMB_WIDTH = 800;
const THUMB_QUALITY = 75;

async function optimizeImage(
  buffer: Buffer,
  opts: { width: number; quality: number },
): Promise<Buffer> {
  return sharp(buffer)
    .resize(opts.width, undefined, {
      withoutEnlargement: true,
      fit: "inside",
    })
    .webp({ quality: opts.quality })
    .toBuffer();
}

async function fetchImageFromUrl(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.startsWith("image/")) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dealId, dealName, builder, images } = body as {
      dealId: string;
      dealName: string;
      builder: string;
      images: { url: string; filename: string }[];
    };

    if (!dealId || !images?.length) {
      return NextResponse.json({ error: "dealId and images required" }, { status: 400 });
    }

    // Sanitize folder path
    const folder = `gallery/${builder.replace(/[^a-zA-Z0-9-_ ]/g, "").replace(/\s+/g, "-").toLowerCase()}/${dealName.replace(/[^a-zA-Z0-9-_ ]/g, "").replace(/\s+/g, "-").toLowerCase()}`;

    const results: {
      filename: string;
      fullUrl: string;
      thumbUrl: string;
      originalSize: number;
      optimizedSize: number;
      thumbSize: number;
    }[] = [];
    const errors: string[] = [];

    for (const img of images) {
      try {
        const raw = await fetchImageFromUrl(img.url);
        if (!raw) {
          errors.push(`Failed to fetch: ${img.filename}`);
          continue;
        }

        const originalSize = raw.length;

        // Optimize full size
        const full = await optimizeImage(raw, {
          width: MAX_WIDTH,
          quality: QUALITY,
        });

        // Create thumbnail
        const thumb = await optimizeImage(raw, {
          width: THUMB_WIDTH,
          quality: THUMB_QUALITY,
        });

        const baseName = img.filename
          .replace(/\.[^.]+$/, "")
          .replace(/[^a-zA-Z0-9-_]/g, "-")
          .toLowerCase();

        // Upload full size
        const fullBlob = await put(`${folder}/${baseName}.webp`, full, {
          access: "public",
          contentType: "image/webp",
        });

        // Upload thumbnail
        const thumbBlob = await put(
          `${folder}/thumbs/${baseName}.webp`,
          thumb,
          {
            access: "public",
            contentType: "image/webp",
          },
        );

        results.push({
          filename: img.filename,
          fullUrl: fullBlob.url,
          thumbUrl: thumbBlob.url,
          originalSize,
          optimizedSize: full.length,
          thumbSize: thumb.length,
        });
      } catch (e) {
        errors.push(`Error processing ${img.filename}: ${e}`);
      }
    }

    const totalOriginal = results.reduce((s, r) => s + r.originalSize, 0);
    const totalOptimized = results.reduce(
      (s, r) => s + r.optimizedSize + r.thumbSize,
      0,
    );
    const savings = totalOriginal > 0
      ? Math.round((1 - totalOptimized / totalOriginal) * 100)
      : 0;

    return NextResponse.json({
      dealId,
      folder,
      imported: results.length,
      failed: errors.length,
      savings: `${savings}% smaller`,
      totalOriginalMB: (totalOriginal / 1024 / 1024).toFixed(1),
      totalOptimizedMB: (totalOptimized / 1024 / 1024).toFixed(1),
      results,
      errors,
    });
  } catch (e) {
    return NextResponse.json(
      { error: `Import failed: ${e}` },
      { status: 500 },
    );
  }
}
