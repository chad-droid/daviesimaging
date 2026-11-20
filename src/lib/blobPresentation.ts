import { NextResponse } from "next/server";

/**
 * Serves an open (no password) meeting presentation whose files live in Vercel Blob,
 * not this public repo. `base` is the Blob prefix the upload script prints. index.html
 * gets a <base> tag so its relative paths (photos, fonts, data.js) load from Blob and
 * the address bar keeps the clean route. Used by /khov-partnership-2027 and
 * /modelmatchdemo2027. noindex; keep these out of the sitemap, nav and llms.txt.
 */
const headers = {
  "Content-Type": "text/html; charset=utf-8",
  "Cache-Control": "public, max-age=0, must-revalidate",
  "X-Robots-Tag": "noindex, nofollow",
  "Referrer-Policy": "no-referrer",
};

const unavailable = (status: number) =>
  new NextResponse("<p>The presentation is not available right now.</p>", { status, headers });

export async function servePresentation(raw: string | undefined) {
  if (!raw) return unavailable(503);
  const base = raw.endsWith("/") ? raw : raw + "/";
  const res = await fetch(base + "index.html", { cache: "no-store" });
  if (!res.ok) return unavailable(502);
  const page = (await res.text()).replace("<head>", `<head>\n<base href="${base}">`);
  return new NextResponse(page, { headers });
}
