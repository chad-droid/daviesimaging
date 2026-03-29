import type { Metadata } from "next";
import { EditableSection } from "@/components/EditableSection";
import { DynamicImage } from "@/components/DynamicImage";

export const metadata: Metadata = {
  title: "Virtual Staging | Davies Imaging Group",
  description: "Virtual staging for builders who need furnished visuals without physical staging. No shoot required.",
};

export default function VirtualStagingPage() {
  return (
    <>
      <EditableSection
        slotId="services-virtual-staging-hero"
        variant="hero-dark"
        defaults={{
          eyebrow: "Virtual Staging",
          headline: "Furnished visuals without the <strong>furniture</strong>.",
          body: "Transform empty rooms into styled spaces. No physical staging, no shoot required, fast turnaround.",
        }}
      />

      <EditableSection
        slotId="services-virtual-staging-section1"
        variant="light-split"
        defaults={{
          eyebrow: "No Shoot Required",
          headline: "Already have photos? We handle the <strong>rest</strong>.",
          body: "Send us your existing photography and we\u2019ll deliver virtually staged images ready for MLS, website, and marketing deployment.",
          ctaText: "Order via FrameFlow",
          ctaUrl: "/offerings/frameflow",
        }}
      >
        <DynamicImage slotId="services-virtual-staging-img" className="rounded-lg" fallbackClass="bg-gradient-to-br from-bg-light to-border-light" />
      </EditableSection>
    </>
  );
}
