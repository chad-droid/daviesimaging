import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { RegionMap } from "@/components/RegionMap";
import { EditableTextContent } from "@/components/EditableTextContent";

export const metadata: Metadata = {
  alternates: { canonical: "/markets/region" },
  title: "Markets by Region",
  description: "You get the same quality in 28 U.S. markets across four regions, with offices in Sacramento, Dallas, and Guadalajara.",
};

export default function ByRegionPage() {
  return (
    <section className="min-h-screen bg-bg-surface py-24">
      <div className="mx-auto max-w-5xl px-6">
        <RevealOnScroll>
          <div>
            <Eyebrow>About / Our Markets</Eyebrow>
            <h1>
              The same quality in every market <strong>you build in</strong>.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-text-body">
              28 markets across four U.S. regions. Offices in Sacramento, Dallas, and Guadalajara. Same quality, same process, everywhere.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="mt-14">
            <RegionMap />
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="mt-14 rounded-lg border border-border-light bg-bg-light p-8 text-center">
            <EditableTextContent
              slotId="markets-region-partnerships"
              eyebrowDefault="Partnerships"
              headlineDefault="One partner in every market <strong>you build in</strong>."
              bodyDefault="You get volume pricing, dedicated capacity, and your brand guidelines followed from West to East. For builders doing 300 or more homes a year."
              headingLevel="h3"
            />
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
              <Link
                href="/contact?intent=strategy"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Book a Strategy Call
              </Link>
              <Link
                href="/programs/regional-partnerships"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
              >
                Explore Regional Partnerships <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
