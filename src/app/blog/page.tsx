import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { client } from "@/sanity/client";
import { postsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

export const metadata: Metadata = {
  title: "Blog | Davies Imaging Group",
  description:
    "Insights on homebuilder marketing, visual strategy, and asset performance from the DIG team.",
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

  return (
    <section className="min-h-screen bg-bg-surface py-24">
      <div className="mx-auto max-w-5xl px-6">
        <RevealOnScroll>
          <div className="mb-16 text-center">
            <Eyebrow>Blog</Eyebrow>
            <h1>
              Insights for builder marketing <strong>teams</strong>.
            </h1>
            <p className="mt-5 text-text-body">
              Strategy, trends, and case studies from the DIG team.
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
