import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Blog | Davies Imaging Group",
  description: "Insights on homebuilder marketing, visual strategy, and asset performance from the DIG team.",
};

export default function BlogPage() {
  return (
    <section className="flex min-h-screen items-center bg-bg-surface py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll>
          <Eyebrow>Blog</Eyebrow>
          <h1>
            Insights for builder marketing <strong>teams</strong>.
          </h1>
          <p className="mt-5 text-zinc-600">
            Strategy, trends, and case studies from the DIG team. Content
            coming soon.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
