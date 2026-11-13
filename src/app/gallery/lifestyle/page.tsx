import type { Metadata } from "next";
import Link from "next/link";
import { DynamicGallery } from "@/components/DynamicGallery";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";
import { DarkSection } from "@/components/DarkSection";

export const metadata: Metadata = {
  alternates: { canonical: "/gallery/lifestyle" },
  title: "Lifestyle Photography and Video Gallery",
  description: "Lifestyle photography and video that show your buyers what life looks like in your community.",
};

const otherWork = [
  { label: "Model Homes", href: "/gallery/models" },
  { label: "Amenities", href: "/gallery/amenities" },
  { label: "Listings", href: "/gallery/listings" },
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
              headlineDefault="Show your buyers what life looks like in <strong>your community</strong>."
              subheadDefault="Lifestyle photography uses talent and styling to connect your buyers to your community before they ever visit."
            />
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* Gallery */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 pb-10 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">Coming Soon</p>
          <p className="mt-2 text-text-body">Lifestyle galleries are being curated and will be available shortly.</p>
        </div>
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
              bodyDefault="Lifestyle is a primary output of two DIG services: Premium Photography and Premium Video. Both appear in this gallery because both serve the same purpose: connecting buyers emotionally to a community before a physical visit ever happens.<br><br>Lifestyle shoots involve talent, styling, and real-moment direction. The goal is not staged perfection. It is authentic energy that communicates what it actually feels like to live in a home. That distinction is what makes lifestyle content outperform architecture-only photography in paid media and website conversion."
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
              headlineDefault="Lifestyle photography and <strong>Premium Video</strong>."
              bodyDefault="Both are delivered to your marketing team, ready for your website, paid media, email, and sales center."
              dark={true}
            />
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/services/video-production"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Explore Premium Video
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
