import type { Metadata } from "next";
import { EditableSection } from "@/components/EditableSection";
import { DynamicImage } from "@/components/DynamicImage";

export const metadata: Metadata = {
  title: "About Us | Davies Imaging Group",
  description:
    "Davies Imaging Group was built inside the homebuilding industry. We think like marketers, sales leaders, and partners.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <EditableSection
        slotId="about-hero"
        variant="hero-dark"
        defaults={{
          eyebrow: "About DIG",
          headline: "We don\u2019t just capture homes. We help builders <strong>win</strong>.",
          body: "Davies Imaging Group was built inside the homebuilding industry, not outside of it.",
        }}
      />

      {/* Origin Story */}
      <EditableSection
        slotId="about-section1"
        variant="light"
        defaults={{
          eyebrow: "Origin",
          headline: "Founded on a clear <strong>conviction</strong>.",
          body: "Chad Davies started DIG because homebuilder marketing deserves better storytelling, better strategy, and better alignment between creative and conversion.",
        }}
      />

      {/* We Understand */}
      <EditableSection
        slotId="about-section2"
        variant="light"
        defaults={{
          eyebrow: "Perspective",
          headline: "We think like <strong>marketers</strong>.",
          body: "Launch timelines, spec pressure, marketing budgets, sales alignment, community rollouts. We\u2019ve worked alongside some of the most respected builders in the country, and what sets DIG apart isn\u2019t production quality. It\u2019s perspective.",
        }}
      />

      {/* Experience the Difference */}
      <EditableSection
        slotId="about-section3"
        variant="light-split"
        defaults={{
          eyebrow: "Five-Step Strategy",
          headline: "From alignment to <strong>delivery</strong>.",
          body: "Our proven five-step asset strategy reduces the time it takes to plan, produce, and deploy marketing visuals that actually perform. Every step supports your marketing team and sales goals.",
          ctaText: "Discover FrameFlow",
          ctaUrl: "/offerings/frameflow",
        }}
      >
        <DynamicImage slotId="about-img" className="rounded-lg" fallbackClass="bg-gradient-to-br from-bg-light to-border-light" />
      </EditableSection>

      {/* CTA */}
      <EditableSection
        slotId="about-section4"
        variant="dark"
        defaults={{
          eyebrow: "",
          headline: "Let\u2019s build assets that move <strong>homes</strong>.",
          body: "If you\u2019re looking for a partner who understands how builder marketing actually works, let\u2019s talk.",
          ctaText: "Book a Strategy Call",
          ctaUrl: "/contact",
        }}
      />
    </>
  );
}
