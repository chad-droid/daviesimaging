import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { sql } from "@vercel/postgres";
import { GoogleAuth } from "google-auth-library";
import sharp from "sharp";
import Anthropic from "@anthropic-ai/sdk";
import {
  getAccessToken as getZohoToken,
  findDealFolder,
  getImageFiles,
  downloadFile as downloadWorkDriveFile,
} from "@/lib/workdrive";

// Image optimization settings
const MAX_WIDTH = 2400;
const QUALITY = 100;
const THUMB_WIDTH = 800;
const THUMB_QUALITY = 100;

// ── Google Drive helpers ──

function getGoogleAuth() {
  return new GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });
}

async function getGoogleToken(): Promise<string> {
  const auth = getGoogleAuth();
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return token.token || "";
}

function extractGDriveFolderId(url: string): string | null {
  const match = url.match(/folders\/([^?/]+)/);
  return match ? match[1] : null;
}

interface GDriveFile { id: string; name: string; mimeType: string; size: string; }

async function listGDriveFiles(folderId: string, token: string): Promise<GDriveFile[]> {
  const files: GDriveFile[] = [];
  let pageToken: string | undefined;
  do {
    const params = new URLSearchParams({
      q: `'${folderId}' in parents and (mimeType contains 'image/')`,
      fields: "nextPageToken, files(id, name, mimeType, size)",
      pageSize: "100",
    });
    if (pageToken) params.set("pageToken", pageToken);
    const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`Drive API: ${await res.text()}`);
    const data = await res.json();
    files.push(...(data.files || []));
    pageToken = data.nextPageToken;
  } while (pageToken);
  return files;
}

async function downloadGDriveFile(fileId: string, token: string): Promise<Buffer> {
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`GDrive download failed: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

// ── Detect source type ──

function detectSource(url: string): "gdrive" | "workdrive" | "unknown" {
  if (url.includes("drive.google.com")) return "gdrive";
  if (url.includes("workdrive.zoho") || url.includes("zohoexternal.com")) return "workdrive";
  return "unknown";
}

function extractWorkDriveFolderId(url: string): string | null {
  // workdrive.zoho.com/folder/FOLDER_ID
  const folderMatch = url.match(/\/folder\/([a-z0-9]+)/);
  if (folderMatch) return folderMatch[1];
  return null;
}

// Pick the best URL to use: prefer internal (has direct folder IDs), fall back to client
function pickAssetUrl(deal: Record<string, string | null>): string | null {
  // Internal assets usually have direct WorkDrive folder IDs
  if (deal.internal_assets && (deal.internal_assets.includes("workdrive.zoho.com/folder/") || deal.internal_assets.includes("drive.google.com"))) {
    return deal.internal_assets;
  }
  // Fall back to client assets
  return deal.client_assets || deal.internal_assets || null;
}

// ── AI description ──

interface DealContext {
  name: string;
  builder: string;
  city: string;
  state: string;
  modelName: string;
}

async function describeImage(imageUrl: string, ctx: DealContext): Promise<string> {
  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: [
            { type: "image", source: { type: "url", url: imageUrl } },
            {
              type: "text",
              text: `Write a concise SEO-optimized alt text for this real estate photo. 1-2 sentences max.
Context: ${ctx.name} by ${ctx.builder} in ${ctx.city}, ${ctx.state}. Model: ${ctx.modelName || "N/A"}.
Describe what's visible (room, features, materials, lighting). Include builder name and location naturally. No filler words.`,
            },
          ],
        },
      ],
    });
    const block = response.content.find((b) => b.type === "text");
    return block ? block.text : "";
  } catch {
    return "";
  }
}

// ── Shared optimize + upload ──

async function optimizeAndUpload(
  raw: Buffer,
  filename: string,
  folder: string,
  dealId: string,
  dealContext: DealContext,
): Promise<{ filename: string; fullUrl: string; thumbUrl: string; originalKB: number; optimizedKB: number; description: string } | null> {
  const originalKB = Math.round(raw.length / 1024);

  const full = await sharp(raw)
    .resize(MAX_WIDTH, undefined, { withoutEnlargement: true, fit: "inside" })
    .webp({ quality: QUALITY })
    .toBuffer();

  const thumb = await sharp(raw)
    .resize(THUMB_WIDTH, undefined, { withoutEnlargement: true, fit: "inside" })
    .webp({ quality: THUMB_QUALITY })
    .toBuffer();

  const baseName = filename
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .toLowerCase();

  const fullBlob = await put(`${folder}/${baseName}.webp`, full, {
    access: "public", contentType: "image/webp",
  });
  const thumbBlob = await put(`${folder}/thumbs/${baseName}.webp`, thumb, {
    access: "public", contentType: "image/webp",
  });

  // Generate AI description
  const description = await describeImage(fullBlob.url, dealContext);

  const meta = await sharp(full).metadata();
  await sql`
    INSERT INTO media_files (deal_id, url, thumb_url, filename, description, size_bytes, width, height)
    VALUES (${dealId}, ${fullBlob.url}, ${thumbBlob.url}, ${filename}, ${description}, ${full.length}, ${meta.width || 0}, ${meta.height || 0})
  `;

  return {
    filename,
    fullUrl: fullBlob.url,
    thumbUrl: thumbBlob.url,
    originalKB,
    optimizedKB: Math.round(full.length / 1024),
    description,
  };
}

