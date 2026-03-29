import type { Metadata } from "next";
import { EditableSection } from "@/components/EditableSection";

export const metadata: Metadata = {
  title: "FrameFlow Demo | Davies Imaging Group",
  description: "See the FrameFlow platform in action. Request a live walkthrough.",
};

export default function FrameFlowDemoPage() {
  return (
    <>
      <EditableSection
        slotId="campaigns-frameflow-demo-hero"
        variant="hero-dark"
        defaults={{
          eyebrow: "FrameFlow Demo",
          headline: "See the platform before you <strong>commit</strong>.",
          body: "A live walkthrough of FrameFlow: ordering, tracking, delivery, and reporting. Built for builder marketing teams.",
        }}
      />

      <EditableSection
        slotId="campaigns-frameflow-demo-section1"
        variant="light"
        defaults={{
          eyebrow: "Request a Demo",
          headline: "15 minutes. Zero <strong>pressure</strong>.",
          body: "We\u2019ll walk you through FrameFlow, answer questions, and show you how builders are using it to streamline ordering across markets.",
          ctaText: "Request a demo",
          ctaUrl: "/contact",
        }}
      />
    </>
  );
}
