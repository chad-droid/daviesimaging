import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

const regions = ["West", "Mountain", "Central", "East"];

export function PremiumGallery() {
  return (
    <section className="min-h-[80vh] bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Minimal text — image-dominant section */}
        <RevealOnScroll>
          <div className="text-center">
            <Eyebrow>Premium Photography</Eyebrow>
            <h2>
              Built for builders who demand the <strong>best</strong>.
            </h2>
          </div>
        </RevealOnScroll>

        {/* Image-dominant gallery grid */}
        <RevealOnScroll stagger={100}>
          {regions.map((region) => (
            <div
              key={region}
              className="mt-4 first:mt-8"
            >
              <div className="group relative aspect-[16/7] overflow-hidden rounded-xl bg-gradient-to-b from-zinc-300 to-zinc-400">
                <div className="absolute inset-0 flex items-end p-8">
                  <span className="text-lg font-semibold uppercase tracking-widest text-white">
                    {region}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="mt-10 text-center">
            <Link
              href="/services/premium"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600"
            >
              Explore Premium <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
