import type { Metadata } from "next";
import { EditableSection } from "@/components/EditableSection";
import { DynamicImage } from "@/components/DynamicImage";

export const metadata: Metadata = {
  title: "Virtual Video | Davies Imaging Group",
  description: "Virtual video walkthroughs created from existing photography. No shoot, no crew, fast delivery.",
};

export default function VirtualVideoPage() {
  return (
    <>
      <EditableSection
        slotId="services-virtual-video-hero"
        variant="hero-dark"
        defaults={{
          eyebrow: "Virtual Video",
          headline: "Walkthrough video without the <strong>crew</strong>.",
          body: "Virtual video transforms existing photography into smooth, cinematic walkthroughs. No shoot day, no scheduling, fast delivery.",
        }}
      />

      <EditableSection
        slotId="services-virtual-video-section1"
        variant="light-split"
        defaults={{
          eyebrow: "From Photos to Video",
          headline: "Turn stills into buyer <strong>experience</strong>.",
          body: "Virtual video works alongside virtual staging or standalone. Order through FrameFlow for fast turnaround on listings that need video without a production day.",
          ctaText: "Order via FrameFlow",
          ctaUrl: "/offerings/frameflow",
        }}
      >
        <DynamicImage slotId="services-virtual-video-img" aspectRatio="16/9" className="rounded-lg" fallbackClass="bg-gradient-to-br from-bg-light to-border-light" />
      </EditableSection>
    </>
  );
}
