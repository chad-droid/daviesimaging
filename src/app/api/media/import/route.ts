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

async function listGDriveFiles(folderId: string, token: string, depth = 0): Promise<GDriveFile[]> {
  if (depth > 10) return [];
  const allFiles: GDriveFile[] = [];
  let pageToken: string | undefined;

  do {
    const params = new URLSearchParams({
      q: `'${folderId}' in parents`,
      fields: "nextPageToken, files(id, name, mimeType, size)",
      pageSize: "100",
    });
    if (pageToken) params.set("pageToken", pageToken);
    const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`Drive API: ${await res.text()}`);
    const data = await res.json();

    for (const file of data.files || []) {
      if (file.mimeType === "application/vnd.google-apps.folder") {
        // Recurse into subfolders
        const subFiles = await listGDriveFiles(file.id, token, depth + 1);
        allFiles.push(...subFiles);
      } else if (file.mimeType?.startsWith("image/")) {
        allFiles.push(file);
      }
    }
    pageToken = data.nextPageToken;
  } while (pageToken);

  return allFiles;
}

async function downloadGDriveFile(fileId: string, token: string): Promise<Buffer> {
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`GDrive download failed: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

// ── Detect source type ──

function detectSource(url: string): "gdrive" | "workdrive" | "dropbox" | "unknown" {
  if (url.includes("drive.google.com")) return "gdrive";
  if (url.includes("workdrive.zoho") || url.includes("zohoexternal.com")) return "workdrive";
  if (url.includes("dropbox.com")) return "dropbox";
  return "unknown";
}

function extractWorkDriveFolderId(url: string): string | null {
  const folderMatch = url.match(/\/folder\/([a-z0-9]+)/);
  if (folderMatch) return folderMatch[1];
  return null;
}

// Return all candidate URLs in priority order (try each until one has images)
function getAssetUrls(deal: Record<string, string | null>): string[] {
  const ia = deal.internal_assets || "";
  const ca = deal.client_assets || "";
  const urls: string[] = [];

  // WorkDrive direct folder ID (most reliable)
  if (ia.includes("workdrive.zoho.com/folder/")) urls.push(ia);
  // Client WorkDrive (folder or hash)
  if (ca.includes("workdrive")) urls.push(ca);
  // Client Google Drive
  if (ca.includes("drive.google.com")) urls.push(ca);
  // Dropbox shared folders
  if (ca.includes("dropbox.com")) urls.push(ca);
  if (ia.includes("dropbox.com") && !urls.includes(ia)) urls.push(ia);
  // Internal Google Drive (often empty production folders, try last)
  if (ia.includes("drive.google.com") && !urls.includes(ia)) urls.push(ia);
  // Internal WorkDrive hash
  if (ia.includes("workdrive") && !urls.includes(ia)) urls.push(ia);

  return [...new Set(urls)];
}

// ── Dropbox helpers ──

async function getDropboxToken(): Promise<string> {
  // Prefer long-lived access token if set
  const accessToken = process.env.DROPBOX_ACCESS_TOKEN;
  if (accessToken) return accessToken;

  // OAuth2 refresh flow with App Key + App Secret + Refresh Token
  const appKey = process.env.DROPBOX_APP_KEY;
  const appSecret = process.env.DROPBOX_APP_SECRET;
  const refreshToken = process.env.DROPBOX_REFRESH_TOKEN;
  if (!appKey || !appSecret || !refreshToken) {
    throw new Error("Dropbox credentials not configured. Set DROPBOX_ACCESS_TOKEN or DROPBOX_APP_KEY + DROPBOX_APP_SECRET + DROPBOX_REFRESH_TOKEN.");
  }

  const res = await fetch("https://api.dropboxapi.com/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: appKey,
      client_secret: appSecret,
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`Dropbox auth failed: ${JSON.stringify(data)}`);
  return data.access_token;
}

interface DropboxEntry {
  ".tag": string;
  name: string;
  id: string;
  path_display: string;
  size?: number;
}

async function listDropboxFiles(sharedLinkUrl: string, token: string): Promise<DropboxEntry[]> {
  const allFiles: DropboxEntry[] = [];
  let hasMore = true;
  let cursor: string | undefined;

  while (hasMore) {
    let res: Response;
    if (cursor) {
      res = await fetch("https://api.dropboxapi.com/2/files/list_folder/continue", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ cursor }),
      });
    } else {
      res = await fetch("https://api.dropboxapi.com/2/files/list_folder", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          path: "",
          shared_link: { url: sharedLinkUrl },
          recursive: true,
          include_non_downloadable_files: false,
        }),
      });
    }
    if (!res.ok) throw new Error(`Dropbox list error: ${await res.text()}`);
    const data = await res.json();

    const images = (data.entries as DropboxEntry[]).filter(
      (e) => e[".tag"] === "file" && /\.(jpe?g|png|webp|tiff?)$/i.test(e.name),
    );
    allFiles.push(...images);
    hasMore = data.has_more || false;
    cursor = data.cursor;
  }
  return allFiles;
}

async function downloadDropboxFile(file: DropboxEntry, sharedLinkUrl: string, token: string): Promise<Buffer> {
  // Use the shared link + relative path to download
  const res = await fetch("https://content.dropboxapi.com/2/sharing/get_shared_link_file", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Dropbox-API-Arg": JSON.stringify({ url: sharedLinkUrl, path: file.path_display }),
    },
  });
  if (!res.ok) throw new Error(`Dropbox download failed (${res.status}): ${await res.text()}`);
  return Buffer.from(await res.arrayBuffer());
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
    access: "public", contentType: "image/webp", addRandomSuffix: false, allowOverwrite: true,
  });
  const thumbBlob = await put(`${folder}/thumbs/${baseName}.webp`, thumb, {
    access: "public", contentType: "image/webp", addRandomSuffix: false, allowOverwrite: true,
  });

  const meta = await sharp(full).metadata();

  // Generate AI description (non-blocking — don't fail import if this times out)
  let description = "";
  try {
    const descPromise = describeImage(fullBlob.url, dealContext);
    const timeout = new Promise<string>((resolve) => setTimeout(() => resolve(""), 8000));
    description = await Promise.race([descPromise, timeout]);
  } catch { /* skip description on error */ }

  await sql`
    INSERT INTO media_files (deal_id, url, thumb_url, filename, description, size_bytes, width, height)
    VALUES (${dealId}, ${fullBlob.url}, ${thumbBlob.url}, ${filename}, ${description}, ${full.length}, ${meta.width || 0}, ${meta.height || 0})
    ON CONFLICT (deal_id, url) DO UPDATE SET
      thumb_url = EXCLUDED.thumb_url, filename = EXCLUDED.filename,
      description = COALESCE(NULLIF(EXCLUDED.description, ''), media_files.description),
      size_bytes = EXCLUDED.size_bytes, width = EXCLUDED.width, height = EXCLUDED.height
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
    const { dealId, maxImages, overrideUrl, zohoToken: providedZohoToken } = (await req.json()) as { dealId: string; maxImages?: number; overrideUrl?: string; zohoToken?: string };

    if (!dealId) return NextResponse.json({ error: "dealId required" }, { status: 400 });

    const dealResult = await sql`SELECT * FROM deals WHERE id = ${dealId}`;
    if (dealResult.rows.length === 0) return NextResponse.json({ error: "Deal not found" }, { status: 404 });

    const deal = dealResult.rows[0];
    const candidateUrls = overrideUrl ? [overrideUrl] : getAssetUrls(deal);
    if (candidateUrls.length === 0) return NextResponse.json({ error: "No asset URL found (checked internal and client links)" }, { status: 400 });

    // Try each URL until one produces results
    let assetUrl = candidateUrls[0];
    for (const url of candidateUrls) {
      assetUrl = url;
      const src = detectSource(url);
      if (src !== "unknown") break; // Use first recognized source, we'll retry below if 0 images
    }

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
    let lastError = "";
    let usedUrl = assetUrl;

    // Try each candidate URL until one produces images
    for (const tryUrl of candidateUrls) {
      usedUrl = tryUrl;
      const source = detectSource(tryUrl);
      results.length = 0;
      errors.length = 0;
      lastError = "";

      try {
        if (source === "gdrive") {
          const gToken = await getGoogleToken();
          const folderId = extractGDriveFolderId(tryUrl);
          if (!folderId) { lastError = "Could not extract Google Drive folder ID"; continue; }

          let files = await listGDriveFiles(folderId, gToken);
          if (files.length === 0) { lastError = `Google Drive folder empty (${folderId})`; continue; }

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
          const zToken = providedZohoToken || await getZohoToken();
          let wdFolderId = extractWorkDriveFolderId(tryUrl);

          if (!wdFolderId) {
            wdFolderId = await findDealFolder(deal.builder || "", deal.name || "", zToken);
          }

          if (!wdFolderId) { lastError = `Could not find WorkDrive folder for "${deal.name}" under "${deal.builder}"`; continue; }

          let imageFiles = await getImageFiles(wdFolderId, zToken);
          if (imageFiles.length === 0) { lastError = `WorkDrive folder empty (${wdFolderId})`; continue; }

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
        } else if (source === "dropbox") {
          const dbToken = await getDropboxToken();
          let files = await listDropboxFiles(tryUrl, dbToken);
          if (files.length === 0) { lastError = `Dropbox folder empty or inaccessible`; continue; }

          files.sort((a, b) => (b.size || 0) - (a.size || 0));
          if (files.length > limit) files = files.slice(0, limit);

          for (const file of files) {
            try {
              const raw = await downloadDropboxFile(file, tryUrl, dbToken);
              const result = await optimizeAndUpload(raw, file.name, folder, dealId, dealContext);
              if (result) results.push(result);
            } catch (e) {
              errors.push(`${file.name}: ${e}`);
            }
          }
        } else {
          lastError = `Unsupported source: ${tryUrl.slice(0, 60)}. Expected a Google Drive, Zoho WorkDrive, or Dropbox URL.`;
          continue;
        }
      } catch (e) {
        lastError = String(e);
        continue;
      }

      // If we got results, stop trying other URLs
      if (results.length > 0) break;
    }

    if (results.length === 0 && lastError) {
      return NextResponse.json({
        error: `${lastError}. Try providing a direct workdrive.zoho.com/folder/ or Google Drive URL.`,
        triedUrls: candidateUrls,
      }, { status: 404 });
    }

    // Mark deal as imported
    if (results.length > 0) {
      await sql`UPDATE deals SET imported = true, imported_at = NOW(), updated_at = NOW() WHERE id = ${dealId}`;
    }

    const totalOriginal = results.reduce((s, r) => s + r.originalKB, 0);
    const totalOptimized = results.reduce((s, r) => s + r.optimizedKB, 0);

    return NextResponse.json({
      dealId,
      source: detectSource(usedUrl),
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
