import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import sharp from "sharp";

const MAX_WIDTH = 2400;
const QUALITY = 82;
const THUMB_WIDTH = 800;
const THUMB_QUALITY = 85;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const folder = (formData.get("folder") as string) || "gallery/unsorted";
    const files = formData.getAll("files") as File[];

    if (!files.length) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

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

        // Optimize full size
        const full = await sharp(buffer)
          .resize(MAX_WIDTH, undefined, { withoutEnlargement: true, fit: "inside" })
          .webp({ quality: QUALITY })
          .toBuffer();

        // Create thumbnail
        const thumb = await sharp(buffer)
          .resize(THUMB_WIDTH, undefined, { withoutEnlargement: true, fit: "inside" })
          .webp({ quality: THUMB_QUALITY })
          .toBuffer();

        const baseName = file.name
          .replace(/\.[^.]+$/, "")
          .replace(/[^a-zA-Z0-9-_]/g, "-")
          .toLowerCase();

        const fullBlob = await put(`${folder}/${baseName}.webp`, full, {
          access: "public",
          contentType: "image/webp",
        });

        const thumbBlob = await put(`${folder}/thumbs/${baseName}.webp`, thumb, {
          access: "public",
          contentType: "image/webp",
        });

        results.push({
          filename: file.name,
          fullUrl: fullBlob.url,
          thumbUrl: thumbBlob.url,
          originalSize,
          optimizedSize: full.length,
        });
      } catch (e) {
        errors.push(`Error: ${file.name} - ${e}`);
      }
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
