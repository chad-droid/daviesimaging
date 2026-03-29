import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

const STATUS_FILE = "admin/deal-status.json";

interface DealStatus {
  [dealId: string]: {
    approved: boolean | null; // true = approved, false = rejected, null = undecided
    imported: boolean; // has media in the library
    importedAt?: string;
    updatedAt: string;
  };
}

async function getStatus(): Promise<DealStatus> {
  try {
    const result = await list({ prefix: STATUS_FILE });
    if (result.blobs.length === 0) return {};
    const res = await fetch(result.blobs[0].url);
    return (await res.json()) as DealStatus;
  } catch {
    return {};
  }
}

async function saveStatus(status: DealStatus): Promise<void> {
  await put(STATUS_FILE, JSON.stringify(status), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  });
}

// GET: return all deal statuses
export async function GET() {
  try {
    const status = await getStatus();
    return NextResponse.json(status);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// POST: update one or more deal statuses
export async function POST(req: NextRequest) {
  try {
    const updates = (await req.json()) as Record<
      string,
      { approved?: boolean | null; imported?: boolean }
    >;

    const status = await getStatus();
    const now = new Date().toISOString();

    for (const [id, update] of Object.entries(updates)) {
      if (!status[id]) {
        status[id] = { approved: null, imported: false, updatedAt: now };
      }
      if (update.approved !== undefined) {
        status[id].approved = update.approved;
      }
      if (update.imported !== undefined) {
        status[id].imported = update.imported;
        if (update.imported) status[id].importedAt = now;
      }
      status[id].updatedAt = now;
    }

    await saveStatus(status);
    return NextResponse.json({ updated: Object.keys(updates).length });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
