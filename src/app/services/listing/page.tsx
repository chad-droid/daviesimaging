import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DynamicImage } from "@/components/DynamicImage";
import { EditableHero } from "@/components/EditableHero";

export const metadata: Metadata = {
  title: "Listing Photography | Davies Imaging Group",
  description: "Professional listing photography for spec homes and standing inventory. Fast turnaround, MLS-ready, consistent across communities.",
};

const deliverables = [
  "HDR-processed, color-corrected images",
  "MLS-ready resolution and file sizing",
  "Exterior, interior, and detail coverage",
  "Web-optimized and print-ready formats",
  "Delivered via digDesk within 48 hours",
];

export default function ListingPhotoPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[60vh] bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>Solutions / Listing Photography</Eyebrow>
            <EditableHero
              slotId="services-listing-hero"
              headlineDefault="Photography built for homes that need to <strong>move</strong>."
              subheadDefault="Fast turnaround, consistent quality, and assets ready to deploy across MLS, website, email, and paid channels. Built for spec homes and standing inventory."
            />
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/programs/spec-plus"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Bundle in Spec+
              </Link>
              <Link
                href="/gallery/listings"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                See listing work &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* What&apos;s included */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <Eyebrow>What You Get</Eyebrow>
                <h2>
                  Every listing, same <strong>standard</strong>.
                </h2>
                <p className="mt-4 text-text-body">
                  Whether it&apos;s the first home in a community or the fiftieth, DIG listing photography delivers brand-consistent visuals that perform across every channel.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-text-body">
                      <svg viewBox="0 0 16 16" className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M3 8l3 3.5 7-7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                  >
                    Book a shoot &rarr;
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-bg-light">
                <DynamicImage
                  slotId="services-listing-img"
                  className="h-full w-full object-cover"
                  fallbackClass="h-full w-full"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bg-surface to-border-light [&:has(img)]:hidden">
                  <span className="text-xs font-medium uppercase tracking-widest text-text-muted">Listing Photography</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Spec+ upsell */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="rounded-2xl border-2 border-accent bg-bg-surface p-8 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
                <div>
                  <div className="mb-3 inline-flex rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-accent">
                    Recommended
                  </div>
                  <Eyebrow>Spec+ Bundle</Eyebrow>
                  <h2 className="mt-3">
                    Add staging and video for <strong>one flat price</strong>.
                  </h2>
                  <p className="mt-4 text-text-body">
                    Spec+ combines listing photography, 8 ModelMatch-staged images, and a virtual video walkthrough into a single order. Everything your spec home needs to compete, delivered within 72 hours of the shoot.
                  </p>
                  <ul className="mt-5 space-y-2">
                    {[
                      "Listing photography included",
                      "8 virtually staged images (ModelMatch method)",
                      "Virtual video walkthrough",
                      "$600 flat. No hidden fees.",
                      "72-hour delivery after shoot day",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-text-body">
                        <svg viewBox="0 0 16 16" className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M3 8l3 3.5 7-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col items-start justify-center gap-3 lg:items-end">
                  <div className="text-right">
                    <p className="font-serif text-4xl font-semibold text-text-dark">$600</p>
                    <p className="text-xs text-text-muted">flat per listing</p>
                  </div>
                  <Link
                    href="/programs/spec-plus"
                    className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                  >
                    See Spec+ Details
                  </Link>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-bg-dark py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow dark>Book a Shoot</Eyebrow>
            <h2 className="text-text-light">
              Ready to get your listings <strong>photography-ready</strong>?
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Book a Listing Shoot
              </Link>
              <Link
                href="/programs/spec-plus"
                className="text-sm font-medium text-white/60 transition-colors hover:text-white"
              >
                Explore Spec+ bundle &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
