import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { RegionMap } from "@/components/RegionMap";

export const metadata: Metadata = {
  title: "Markets by Region | Davies Imaging Group",
  description: "DIG operates across four U.S. timezone regions: West, Mountain, Central, and East. 24+ markets nationwide.",
};

export default function ByRegionPage() {
  return (
    <section className="min-h-screen bg-bg-surface py-24">
      <div className="mx-auto max-w-5xl px-6">
        <RevealOnScroll>
          <div className="text-center">
            <Eyebrow>By Region</Eyebrow>
            <h1>
              One standard across every <strong>market</strong>.
            </h1>
            <p className="mt-5 text-text-body">
              DIG covers all four U.S. timezone regions. Same quality, same
              process, 24+ markets nationwide.
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
            <Eyebrow>Partnerships</Eyebrow>
            <h3>One partner across every <strong>region</strong>.</h3>
            <p className="mt-3 text-text-body">
              Volume pricing, dedicated capacity, and brand consistency enforced from West to East. Built for builders doing 300+ homes annually.
            </p>
            <Link
              href="/offerings/regional-partnerships"
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
