import type { Metadata } from "next";
import { EditableSection } from "@/components/EditableSection";
import { DynamicImage } from "@/components/DynamicImage";

export const metadata: Metadata = {
  title: "Matterport | Davies Imaging Group",
  description: "Matterport 3D virtual tours for model homes and communities. Immersive buyer experiences.",
};

export default function MatterportPage() {
  return (
    <>
      <EditableSection
        slotId="services-matterport-hero"
        variant="hero-dark"
        defaults={{
          eyebrow: "Matterport",
          headline: "Immersive 3D tours that let buyers walk <strong>through</strong>.",
          body: "Matterport virtual tours give remote buyers the confidence to move forward. Built for model homes and community showcases.",
        }}
      />

      <EditableSection
        slotId="services-matterport-section1"
        variant="light-split"
        defaults={{
          eyebrow: "Beyond Photos",
          headline: "The next best thing to being <strong>there</strong>.",
          body: "Matterport tours let buyers explore every room at their own pace. Embed on your website, share via email, or display in sales centers for out-of-market buyers.",
          ctaText: "Book a strategy call",
          ctaUrl: "/contact",
        }}
      >
        <DynamicImage slotId="services-matterport-img" className="rounded-lg" fallbackClass="bg-gradient-to-br from-bg-light to-border-light" />
      </EditableSection>
    </>
  );
}
