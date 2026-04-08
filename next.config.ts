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
  async redirects() {
    return [
      // ── Renamed/moved pages ─────────────────────────────────────────────────
      { source: "/contact-page",  destination: "/contact",              permanent: true },
      { source: "/about-us",      destination: "/about",                permanent: true },
      { source: "/style-guide",   destination: "/",                     permanent: true },
      { source: "/venveo-proposal", destination: "/contact",            permanent: true },
      { source: "/mi-dfw-analysis", destination: "/markets",            permanent: true },

      // ── Services moved to Programs ──────────────────────────────────────────
      { source: "/services/frameflow", destination: "/programs/frameflow",  permanent: true },
      { source: "/services/spec",      destination: "/programs/spec-plus",  permanent: true },
      { source: "/frameflow",          destination: "/programs/frameflow",  permanent: true },

      // ── Campaigns ──────────────────────────────────────────────────────────
      { source: "/frameflow-sell-faster-challenge-0210", destination: "/campaigns/frameflow-sell-faster", permanent: true },
      { source: "/beazer-frameflow",                     destination: "/campaigns/beazer-frameflow",      permanent: true },
      { source: "/frameflow-v2-0-demo",                  destination: "/campaigns/frameflow-demo",        permanent: true },

      // ── Old "work" gallery paths → new "gallery" paths ─────────────────────
      { source: "/work",                   destination: "/gallery",           permanent: true },
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
      { source: "/offerings/frameflow",                destination: "/programs/frameflow",                permanent: true },
      { source: "/offerings/spec-plus",                destination: "/programs/spec-plus",                permanent: true },
      { source: "/offerings/regional-partnerships",    destination: "/programs/regional-partnerships",    permanent: true },
      { source: "/offerings/digdesk",                  destination: "/programs/digdesk",                  permanent: true },
      { source: "/offerings/frameflow-premium",        destination: "/programs/frameflow",                permanent: true },

      // ── Old service name aliases ─────────────────────────────────────────────
      { source: "/services/standard",      destination: "/services/listing",  permanent: true },
      { source: "/services/photography",   destination: "/services/premium",  permanent: true },
      { source: "/services/video",         destination: "/services/video-production", permanent: true },
      { source: "/services/staging",       destination: "/services/virtual-staging", permanent: true },

      // ── Old markets paths ────────────────────────────────────────────────────
      { source: "/markets/by-role",        destination: "/markets/role",   permanent: true },
      { source: "/markets/by-region",      destination: "/markets/region", permanent: true },
      { source: "/markets/by-type",        destination: "/markets/type",   permanent: true },

      // ── Blog posts — slugs preserved, no redirect needed for most.
      // Any that 404 in Sanity will return 404 on new site as well (correct behavior).
    ];
  },
};

export default nextConfig;
