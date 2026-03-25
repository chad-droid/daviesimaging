import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { client } from "@/sanity/client";
import { postBySlugQuery, postSlugsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { portableTextComponents } from "@/components/PortableTextComponents";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: { asset: { _ref: string } };
  author?: string;
  category?: string;
  publishedAt: string;
  body?: PortableTextBlock[];
}

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(postSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post: Post | null = await client.fetch(postBySlugQuery, { slug });
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | DIG Blog`,
    description: post.excerpt || "",
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const post: Post | null = await client.fetch(postBySlugQuery, { slug });

  if (!post) notFound();

  return (
    <article className="min-h-screen bg-bg-surface py-24">
      <div className="mx-auto max-w-3xl px-6">
        <RevealOnScroll>
          <Link
            href="/blog"
            className="mb-8 inline-block text-sm font-semibold uppercase tracking-wider text-accent hover:text-accent-hover"
          >
            &larr; Back to Blog
          </Link>

          {post.category && (
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-accent-secondary">
              {post.category.replace("-", " ")}
            </p>
          )}

          <h1 className="mb-4">{post.title}</h1>

          <p className="mb-10 text-sm text-text-body/60">
            {formatDate(post.publishedAt)}
            {post.author ? ` · ${post.author}` : ""}
          </p>

          {post.coverImage?.asset && (
            <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-lg">
              <Image
                src={urlFor(post.coverImage).width(1200).height(675).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          {post.body && (
            <div className="prose-dig">
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            </div>
          )}
        </RevealOnScroll>
      </div>
    </article>
  );
}
