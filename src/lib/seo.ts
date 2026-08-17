// Shared SEO constants and JSON-LD builders.
//
// The Organization node is emitted once in the root layout under a stable @id
// so every other schema on the site (BlogPosting.publisher, breadcrumbs) can
// reference it by @id instead of duplicating the whole object.

export const SITE_URL = "https://daviesimaging.com";
export const SITE_NAME = "Davies Imaging Group";

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
