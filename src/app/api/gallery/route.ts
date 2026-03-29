import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// GET: get gallery assignments for a page, or list available projects with media
export async function GET(req: NextRequest) {
  try {
    const action = req.nextUrl.searchParams.get("action");

    if (action === "assignments") {
      const page = req.nextUrl.searchParams.get("page") || "/";
      const result = await sql`
        SELECT ga.*, d.name as deal_name, d.builder, d.city, d.state, d.pipeline,
          (SELECT COUNT(*) FROM media_files WHERE deal_id = ga.deal_id) as image_count
        FROM gallery_assignments ga
        LEFT JOIN deals d ON d.id = ga.deal_id
        WHERE ga.page_slug = ${page}
        ORDER BY ga.sort_order ASC
      `;
      return NextResponse.json({ assignments: result.rows });
    }

    // List all projects that have imported media (available to add to galleries)
    const search = req.nextUrl.searchParams.get("search") || "";
    let query = `
      SELECT d.id, d.name, d.builder, d.city, d.state, d.pipeline,
        COUNT(mf.id) as image_count
      FROM deals d
      INNER JOIN media_files mf ON mf.deal_id = d.id
    `;
    const params: string[] = [];
    if (search) {
      query += ` WHERE (d.name ILIKE $1 OR d.builder ILIKE $1 OR d.city ILIKE $1)`;
      params.push(`%${search}%`);
    }
    query += ` GROUP BY d.id ORDER BY d.builder, d.name`;

    // Also get digital transactions with media
    const deals = await sql.query(query, params);

    let dtQuery = `
      SELECT dt.id, dt.project_name as name, dt.account as builder,
        dt.project_city_state as city, '' as state, 'Digital' as pipeline,
        COUNT(mf.id) as image_count
      FROM digital_transactions dt
      INNER JOIN media_files mf ON mf.deal_id = dt.id
    `;
    const dtParams: string[] = [];
    if (search) {
      dtQuery += ` WHERE (dt.project_name ILIKE $1 OR dt.account ILIKE $1)`;
      dtParams.push(`%${search}%`);
    }
    dtQuery += ` GROUP BY dt.id ORDER BY dt.account, dt.project_name`;

    const digitals = await sql.query(dtQuery, dtParams);

    return NextResponse.json({
      projects: [
        ...deals.rows.map((r: Record<string, unknown>) => ({ ...r, source: "deal" })),
        ...digitals.rows.map((r: Record<string, unknown>) => ({ ...r, source: "digital" })),
      ],
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// POST: add/update gallery assignments
export async function POST(req: NextRequest) {
  try {
    const { pageSlug, dealId, action: act } = (await req.json()) as {
      pageSlug: string;
      dealId: string;
      action?: string;
    };

    if (act === "remove") {
      await sql`DELETE FROM gallery_assignments WHERE page_slug = ${pageSlug} AND deal_id = ${dealId}`;
      return NextResponse.json({ success: true });
    }

    // Add project to gallery
    const existing = await sql`
      SELECT id FROM gallery_assignments WHERE page_slug = ${pageSlug} AND deal_id = ${dealId}
    `;
    if (existing.rows.length === 0) {
      const maxOrder = await sql`
        SELECT COALESCE(MAX(sort_order), 0) + 1 as next_order FROM gallery_assignments WHERE page_slug = ${pageSlug}
      `;
      await sql`
        INSERT INTO gallery_assignments (page_slug, deal_id, sort_order)
        VALUES (${pageSlug}, ${dealId}, ${maxOrder.rows[0].next_order})
      `;
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
