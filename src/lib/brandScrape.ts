// Pull a builder's name and logo candidates from their website's HTML.
//
// No headless browser: we read the served HTML and rank the obvious places a
// logo lives (header <img> or inline <svg> with "logo" in it, apple-touch-icon,
// og:image, favicons). The admin picks the right one from the candidates, so
// the ranking only has to put a good option first, not be perfect.

export type LogoCandidate = {
  url: string; // absolute http(s) URL, or a data:image/svg+xml URL for inline SVGs
  source: "header-img" | "logo-img" | "inline-svg" | "apple-touch-icon" | "og-image" | "icon";
  score: number;
  reversed: boolean; // looks like a white/reversed logo, so it needs an ink tile
};

export type BrandScrape = {
  website: string;
  name: string | null;
  themeColor: string | null;
  candidates: LogoCandidate[];
};

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

export function normalizeWebsite(input: string): string {
  let s = input.trim();
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  const u = new URL(s);
  if (u.protocol !== "http:" && u.protocol !== "https:") throw new Error("Website must be http(s)");
  return u.origin + (u.pathname === "/" ? "" : u.pathname);
}

function attr(tag: string, name: string): string | null {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return m ? (m[2] ?? m[3] ?? m[4] ?? null) : null;
}

function decode(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&nbsp;/g, " ")
    .trim();
}

function abs(href: string | null, base: string): string | null {
  if (!href) return null;
  const h = decode(href);
  if (h.startsWith("data:")) return null;
  try {
    const u = new URL(h, base);
    return u.protocol === "http:" || u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
}

// Lazy-loaders put the real URL in data-src / srcset; prefer the largest srcset entry.
function imgSrc(tag: string): string | null {
  const srcset = attr(tag, "srcset") || attr(tag, "data-srcset");
  if (srcset) {
    const parts = srcset.split(",").map((p) => p.trim().split(/\s+/));
    parts.sort((a, b) => (parseFloat(b[1] ?? "0") || 0) - (parseFloat(a[1] ?? "0") || 0));
    if (parts[0]?.[0]) return parts[0][0];
  }
  return attr(tag, "data-src") || attr(tag, "data-lazy-src") || attr(tag, "src");
}

export async function scrapeBrand(websiteInput: string): Promise<BrandScrape> {
  const website = normalizeWebsite(websiteInput);
  const res = await fetch(website, {
    headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml" },
    redirect: "follow",
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`Site returned ${res.status}`);
  const html = (await res.text()).slice(0, 2_000_000);
  const base = res.url || website;

  // "dreeshomes.com" -> "drees": a logo whose URL names the brand is the strongest signal.
  const brandToken = new URL(base).hostname.replace(/^www\./, "").split(".")[0].replace(/homes?$|builders?$|communities$/, "");
  const found = new Map<string, LogoCandidate>();
  const add = (url: string | null, source: LogoCandidate["source"], score: number) => {
    if (!url) return;
    const lower = url.startsWith("data:") ? "" : url.toLowerCase();
    if (brandToken.length >= 3 && lower.includes(brandToken)) score += 25;
    if (/eho|equal[-_]?housing|tiktok|pinterest|facebook|instagram|youtube|linkedin|twitter|houzz|bbb|realtor|zillow/.test(lower)) score -= 70;
    const reversed = /white|reverse|knockout|negative|[-_]light[-_.]/.test(lower);
    const prev = found.get(url);
    if (!prev || prev.score < score) found.set(url, { url, source, score, reversed });
  };

  // Header region: everything up to the first </header>, else the first 25% of <body>.
  const bodyStart = html.search(/<body[\s>]/i);
  const headerEnd = html.search(/<\/header>/i);
  const header =
    headerEnd > 0 ? html.slice(Math.max(0, bodyStart), headerEnd) : html.slice(Math.max(0, bodyStart), Math.max(0, bodyStart) + Math.floor(html.length / 4));

  for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
    const src = imgSrc(tag);
    const hay = `${src ?? ""} ${attr(tag, "alt") ?? ""} ${attr(tag, "class") ?? ""} ${attr(tag, "id") ?? ""}`.toLowerCase();
    const isLogo = /logo|brand|wordmark/.test(hay);
    const inHeader = header.includes(tag);
    if (!isLogo && !inHeader) continue;
    let score = 0;
    if (isLogo) score += 50;
    if (inHeader) score += 30;
    if (/\.svg(\?|$)/i.test(src ?? "")) score += 10;
    if (/footer|partner|award|badge|icon-|social|facebook|instagram|twitter|linkedin|youtube|houzz|bbb/.test(hay)) score -= 60;
    add(abs(src, base), isLogo ? (inHeader ? "header-img" : "logo-img") : "header-img", score);
  }

  // Inline SVG logos (common on modern builder sites).
  for (const m of header.matchAll(/<svg\b[\s\S]*?<\/svg>/gi)) {
    const svg = m[0];
    const open = svg.slice(0, svg.indexOf(">") + 1).toLowerCase();
    const ctx = html.slice(Math.max(0, html.indexOf(svg) - 300), html.indexOf(svg)).toLowerCase();
    if (!/logo|brand/.test(open + ctx) || svg.length < 400 || svg.length > 120_000) continue;
    const withNs = svg.includes("xmlns=") ? svg : svg.replace(/<svg\b/i, '<svg xmlns="http://www.w3.org/2000/svg"');
    add(`data:image/svg+xml;base64,${Buffer.from(withNs).toString("base64")}`, "inline-svg", 70);
  }

  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    const rel = (attr(tag, "rel") ?? "").toLowerCase();
    const href = abs(attr(tag, "href"), base);
    if (rel.includes("apple-touch-icon")) add(href, "apple-touch-icon", 25);
    else if (rel.includes("icon")) add(href, "icon", /\.svg/i.test(href ?? "") ? 15 : 5);
  }

  let name: string | null = null;
  let themeColor: string | null = null;
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const key = (attr(tag, "property") ?? attr(tag, "name") ?? "").toLowerCase();
    const content = attr(tag, "content");
    if (!content) continue;
    if (key === "og:image" || key === "og:image:url") add(abs(content, base), "og-image", 20);
    if (key === "og:site_name" && !name) name = decode(content).replace(/[®™]/g, "").trim();
    if (key === "theme-color" && !themeColor) themeColor = decode(content);
  }
  if (!name) {
    const t = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
    if (t) name = decode(t).split(/\s*[|:–—®™]\s*|\s-\s/)[0].trim() || null;
  }

  const candidates = [...found.values()].sort((a, b) => b.score - a.score).slice(0, 12);
  return { website, name, themeColor, candidates };
}

