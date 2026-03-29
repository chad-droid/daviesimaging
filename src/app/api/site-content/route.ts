import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// GET: fetch content for a slot or all slots
export async function GET(req: NextRequest) {
  try {
    const slot = req.nextUrl.searchParams.get("slot");
    if (slot) {
      const result = await sql`SELECT * FROM site_content WHERE slot_id = ${slot}`;
      return NextResponse.json({ content: result.rows[0]?.content || null });
    }
    const result = await sql`SELECT * FROM site_content ORDER BY slot_id`;
    return NextResponse.json({ items: result.rows });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// POST: save content for a slot
export async function POST(req: NextRequest) {
  try {
    const { slotId, content } = (await req.json()) as {
      slotId: string;
      content: Record<string, string>;
    };

    if (!slotId) return NextResponse.json({ error: "slotId required" }, { status: 400 });

    const existing = await sql`SELECT id FROM site_content WHERE slot_id = ${slotId}`;
    const contentJson = JSON.stringify(content);

    if (existing.rows.length > 0) {
      await sql`UPDATE site_content SET content = ${contentJson}::jsonb, updated_at = NOW() WHERE slot_id = ${slotId}`;
    } else {
      await sql`INSERT INTO site_content (slot_id, content) VALUES (${slotId}, ${contentJson}::jsonb)`;
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
