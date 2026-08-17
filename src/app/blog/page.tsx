import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { client } from "@/sanity/client";
import { postsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { SITE_URL, SITE_NAME, BLOG_NAME, ORG_ID, authorNode } from "@/lib/seo";

const DESCRIPTION =
  "The Builder Photo Blog: photography, virtual staging, and marketing strategy for homebuilder teams, from the DIG team.";

export const metadata: Metadata = {
  // absolute: the root layout's "%s | Davies Imaging Group" template would
  // otherwise append the brand a second time.
  title: { absolute: `${BLOG_NAME} | ${SITE_NAME}` },
  description: DESCRIPTION,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": `${SITE_URL}/blog/rss.xml` },
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    title: `${BLOG_NAME} | ${SITE_NAME}`,
    description: DESCRIPTION,
    siteName: SITE_NAME,
  },
};

// ISR — regenerate every 60s so new Sanity posts appear on the live
// site without a redeploy. Without this the Server Component caches
// the Sanity fetch indefinitely and Nicole's published drafts are
// invisible to visitors.
export const revalidate = 60;

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: { asset: { _ref: string } };
  author?: string;
  category?: string;
  publishedAt: string;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function categoryLabel(value: string) {
  const map: Record<string, string> = {
    strategy: "Strategy",
    "case-study": "Case Study",
    trends: "Trends",
    "product-updates": "Product Updates",
    "behind-the-scenes": "Behind the Scenes",
  };
  return map[value] || value;
}

export default async function BlogPage() {
  const posts: Post[] = await client.fetch(postsQuery);

  // Blog + blogPost list. Gives crawlers and AI retrievers the full post
  // inventory from one page, independent of the sitemap.
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    url: `${SITE_URL}/blog`,
    name: BLOG_NAME,
    description: DESCRIPTION,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": `${SITE_URL}/blog/${post.slug.current}#article`,
      url: `${SITE_URL}/blog/${post.slug.current}`,
      headline: post.title,
      ...(post.excerpt ? { description: post.excerpt } : {}),
      datePublished: post.publishedAt,
      author: authorNode(post.author),
    })),
  };

  return (
    <section className="min-h-screen bg-bg-surface py-24">
      <JsonLd data={blogSchema} />
      <div className="mx-auto max-w-5xl px-6">
        <RevealOnScroll>
          <div className="mb-16 text-center">
            <Eyebrow>Builder Photo Blog</Eyebrow>
            <h1>
              Insights for builder marketing <strong>teams</strong>.
            </h1>
            <p className="mt-5 text-text-body">
              Photography, strategy, and case studies for homebuilder marketing teams. Also reachable at builderphoto.com.
            </p>
          </div>
        </RevealOnScroll>

        {posts.length === 0 ? (
          <p className="text-center text-text-body">
            No posts yet. Check back soon.
          </p>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <RevealOnScroll key={post._id}>
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="group block overflow-hidden rounded-lg border border-border-light bg-bg-light transition-shadow hover:shadow-lg"
                >
                  {post.coverImage?.asset && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={urlFor(post.coverImage)
                          .width(600)
                          .height(375)
                          .url()}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {post.category && (
                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-accent">
                        {categoryLabel(post.category)}
                      </p>
                    )}
                    <h3 className="text-xl leading-snug text-text-dark group-hover:text-accent">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-2 line-clamp-3 text-sm text-text-body">
                        {post.excerpt}
                      </p>
                    )}
                    <p className="mt-4 text-xs text-text-body/60">
                      {formatDate(post.publishedAt)}
                      {post.author ? ` · ${post.author}` : ""}
                    </p>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
