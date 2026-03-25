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
      <section className="flex min-h-screen items-center bg-bg-dark py-28 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Listing Photo</Eyebrow>
            <h1>
              Listing photography built for <strong>velocity</strong>.
            </h1>
            <p className="lead-text mt-6 text-zinc-300" style={{ fontStyle: "italic" }}>
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
            <p className="mt-5 text-zinc-600">
              Whether it&rsquo;s the first home in a community or the fiftieth,
              DIG listing photography delivers brand-consistent visuals that
              perform across every channel.
            </p>
            <Link
              href="/work/spec-homes"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 transition-colors hover:text-accent"
            >
              See listing work <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-bg-light to-border-light" />
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
