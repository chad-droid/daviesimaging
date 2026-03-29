import type { Metadata } from "next";
import { EditableSection } from "@/components/EditableSection";
import { DynamicImage } from "@/components/DynamicImage";

export const metadata: Metadata = {
  title: "Video Production | Davies Imaging Group",
  description: "Professional video production for model homes, communities, and builder marketing campaigns.",
};

export default function VideoProductionPage() {
  return (
    <>
      <EditableSection
        slotId="services-video-production-hero"
        variant="hero-dark"
        defaults={{
          eyebrow: "Video Production",
          headline: "Video that moves buyers to <strong>action</strong>.",
          body: "Community tours, model home walkthroughs, and lifestyle video built for websites, social, and sales centers.",
        }}
      />

      <EditableSection
        slotId="services-video-production-section1"
        variant="light-split"
        defaults={{
          eyebrow: "Multi-Channel",
          headline: "One shoot, every <strong>platform</strong>.",
          body: "DIG video production delivers assets formatted for website hero loops, social media cuts, email embeds, and sales center displays.",
          ctaText: "Book a strategy call",
          ctaUrl: "/contact",
        }}
      >
        <DynamicImage slotId="services-video-production-img" aspectRatio="16/9" className="rounded-lg" fallbackClass="bg-gradient-to-br from-bg-light to-border-light" />
      </EditableSection>
    </>
  );
}
