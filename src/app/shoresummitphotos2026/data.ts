import "server-only";
import { sql } from "@vercel/postgres";
import type { EventImage } from "./galleries";

// Server-only reads for the event galleries. Every query is wrapped so the page
// still renders (empty) when the table doesn't exist yet or the DB is unreachable
// (e.g. local dev without POSTGRES_URL).

export async function getGalleryImages(slug: string): Promise<EventImage[]> {
  try {
    const { rows } = await sql`
      SELECT id, thumb_url, display_url, download_url, filename, width, height
      FROM event_gallery_images
      WHERE gallery_slug = ${slug}
      ORDER BY sort_order ASC, id ASC
    `;
    return rows as EventImage[];
  } catch {
    return [];
  }
}

// First image of a gallery (by sort order) — used for the social share image.
export async function getFirstImage(slug: string): Promise<EventImage | null> {
  try {
    const { rows } = await sql`
      SELECT id, thumb_url, display_url, download_url, filename, width, height
      FROM event_gallery_images
      WHERE gallery_slug = ${slug}
      ORDER BY sort_order ASC, id ASC
      LIMIT 1
    `;
    return (rows[0] as EventImage) ?? null;
  } catch {
    return null;
  }
}

export type GalleryCover = { thumb_url: string; count: number };

export async function getCovers(): Promise<Record<string, GalleryCover>> {
  try {
    const { rows } = await sql`
      SELECT gallery_slug, thumb_url, count FROM (
        SELECT
          gallery_slug,
          thumb_url,
          COUNT(*) OVER (PARTITION BY gallery_slug) AS count,
          ROW_NUMBER() OVER (PARTITION BY gallery_slug ORDER BY sort_order ASC, id ASC) AS rn
        FROM event_gallery_images
      ) t
      WHERE rn = 1
    `;
    const map: Record<string, GalleryCover> = {};
    for (const r of rows) map[r.gallery_slug as string] = { thumb_url: r.thumb_url as string, count: Number(r.count) };
    return map;
  } catch {
    return {};
  }
}
