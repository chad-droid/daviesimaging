import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// GET: get deal metadata + all media files for a deal
export async function GET(req: NextRequest) {
  const dealId = req.nextUrl.searchParams.get("dealId");
  if (!dealId) return NextResponse.json({ error: "dealId required" }, { status: 400 });

  try {
    const deal = await sql`SELECT * FROM deals WHERE id = ${dealId}`;
    if (deal.rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const files = await sql`SELECT * FROM media_files WHERE deal_id = ${dealId} ORDER BY created_at`;

    return NextResponse.json({
      deal: deal.rows[0],
      files: files.rows,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// POST: update deal metadata fields
export async function POST(req: NextRequest) {
  try {
    const { dealId, fields } = (await req.json()) as {
      dealId: string;
      fields: Record<string, string>;
    };

    if (!dealId) return NextResponse.json({ error: "dealId required" }, { status: 400 });

    // Whitelist of editable fields
    const allowed = new Set([
      "name", "builder", "city", "state", "pipeline",
      "model_name", "location_name", "project_type",
      "scope", "deliverables", "address",
    ]);

    for (const [key, value] of Object.entries(fields)) {
      if (!allowed.has(key)) continue;
      await sql.query(`UPDATE deals SET ${key} = $1, updated_at = NOW() WHERE id = $2`, [value, dealId]);
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
