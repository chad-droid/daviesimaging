/**
 * /api/gallery/batch
 *
 * Returns all project + image data for a gallery page in 2 DB queries
 * instead of the N×2 waterfall the client was doing before.
 *
 * Previously: 1 assignments fetch + (2 fetches × N projects) = 80+ requests for 40 projects
 * Now: 2 DB queries total, regardless of project count.
 */

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const revalidate = 30; // Cache for 30s on the CDN

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  if (!page) return NextResponse.json({ error: "page required" }, { status: 400 });

  try {
    // Query 1: assignments joined with deal metadata
    const assignmentsRes = await sql`
      SELECT
        ga.deal_id,
        ga.sort_order,
        ga.cover_image_id,
        ga.hidden_image_ids,
        ga.image_order,
        d.name   AS deal_name,
        d.builder,
        d.city,
        d.state,
        d.pipeline,
        d.youtube
      FROM gallery_assignments ga
      JOIN deals d ON d.id::text = ga.deal_id
      WHERE ga.page_slug = ${page}
      ORDER BY ga.sort_order ASC NULLS LAST
    `;

    const assignments = assignmentsRes.rows;
    if (assignments.length === 0) return NextResponse.json({ projects: [] });

    const dealIds = assignments.map((a) => a.deal_id);

    // Query 2: all media files for all deals at once
    const mediaRes = await sql`
      SELECT id, deal_id, url, thumb_url, filename, description
      FROM media_files
      WHERE deal_id = ANY(${dealIds as any})
      ORDER BY id ASC
    `;

    // Group files by deal_id
    const filesByDeal: Record<string, typeof mediaRes.rows> = {};
    for (const file of mediaRes.rows) {
      if (!filesByDeal[file.deal_id]) filesByDeal[file.deal_id] = [];
      filesByDeal[file.deal_id].push(file);
    }

    // Build project list with ordering applied server-side
    const projects = assignments.map((a) => {
      const allFiles = filesByDeal[a.deal_id] || [];
      const hiddenSet = new Set<number>(a.hidden_image_ids || []);
      let visibleFiles = allFiles.filter((f) => !hiddenSet.has(f.id));

      // Apply saved image order
      const imageOrder: number[] = a.image_order || [];
      if (imageOrder.length > 0) {
        const orderMap = new Map(imageOrder.map((id, i) => [id, i]));
        visibleFiles = [...visibleFiles].sort((x, y) => {
          const xi = orderMap.has(x.id) ? orderMap.get(x.id)! : 999999;
          const yi = orderMap.has(y.id) ? orderMap.get(y.id)! : 999999;
          return xi - yi;
        });
      }

      // Put cover first
      const coverId: number | null = a.cover_image_id ?? null;
      if (coverId) {
        const coverIdx = visibleFiles.findIndex((f) => f.id === coverId);
        if (coverIdx > 0) {
          const [cover] = visibleFiles.splice(coverIdx, 1);
          visibleFiles = [cover, ...visibleFiles];
        }
      }

      return {
        deal_id: a.deal_id,
        deal_name: a.deal_name || "",
        builder: a.builder || "",
        city: a.city || "",
        state: a.state || "",
        pipeline: a.pipeline || "",
        youtube: a.youtube || "",
        images: visibleFiles,
      };
    });

    return NextResponse.json({ projects });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
