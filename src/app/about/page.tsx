import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "About Us | Davies Imaging Group",
  description:
    "Davies Imaging Group was built inside the homebuilding industry. We think like marketers, sales leaders, and partners.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="flex min-h-screen items-center bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>About DIG</Eyebrow>
            <h1 className="text-text-light">
              We don&rsquo;t just capture homes. We help builders{" "}
              <strong>win</strong>.
            </h1>
            <p className="lead-text mt-6 text-text-muted" style={{ fontStyle: "italic" }}>
              Davies Imaging Group was built inside the homebuilding industry,
              not outside of it.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Origin Story */}
      <section className="flex min-h-[70vh] items-center bg-bg-surface py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Origin</Eyebrow>
            <h2>
              Founded on a clear <strong>conviction</strong>.
            </h2>
            <p className="mt-5 text-text-body">
              Chad Davies started DIG because homebuilder marketing deserves
              better storytelling, better strategy, and better alignment between
              creative and conversion.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* We Understand */}
      <section className="flex min-h-[70vh] items-center bg-bg-light py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Perspective</Eyebrow>
            <h2>
              We think like <strong>marketers</strong>.
            </h2>
            <p className="mt-5 text-text-body">
              Launch timelines, spec pressure, marketing budgets, sales
              alignment, community rollouts. We&rsquo;ve worked alongside some
              of the most respected builders in the country, and what sets DIG
              apart isn&rsquo;t production quality. It&rsquo;s perspective.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Experience the Difference */}
      <section className="min-h-[70vh] bg-bg-surface py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
          <RevealOnScroll>
            <Eyebrow>Five-Step Strategy</Eyebrow>
            <h2>
              From alignment to <strong>delivery</strong>.
            </h2>
            <p className="mt-5 text-text-body">
              Our proven five-step asset strategy reduces the time it takes to
              plan, produce, and deploy marketing visuals that actually perform.
              Every step supports your marketing team and sales goals.
            </p>
            <Link
              href="/offerings/frameflow"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
            >
              Discover FrameFlow <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-bg-light to-border-light" />
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="flex min-h-[60vh] items-center bg-bg-dark py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2>
              Let&rsquo;s build assets that move <strong>homes</strong>.
            </h2>
            <p className="mt-5 text-accent-secondary">
              If you&rsquo;re looking for a partner who understands how builder
              marketing actually works, let&rsquo;s talk.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-text-light transition-colors hover:text-accent-dark-hover"
              >
                Book a Strategy Call <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/offerings/frameflow"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-text-light transition-colors hover:text-accent-dark-hover"
              >
                Explore FrameFlow <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
