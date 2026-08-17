import { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { postSitemapQuery } from "@/sanity/queries";
import { SITE_URL } from "@/lib/seo";

const BASE = SITE_URL;

// Regenerate the sitemap hourly so new Sanity blog posts get picked
// up by Google without a redeploy. Matches the blog ISR cadence.
export const revalidate = 3600;

interface SitemapPost {
  slug: string;
  publishedAt: string;
  _updatedAt: string;
}

async function getBlogPosts(): Promise<SitemapPost[]> {
  try {
    return await client.fetch<SitemapPost[]>(postSitemapQuery);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    // ── Homepage ──────────────────────────────────────────────────────────────
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },

    // ── Core ──────────────────────────────────────────────────────────────────
    { url: `${BASE}/contact`,     changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/get-started`, changeFrequency: "monthly", priority: 0.8 },

    // ── Gallery ───────────────────────────────────────────────────────────────
    { url: `${BASE}/gallery`,           changeFrequency: "weekly",  priority: 0.85 },
    { url: `${BASE}/gallery/models`,    changeFrequency: "weekly",  priority: 0.85 },
    { url: `${BASE}/gallery/listings`,  changeFrequency: "weekly",  priority: 0.85 },
    { url: `${BASE}/gallery/amenities`, changeFrequency: "weekly",  priority: 0.80 },
    { url: `${BASE}/gallery/lifestyle`, changeFrequency: "weekly",  priority: 0.80 },

    // ── Services ──────────────────────────────────────────────────────────────
    { url: `${BASE}/services`,                  changeFrequency: "monthly", priority: 0.80 },
    { url: `${BASE}/services/premium`,          changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/services/listing`,          changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/services/video-production`, changeFrequency: "monthly", priority: 0.80 },
    { url: `${BASE}/services/virtual-staging`,  changeFrequency: "monthly", priority: 0.80 },
    { url: `${BASE}/services/virtual-video`,    changeFrequency: "monthly", priority: 0.80 },
    { url: `${BASE}/services/matterport`,       changeFrequency: "monthly", priority: 0.70 },

    // ── Programs ──────────────────────────────────────────────────────────────
    // NOTE: /programs/frameflow-premium intentionally excluded — password-protected stealth pilot
    { url: `${BASE}/programs`,                       changeFrequency: "monthly", priority: 0.80 },
    { url: `${BASE}/programs/spec-plus`,             changeFrequency: "monthly", priority: 0.90 },
    { url: `${BASE}/programs/frameflow`,             changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/programs/digdesk`,               changeFrequency: "monthly", priority: 0.80 },
    { url: `${BASE}/programs/regional-partnerships`, changeFrequency: "monthly", priority: 0.75 },

    // ── Markets ───────────────────────────────────────────────────────────────
    { url: `${BASE}/markets`,                    changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/markets/region`,             changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/markets/type`,               changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/markets/role`,               changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/markets/role/coordinators`,  changeFrequency: "monthly", priority: 0.70 },
    { url: `${BASE}/markets/role/directors`,     changeFrequency: "monthly", priority: 0.70 },
    { url: `${BASE}/markets/role/executive`,     changeFrequency: "monthly", priority: 0.70 },
    { url: `${BASE}/markets/role/c-suite`,       changeFrequency: "monthly", priority: 0.70 },

    // ── About ─────────────────────────────────────────────────────────────────
    { url: `${BASE}/about`,              changeFrequency: "monthly", priority: 0.70 },
    { url: `${BASE}/about/how-we-do-it`, changeFrequency: "monthly", priority: 0.65 },

    // ── Blog index ────────────────────────────────────────────────────────────
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.70 },

    // ── Careers ───────────────────────────────────────────────────────────────
    { url: `${BASE}/careers`,                                        changeFrequency: "monthly", priority: 0.60 },
    { url: `${BASE}/careers/apply/listing-photographer`,             changeFrequency: "monthly", priority: 0.55 },
    { url: `${BASE}/careers/apply/cinematographer`,                  changeFrequency: "monthly", priority: 0.55 },

    // ── Support ───────────────────────────────────────────────────────────────
    { url: `${BASE}/faq`,       changeFrequency: "monthly", priority: 0.50 },
    { url: `${BASE}/legal`,     changeFrequency: "yearly",  priority: 0.30 },
    { url: `${BASE}/privacy`,   changeFrequency: "yearly",  priority: 0.30 },
    { url: `${BASE}/copyright`, changeFrequency: "yearly",  priority: 0.30 },
  ];

  // ── Blog posts (dynamic — fetched from Sanity at build time) ────────────────
  // lastModified comes from Sanity's _updatedAt so re-edited posts get
  // re-crawled; falls back to publishedAt for anything without one.
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt || post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.60,
  }));

  return [...staticRoutes, ...blogRoutes];
}
