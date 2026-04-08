import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { RegionMap } from "@/components/RegionMap";
import { EditableTextContent } from "@/components/EditableTextContent";

export const metadata: Metadata = {
  title: "Markets by Region | Davies Imaging Group",
  description: "DIG operates across 28 U.S. markets in four regions, with offices in Sacramento, Dallas, and Guadalajara.",
};

export default function ByRegionPage() {
  return (
    <section className="min-h-screen bg-bg-surface py-24">
      <div className="mx-auto max-w-5xl px-6">
        <RevealOnScroll>
          <div>
            <Eyebrow>About / Our Markets</Eyebrow>
            <h1>
              One standard across every <strong>market</strong>.
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
              headlineDefault="One partner across every <strong>region</strong>."
              bodyDefault="Volume pricing, dedicated capacity, and brand consistency enforced from West to East. Built for builders doing 300+ homes annually."
              headingLevel="h3"
            />
            <Link
              href="/programs/regional-partnerships"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
            >
              Explore Regional Partnerships <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
