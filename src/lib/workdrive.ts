const ZOHO_ACCOUNTS_URL = "https://accounts.zoho.com/oauth/v2/token";
const WORKDRIVE_API = "https://www.zohoapis.com/workdrive/api/v1";
const FINISHED_ASSETS_FOLDER_ID = "u44ek0f42259fc4cf436ca4b82563089aad11";

// ── Token cache — reuse access tokens across requests (valid for 1 hour) ──
let _cachedToken: string | null = null;
let _tokenExpiresAt = 0; // epoch ms

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  // Return cached token if it has more than 5 minutes left
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
  const data = await res.json();
  if (!data.access_token) throw new Error(`Zoho auth failed: ${JSON.stringify(data)}`);

  _cachedToken = data.access_token;
  // Zoho tokens last 3600s; cache for 55 minutes to be safe
  _tokenExpiresAt = now + 55 * 60 * 1000;
  return _cachedToken;
}

interface WDFile {
  id: string;
  name: string;
  type: string;
  mimeType?: string;
  size?: number;
  downloadUrl?: string;
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

async function searchFolders(
  parentId: string,
  searchName: string,
  accessToken: string,
): Promise<WDFile[]> {
  const files = await listFiles(parentId, accessToken, 200);
  const lower = searchName.toLowerCase();
  return files.filter(
    (f) => f.type === "folder" && f.name.toLowerCase().includes(lower),
  );
}

// Strip common suffixes that appear in deal names but not folder names
function normalizeDealName(name: string): string[] {
  const stripped = name
    .replace(/\b(photography|production|photo|matterport|scanning|inventory|exterior|interior|model|models|sales gallery|amenities|clubhouse|twilight|brand update|spec\+?|lifestyle)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  const candidates: string[] = [];

  // Full stripped name
  if (stripped) candidates.push(stripped.toLowerCase());

  // Original name
  candidates.push(name.toLowerCase());

  // First 2-3 significant words
  const words = stripped.split(" ").filter((w) => w.length > 2);
  if (words.length >= 2) candidates.push(words.slice(0, 2).join(" ").toLowerCase());
  if (words.length >= 3) candidates.push(words.slice(0, 3).join(" ").toLowerCase());

  // Also try without trailing descriptors separated by " - " or " – "
  const dashSplit = name.split(/\s*[-–]\s*/)[0].trim();
  if (dashSplit && dashSplit !== name) candidates.push(dashSplit.toLowerCase());

  return [...new Set(candidates)];
}

// Fuzzy match: does the folder name contain any of the search candidates?
function fuzzyMatch(folderName: string, candidates: string[]): boolean {
  const lower = folderName.toLowerCase();
  return candidates.some((c) => lower.includes(c) || c.includes(lower));
}

// Normalize a builder name for searching: strip periods, colons, regions
function normalizeBuilder(name: string): string[] {
  const base = name.split(",")[0].split(" - ")[0].split(":")[0].trim();
  const noPeriods = base.replace(/\./g, "");
  const withPeriods = base.replace(/([A-Z])([A-Z])/g, "$1.$2."); // DR → D.R.
  return [...new Set([base, noPeriods, withPeriods].map(s => s.toLowerCase().trim()).filter(Boolean))];
}

// Recursively search for a folder matching the deal name
async function findDealFolder(
  builderName: string,
  dealName: string,
  accessToken: string,
): Promise<string | null> {
  // Step 1: Find builder folder with fuzzy matching
  const builderCandidates = normalizeBuilder(builderName);
  const allFolders = await listFiles(FINISHED_ASSETS_FOLDER_ID, accessToken, 200);
  const builderFolders = allFolders.filter(
    (f) => f.type === "folder" && builderCandidates.some(
      (c) => f.name.toLowerCase().includes(c) || c.includes(f.name.toLowerCase())
    ),
  );

  if (builderFolders.length === 0) return null;

  // Step 2: Generate fuzzy search candidates from deal name
  const candidates = normalizeDealName(dealName);

  // Step 3: Search recursively through year/region subfolders
  for (const builderFolder of builderFolders) {
    const found = await searchDeep(builderFolder.id, candidates, accessToken, 10);
    if (found) return found;
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

  // Check if any subfolder fuzzy-matches the deal name
  for (const item of items) {
    if (item.type === "folder" && fuzzyMatch(item.name, candidates)) {
      return item.id;
    }
  }

  // Recurse into subfolders (year folders, region folders)
  for (const item of items) {
    if (item.type === "folder") {
      const found = await searchDeep(item.id, candidates, accessToken, maxDepth - 1);
      if (found) return found;
    }
  }

  return null;
}

async function getImageFiles(
  folderId: string,
  accessToken: string,
): Promise<WDFile[]> {
  const allFiles: WDFile[] = [];

  async function collectImages(parentId: string, depth: number) {
    if (depth > 10) return;
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

async function downloadFile(
  fileId: string,
  accessToken: string,
): Promise<Buffer> {
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
