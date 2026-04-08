import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// Idempotent migration — adds image_order column if missing
async function ensureImageOrderColumn() {
  await sql`ALTER TABLE gallery_assignments ADD COLUMN IF NOT EXISTS image_order JSONB`;
}

// GET: get curation settings for a deal's images on a page
export async function GET(req: NextRequest) {
  const dealId = req.nextUrl.searchParams.get("dealId");
  const pageSlug = req.nextUrl.searchParams.get("page");

  if (!dealId) return NextResponse.json({ error: "dealId required" }, { status: 400 });

  try {
    await ensureImageOrderColumn();

    let coverId: number | null = null;
    let hiddenIds: number[] = [];
    let imageOrder: number[] = [];

    if (pageSlug) {
      const assignment = await sql`
        SELECT cover_image_id, hidden_image_ids, image_order
        FROM gallery_assignments
        WHERE page_slug = ${pageSlug} AND deal_id = ${dealId}
      `;
      if (assignment.rows.length > 0) {
        coverId = assignment.rows[0].cover_image_id;
        hiddenIds = assignment.rows[0].hidden_image_ids || [];
        imageOrder = assignment.rows[0].image_order || [];
      }
    }

    // Get all media files for this deal
    const files = await sql`
      SELECT * FROM media_files WHERE deal_id = ${dealId} ORDER BY created_at
    `;

    // Apply saved image order — unknown/new images fall to end in upload order
    let sortedFiles = files.rows;
    if (imageOrder.length > 0) {
      const orderMap = new Map((imageOrder as number[]).map((id, idx) => [id, idx]));
      sortedFiles = [...files.rows].sort((a, b) => {
        const ai = orderMap.has(a.id) ? (orderMap.get(a.id) as number) : Infinity;
        const bi = orderMap.has(b.id) ? (orderMap.get(b.id) as number) : Infinity;
        return ai - bi;
      });
    }

    return NextResponse.json({ files: sortedFiles, coverId, hiddenIds, imageOrder });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// POST: update curation settings (cover, hidden, order)
export async function POST(req: NextRequest) {
  try {
    const { pageSlug, dealId, coverId, hiddenIds, imageOrder } = (await req.json()) as {
      pageSlug: string;
      dealId: string;
      coverId?: number | null;
      hiddenIds?: number[];
      imageOrder?: number[];
    };

    if (!pageSlug || !dealId) return NextResponse.json({ error: "pageSlug and dealId required" }, { status: 400 });

    await ensureImageOrderColumn();

    if (coverId !== undefined) {
      await sql`
        UPDATE gallery_assignments SET cover_image_id = ${coverId}
        WHERE page_slug = ${pageSlug} AND deal_id = ${dealId}
      `;
    }

    if (hiddenIds !== undefined) {
      const hiddenJson = JSON.stringify(hiddenIds);
      await sql`
        UPDATE gallery_assignments SET hidden_image_ids = ${hiddenJson}::jsonb
        WHERE page_slug = ${pageSlug} AND deal_id = ${dealId}
      `;
    }

    if (imageOrder !== undefined) {
      const orderJson = JSON.stringify(imageOrder);
      await sql`
        UPDATE gallery_assignments SET image_order = ${orderJson}::jsonb
        WHERE page_slug = ${pageSlug} AND deal_id = ${dealId}
      `;
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
