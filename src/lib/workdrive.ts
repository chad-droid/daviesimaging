const ZOHO_ACCOUNTS_URL = "https://accounts.zoho.com/oauth/v2/token";
const WORKDRIVE_API = "https://www.zohoapis.com/workdrive/api/v1";
const FINISHED_ASSETS_FOLDER_ID = "u44ek0f42259fc4cf436ca4b82563089aad11";

async function getAccessToken(): Promise<string> {
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
  return data.access_token;
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

// Recursively search for a folder matching the deal name
// Structure: Finished Assets > Builder > Year > Region > Deal
async function findDealFolder(
  builderName: string,
  dealName: string,
  accessToken: string,
): Promise<string | null> {
  // Step 1: Find builder folder
  const builderFolders = await searchFolders(
    FINISHED_ASSETS_FOLDER_ID,
    builderName.split(",")[0].split(" - ")[0].trim(), // "Beazer Homes, Northern California" → "Beazer Homes"
    accessToken,
  );

  if (builderFolders.length === 0) return null;

  // Step 2: Search recursively through year/region subfolders
  for (const builderFolder of builderFolders) {
    const found = await searchDeep(builderFolder.id, dealName, accessToken, 10);
    if (found) return found;
  }

  return null;
}

async function searchDeep(
  folderId: string,
  dealName: string,
  accessToken: string,
  maxDepth: number,
): Promise<string | null> {
  if (maxDepth <= 0) return null;

  const items = await listFiles(folderId, accessToken, 200);
  const lower = dealName.toLowerCase();

  // Check if any subfolder matches the deal name
  for (const item of items) {
    if (item.type === "folder" && item.name.toLowerCase().includes(lower)) {
      return item.id;
    }
  }

  // Recurse into subfolders (year folders, region folders)
  for (const item of items) {
    if (item.type === "folder") {
      const found = await searchDeep(item.id, dealName, accessToken, maxDepth - 1);
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
        // Look inside "Finished" or "Final" subfolders, or any image-containing folder
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
