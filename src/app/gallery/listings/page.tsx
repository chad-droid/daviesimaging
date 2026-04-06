import type { Metadata } from "next";
import Link from "next/link";
import { DynamicGallery } from "@/components/DynamicGallery";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";
import { DarkSection } from "@/components/DarkSection";

export const metadata: Metadata = {
  title: "Spec Homes | Davies Imaging Group",
  description: "Fast-turn photography, virtual staging, and virtual video for spec homes and standing inventory. Built to move homes faster.",
};

const otherWork = [
  { label: "Model Homes", href: "/gallery/models" },
  { label: "Amenities", href: "/gallery/amenities" },
  { label: "Lifestyle", href: "/gallery/lifestyle" },
];

export default function SpecHomesPage() {
  return (
    <>
      {/* Hero */}
      <DarkSection className="py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>Gallery / Listings</Eyebrow>
            <EditableHero
              slotId="gallery-spec-homes-hero"
              headlineDefault="Slow moving inventory? <strong>Increases your sales pace.</strong>"
              subheadDefault="Spec+ packages deliver photography, ModelMatch virtual staging, and virtual video in one coordinated order. 72-hour delivery after the shoot. Built for standing inventory that needs to compete."
            />
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* Gallery */}
      <section className="py-16">
        <DynamicGallery
          pageSlug="/gallery/listings"
          heading=""
          description=""
        />
      </section>

      {/* Context section */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-3xl px-6">
          <RevealOnScroll>
            <EditableTextContent
              slotId="gallery-listings-context"
              eyebrowDefault="Spec+ Output"
              headlineDefault="What a <strong>Spec+ delivery</strong> looks like."
              bodyDefault="Every image and video in this gallery came from a Spec+ order: listing photography, virtually staged interiors, and a digital video walkthrough, all delivered in one package within 72 hours of the shoot.<br><br>The virtual staging uses ModelMatch, which means the furniture and finishes are pulled from your builder's own model home photography. Every staged room looks like it belongs to your community, not a generic staging catalog. That specificity is what makes these images perform on MLS, paid ads, and your website."
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* Spec+ CTA */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow dark>Spec+</Eyebrow>
            <EditableTextContent
              slotId="gallery-listings-cta"
              headlineDefault="One order. Listing photo, staging, and video <strong>delivered</strong>."
              bodyDefault="$600 flat. 72 hours after the shoot. Stop managing multiple vendors and start moving homes faster."
              dark={true}
            />
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/programs/spec-plus"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                See Spec+ Details
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                Talk to someone first &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>
    </>
  );
}