// ── Main route ──

export async function POST(req: NextRequest) {
  try {
    const { dealId, maxImages } = (await req.json()) as { dealId: string; maxImages?: number };

    if (!dealId) return NextResponse.json({ error: "dealId required" }, { status: 400 });

    const dealResult = await sql`SELECT * FROM deals WHERE id = ${dealId}`;
    if (dealResult.rows.length === 0) return NextResponse.json({ error: "Deal not found" }, { status: 404 });

    const deal = dealResult.rows[0];
    const assetUrl = pickAssetUrl(deal);
    if (!assetUrl) return NextResponse.json({ error: "No asset URL found (checked internal and client links)" }, { status: 400 });

    const source = detectSource(assetUrl);
    const limit = maxImages || 30;

    const builderSlug = (deal.builder || "unknown").replace(/[^a-zA-Z0-9-_ ]/g, "").replace(/\s+/g, "-").toLowerCase();
    const dealSlug = (deal.name || "unknown").replace(/[^a-zA-Z0-9-_ ]/g, "").replace(/\s+/g, "-").toLowerCase();
    const folder = `gallery/${builderSlug}/${dealSlug}`;

    const dealContext: DealContext = {
      name: deal.name || "",
      builder: deal.builder || "",
      city: deal.city || "",
      state: deal.state || "",
      modelName: deal.model_name || "",
    };

    const results: { filename: string; fullUrl: string; thumbUrl: string; originalKB: number; optimizedKB: number; description: string }[] = [];
    const errors: string[] = [];

    if (source === "gdrive") {
      // ── Google Drive import ──
      const gToken = await getGoogleToken();
      const folderId = extractGDriveFolderId(assetUrl);
      if (!folderId) return NextResponse.json({ error: "Could not extract Google Drive folder ID" }, { status: 400 });

      let files = await listGDriveFiles(folderId, gToken);
      files.sort((a, b) => parseInt(b.size || "0") - parseInt(a.size || "0"));
      if (files.length > limit) files = files.slice(0, limit);

      for (const file of files) {
        try {
          const raw = await downloadGDriveFile(file.id, gToken);
          const result = await optimizeAndUpload(raw, file.name, folder, dealId, dealContext);
          if (result) results.push(result);
        } catch (e) {
          errors.push(`${file.name}: ${e}`);
        }
      }
    } else if (source === "workdrive") {
      // ── WorkDrive import: try direct folder ID first, then search ──
      const zToken = await getZohoToken();

      // Try extracting folder ID directly from URL (internal links have this)
      let wdFolderId = extractWorkDriveFolderId(assetUrl);

      // If no direct ID (external hash link), search by name
      if (!wdFolderId) {
        wdFolderId = await findDealFolder(deal.builder || "", deal.name || "", zToken);
      }

      if (!wdFolderId) {
        return NextResponse.json({
          error: `Could not find WorkDrive folder for "${deal.name}" under "${deal.builder}". Try providing a direct workdrive.zoho.com/folder/ link.`,
          triedUrl: assetUrl,
        }, { status: 404 });
      }

      // Get image files from the folder
      let imageFiles = await getImageFiles(wdFolderId, zToken);
      imageFiles.sort((a, b) => (b.size || 0) - (a.size || 0));
      if (imageFiles.length > limit) imageFiles = imageFiles.slice(0, limit);

      for (const file of imageFiles) {
        try {
          const raw = await downloadWorkDriveFile(file.id, zToken);
          const result = await optimizeAndUpload(raw, file.name, folder, dealId, dealContext);
          if (result) results.push(result);
        } catch (e) {
          errors.push(`${file.name}: ${e}`);
        }
      }
    } else {
      return NextResponse.json({
        error: `Unsupported asset source. URL must be Google Drive or Zoho WorkDrive. Got: ${assetUrl.slice(0, 60)}...`,
      }, { status: 400 });
    }

    // Mark deal as imported
    if (results.length > 0) {
      await sql`UPDATE deals SET imported = true, imported_at = NOW(), updated_at = NOW() WHERE id = ${dealId}`;
    }

    const totalOriginal = results.reduce((s, r) => s + r.originalKB, 0);
    const totalOptimized = results.reduce((s, r) => s + r.optimizedKB, 0);

    return NextResponse.json({
      dealId,
      source,
      folder,
      imported: results.length,
      failed: errors.length,
      originalMB: (totalOriginal / 1024).toFixed(1),
      optimizedMB: (totalOptimized / 1024).toFixed(1),
      savings: totalOriginal > 0 ? `${Math.round((1 - totalOptimized / totalOriginal) * 100)}%` : "0%",
      results,
      errors,
    });
  } catch (e) {
    return NextResponse.json({ error: `Import failed: ${e}` }, { status: 500 });
  }
}
