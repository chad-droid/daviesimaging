import { NextResponse } from "next/server";

/**
 * /khov-partnership-2027: the K. Hovnanian meeting presentation. Open link, no password
 * (Chad, 18 Nov 2026). Unlike the Toll page there is no gate, but the files still live in
 * Vercel Blob, not this public repo: scripts/upload-khov-2027.mjs uploads them and prints
 * KHOV_2027_BASE. This route serves index.html with a <base> tag so the presentation's
 * relative paths (photos, video, fonts, data.js) load from Blob and the address bar stays
 * clean. noindex; intentionally left out of the sitemap, nav and llms.txt.
 */
export const dynamic = "force-dynamic";

const headers = {
  "Content-Type": "text/html; charset=utf-8",
  "Cache-Control": "public, max-age=0, must-revalidate",
  "X-Robots-Tag": "noindex, nofollow",
  "Referrer-Policy": "no-referrer",
};

export async function GET() {
  const raw = process.env.KHOV_2027_BASE;
  if (!raw) return new NextResponse("<p>The presentation is not available right now.</p>", { status: 503, headers });
  const base = raw.endsWith("/") ? raw : raw + "/";

  const res = await fetch(base + "index.html", { cache: "no-store" });
  if (!res.ok) return new NextResponse("<p>The presentation is not available right now.</p>", { status: 502, headers });
  const page = (await res.text()).replace("<head>", `<head>\n<base href="${base}">`);
  return new NextResponse(page, { headers });
}
