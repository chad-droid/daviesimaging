import { groq } from "next-sanity";

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    author,
    category,
    publishedAt
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    author,
    category,
    publishedAt,
    _updatedAt,
    body
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

// Slug + timestamps for <lastmod> in sitemap.xml. _updatedAt is Sanity's
// built-in document mtime, so edits in Studio bump crawl priority without
// anyone having to touch a field.
export const postSitemapQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current,
    publishedAt,
    _updatedAt
  }
`;

// Feed payload for /blog/rss.xml.
export const postsFeedQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...50] {
    title,
    "slug": slug.current,
    excerpt,
    author,
    category,
    publishedAt,
    _updatedAt
  }
`;
