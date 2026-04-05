import type { Metadata } from "next";
import Link from "next/link";
import { DynamicGallery } from "@/components/DynamicGallery";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { EditableHero } from "@/components/EditableHero";
import { DynamicImage } from "@/components/DynamicImage";

export const metadata: Metadata = {
  title: "Model Homes | Davies Imaging Group",
  description: "Full-service model home photography across markets nationwide. Lifestyle, staging, and architectural visuals built to sell.",
};

const otherWork = [
  { label: "Amenities", href: "/gallery/amenities" },
  { label: "Spec Homes", href: "/gallery/listings" },
  { label: "Lifestyle", href: "/gallery/lifestyle" },
];

export default function ModelHomesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>Gallery / Model Homes</Eyebrow>
            <EditableHero
              slotId="gallery-model-homes-hero"
              headlineDefault="Model home photography built to <strong>earn attention</strong>."
              subheadDefault="Lifestyle and architectural photography that tells the full story of every model home, from grand opening through lasting impression. Delivered as a complete, publish-ready asset package."
            />
          </RevealOnScroll>
          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-2xl bg-bg-light">
            <DynamicImage
              slotId="gallery-model-homes-hero-img"
              className="h-full w-full object-cover"
              fallbackClass="h-full w-full"
            />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <RevealOnScroll>
            <DynamicGallery
              pageSlug="/gallery/models"
              heading=""
              description=""
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* Context section */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
              <div className="pt-1">
                <Eyebrow>Premium Photography</Eyebrow>
                <h2 className="mt-3">
                  What goes into a <strong>model home shoot</strong>.
                </h2>
              </div>
              <div className="space-y-4 text-[1.0625rem] leading-relaxed text-text-body">
                <p>
                  Every model home shoot starts before the photographer arrives. Pre-shoot planning covers room-by-room angles, exterior timing, and lifestyle staging context so the day runs efficiently and nothing gets missed.
                </p>
                <p>
                  On-site, DIG captures architectural detail, interior spaces, twilight exteriors, and lifestyle moments. Post-production handles retouching, sky replacement, and color correction. The result is a complete asset package ready for your website, paid ads, email, and sales center, delivered within the agreed window.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-bg-dark py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow dark>Premium Photography</Eyebrow>
            <h2 className="text-text-light">
              Your model home deserves photography that <strong>earns attention</strong>.
            </h2>
            <p className="mt-5 text-text-muted">
              DIG Premium delivers full-service lifestyle and model home photography, from pre-shoot planning to final asset delivery. 28 markets, one standard.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/services/premium"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Explore Premium Photography
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                Book a strategy call &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
