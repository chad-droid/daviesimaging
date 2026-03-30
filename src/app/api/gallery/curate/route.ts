import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// GET: get curation settings for a deal's images on a page
export async function GET(req: NextRequest) {
  const dealId = req.nextUrl.searchParams.get("dealId");
  const pageSlug = req.nextUrl.searchParams.get("page");

  if (!dealId) return NextResponse.json({ error: "dealId required" }, { status: 400 });

  try {
    // Get the gallery assignment for this deal on this page
    let coverId: number | null = null;
    let hiddenIds: number[] = [];

    if (pageSlug) {
      const assignment = await sql`
        SELECT cover_image_id, hidden_image_ids
        FROM gallery_assignments
        WHERE page_slug = ${pageSlug} AND deal_id = ${dealId}
      `;
      if (assignment.rows.length > 0) {
        coverId = assignment.rows[0].cover_image_id;
        hiddenIds = assignment.rows[0].hidden_image_ids || [];
      }
    }

    // Get all media files for this deal
    const files = await sql`
      SELECT * FROM media_files WHERE deal_id = ${dealId} ORDER BY created_at
    `;

    return NextResponse.json({
      files: files.rows,
      coverId,
      hiddenIds,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// POST: update curation settings
export async function POST(req: NextRequest) {
  try {
    const { pageSlug, dealId, coverId, hiddenIds } = (await req.json()) as {
      pageSlug: string;
      dealId: string;
      coverId?: number | null;
      hiddenIds?: number[];
    };

    if (!pageSlug || !dealId) return NextResponse.json({ error: "pageSlug and dealId required" }, { status: 400 });

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

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
