import type { Metadata } from "next";
import { EditableSection } from "@/components/EditableSection";
import { DynamicImage } from "@/components/DynamicImage";

export const metadata: Metadata = {
  title: "Premium Photo | Davies Imaging Group",
  description: "Full-service lifestyle and model home photography for major builder launches. DIG's signature service.",
};

export default function PremiumPage() {
  return (
    <>
      <EditableSection
        slotId="services-premium-hero"
        variant="hero-dark"
        defaults={{
          eyebrow: "Premium Photo",
          headline: "Full-service photography for builders who demand the **best**.",
          body: "Slow, methodical, full-setup photography. Model homes and lifestyle. DIG's signature service across markets nationwide.",
        }}
      />

      <EditableSection
        slotId="services-premium-section1"
        variant="light-split"
        defaults={{
          eyebrow: "Signature Service",
          headline: "Every detail, every **angle**.",
          body: "Premium photography captures the full story of a model home: architectural detail, lifestyle staging, twilight exteriors, and community context. Delivered as a complete marketing asset package.",
          ctaText: "See Premium work",
          ctaUrl: "/work/model-homes",
        }}
      >
        <DynamicImage slotId="services-premium-img" className="rounded-lg" fallbackClass="bg-gradient-to-br from-bg-light to-border-light" />
      </EditableSection>

      <EditableSection
        slotId="services-premium-section2"
        variant="dark"
        defaults={{
          eyebrow: "Regional Coverage",
          headline: "One standard across every **market**.",
          body: "DIG Premium delivers consistent quality whether you're launching in California, Texas, Florida, or Colorado. Same process, same caliber, every time.",
          ctaText: "Explore Regional Partnerships",
          ctaUrl: "/offerings/regional-partnerships",
        }}
      />
    </>
  );
}
