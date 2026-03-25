import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";

const regions = ["West", "Mountain", "Central", "East"];

export function PremiumGallery() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <div className="text-center">
            <h4>Premium Photography</h4>
            <h2 className="mt-3">Built for builders who demand the best.</h2>
            <p className="mt-4 text-zinc-600">
              DIG Premium delivers full-service lifestyle and model home
              photography across markets nationwide.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          {/* Gallery placeholder grid */}
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {regions.map((region) => (
              <div
                key={region}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-b from-zinc-300 to-zinc-400"
              >
                <div className="absolute inset-0 flex items-end p-6">
                  <span className="text-sm font-semibold uppercase tracking-widest text-white">
                    {region}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="mt-10 text-center">
            <Link
              href="/services/premium"
              className="cta-button inline-block rounded-full border border-zinc-900 px-6 py-3 text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white"
            >
              Explore the Gallery
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
