import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
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
    const { action, ids, id, status, imported, importFailed, importError } = body as {
      action?: string;
      ids?: string[];
      id?: string;
      status?: "pending" | "approved" | "denied" | "archived";
      imported?: boolean;
      importFailed?: boolean;
      importError?: string;
    };

    if (action === "bulk" && ids && status) {
      await bulkUpdateStatus(ids, status);
      return NextResponse.json({ updated: ids.length });
    }

    if (action === "markFailed" && id) {
      await sql`
        UPDATE deals SET import_failed = TRUE, import_error = ${importError || null}, updated_at = NOW()
        WHERE id = ${id}
      `;
      return NextResponse.json({ success: true });
    }

    if (action === "clearFailed" && id) {
      await sql`
        UPDATE deals SET import_failed = FALSE, import_error = NULL, updated_at = NOW()
        WHERE id = ${id}
      `;
      return NextResponse.json({ success: true });
    }

    if (action === "createDeal") {
      const { name, builder, city, state, modelName, address, clientAssets } = body as {
        name: string; builder: string; city?: string; state?: string;
        modelName?: string; address?: string; clientAssets?: string;
      };
      if (!name || !builder) return NextResponse.json({ error: "name and builder required" }, { status: 400 });
      const newId = `manual_${Date.now()}`;
      await sql`
        INSERT INTO deals (id, name, builder, city, state, model_name, address, client_assets, status, imported, import_failed, pipeline, created_at, updated_at)
        VALUES (${newId}, ${name}, ${builder}, ${city || ""}, ${state || ""}, ${modelName || ""}, ${address || ""}, ${clientAssets || ""}, 'approved', FALSE, FALSE, 'Manual', NOW(), NOW())
      `;
      return NextResponse.json({ success: true, id: newId });
    }

    if (action === "getAttn") {
      const rows = await sql`
        SELECT id, name, builder, city, state, client_assets, import_error
        FROM deals
        WHERE import_failed = TRUE AND imported = FALSE
        ORDER BY updated_at DESC
      `;
      return NextResponse.json({ deals: rows.rows });
    }

    if (id && status) {
      await updateDealStatus(id, status);
    }

    if (id && imported !== undefined) {
      await updateDealImported(id, imported);
    }

    if (id && importFailed !== undefined) {
      await sql`
        UPDATE deals SET import_failed = ${importFailed}, import_error = ${importError || null}, updated_at = NOW()
        WHERE id = ${id}
      `;
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
