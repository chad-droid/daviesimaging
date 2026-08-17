import { client } from "@/sanity/client";
import { postsFeedQuery } from "@/sanity/queries";
import { SITE_URL, BLOG_NAME } from "@/lib/seo";

// RSS 2.0 feed for /blog. Static segment wins over the sibling [slug] route,
// so this handler owns /blog/rss.xml.
//
// Regenerated hourly to match the sitemap cadence.
export const revalidate = 3600;

interface FeedPost {
  title: string;
  slug: string;
  excerpt?: string;
  author?: string;
  category?: string;
  publishedAt: string;
  _updatedAt: string;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  let posts: FeedPost[] = [];
  try {
    posts = await client.fetch<FeedPost[]>(postsFeedQuery);
  } catch {
    // Sanity unreachable — serve an empty but valid feed rather than a 500.
    posts = [];
  }

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
${post.excerpt ? `      <description>${escapeXml(post.excerpt)}</description>\n` : ""}${post.author ? `      <dc:creator>${escapeXml(post.author)}</dc:creator>\n` : ""}${post.category ? `      <category>${escapeXml(post.category.replace("-", " "))}</category>\n` : ""}    </item>`;
    })
    .join("\n");

  const lastBuild = posts.length
    ? new Date(posts[0]._updatedAt || posts[0].publishedAt).toUTCString()
    : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(BLOG_NAME)}</title>
    <link>${SITE_URL}/blog</link>
    <description>The Builder Photo Blog: photography, virtual staging, and marketing strategy for homebuilder teams, from Davies Imaging Group.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
