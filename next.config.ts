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

      // ── Blog posts — slugs preserved, no redirect needed for most.
      // Any that 404 in Sanity will return 404 on new site as well (correct behavior).
    ];
  },
};

export default nextConfig;
