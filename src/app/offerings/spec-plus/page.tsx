import type { Metadata } from "next";
import { EditableSection } from "@/components/EditableSection";
import { DynamicImage } from "@/components/DynamicImage";

export const metadata: Metadata = {
  title: "Spec+ | Davies Imaging Group",
  description: "The complete spec home asset package: virtual staging, virtual video, and photography in one order via FrameFlow.",
};

export default function SpecPlusPage() {
  return (
    <>
      <EditableSection
        slotId="offerings-spec-plus-hero"
        variant="hero-dark"
        defaults={{
          eyebrow: "Spec+",
          headline: "Your inventory needs to move. Spec+ delivers <strong>everything</strong>.",
          body: "Virtual staging, virtual video, and photography in one package. Built for standing inventory. Ordered through FrameFlow.",
        }}
      />

      <EditableSection
        slotId="offerings-spec-plus-section1"
        variant="light-split"
        defaults={{
          eyebrow: "One Order",
          headline: "Stop managing multiple <strong>vendors</strong>.",
          body: "Spec+ bundles everything your listing needs into a single order. Photography, virtual staging, and virtual video delivered fast so homes move faster.",
          ctaText: "Order via FrameFlow",
          ctaUrl: "/offerings/frameflow",
        }}
      >
        <DynamicImage slotId="offerings-spec-plus-img" className="rounded-lg" fallbackClass="bg-gradient-to-br from-bg-light to-border-light" />
      </EditableSection>

      <EditableSection
        slotId="offerings-spec-plus-section2"
        variant="light"
        defaults={{
          eyebrow: "Speed",
          headline: "48-hour turnaround on QMI Close <strong>Kits</strong>.",
          body: "Move-in-ready homes can\u2019t wait. The QMI Close Kit delivers photography, staging, and video within 48 hours of the shoot.",
          ctaText: "Get started",
          ctaUrl: "/contact",
        }}
      />
    </>
  );
}
