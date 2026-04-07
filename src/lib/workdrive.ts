const ZOHO_ACCOUNTS_URL = "https://accounts.zoho.com/oauth/v2/token";
const WORKDRIVE_API = "https://www.zohoapis.com/workdrive/api/v1";

// Two root folders to search:
// FINISHED_ASSETS — older/misc clients (A–J company names, ~76 folders)
// CRM_ACCOUNTS    — current active clients named exactly like Zoho CRM accounts
//                   (Toll Brothers, K. Hovnanian, Coventry regional variants, etc.)
const FINISHED_ASSETS_FOLDER_ID = "u44ek0f42259fc4cf436ca4b82563089aad11";
const CRM_ACCOUNTS_FOLDER_ID    = "2alade364a3a42eda4cbba0efd0e02a6606dd";

const WEB_FOLDER_RE = /^(web|web[\s_-]*jpe?g|web[\s_-]*res|lo[\s_-]*res|low[\s_-]*res|compressed|client[\s_-]*web|deliver)/i;

// ── Token cache — reuse access tokens across requests (valid for 1 hour) ──
let _cachedToken: string | null = null;
let _tokenExpiresAt = 0; // epoch ms

export async function getAccessToken(): Promise<string> {
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

export interface FolderCandidate {
  id: string;
  name: string;
  path: string;
}

export interface SearchDiagnostic {
  rootsSearched: string[];
  builderFoldersFound: string[];
  crmLinkedFolders: string[];
  candidates: FolderCandidate[];
}

interface WDFile {
  id: string;
  name: string;
  type: string;
  mimeType?: string;
  size?: number;
}

export async function listFiles(
  folderId: string,
  accessToken: string,
  limit = 50,
  offset = 0,
): Promise<WDFile[]> {
  const qs = `page%5Blimit%5D=${limit}${offset > 0 ? `&page%5Boffset%5D=${offset}` : ""}`;
  const res = await fetch(
    `${WORKDRIVE_API}/files/${folderId}/files?${qs}`,
    { headers: { Authorization: `Zoho-oauthtoken ${accessToken}` } },
  );
  // Read as text first to avoid SyntaxError when Zoho returns a plain-text error
  const raw = await res.text();
  if (!res.ok) throw new Error(`WorkDrive list error (${res.status}): ${raw.slice(0, 300)}`);
  let data: { data?: unknown[] };
  try { data = JSON.parse(raw); }
  catch { throw new Error(`WorkDrive list error (non-JSON): ${raw.slice(0, 300)}`); }
  return ((data.data as { id: string; attributes: Record<string, unknown> }[] | undefined) || []).map((item) => ({
    id: item.id,
    name: item.attributes.name as string,
    type: item.attributes.type as string,
    mimeType: item.attributes.mime_type as string | undefined,
    size: item.attributes.storage_info
      ? (item.attributes.storage_info as Record<string, number>).size
      : undefined,
  }));
}

// Paginate through a root folder to find subfolders whose name matches any of the given
// candidates. Stops as soon as we've gone past the alphabetical range, or hit maxItems.
async function findFoldersInRootByName(
  rootFolderId: string,
  candidates: string[],
  accessToken: string,
  maxItems = 4000,
): Promise<WDFile[]> {
  const matches: WDFile[] = [];
  const pageSize = 200;
  // The first candidate (longest / most specific) determines when we've gone past it alphabetically
  const sortedCandidates = [...candidates].sort((a, b) => a.localeCompare(b));
  const highWatermark = sortedCandidates[sortedCandidates.length - 1];

  for (let offset = 0; offset < maxItems; offset += pageSize) {
    let items: WDFile[];
    try { items = await listFiles(rootFolderId, accessToken, pageSize, offset); }
    catch { break; }
    if (items.length === 0) break;

    for (const item of items) {
      if (item.type === "folder" && candidates.some(
        (c) => item.name.toLowerCase().includes(c) || c.includes(item.name.toLowerCase()),
      )) {
        matches.push(item);
      }
    }

    // Early exit: if we've found matches AND the last item on this page is alphabetically
    // past the highest candidate, no more matches can appear
    if (matches.length > 0) {
      const lastName = items[items.length - 1].name.toLowerCase();
      if (lastName > highWatermark + "zzz") break;
    }

    if (items.length < pageSize) break; // Last page reached
  }
  return matches;
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

// Returns ALL matching folder candidates + diagnostic info for UI selection and debugging
export async function findDealFolders(
  zohoRecordId: string | null,
  builderName: string,
  dealName: string,
  accessToken: string,
): Promise<{ candidates: FolderCandidate[]; diagnostic: SearchDiagnostic }> {
  const candidates: FolderCandidate[] = [];
  const diagnostic: SearchDiagnostic = {
    rootsSearched: [],
    builderFoldersFound: [],
    crmLinkedFolders: [],
    candidates: [],
  };

  // Step 0: CRM-linked folders via WorkDrive ↔ CRM integration (most reliable)
  if (zohoRecordId) {
    try {
      const res = await fetch(
        `${WORKDRIVE_API}/crm/record/${zohoRecordId}/folders`,
        { headers: { Authorization: `Zoho-oauthtoken ${accessToken}` } },
      );
      if (res.ok) {
        const data = await res.json();
        for (const item of (data.data || [])) {
          const folderName = (item.attributes?.name as string) || item.id;
          candidates.push({ id: item.id, name: folderName, path: `CRM Linked / ${folderName}` });
          diagnostic.crmLinkedFolders.push(folderName);
        }
      }
    } catch { /* non-fatal */ }
  }

  // Step 1: Name-based search across both root folders
  const builderCandidates = normalizeBuilder(builderName);
  const dealCandidates = normalizeDealName(dealName);
  const roots = [
    { id: FINISHED_ASSETS_FOLDER_ID, label: "FINISHED_ASSETS" },
    { id: CRM_ACCOUNTS_FOLDER_ID,    label: "CRM_ACCOUNTS" },
  ];

  for (const root of roots) {
    diagnostic.rootsSearched.push(root.label);

    // FINISHED_ASSETS has ~76 builder folders — one page fetch is enough.
    // CRM_ACCOUNTS has 70k+ items — skip the initial fetch and use the paginated helper.
    let builderFolders: WDFile[];
    if (root.label === "FINISHED_ASSETS") {
      let topLevel: WDFile[] = [];
      try { topLevel = await listFiles(root.id, accessToken, 200); } catch { continue; }
      builderFolders = topLevel.filter(
        (f) => f.type === "folder" && builderCandidates.some(
          (c) => f.name.toLowerCase().includes(c) || c.includes(f.name.toLowerCase()),
        ),
      );
    } else {
      // CRM_ACCOUNTS: paginate through builder-named top-level folders.
      // Cap at 1000 items (5 pages × 200) — enough to reach K/L/T alphabetically
      // if the workspace has builder-level folders (~200-500 total).
      try { builderFolders = await findFoldersInRootByName(root.id, builderCandidates, accessToken, 1000); }
      catch { continue; }
    }

    for (const bf of builderFolders) {
      if (!diagnostic.builderFoldersFound.includes(bf.name)) {
        diagnostic.builderFoldersFound.push(bf.name);
      }
      const found = await collectMatchingFolders(bf.id, dealCandidates, accessToken, 3, bf.name);
      for (const f of found) {
        if (!candidates.find((c) => c.id === f.id)) candidates.push(f);
      }
    }
  }

  diagnostic.candidates = candidates;
  return { candidates, diagnostic };
}

// Backward-compat wrapper — returns first candidate only
export async function findDealFolder(
  builderName: string,
  dealName: string,
  accessToken: string,
): Promise<string | null> {
  const { candidates } = await findDealFolders(null, builderName, dealName, accessToken);
  return candidates[0]?.id ?? null;
}

async function collectMatchingFolders(
  folderId: string,
  candidates: string[],
  accessToken: string,
  maxDepth: number,
  pathPrefix: string,
): Promise<FolderCandidate[]> {
  if (maxDepth <= 0) return [];
  const items = await listFiles(folderId, accessToken, 200);
  const matches: FolderCandidate[] = [];

  for (const item of items) {
    if (item.type === "folder" && fuzzyMatch(item.name, candidates)) {
      matches.push({ id: item.id, name: item.name, path: `${pathPrefix} / ${item.name}` });
    }
  }
  // Recurse into non-matching subfolders (year folders, region folders, etc.)
  for (const item of items) {
    if (item.type === "folder" && !fuzzyMatch(item.name, candidates)) {
      const sub = await collectMatchingFolders(item.id, candidates, accessToken, maxDepth - 1, `${pathPrefix} / ${item.name}`);
      matches.push(...sub);
    }
  }
  return matches;
}

// JPEG-only image collection. Prefers subfolders named "web", "web jpeg", "lo-res", etc.
// Uses BFS limited to 2 levels deep to avoid sequential API call explosion.
// Strategy:
//   Level 0 (root): look for web folder → if found, return its JPEGs immediately
//   Level 1 (subfolders of root): look for web folder in each subfolder
//   Fallback: return all JPEGs found at root + level-1 (non-skip folders)
export async function getWebPreferredImageFiles(folderId: string, accessToken: string): Promise<WDFile[]> {
  const SKIP_RE = /^(video|raw|cr2|tiff|dng|bts|behind[\s_-]*the[\s_-]*scenes|4k|drone|hiRes|hi[\s_-]*res|high[\s_-]*res)/i;
  const isJpeg = (name: string) => /\.(jpe?g)$/i.test(name);

  // --- Level 0: list root ---
  const rootItems = await listFiles(folderId, accessToken, 200);

  // Immediate win: web folder at root level
  const rootWebFolder = rootItems.find((i) => i.type === "folder" && WEB_FOLDER_RE.test(i.name));
  if (rootWebFolder) {
    const webItems = await listFiles(rootWebFolder.id, accessToken, 200);
    const jpegs = webItems.filter((i) => i.type !== "folder" && isJpeg(i.name));
    if (jpegs.length > 0) return jpegs;
  }

  // Collect root-level JPEGs and non-skip subfolders for level 1 scan
  const collectedJpegs: WDFile[] = rootItems.filter((i) => i.type !== "folder" && isJpeg(i.name));
  const level1Folders = rootItems.filter((i) => i.type === "folder" && !SKIP_RE.test(i.name));

  // --- Level 1: check each subfolder for a web folder or JPEGs ---
  // Fetch all subfolders concurrently to minimise wall-clock time
  const level1Results = await Promise.all(
    level1Folders.map(async (folder) => {
      try {
        const items = await listFiles(folder.id, accessToken, 200);

        // Web subfolder found one level deep — fetch its contents
        const webFolder = items.find((i) => i.type === "folder" && WEB_FOLDER_RE.test(i.name));
        if (webFolder) {
          const webItems = await listFiles(webFolder.id, accessToken, 200);
          const jpegs = webItems.filter((i) => i.type !== "folder" && isJpeg(i.name));
          if (jpegs.length > 0) return { webJpegs: jpegs, fallbackJpegs: [] as WDFile[] };
        }

        // No web folder — collect JPEGs directly in this subfolder
        const fallbackJpegs = items.filter((i) => i.type !== "folder" && isJpeg(i.name));
        return { webJpegs: [] as WDFile[], fallbackJpegs };
      } catch {
        return { webJpegs: [] as WDFile[], fallbackJpegs: [] as WDFile[] };
      }
    }),
  );

  // If any level-1 folder had a web subfolder, return only those JPEGs
  const webFromLevel1 = level1Results.flatMap((r) => r.webJpegs);
  if (webFromLevel1.length > 0) return webFromLevel1;

  // Fallback: all JPEGs from root + level-1 subfolders
  collectedJpegs.push(...level1Results.flatMap((r) => r.fallbackJpegs));
  return collectedJpegs;
}

// Keep old name exported for any remaining callers
export { getWebPreferredImageFiles as getImageFiles };

// ── External share link resolution ──

// Extracts the hash from a zohoexternal.com/external/{hash} URL
export function extractExternalShareHash(url: string): string | null {
  const match = url.match(/zohoexternal\.com\/external\/([a-f0-9]+)/i);
  return match ? match[1] : null;
}

// Resolves a WorkDrive external share hash to an underlying folder ID.
// Calls GET /workdrive/api/v1/links/{hash} and extracts resource_id from the response.
export async function resolveExternalShareToFolderId(
  hash: string,
  accessToken: string,
): Promise<string | null> {
  try {
    const res = await fetch(`${WORKDRIVE_API}/links/${hash}`, {
      headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
    });
    const raw = await res.text();
    if (!res.ok) return null;
    let data: { data?: { attributes?: { resource_id?: string; entity_id?: string }; id?: string } };
    try { data = JSON.parse(raw); } catch { return null; }
    // Try resource_id first (standard), then entity_id, then the top-level id
    return data.data?.attributes?.resource_id
      ?? data.data?.attributes?.entity_id
      ?? data.data?.id
      ?? null;
  } catch {
    return null;
  }
}

export async function downloadFile(fileId: string, accessToken: string): Promise<Buffer> {
  const res = await fetch(
    `https://workdrive.zoho.com/api/v1/download/${fileId}`,
    { headers: { Authorization: `Zoho-oauthtoken ${accessToken}` } },
  );
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

