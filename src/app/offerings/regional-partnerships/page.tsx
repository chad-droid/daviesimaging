import type { Metadata } from "next";
import { EditableSection } from "@/components/EditableSection";
import { DynamicImage } from "@/components/DynamicImage";

export const metadata: Metadata = {
  title: "Regional Partnerships | Davies Imaging Group",
  description: "One visual partner across every market. Volume pricing, brand consistency, and FrameFlow ordering for national builders.",
};

export default function RegionalPartnershipsPage() {
  return (
    <>
      <EditableSection
        slotId="offerings-regional-partnerships-hero"
        variant="hero-dark"
        defaults={{
          eyebrow: "Regional Partnerships",
          headline: "One partner, every <strong>market</strong>.",
          body: "DIG\u2019s regional partnership model gives national builders a single point of contact for photography, staging, and video across all four U.S. regions.",
        }}
      />

      <EditableSection
        slotId="offerings-regional-partnerships-section1"
        variant="light-split"
        defaults={{
          eyebrow: "Scale",
          headline: "Volume pricing without quality <strong>compromise</strong>.",
          body: "Multi-market commitments unlock volume pricing, dedicated account management, and brand guidelines enforced across every shoot in every region.",
          ctaText: "See our regions",
          ctaUrl: "/markets/region",
        }}
      >
        <DynamicImage slotId="offerings-regional-partnerships-img" className="rounded-lg" fallbackClass="bg-gradient-to-br from-bg-light to-border-light" />
      </EditableSection>

      <EditableSection
        slotId="offerings-regional-partnerships-section2"
        variant="light"
        defaults={{
          eyebrow: "FrameFlow Powered",
          headline: "Centralized ordering across every <strong>region</strong>.",
          body: "Your marketing team orders through FrameFlow regardless of market. One platform, one process, consistent delivery from West to East.",
          ctaText: "Start a partnership conversation",
          ctaUrl: "/contact",
        }}
      />
    </>
  );
}
