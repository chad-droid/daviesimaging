const ZOHO_ACCOUNTS_URL = "https://accounts.zoho.com/oauth/v2/token";
const WORKDRIVE_API = "https://www.zohoapis.com/workdrive/api/v1";

// Two root folders to search:
// FINISHED_ASSETS — older/misc clients (A–J company names, ~76 folders)
// CRM_ACCOUNTS    — current active clients named exactly like Zoho CRM accounts
//                   (Toll Brothers, K. Hovnanian, Coventry regional variants, etc.)
const FINISHED_ASSETS_FOLDER_ID = "u44ek0f42259fc4cf436ca4b82563089aad11";
const CRM_ACCOUNTS_FOLDER_ID    = "2alade364a3a42eda4cbba0efd0e02a6606dd";

// ── Token cache — reuse access tokens across requests (valid for 1 hour) ──
let _cachedToken: string | null = null;
let _tokenExpiresAt = 0; // epoch ms

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (_cachedToken && _tokenExpiresAt - now > 5 * 60 * 1000) {
    return _cachedToken;
  }

  const res = await fetch(ZOHO_ACCOUNTS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: process.env.ZOHO_REFRESH_TOKEN || "",
      client_id: process.env.ZOHO_CLIENT_ID || "",
      client_secret: process.env.ZOHO_CLIENT_SECRET || "",
      grant_type: "refresh_token",
    }),
  });
  const rawText = await res.text();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any;
  try { data = JSON.parse(rawText); } catch { throw new Error(`Zoho auth failed (non-JSON): ${rawText.slice(0, 200)}`); }
  if (!data.access_token) throw new Error(`Zoho auth failed: ${JSON.stringify(data)}`);

  _cachedToken = data.access_token;
  _tokenExpiresAt = now + 55 * 60 * 1000;
  return _cachedToken as string;
}

interface WDFile {
  id: string;
  name: string;
  type: string;
  mimeType?: string;
  size?: number;
}

async function listFiles(
  folderId: string,
  accessToken: string,
  limit = 50,
): Promise<WDFile[]> {
  const res = await fetch(
    `${WORKDRIVE_API}/files/${folderId}/files?page%5Blimit%5D=${limit}`,
    { headers: { Authorization: `Zoho-oauthtoken ${accessToken}` } },
  );
  if (!res.ok) throw new Error(`WorkDrive list error: ${await res.text()}`);
  const data = await res.json();
  return (data.data || []).map((item: { id: string; attributes: Record<string, unknown> }) => ({
    id: item.id,
    name: item.attributes.name as string,
    type: item.attributes.type as string,
    mimeType: item.attributes.mime_type as string | undefined,
    size: item.attributes.storage_info
      ? (item.attributes.storage_info as Record<string, number>).size
      : undefined,
  }));
}

// ── Name normalization ──

// Strip common deal-name suffixes that don't appear in folder names
function normalizeDealName(name: string): string[] {
  const stripped = name
    .replace(/\b(photography|production|photo|matterport|scanning|inventory|exterior|interior|model|models|sales gallery|amenities|clubhouse|twilight|brand update|spec\+?|lifestyle)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  const candidates: string[] = [];
  if (stripped) candidates.push(stripped.toLowerCase());
  candidates.push(name.toLowerCase());

  const words = stripped.split(" ").filter((w) => w.length > 2);
  if (words.length >= 2) candidates.push(words.slice(0, 2).join(" ").toLowerCase());
  if (words.length >= 3) candidates.push(words.slice(0, 3).join(" ").toLowerCase());

  const dashSplit = name.split(/\s*[-–]\s*/)[0].trim();
  if (dashSplit && dashSplit !== name) candidates.push(dashSplit.toLowerCase());

  return [...new Set(candidates)];
}

// Build builder name candidates for folder matching.
// Includes BOTH the full name (e.g. "K. Hovnanian - Northern California")
// AND the stripped base (e.g. "K. Hovnanian") so we match either folder style.
function normalizeBuilder(name: string): string[] {
  const full = name.trim();
  const base = name.split(",")[0].split(" - ")[0].split(":")[0].trim();

  const strip = (s: string) => s.replace(/\./g, "");
  const addDots = (s: string) => s.replace(/\b([A-Z])([A-Z])\b/g, "$1.$2."); // DR → D.R.

  return [...new Set([
    full,
    base,
    strip(full),
    strip(base),
    addDots(full),
    addDots(base),
  ].map(s => s.toLowerCase().trim()).filter(Boolean))];
}

// Fuzzy match: does the folder name contain any candidate, or vice-versa?
function fuzzyMatch(folderName: string, candidates: string[]): boolean {
  const lower = folderName.toLowerCase();
  return candidates.some((c) => lower.includes(c) || c.includes(lower));
}

// ── Folder search ──

async function findDealFolder(
  builderName: string,
  dealName: string,
  accessToken: string,
): Promise<string | null> {
  const builderCandidates = normalizeBuilder(builderName);
  const dealCandidates = normalizeDealName(dealName);

  // Search both root folders — Finished Assets (A–J) and CRM Accounts (K–Z + regional variants)
  const rootIds = [FINISHED_ASSETS_FOLDER_ID, CRM_ACCOUNTS_FOLDER_ID];

  for (const rootId of rootIds) {
    let allFolders: WDFile[] = [];
    try {
      allFolders = await listFiles(rootId, accessToken, 200);
    } catch {
      continue; // skip this root if inaccessible
    }

    const builderFolders = allFolders.filter(
      (f) => f.type === "folder" && builderCandidates.some(
        (c) => f.name.toLowerCase().includes(c) || c.includes(f.name.toLowerCase())
      ),
    );

    for (const builderFolder of builderFolders) {
      const found = await searchDeep(builderFolder.id, dealCandidates, accessToken, 6);
      if (found) return found;
    }
  }

  return null;
}

async function searchDeep(
  folderId: string,
  candidates: string[],
  accessToken: string,
  maxDepth: number,
): Promise<string | null> {
  if (maxDepth <= 0) return null;

  const items = await listFiles(folderId, accessToken, 200);

  // Direct match first
  for (const item of items) {
    if (item.type === "folder" && fuzzyMatch(item.name, candidates)) {
      return item.id;
    }
  }

  // Recurse into year/region intermediate folders
  for (const item of items) {
    if (item.type === "folder") {
      const found = await searchDeep(item.id, candidates, accessToken, maxDepth - 1);
      if (found) return found;
    }
  }

  return null;
}

async function getImageFiles(folderId: string, accessToken: string): Promise<WDFile[]> {
  const allFiles: WDFile[] = [];

  async function collectImages(parentId: string, depth: number) {
    if (depth > 6) return;
    const items = await listFiles(parentId, accessToken, 200);
    for (const item of items) {
      if (item.type === "folder") {
        await collectImages(item.id, depth + 1);
      } else if (
        item.mimeType?.startsWith("image/") ||
        /\.(jpg|jpeg|png|tiff|webp)$/i.test(item.name)
      ) {
        allFiles.push(item);
      }
    }
  }

  await collectImages(folderId, 0);
  return allFiles;
}

async function downloadFile(fileId: string, accessToken: string): Promise<Buffer> {
  const res = await fetch(
    `https://workdrive.zoho.com/api/v1/download/${fileId}`,
    { headers: { Authorization: `Zoho-oauthtoken ${accessToken}` } },
  );
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

export {
  getAccessToken,
  listFiles,
  findDealFolder,
  getImageFiles,
  downloadFile,
};
