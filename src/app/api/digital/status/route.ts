import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req: NextRequest) {
  try {
    const p = req.nextUrl.searchParams;
    const action = p.get("action");

    if (action === "stats") {
      const result = await sql`
        SELECT
          COUNT(*) as total,
          COUNT(*) FILTER (WHERE approval_status = 'approved') as approved,
          COUNT(*) FILTER (WHERE approval_status = 'denied') as denied,
          COUNT(*) FILTER (WHERE approval_status = 'pending') as pending,
          COUNT(*) FILTER (WHERE imported = true) as imported
        FROM digital_transactions
        WHERE transaction_type = 'Debit' AND status = 'Complete'
      `;
      const lastSync = await sql`
        SELECT * FROM sync_log WHERE source = 'zoho-digital' ORDER BY synced_at DESC LIMIT 1
      `;
      return NextResponse.json({ stats: result.rows[0], lastSync: lastSync.rows[0] || null });
    }

    if (action === "filters") {
      const accounts = await sql`SELECT DISTINCT account FROM digital_transactions WHERE account IS NOT NULL AND transaction_type = 'Debit' ORDER BY account`;
      const statuses = await sql`SELECT DISTINCT status FROM digital_transactions WHERE status IS NOT NULL ORDER BY status`;
      const services = await sql`SELECT DISTINCT unnest(selected_services) as svc FROM digital_transactions ORDER BY svc`;
      return NextResponse.json({
        accounts: accounts.rows.map((r) => r.account),
        statuses: statuses.rows.map((r) => r.status),
        services: services.rows.map((r) => r.svc),
      });
    }

    // List transactions
    let query = `SELECT * FROM digital_transactions WHERE transaction_type = 'Debit' AND status = 'Complete'`;
    const params: string[] = [];
    let i = 1;

    const status = p.get("approval_status");
    if (status) { query += ` AND approval_status = $${i++}`; params.push(status); }

    const account = p.get("account");
    if (account) { query += ` AND account = $${i++}`; params.push(account); }

    const search = p.get("search");
    if (search) {
      query += ` AND (project_name ILIKE $${i} OR account ILIKE $${i} OR project_city_state ILIKE $${i})`;
      params.push(`%${search}%`);
      i++;
    }

    const imported = p.get("imported");
    if (imported === "true") { query += ` AND imported = true`; }

    const service = p.get("service");
    if (service) { query += ` AND $${i++} = ANY(selected_services)`; params.push(service); }

    query += ` ORDER BY date_created DESC NULLS LAST`;

    const result = await sql.query(query, params);
    return NextResponse.json({ transactions: result.rows });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { id, action: act, ids, status } = (await req.json()) as {
      id?: string;
      action?: string;
      ids?: string[];
      status?: string;
    };

    if (act === "bulk" && ids && status) {
      for (const txId of ids) {
        await sql`UPDATE digital_transactions SET approval_status = ${status}, updated_at = NOW() WHERE id = ${txId}`;
      }
      return NextResponse.json({ updated: ids.length });
    }

    if (id && status) {
      await sql`UPDATE digital_transactions SET approval_status = ${status}, updated_at = NOW() WHERE id = ${id}`;
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
