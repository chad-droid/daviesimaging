import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// GET: fetch all site asset assignments (or one by slot_id)
export async function GET(req: NextRequest) {
  try {
    const slotId = req.nextUrl.searchParams.get("slot");
    if (slotId) {
      const result = await sql`SELECT * FROM site_assets WHERE slot_id = ${slotId}`;
      return NextResponse.json({ asset: result.rows[0] || null });
    }
    const result = await sql`SELECT * FROM site_assets ORDER BY updated_at DESC`;
    return NextResponse.json({ assets: result.rows });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// POST: assign or update an image for a slot
export async function POST(req: NextRequest) {
  try {
    const { slotId, imageUrl, thumbUrl, beforeUrl, beforeThumbUrl, altText, dealId } = (await req.json()) as {
      slotId: string;
      imageUrl?: string;
      thumbUrl?: string;
      beforeUrl?: string;
      beforeThumbUrl?: string;
      altText?: string;
      dealId?: string;
    };

    if (!slotId) return NextResponse.json({ error: "slotId required" }, { status: 400 });

    const existing = await sql`SELECT id FROM site_assets WHERE slot_id = ${slotId}`;

    if (existing.rows.length > 0) {
      await sql`
        UPDATE site_assets SET
          image_url = COALESCE(${imageUrl || null}, image_url),
          thumb_url = COALESCE(${thumbUrl || null}, thumb_url),
          before_url = COALESCE(${beforeUrl || null}, before_url),
          before_thumb_url = COALESCE(${beforeThumbUrl || null}, before_thumb_url),
          alt_text = COALESCE(${altText || null}, alt_text),
          deal_id = COALESCE(${dealId || null}, deal_id),
          updated_at = NOW()
        WHERE slot_id = ${slotId}
      `;
    } else {
      await sql`
        INSERT INTO site_assets (slot_id, image_url, thumb_url, before_url, before_thumb_url, alt_text, deal_id)
        VALUES (${slotId}, ${imageUrl || null}, ${thumbUrl || null}, ${beforeUrl || null}, ${beforeThumbUrl || null}, ${altText || null}, ${dealId || null})
      `;
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// DELETE: remove an assignment
export async function DELETE(req: NextRequest) {
  try {
    const { slotId } = (await req.json()) as { slotId: string };
    await sql`DELETE FROM site_assets WHERE slot_id = ${slotId}`;
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
