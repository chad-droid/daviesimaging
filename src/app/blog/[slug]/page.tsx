import { cache } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { JsonLd } from "@/components/JsonLd";
import { client } from "@/sanity/client";
import { postBySlugQuery, postSlugsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { portableTextComponents } from "@/components/PortableTextComponents";
import { SITE_URL, SITE_NAME, ORG_ID, authorNode } from "@/lib/seo";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: { asset: { _ref: string } };
  author?: string;
  category?: string;
  publishedAt: string;
  _updatedAt?: string;
  body?: PortableTextBlock[];
}

type Params = Promise<{ slug: string }>;

// ISR — post pages regenerate every 60s so edits in Sanity Studio
// show up on the live site without redeploying.
export const revalidate = 60;

// Allow new slugs published to Sanity after deploy to render on-demand
// (otherwise Next.js 404s any slug not present at build time).
export const dynamicParams = true;

// generateMetadata and the page component both need the post. cache() dedupes
// them into a single Sanity request per render.
const getPost = cache(
  async (slug: string): Promise<Post | null> =>
    client.fetch(postBySlugQuery, { slug }),
);

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(postSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

// Flattens Portable Text to plain prose. Used for the meta description
// fallback and for JSON-LD wordCount.
function toPlainText(blocks: PortableTextBlock[] = []): string {
  return blocks
    .filter((block) => block._type === "block" && Array.isArray(block.children))
    .map((block) =>
      (block.children as { text?: string }[])
        .map((child) => child.text ?? "")
        .join(""),
    )
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text: string, max = 155): string {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max))}...`;
}

function coverImageUrl(post: Post): string | null {
  if (!post.coverImage?.asset) return null;
  return urlFor(post.coverImage).width(1200).height(630).fit("crop").url();
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: { absolute: "Post Not Found" } };

  const description =
    post.excerpt?.trim() || truncate(toPlainText(post.body));
  const image = coverImageUrl(post);
  const url = `${SITE_URL}/blog/${slug}`;

  return {
    // absolute: the root layout's "%s | Davies Imaging Group" template would
    // otherwise append the brand a second time.
    title: { absolute: `${post.title} | ${SITE_NAME}` },
    description,
    alternates: { canonical: `/blog/${slug}` },
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description,
      siteName: SITE_NAME,
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt || post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      section: post.category?.replace("-", " "),
      images: image
        ? [{ url: image, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: image ? [image] : undefined,
    },
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
  const post = await getPost(slug);

  if (!post) notFound();

  const url = `${SITE_URL}/blog/${slug}`;
  const plainBody = toPlainText(post.body);
  const description = post.excerpt?.trim() || truncate(plainBody);
  const image = coverImageUrl(post);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: post.title,
    description,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    author: authorNode(post.author),
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
    ...(post.category
      ? { articleSection: post.category.replace("-", " ") }
      : {}),
    ...(plainBody ? { wordCount: plainBody.split(" ").length } : {}),
    ...(image
      ? {
          image: {
            "@type": "ImageObject",
            url: image,
            width: 1200,
            height: 630,
          },
        }
      : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <article className="min-h-screen bg-bg-surface py-24">
      <JsonLd data={blogPostingSchema} />
      <JsonLd data={breadcrumbSchema} />
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
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
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
