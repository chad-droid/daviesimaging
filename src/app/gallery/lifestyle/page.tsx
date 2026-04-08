import type { Metadata } from "next";
import Link from "next/link";
import { DynamicGallery } from "@/components/DynamicGallery";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";
import { DarkSection } from "@/components/DarkSection";

export const metadata: Metadata = {
  title: "Lifestyle | Davies Imaging Group",
  description: "Lifestyle photography that captures how buyers actually live in a home. Talent, styling, and storytelling built for builder marketing.",
};

const otherWork = [
  { label: "Model Homes", href: "/gallery/models" },
  { label: "Amenities", href: "/gallery/amenities" },
  { label: "Spec Homes", href: "/gallery/listings" },
];

export default function LifestylePage() {
  return (
    <>
      {/* Hero */}
      <DarkSection className="py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <EditableHero
              slotId="gallery-lifestyle-hero"
              eyebrowDefault="Gallery / Lifestyle"
              headlineDefault="Buyers buy feelings. <strong>Give them something to feel</strong>."
              subheadDefault="Lifestyle photography brings homes to life. Real moments, real emotion, built for builder marketing teams that want buyers to feel something before the first visit."
            />
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* Gallery */}
      <section className="py-16">
        <DynamicGallery
          pageSlug="/gallery/lifestyle"
          heading=""
          description=""
        />
      </section>

      {/* Context section */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-3xl px-6">
          <RevealOnScroll>
            <EditableTextContent
              slotId="gallery-lifestyle-context"
              eyebrowDefault="Photo + Video"
              headlineDefault="Lifestyle covers both <strong>photo and video</strong>."
              bodyDefault="Lifestyle is a primary output of two DIG services: Premium photography and Video Production. Both appear in this gallery because both serve the same purpose: connecting buyers emotionally to a community before a physical visit ever happens.<br><br>Lifestyle shoots involve talent, styling, and real-moment direction. The goal is not staged perfection. It is authentic energy that communicates what it actually feels like to live in a home. That distinction is what makes lifestyle content outperform architecture-only photography in paid media and website conversion."
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA section */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <EditableTextContent
              slotId="gallery-lifestyle-cta"
              eyebrowDefault="Lifestyle and Video"
              headlineDefault="DIG Premium includes lifestyle photography. DIG Video Production captures the full community <strong>story on film</strong>."
              bodyDefault="Both are delivered to your marketing team, ready to deploy across website, paid media, email, and sales center."
              dark={true}
            />
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/services/video-production"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Explore Video Production
              </Link>
              <Link
                href="/services/premium"
                className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-text-muted transition-colors hover:border-accent hover:text-accent"
              >
                Explore Premium Photo
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
