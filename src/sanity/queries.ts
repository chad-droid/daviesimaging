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

// ─── Customer stories ────────────────────────────────────────────────────────
// Only approved stories ever leave Sanity, and held quotes are filtered out in
// the query so no page has to remember to do it.
const storyCard = `
  _id,
  name,
  "slug": slug.current,
  jobTitle,
  company,
  market,
  topics,
  headline,
  summary,
  headshot,
  companyLogo,
  coverImage,
  publishedAt,
  "youtubeId": video.youtubeId,
  "poster": video.poster
`;

export const customerStoriesQuery = groq`
  *[_type == "customerStory" && approved == true && defined(slug.current)] | order(publishedAt desc) {
    ${storyCard}
  }
`;

export const customerStoryBySlugQuery = groq`
  *[_type == "customerStory" && approved == true && slug.current == $slug][0] {
    ${storyCard},
    interviewDate,
    _updatedAt,
    video,
    interview[]{ question, answer, timestamp },
    "quotes": quotes[hold != true]{ "id": quoteId.current, quote, emphasis, topics }
  }
`;

export const customerStorySlugsQuery = groq`
  *[_type == "customerStory" && approved == true && defined(slug.current)][].slug.current
`;

// Flat list of pull quotes, each carrying its speaker. Filter in code by
// topic or market, or ask for specific ids with $ids.
export const customerQuotesQuery = groq`
  *[_type == "customerStory" && approved == true]{
    "quotes": quotes[hold != true && (!defined($ids) || quoteId.current in $ids)]{
      "id": quoteId.current,
      quote,
      emphasis,
      topics,
      "name": ^.name,
      "title": ^.jobTitle,
      "company": ^.company,
      "market": ^.market,
      "storySlug": ^.slug.current
    }
  }.quotes[]
`;
