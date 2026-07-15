// /api/event-gallery
//   GET    ?gallery=slug         -> list images for a gallery (public)
//   POST   {gallery,blobUrl,...}  -> finalize a client-uploaded blob (admin)
//   DELETE {id}                   -> remove an image + its blobs (admin)
//   PATCH  {orderedIds}           -> persist a new sort order (admin)
//
// Write routes require the admin password in the body (`adminKey`) checked
// server-side against ADMIN_PASSWORD, because the /admin UI gate is client-only.

import { NextRequest, NextResponse } from "next/server";
import { put, del } from "@vercel/blob";
import { sql } from "@vercel/postgres";
import sharp from "sharp";
import { isGallerySlug } from "@/app/shoresummitphotos2026/galleries";

export const maxDuration = 60;

// Optimized sizes: grid thumbnail, 1600px lightbox display, 2400px download.
const THUMB_W = 600;
const DISPLAY_W = 1600;
const DOWNLOAD_W = 2400;

function checkAdmin(key: unknown): NextResponse | null {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected) return NextResponse.json({ error: "Admin auth not configured" }, { status: 503 });
  if (typeof key !== "string" || key !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

// ── GET: list a gallery's images (public) ────────────────────────
export async function GET(req: NextRequest) {
  const gallery = req.nextUrl.searchParams.get("gallery") || "";
  if (!isGallerySlug(gallery)) {
    return NextResponse.json({ error: "Unknown gallery" }, { status: 400 });
  }
  try {
    const { rows } = await sql`
      SELECT id, thumb_url, display_url, download_url, filename, width, height
      FROM event_gallery_images
      WHERE gallery_slug = ${gallery}
      ORDER BY sort_order ASC, id ASC
    `;
    return NextResponse.json({ images: rows });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// ── POST: finalize a client-uploaded blob into optimized sizes (admin) ──
export async function POST(req: NextRequest) {
  try {
    const { gallery, blobUrl, filename, adminKey } = (await req.json()) as {
      gallery: string;
      blobUrl: string;
      filename: string;
      adminKey: string;
    };
    const denied = checkAdmin(adminKey);
    if (denied) return denied;
    if (!isGallerySlug(gallery)) return NextResponse.json({ error: "Unknown gallery" }, { status: 400 });
    if (!blobUrl || !filename) return NextResponse.json({ error: "blobUrl and filename required" }, { status: 400 });

    const raw = await fetch(blobUrl);
    if (!raw.ok) return NextResponse.json({ error: `Fetch raw failed: ${raw.status}` }, { status: 500 });
    const buffer = Buffer.from(await raw.arrayBuffer());

    const [thumb, display, download] = await Promise.all([
      sharp(buffer).rotate().resize(THUMB_W, undefined, { withoutEnlargement: true, fit: "inside" }).webp({ quality: 78 }).toBuffer(),
      sharp(buffer).rotate().resize(DISPLAY_W, undefined, { withoutEnlargement: true, fit: "inside" }).webp({ quality: 82 }).toBuffer(),
      sharp(buffer).rotate().resize(DOWNLOAD_W, undefined, { withoutEnlargement: true, fit: "inside" }).webp({ quality: 86 }).toBuffer(),
    ]);
    const meta = await sharp(display).metadata();

    const base = filename.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9-_]/g, "-").toLowerCase().slice(0, 60) || "photo";
    const folder = `shore-gallery/${gallery}`;
    const [thumbBlob, displayBlob, downloadBlob] = await Promise.all([
      put(`${folder}/thumb/${base}.webp`, thumb, { access: "public", contentType: "image/webp", addRandomSuffix: true }),
      put(`${folder}/display/${base}.webp`, display, { access: "public", contentType: "image/webp", addRandomSuffix: true }),
      put(`${folder}/download/${base}.webp`, download, { access: "public", contentType: "image/webp", addRandomSuffix: true }),
    ]);

    // Clean up the raw temp upload so no full-res file lingers on the site.
    try { await del(blobUrl); } catch { /* non-fatal */ }

    const { rows: maxRows } = await sql`
      SELECT COALESCE(MAX(sort_order), 0) AS m FROM event_gallery_images WHERE gallery_slug = ${gallery}
    `;
    const nextOrder = Number(maxRows[0]?.m ?? 0) + 1;

    const { rows } = await sql`
      INSERT INTO event_gallery_images (gallery_slug, thumb_url, display_url, download_url, filename, width, height, sort_order)
      VALUES (${gallery}, ${thumbBlob.url}, ${displayBlob.url}, ${downloadBlob.url}, ${filename}, ${meta.width || 0}, ${meta.height || 0}, ${nextOrder})
      RETURNING id, thumb_url, display_url, download_url, filename, width, height
    `;
    return NextResponse.json({ success: true, image: rows[0] });
  } catch (e) {
    return NextResponse.json({ error: `Processing failed: ${e}` }, { status: 500 });
  }
}

// ── DELETE: remove one image and its blobs (admin) ───────────────
export async function DELETE(req: NextRequest) {
  try {
    const { id, adminKey } = (await req.json()) as { id: number; adminKey: string };
    const denied = checkAdmin(adminKey);
    if (denied) return denied;
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const { rows } = await sql`SELECT thumb_url, display_url, download_url FROM event_gallery_images WHERE id = ${id}`;
    if (rows.length) {
      const r = rows[0];
      await Promise.all(
        [r.thumb_url, r.display_url, r.download_url].filter(Boolean).map((u: string) => del(u).catch(() => {})),
      );
    }
    await sql`DELETE FROM event_gallery_images WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// ── PATCH: persist a new sort order (admin) ──────────────────────
export async function PATCH(req: NextRequest) {
  try {
    const { orderedIds, adminKey } = (await req.json()) as { orderedIds: number[]; adminKey: string };
    const denied = checkAdmin(adminKey);
    if (denied) return denied;
    if (!Array.isArray(orderedIds)) return NextResponse.json({ error: "orderedIds required" }, { status: 400 });

    await Promise.all(
      orderedIds.map((id, i) => sql`UPDATE event_gallery_images SET sort_order = ${i + 1} WHERE id = ${id}`),
    );
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
