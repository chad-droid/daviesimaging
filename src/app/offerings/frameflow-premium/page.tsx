import type { Metadata } from "next";
import { EditableSection } from "@/components/EditableSection";

export const metadata: Metadata = {
  title: "FrameFlow Premium | Davies Imaging Group",
  description: "Higher-cost, more specific digital work. Pilot program.",
  robots: { index: false, follow: false },
};

export default function FrameFlowPremiumPage() {
  return (
    <>
      <EditableSection
        slotId="offerings-frameflow-premium-hero"
        variant="hero-dark"
        defaults={{
          eyebrow: "FrameFlow Premium",
          headline: "Premium digital work for builders who need <strong>more</strong>.",
          body: "Higher-craft virtual staging and video with expanded creative direction. Currently in pilot with select builders.",
        }}
      />

      <EditableSection
        slotId="offerings-frameflow-premium-section1"
        variant="light"
        defaults={{
          eyebrow: "Pilot Program",
          headline: "Invitation <strong>only</strong>.",
          body: "FrameFlow Premium is currently available to pilot participants. If you\u2019re interested in joining the program, reach out to the DIG team directly.",
          ctaText: "Get in touch",
          ctaUrl: "/contact",
        }}
      />
    </>
  );
}
