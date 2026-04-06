import type { Metadata } from "next";
import Link from "next/link";
import { DynamicGallery } from "@/components/DynamicGallery";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";
import { DarkSection } from "@/components/DarkSection";

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
      <DarkSection className="py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>Gallery / Model Homes</Eyebrow>
            <EditableHero
              slotId="gallery-model-homes-hero"
              headlineDefault="Model home photography built to <strong>earn attention</strong>."
              subheadDefault="Lifestyle and architectural photography that tells the full story of every model home, from grand opening through lasting impression. Delivered as a complete, publish-ready asset package."
            />
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* Gallery */}
      <section className="py-16">
        <DynamicGallery
          pageSlug="/gallery/models"
          heading=""
          description=""
        />
      </section>

      {/* Context section */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-3xl px-6">
          <RevealOnScroll>
            <EditableTextContent
              slotId="gallery-models-context"
              eyebrowDefault="Premium Photography"
              headlineDefault="What goes into a <strong>model home shoot</strong>."
              bodyDefault="Every model home shoot starts before the photographer arrives. Pre-shoot planning covers room-by-room angles, exterior timing, and lifestyle staging context so the day runs efficiently and nothing gets missed.<br><br>On-site, DIG captures architectural detail, interior spaces, twilight exteriors, and lifestyle moments. Post-production handles retouching, sky replacement, and color correction. The result is a complete asset package ready for your website, paid ads, email, and sales center, delivered within the agreed window."
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA section */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow dark>Premium Photography</Eyebrow>
            <EditableTextContent
              slotId="gallery-models-cta"
              headlineDefault="Your model home deserves photography that <strong>earns attention</strong>."
              bodyDefault="DIG Premium delivers full-service lifestyle and model home photography, from pre-shoot planning to final asset delivery. 28 markets, one standard."
              dark={true}
            />
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
      </DarkSection>
    </>
  );
}
