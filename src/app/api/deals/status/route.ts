import { NextRequest, NextResponse } from "next/server";
import {
  getDeals,
  updateDealStatus,
  updateDealImported,
  bulkUpdateStatus,
  getDealStats,
  getLastSync,
  getUniqueValues,
} from "@/lib/db";

// GET: return deals with optional filters, stats, and last sync
export async function GET(req: NextRequest) {
  try {
    const p = req.nextUrl.searchParams;
    const action = p.get("action");

    if (action === "stats") {
      const stats = await getDealStats();
      const lastSync = await getLastSync();
      return NextResponse.json({ stats, lastSync });
    }

    if (action === "filters") {
      const values = await getUniqueValues();
      return NextResponse.json(values);
    }

    const deals = await getDeals({
      status: p.get("status") || undefined,
      builder: p.get("builder") || undefined,
      state: p.get("state") || undefined,
      pipeline: p.get("pipeline") || undefined,
      search: p.get("search") || undefined,
      imported: p.has("imported") ? p.get("imported") === "true" : undefined,
    });

    return NextResponse.json({ deals });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// POST: update deal statuses
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, ids, id, status, imported } = body as {
      action?: string;
      ids?: string[];
      id?: string;
      status?: "pending" | "approved" | "denied" | "archived";
      imported?: boolean;
    };

    if (action === "bulk" && ids && status) {
      await bulkUpdateStatus(ids, status);
      return NextResponse.json({ updated: ids.length });
    }

    if (id && status) {
      await updateDealStatus(id, status);
    }

    if (id && imported !== undefined) {
      await updateDealImported(id, imported);
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
