// Shared SEO constants and JSON-LD builders.
//
// The Organization node is emitted once in the root layout under a stable @id
// so every other schema on the site (BlogPosting.publisher, breadcrumbs) can
// reference it by @id instead of duplicating the whole object.

// Canonical host is www. The apex (daviesimaging.com) 307-redirects to it at
// the Vercel domain layer, so canonicals, JSON-LD @ids, and sitemap entries
// must use www or they all point at a redirect.
export const SITE_URL = "https://www.daviesimaging.com";
export const SITE_NAME = "Davies Imaging Group";

// Public-facing name of the blog. It lives at /blog on the main site and is
// also the destination for the builderphoto.com domain redirect. Use this
// constant for every user-visible reference so the two cannot drift.
export const BLOG_NAME = "Builder Photo Blog";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const LOGO_URL = `${SITE_URL}/dig-logo-dark.png`;

export const SOCIAL_PROFILES = [
  "https://www.linkedin.com/company/daviesimaging/",
  "https://www.instagram.com/daviesimaging/",
  "https://www.youtube.com/@daviesimaging",
  "https://www.facebook.com/daviesimaging",
];

// Names that represent the company rather than an individual byline. Posts
// authored under one of these are attributed to the Organization in JSON-LD;
// anything else is treated as a named Person (better E-E-A-T signal).
const ORG_AUTHOR_NAMES = ["dig team", "dig", "davies imaging group"];

export function authorNode(author?: string) {
  if (!author || ORG_AUTHOR_NAMES.includes(author.trim().toLowerCase())) {
    return { "@id": ORG_ID };
  }
  return { "@type": "Person", name: author };
}

/**
 * FAQPage schema. The answers must also be present in the rendered HTML —
 * schema describing content a user cannot see is a structured-data violation.
 */
export function buildFaqSchema(items: { q: string; a: string }[], pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/**
 * BreadcrumbList for a nested page. Pass the trail without the home crumb,
 * which is prepended automatically.
 * e.g. buildBreadcrumbSchema([{ name: "Solutions", path: "/services" },
 *                             { name: "Premium Photography", path: "/services/premium" }])
 */
export function buildBreadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...trail.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: crumb.name,
        item: `${SITE_URL}${crumb.path}`,
      })),
    ],
  };
}

/**
 * Service schema for the seven service pages. `priceFrom` is omitted until a
 * published starting price exists — never emit a price the page does not show.
 */
export function buildServiceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${opts.path}#service`,
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    url: `${SITE_URL}${opts.path}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "United States" },
    audience: {
      "@type": "BusinessAudience",
      name: "Homebuilders and residential developers",
    },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE_NAME,
      alternateName: "DIG",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
      description:
        "Davies Imaging Group builds photography, virtual staging, and video assets for homebuilder marketing teams across 28 U.S. markets.",
      email: "info@daviesimaging.com",
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      sameAs: SOCIAL_PROFILES,
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": ORG_ID },
      inLanguage: "en-US",
    },
  ],
};