// Fetch the chosen logo so we can re-host it (never hotlink a client's site).
export async function fetchLogo(url: string): Promise<{ body: Buffer; contentType: string; ext: string }> {
  if (url.startsWith("data:image/svg+xml;base64,")) {
    return {
      body: Buffer.from(url.slice("data:image/svg+xml;base64,".length), "base64"),
      contentType: "image/svg+xml",
      ext: "svg",
    };
  }
  const u = new URL(url);
  if (u.protocol !== "https:" && u.protocol !== "http:") throw new Error("Bad logo URL");
  const res = await fetch(u, { headers: { "User-Agent": UA }, redirect: "follow", signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`Logo fetch failed (${res.status})`);
  const contentType = (res.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
  const map: Record<string, string> = {
    "image/svg+xml": "svg",
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/x-icon": "ico",
    "image/vnd.microsoft.icon": "ico",
    "image/avif": "avif",
  };
  let ext = map[contentType];
  if (!ext) {
    const fromPath = u.pathname.split(".").pop()?.toLowerCase();
    if (fromPath && ["svg", "png", "jpg", "jpeg", "webp", "gif", "ico", "avif"].includes(fromPath)) ext = fromPath === "jpeg" ? "jpg" : fromPath;
  }
  if (!ext) throw new Error(`Not an image (${contentType || "unknown type"})`);
  const body = Buffer.from(await res.arrayBuffer());
  if (body.length > 5_000_000) throw new Error("Logo file is too large");
  return { body, contentType: contentType || `image/${ext}`, ext };
}
