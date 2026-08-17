import { client } from "@/sanity/client";
import { postsFeedQuery } from "@/sanity/queries";
import { SITE_URL } from "@/lib/seo";

// /llms.txt — an emerging convention (llmstxt.org) giving AI crawlers a
// curated, plain-markdown map of the site instead of making them infer
// structure from navigation. Kept in sync with the blog automatically.
export const revalidate = 3600;

interface FeedPost {
  title: string;
  slug: string;
  excerpt?: string;
}

const STATIC_SECTIONS = `## Services (how the work is produced)

- [Premium Photography](${SITE_URL}/services/premium): Full-setup photography for model homes and lifestyle shoots. DIG's signature service.
- [Listing Photography](${SITE_URL}/services/listing): HDR photography for spec homes and active inventory. Fast turnaround, MLS ready.
- [Video Production](${SITE_URL}/services/video-production): On-site, crew-based video. Community walkthroughs, lifestyle video, amenity showcases, brand films.
- [Virtual Staging](${SITE_URL}/services/virtual-staging): Reference-based virtual staging using approved model home images as design references, not generic room swaps.
- [Virtual Video](${SITE_URL}/services/virtual-video): Digital video built from existing photos or staging outputs. No shoot or crew required. This is also DIG's listing video solution.
- [Matterport](${SITE_URL}/services/matterport): 3D virtual tour scanning.

## Programs (how builders buy)

- [Spec+](${SITE_URL}/programs/spec-plus): All-in-one package combining listing photography, virtual staging, and virtual video for standing inventory.
- [FrameFlow](${SITE_URL}/programs/frameflow): The digital ordering platform for Spec+, standalone virtual staging, and virtual video.
- [digDesk](${SITE_URL}/programs/digdesk): The DIG client portal. Order services, track jobs, manage the ModelMatch brand library, download finished assets.
- [Regional Partnerships](${SITE_URL}/programs/regional-partnerships): Volume commitment program offering discounted rates and dedicated capacity in exchange for volume guarantees.

## Gallery (examples of the work)

- [Model Homes](${SITE_URL}/gallery/models)
- [Listings](${SITE_URL}/gallery/listings)
- [Amenities](${SITE_URL}/gallery/amenities)
- [Lifestyle](${SITE_URL}/gallery/lifestyle)

## Markets

- [By Region](${SITE_URL}/markets/region): DIG's market coverage across the West, Mountain, Central, and East regions.
- [By Builder Type](${SITE_URL}/markets/type): Detached, attached, luxury, build-to-rent, and multifamily.
- [By Role](${SITE_URL}/markets/role): Tailored positioning for coordinators, marketing directors, executives, and C-suite buyers.

## Company

- [About DIG](${SITE_URL}/about)
- [How We Do It](${SITE_URL}/about/how-we-do-it)
- [Careers](${SITE_URL}/careers)
- [Contact](${SITE_URL}/contact)
- [FAQ](${SITE_URL}/faq)
`;

export async function GET() {
  let posts: FeedPost[] = [];
  try {
    posts = await client.fetch<FeedPost[]>(postsFeedQuery);
  } catch {
    posts = [];
  }

  const blogSection = posts.length
    ? `\n## Blog\n\nInsights on homebuilder marketing, visual strategy, and asset performance.\n\n- [Blog index](${SITE_URL}/blog)\n${posts
        .map(
          (post) =>
            `- [${post.title}](${SITE_URL}/blog/${post.slug})${
              post.excerpt ? `: ${post.excerpt.replace(/\s+/g, " ").trim()}` : ""
            }`,
        )
        .join("\n")}\n`
    : `\n## Blog\n\n- [Blog index](${SITE_URL}/blog)\n`;

  const body = `# Davies Imaging Group (DIG)

> Davies Imaging Group builds photography, virtual staging, and video assets for homebuilder marketing teams across 28 U.S. markets. DIG works with national and regional homebuilders, build-to-rent operators, and multifamily developers, producing marketing assets designed for website conversion, paid media, sales center storytelling, and listing velocity.

DIG is a production and strategy partner, not a general-purpose photography studio. Every engagement is built around builder marketing workflows: launch timelines, spec inventory pressure, brand consistency across communities, and sales team alignment.

${STATIC_SECTIONS}${blogSection}
## Contact

Email: info@daviesimaging.com
Website: ${SITE_URL}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
