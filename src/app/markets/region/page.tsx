import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Markets by Region | Davies Imaging Group",
  description: "DIG operates across four major U.S. regions: West, Mountain, Central, and East.",
};

const regions = [
  {
    name: "West",
    description: "California, Oregon, Washington, Hawaii",
  },
  {
    name: "Mountain",
    description: "Colorado, Arizona, Utah, Nevada, Idaho, Montana, New Mexico",
  },
  {
    name: "Central",
    description: "Texas, Oklahoma, Kansas, Missouri, Illinois, Minnesota, Wisconsin",
  },
  {
    name: "East",
    description: "Florida, Georgia, Carolinas, Virginia, Maryland, Northeast",
  },
];

export default function ByRegionPage() {
  return (
    <section className="min-h-screen bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <div className="text-center">
            <Eyebrow>By Region</Eyebrow>
            <h1>
              One standard across every <strong>market</strong>.
            </h1>
            <p className="mt-5 text-zinc-600">
              DIG covers four major U.S. regions. Same quality, same process,
              same brand consistency.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll stagger={120}>
          {regions.map((region) => (
            <Link
              key={region.name}
              href={`/work?region=${region.name}`}
              className="mt-4 block first:mt-14"
            >
              <div className="group relative aspect-[16/7] overflow-hidden rounded-lg bg-gradient-to-b from-zinc-300 to-zinc-400 transition-transform hover:scale-[1.01]">
                <div className="absolute inset-0 flex flex-col items-start justify-end p-8">
                  <span className="text-lg font-semibold uppercase tracking-widest text-white">
                    {region.name}
                  </span>
                  <span className="mt-1 text-sm text-white/70">
                    {region.description}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
