import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { RegionMap } from "@/components/RegionMap";

export const metadata: Metadata = {
  title: "Markets by Region | Davies Imaging Group",
  description: "DIG operates across four U.S. timezone regions: West, Mountain, Central, and East. 24+ markets nationwide.",
};

export default function ByRegionPage() {
  return (
    <section className="min-h-screen bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <RevealOnScroll>
          <div className="text-center">
            <Eyebrow>By Region</Eyebrow>
            <h1>
              One standard across every <strong>market</strong>.
            </h1>
            <p className="mt-5 text-zinc-600">
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
      </div>
    </section>
  );
}
