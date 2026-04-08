import type { Metadata } from "next";
import Link from "next/link";
import { DynamicGallery } from "@/components/DynamicGallery";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";
import { DarkSection } from "@/components/DarkSection";

export const metadata: Metadata = {
  title: "Amenities | Davies Imaging Group",
  description: "Community amenity photography that showcases pools, clubhouses, trails, and lifestyle spaces builders invest in.",
};

const otherWork = [
  { label: "Model Homes", href: "/gallery/models" },
  { label: "Spec Homes", href: "/gallery/listings" },
  { label: "Lifestyle", href: "/gallery/lifestyle" },
];

export default function AmenitiesPage() {
  return (
    <>
      {/* Hero */}
      <DarkSection className="py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <EditableHero
              slotId="gallery-amenities-hero"
              eyebrowDefault="Gallery / Amenities"
              headlineDefault="Buyers choose communities. Give them a reason to choose <strong>yours</strong>."
              subheadDefault="Pools, clubhouses, fitness centers, trails, and parks. DIG captures every amenity the way it deserves: with context, with light, and with buyers in mind."
            />
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* Gallery */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 pb-10 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">Coming Soon</p>
          <p className="mt-2 text-text-body">Amenity galleries are being curated and will be available shortly.</p>
        </div>
        <DynamicGallery
          pageSlug="/gallery/amenities"
          heading=""
          description=""
        />
      </section>

      {/* Context section */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-3xl px-6">
          <RevealOnScroll>
            <EditableTextContent
              slotId="gallery-amenities-context"
              eyebrowDefault="Perception Drives Value"
              headlineDefault="Value is established before the <strong>first visit</strong>."
              bodyDefault="Perceived value is established before a buyer ever steps on site. What they see online sets the tone, defining what feels premium, considered, and worth pursuing.<br><br>DIG captures your amenities as high-impact visual assets, crafted to elevate perception, create excitement, and position your community as the clear choice early in the process."
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA section */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <EditableTextContent
              slotId="gallery-amenities-cta"
              eyebrowDefault="Book an Amenity Shoot"
              headlineDefault="Ready to showcase what makes your community <strong>worth choosing</strong>?"
              bodyDefault="Amenity photography is part of DIG Premium. Coordinate it alongside your model home shoot or book it as a standalone engagement."
              dark={true}
            />
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Request a Quote
              </Link>
              <Link
                href="/services/premium"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                See how Premium works &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>
    </>
  );
}
