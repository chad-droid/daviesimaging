import type { Metadata } from "next";
import { EditableSection } from "@/components/EditableSection";
import { DynamicImage } from "@/components/DynamicImage";

export const metadata: Metadata = {
  title: "FrameFlow | Davies Imaging Group",
  description: "The ordering platform and visual sequencing system for homebuilders. Order Spec+, virtual staging, and virtual video through FrameFlow.",
};

export default function FrameFlowPage() {
  return (
    <>
      <EditableSection
        slotId="offerings-frameflow-hero"
        variant="hero-dark"
        defaults={{
          eyebrow: "FrameFlow",
          headline: "The platform behind every high-performing DIG <strong>listing</strong>.",
          body: "Order Spec+ packages, virtual staging, virtual video, and more. One app, every service, streamlined for builder marketing teams.",
        }}
      />

      <EditableSection
        slotId="offerings-frameflow-section1"
        variant="light-split"
        defaults={{
          eyebrow: "How It Works",
          headline: "Strategic sequencing, not just <strong>photography</strong>.",
          body: "FrameFlow organizes visuals into guided buyer narratives that increase engagement and reduce days on market. Every image has a purpose and a position.",
          ctaText: "Try the challenge",
          ctaUrl: "/campaigns/frameflow-sell-faster",
        }}
      >
        <DynamicImage slotId="offerings-frameflow-img" className="rounded-lg" fallbackClass="bg-gradient-to-br from-bg-light to-border-light" />
      </EditableSection>

      <EditableSection
        slotId="offerings-frameflow-section2"
        variant="light"
        defaults={{
          eyebrow: "Order Anything",
          headline: "One app for every DIG <strong>service</strong>.",
          body: "Spec+ packages, standalone virtual staging, virtual video, and premium photography. All ordered, tracked, and delivered through FrameFlow.",
          ctaText: "Book a demo",
          ctaUrl: "/contact",
        }}
      />
    </>
  );
}
