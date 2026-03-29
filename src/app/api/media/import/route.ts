import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { sql } from "@vercel/postgres";
import { GoogleAuth } from "google-auth-library";
import sharp from "sharp";

// Image optimization settings
const MAX_WIDTH = 2400;
const QUALITY = 82;
const THUMB_WIDTH = 800;
const THUMB_QUALITY = 75;

function getAuth() {
  return new GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });
}

async function getAccessToken(): Promise<string> {
  const auth = getAuth();
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return token.token || "";
}

function extractFolderId(url: string): string | null {
  // Google Drive folder
  const driveMatch = url.match(/folders\/([^?/]+)/);
  if (driveMatch) return driveMatch[1];
  return null;
}

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size: string;
}

async function listDriveFiles(
  folderId: string,
  accessToken: string,
): Promise<DriveFile[]> {
  const files: DriveFile[] = [];
  let pageToken: string | undefined;

  do {
    const params = new URLSearchParams({
      q: `'${folderId}' in parents and (mimeType contains 'image/')`,
      fields: "nextPageToken, files(id, name, mimeType, size)",
      pageSize: "100",
    });
    if (pageToken) params.set("pageToken", pageToken);

    const res = await fetch(
      `https://www.googleapis.com/drive/v3/files?${params}`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Drive API error: ${err}`);
    }

    const data = await res.json();
    files.push(...(data.files || []));
    pageToken = data.nextPageToken;
  } while (pageToken);

  return files;
}

async function downloadDriveFile(
  fileId: string,
  accessToken: string,
): Promise<Buffer> {
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

export async function POST(req: NextRequest) {
  try {
    const { dealId, maxImages } = (await req.json()) as {
      dealId: string;
      maxImages?: number;
    };

    if (!dealId) {
      return NextResponse.json({ error: "dealId required" }, { status: 400 });
    }

    // Get deal from database
    const dealResult = await sql`SELECT * FROM deals WHERE id = ${dealId}`;
    if (dealResult.rows.length === 0) {
      return NextResponse.json({ error: "Deal not found" }, { status: 404 });
    }

    const deal = dealResult.rows[0];
    if (!deal.client_assets) {
      return NextResponse.json(
        { error: "No client assets URL" },
        { status: 400 },
      );
    }

    const folderId = extractFolderId(deal.client_assets);
    if (!folderId) {
      return NextResponse.json(
        { error: "Could not extract Google Drive folder ID from URL" },
        { status: 400 },
      );
    }

    // Get Google Drive access
    const accessToken = await getAccessToken();

    // List images in folder
    let driveFiles = await listDriveFiles(folderId, accessToken);

    // Limit if specified (default 30 per deal to control costs)
    const limit = maxImages || 30;
    if (driveFiles.length > limit) {
      // Sort by size desc (larger files = likely higher quality hero shots)
      driveFiles.sort(
        (a, b) => parseInt(b.size || "0") - parseInt(a.size || "0"),
      );
      driveFiles = driveFiles.slice(0, limit);
    }

    // Build folder path
    const builderSlug = (deal.builder || "unknown")
      .replace(/[^a-zA-Z0-9-_ ]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
    const dealSlug = (deal.name || "unknown")
      .replace(/[^a-zA-Z0-9-_ ]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
    const folder = `gallery/${builderSlug}/${dealSlug}`;

    const results: {
      filename: string;
      fullUrl: string;
      thumbUrl: string;
      originalKB: number;
      optimizedKB: number;
    }[] = [];
    const errors: string[] = [];

    for (const file of driveFiles) {
      try {
        const raw = await downloadDriveFile(file.id, accessToken);
        const originalKB = Math.round(raw.length / 1024);

        // Optimize full size
        const full = await sharp(raw)
          .resize(MAX_WIDTH, undefined, {
            withoutEnlargement: true,
            fit: "inside",
          })
          .webp({ quality: QUALITY })
          .toBuffer();

        // Thumbnail
        const thumb = await sharp(raw)
          .resize(THUMB_WIDTH, undefined, {
            withoutEnlargement: true,
            fit: "inside",
          })
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

        const thumbBlob = await put(
          `${folder}/thumbs/${baseName}.webp`,
          thumb,
          { access: "public", contentType: "image/webp" },
        );

        // Save to media_files table
        const meta = await sharp(full).metadata();
        await sql`
          INSERT INTO media_files (deal_id, url, thumb_url, filename, size_bytes, width, height)
          VALUES (${dealId}, ${fullBlob.url}, ${thumbBlob.url}, ${file.name}, ${full.length}, ${meta.width || 0}, ${meta.height || 0})
        `;

        results.push({
          filename: file.name,
          fullUrl: fullBlob.url,
          thumbUrl: thumbBlob.url,
          originalKB,
          optimizedKB: Math.round(full.length / 1024),
        });
      } catch (e) {
        errors.push(`${file.name}: ${e}`);
      }
    }

    // Mark deal as imported
    if (results.length > 0) {
      await sql`
        UPDATE deals SET imported = true, imported_at = NOW(), updated_at = NOW()
        WHERE id = ${dealId}
      `;
    }

    const totalOriginal = results.reduce((s, r) => s + r.originalKB, 0);
    const totalOptimized = results.reduce((s, r) => s + r.optimizedKB, 0);

    return NextResponse.json({
      dealId,
      folder,
      imported: results.length,
      failed: errors.length,
      totalFilesInFolder: driveFiles.length,
      originalMB: (totalOriginal / 1024).toFixed(1),
      optimizedMB: (totalOptimized / 1024).toFixed(1),
      savings:
        totalOriginal > 0
          ? `${Math.round((1 - totalOptimized / totalOriginal) * 100)}%`
          : "0%",
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
