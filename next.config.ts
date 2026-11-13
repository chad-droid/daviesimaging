import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  async rewrites() {
    return [
      // ModelMatch showcase — static app served from public/modelmatch-demo, gated by middleware
      { source: "/modelmatch-demo", destination: "/modelmatch-demo/index.html" },
    ];
  },
  async redirects() {
    return [
      // Matterport no longer has its own page. It is part of Premium (model
      // homes) and Listing (inventory), so the old URL lands on Premium.
      { source: "/services/matterport", destination: "/services/premium", permanent: true },
      // "Who We Help" and its four role pages were removed (Nov 2026).
      { source: "/markets/role",        destination: "/about", permanent: true },
      { source: "/markets/role/:path*", destination: "/about", permanent: true },
      // Removed November 2026 at Chad's direction.
      { source: "/programs/regional-partnerships", destination: "/contact", permanent: true },
      { source: "/markets/type", destination: "/markets/region", permanent: true },
      { source: "/gallery", destination: "/gallery/models", permanent: true },
      { source: "/campaigns/modelmatch-trial-info", destination: "/modelmatch-datalibrary", permanent: true },
      { source: "/campaigns/frameflow-demo", destination: "/programs/digdesk", permanent: true },
      { source: "/campaigns/frameflow-sell-faster", destination: "/programs/digdesk", permanent: true },
      { source: "/welcome-back", destination: "/get-started", permanent: true },
      // FrameFlow Studio page removed 13 Nov 2026 at Chad's direction. Ordering is digDesk.
      { source: "/programs/frameflow", destination: "/programs/digdesk", permanent: true },
      // ── builderphoto.com → the Builder Photo Blog ───────────────────────────
      // The blog is branded "Builder Photo Blog" and lives at /blog on the main
      // site. builderphoto.com is a vanity domain that funnels straight to it.
      //
      // These rules are inert until the domain is added to the Vercel project
      // and its DNS points at Vercel. Host matching keeps them scoped, so they
      // can ship ahead of the DNS work.
      //
      // Domain hardcoded because next.config.ts cannot resolve the "@/" alias
      // used by SITE_URL in src/lib/seo.ts.
      {
        source: "/:path*",
        has: [{ type: "host", value: "builderphoto.com" }],
        destination: "https://www.daviesimaging.com/blog",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.builderphoto.com" }],
        destination: "https://www.daviesimaging.com/blog",
        permanent: true,
      },

      // ── Renamed/moved pages ─────────────────────────────────────────────────
      { source: "/contact-page",  destination: "/contact",              permanent: true },
      { source: "/about-us",      destination: "/about",                permanent: true },
      { source: "/style-guide",   destination: "/",                     permanent: true },
      { source: "/venveo-proposal", destination: "/contact",            permanent: true },
      { source: "/mi-dfw-analysis", destination: "/markets",            permanent: true },

      // ── Services moved to Programs ──────────────────────────────────────────
      { source: "/services/frameflow", destination: "/programs/digdesk",  permanent: true },
      { source: "/services/spec",      destination: "/programs/spec-plus",  permanent: true },
      { source: "/frameflow",          destination: "/programs/digdesk",  permanent: true },

      // ── Campaigns ──────────────────────────────────────────────────────────
      { source: "/frameflow-sell-faster-challenge-0210", destination: "/programs/digdesk", permanent: true },
      { source: "/beazer-frameflow",                     destination: "/campaigns/beazer-frameflow",      permanent: true },
      { source: "/frameflow-v2-0-demo",                  destination: "/programs/digdesk",        permanent: true },

      // ── Old "work" gallery paths → new "gallery" paths ─────────────────────
      { source: "/work",                   destination: "/gallery/models",           permanent: true },
      { source: "/work/model-homes",       destination: "/gallery/models",    permanent: true },
      { source: "/work/model-homes/:path*",destination: "/gallery/models",    permanent: true },
      { source: "/work/spec-homes",        destination: "/gallery/listings",  permanent: true },
      { source: "/work/spec-homes/:path*", destination: "/gallery/listings",  permanent: true },
      { source: "/work/amenities",         destination: "/gallery/amenities", permanent: true },
      { source: "/work/lifestyle",         destination: "/gallery/lifestyle", permanent: true },
      { source: "/gallery/model-homes",    destination: "/gallery/models",    permanent: true },
      { source: "/gallery/spec-homes",     destination: "/gallery/listings",  permanent: true },

      // ── Old "offerings" paths → new "programs" paths ────────────────────────
      { source: "/offerings",                          destination: "/programs",                          permanent: true },
      { source: "/offerings/frameflow",                destination: "/programs/digdesk",                permanent: true },
      { source: "/offerings/spec-plus",                destination: "/programs/spec-plus",                permanent: true },
      { source: "/offerings/regional-partnerships",    destination: "/contact",    permanent: true },
      { source: "/offerings/digdesk",                  destination: "/programs/digdesk",                  permanent: true },
      { source: "/offerings/frameflow-premium",        destination: "/programs/digdesk",                permanent: true },

      // ── Old service name aliases ─────────────────────────────────────────────
      { source: "/services/standard",      destination: "/services/listing",  permanent: true },
      { source: "/services/photography",   destination: "/services/premium",  permanent: true },
      { source: "/services/video",         destination: "/services/video-production", permanent: true },
      { source: "/services/staging",       destination: "/services/virtual-staging", permanent: true },

      // ── Old markets paths ────────────────────────────────────────────────────
      { source: "/markets/by-role",        destination: "/about",          permanent: true },
      { source: "/markets/by-region",      destination: "/markets/region", permanent: true },
      { source: "/markets/by-type",        destination: "/markets/region",   permanent: true },

      // ── Blog posts — slugs preserved, no redirect needed for most.
      // Any that 404 in Sanity will return 404 on new site as well (correct behavior).
    ];
  },
};

export default nextConfig;
