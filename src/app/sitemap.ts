import type { MetadataRoute } from "next";

const BASE = "https://daviesimaging.com";

/**
 * Next.js sitemap — auto-submitted to Google on deploy.
 * Update this file every time a new page is added or a slug changes.
 * Mirror every entry in CLAUDE.md under the Directory Structure section.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: Array<{ url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    // Core
    { url: "/",                                   priority: 1.0, changeFrequency: "weekly" },
    { url: "/about",                              priority: 0.9, changeFrequency: "monthly" },
    { url: "/about/how-we-do-it",                 priority: 0.7, changeFrequency: "monthly" },
    { url: "/contact",                            priority: 0.9, changeFrequency: "monthly" },
    { url: "/blog",                               priority: 0.8, changeFrequency: "weekly" },

    // Gallery
    { url: "/gallery/models",                     priority: 0.8, changeFrequency: "weekly" },
    { url: "/gallery/listings",                   priority: 0.8, changeFrequency: "weekly" },
    { url: "/gallery/amenities",                  priority: 0.7, changeFrequency: "monthly" },
    { url: "/gallery/lifestyle",                  priority: 0.7, changeFrequency: "monthly" },

    // Services (nav label: Solutions)
    { url: "/services/premium",                   priority: 0.8, changeFrequency: "monthly" },
    { url: "/services/listing",                   priority: 0.8, changeFrequency: "monthly" },
    { url: "/services/video-production",          priority: 0.7, changeFrequency: "monthly" },
    { url: "/services/virtual-staging",           priority: 0.7, changeFrequency: "monthly" },
    { url: "/services/virtual-video",             priority: 0.7, changeFrequency: "monthly" },
    { url: "/services/matterport",                priority: 0.6, changeFrequency: "monthly" },

    // Programs
    { url: "/programs/frameflow",                 priority: 0.8, changeFrequency: "monthly" },
    { url: "/programs/spec-plus",                 priority: 0.9, changeFrequency: "monthly" },
    { url: "/programs/digdesk",                   priority: 0.7, changeFrequency: "monthly" },
    { url: "/programs/regional-partnerships",     priority: 0.7, changeFrequency: "monthly" },

    // Markets
    { url: "/markets/region",                     priority: 0.6, changeFrequency: "monthly" },
    { url: "/markets/role",                       priority: 0.6, changeFrequency: "monthly" },
    { url: "/markets/role/coordinators",          priority: 0.6, changeFrequency: "monthly" },
    { url: "/markets/role/directors",             priority: 0.6, changeFrequency: "monthly" },
    { url: "/markets/role/executive",             priority: 0.6, changeFrequency: "monthly" },
    { url: "/markets/role/c-suite",               priority: 0.6, changeFrequency: "monthly" },
    { url: "/markets/type",                       priority: 0.5, changeFrequency: "monthly" },

    // Education / digDojo (pending build)
    // { url: "/education",                       priority: 0.7, changeFrequency: "weekly" },

    // Geo landing pages (pending build)
    // { url: "/lp/phoenix-az",                   priority: 0.7, changeFrequency: "monthly" },

    // Campaigns
    { url: "/campaigns/frameflow-sell-faster",    priority: 0.6, changeFrequency: "monthly" },
    { url: "/campaigns/beazer-frameflow",         priority: 0.5, changeFrequency: "monthly" },
  ];

  return pages.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
