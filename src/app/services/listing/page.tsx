import type { Metadata } from "next";
import { EditableSection } from "@/components/EditableSection";
import { DynamicImage } from "@/components/DynamicImage";

export const metadata: Metadata = {
  title: "Listing Photo | Davies Imaging Group",
  description: "Professional listing photography built for speed and consistency across communities.",
};

export default function ListingPhotoPage() {
  return (
    <>
      <EditableSection
        slotId="services-listing-hero"
        variant="hero-dark"
        defaults={{
          eyebrow: "Listing Photo",
          headline: "Listing photography built for <strong>velocity</strong>.",
          body: "Fast turnaround, consistent quality, and assets ready to deploy across MLS, website, and paid channels.",
        }}
      />

      <EditableSection
        slotId="services-listing-section1"
        variant="light-split"
        defaults={{
          eyebrow: "Consistency",
          headline: "Every listing, same <strong>standard</strong>.",
          body: "Whether it\u2019s the first home in a community or the fiftieth, DIG listing photography delivers brand-consistent visuals that perform across every channel.",
          ctaText: "See listing work",
          ctaUrl: "/work/spec-homes",
        }}
      >
        <DynamicImage slotId="services-listing-img" className="rounded-lg" fallbackClass="bg-gradient-to-br from-bg-light to-border-light" />
      </EditableSection>

      <EditableSection
        slotId="services-listing-section2"
        variant="dark"
        defaults={{
          eyebrow: "Spec+",
          headline: "Bundle listing photo with staging and video in one <strong>order</strong>.",
          body: "Spec+ combines listing photography, virtual staging, and virtual video into a single FrameFlow order. The fastest way to get a complete asset set for homes that need to move.",
          ctaText: "Learn about Spec+",
          ctaUrl: "/offerings/spec-plus",
        }}
      />
    </>
  );
}
