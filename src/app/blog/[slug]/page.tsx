import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import Link from "next/link";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: `${title} | DIG Blog`,
    description: `Read "${title}" on the Davies Imaging Group blog.`,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <article className="min-h-screen bg-bg-surface py-24">
      <div className="mx-auto max-w-2xl px-6">
        <RevealOnScroll>
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent-secondary transition-colors hover:text-accent"
          >
            <span aria-hidden="true">&larr;</span> Back to Blog
          </Link>
          <Eyebrow>Blog</Eyebrow>
          <h1>{title}</h1>
          <p className="mt-6 text-text-body">
            This is a placeholder blog post template. Connect a CMS to populate
            real content for each slug.
          </p>
        </RevealOnScroll>
      </div>
    </article>
  );
}
