import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Listing Photo | Davies Imaging Group",
  description: "Professional listing photography built for speed and consistency across communities.",
};

export default function ListingPhotoPage() {
  return (
    <>
      <section className="flex min-h-screen items-center bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Listing Photo</Eyebrow>
            <h1 className="text-text-light">
              Listing photography built for <strong>velocity</strong>.
            </h1>
            <p className="lead-text mt-6 text-text-muted" style={{ fontStyle: "italic" }}>
              Fast turnaround, consistent quality, and assets ready to deploy
              across MLS, website, and paid channels.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="min-h-[70vh] bg-bg-surface py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
          <RevealOnScroll>
            <Eyebrow>Consistency</Eyebrow>
            <h2>
              Every listing, same <strong>standard</strong>.
            </h2>
            <p className="mt-5 text-text-body">
              Whether it&rsquo;s the first home in a community or the fiftieth,
              DIG listing photography delivers brand-consistent visuals that
              perform across every channel.
            </p>
            <Link
              href="/work/spec-homes"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
            >
              See listing work <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-bg-light to-border-light" />
          </RevealOnScroll>
        </div>
      </section>

      <section className="flex min-h-[60vh] items-center bg-bg-dark py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Spec+</Eyebrow>
            <h2 className="text-text-light">
              Bundle listing photo with staging and video in one{" "}
              <strong>order</strong>.
            </h2>
            <p className="mt-5 text-text-muted">
              Spec+ combines listing photography, virtual staging, and virtual
              video into a single FrameFlow order. The fastest way to get a
              complete asset set for homes that need to move.
            </p>
            <Link
              href="/offerings/spec-plus"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-light transition-colors hover:text-accent-dark-hover"
            >
              Learn about Spec+ <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
