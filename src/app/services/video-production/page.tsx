import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Video Production | Davies Imaging Group",
  description: "Professional video production for model homes, communities, and builder marketing campaigns.",
};

export default function VideoProductionPage() {
  return (
    <>
      <section className="flex min-h-screen items-center bg-zinc-900 py-28 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Video Production</Eyebrow>
            <h1>
              Video that moves buyers to <strong>action</strong>.
            </h1>
            <p className="lead-text mt-6 text-zinc-300" style={{ fontStyle: "italic" }}>
              Community tours, model home walkthroughs, and lifestyle video
              built for websites, social, and sales centers.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="min-h-[70vh] bg-white py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
          <RevealOnScroll>
            <div className="aspect-video rounded-lg bg-gradient-to-br from-zinc-200 to-zinc-300" />
          </RevealOnScroll>

          <RevealOnScroll>
            <Eyebrow>Multi-Channel</Eyebrow>
            <h2>
              One shoot, every <strong>platform</strong>.
            </h2>
            <p className="mt-5 text-zinc-600">
              DIG video production delivers assets formatted for website hero
              loops, social media cuts, email embeds, and sales center displays.
            </p>
            <Link
              href="/contact-page"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600"
            >
              Book a strategy call <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
