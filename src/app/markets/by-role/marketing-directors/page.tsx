import type { Metadata } from "next";
import { LPHero } from "@/components/lp/LPHero";
import { LogoStrip } from "@/components/lp/LogoStrip";
import { PainPoints } from "@/components/lp/PainPoints";
import { Solution } from "@/components/lp/Solution";
import { Proof } from "@/components/lp/Proof";
import { LPCta } from "@/components/lp/LPCta";

export const metadata: Metadata = {
  title: "For Marketing Directors | Davies Imaging Group",
  description:
    "DIG helps marketing directors at regional and national builders produce consistent, high-performing visual assets across every community.",
};

export default function MarketingDirectorsPage() {
  return (
    <>
      <LPHero
        eyebrow="For Marketing Directors"
        headline={
          <>
            Your marketing deserves assets that actually{" "}
            <strong>perform</strong>.
          </>
        }
        subheadline="DIG partners with marketing directors at regional and national builders to deliver photography, staging, and video that drives conversion across every channel."
        primaryCta={{ label: "Book a Strategy Call", href: "/contact-page" }}
        secondaryCta={{ label: "Explore FrameFlow", href: "/services/frameflow" }}
      />

      <LogoStrip
        logos={["Kolter Homes", "Beazer Homes", "M/I Homes", "Robert Thomas Homes", "SouthSix"]}
      />

      <PainPoints
        eyebrow="Sound Familiar?"
        headline={
          <>
            The same challenges, every <strong>quarter</strong>.
          </>
        }
        points={[
          {
            title: "Inconsistent Quality",
            description: "Every community looks different because every photographer shoots differently.",
          },
          {
            title: "Vendor Overload",
            description: "Coordinating photography, staging, and video across multiple vendors wastes time and budget.",
          },
          {
            title: "Assets That Sit",
            description: "Beautiful photos that only live on the MLS with no strategy for email, paid media, or sales.",
          },
        ]}
      />

      <Solution
        eyebrow="One Partner"
        headline={
          <>
            Complete asset packages, built for{" "}
            <strong>consistency</strong>.
          </>
        }
        description="From pre-shoot alignment to post-production delivery, every asset is designed to work across your website, email campaigns, paid media, and sales center."
        ctaLabel="See how it works"
        ctaHref="/services/frameflow"
      />

      <Proof
        eyebrow="Results"
        headline={
          <>
            Numbers that <strong>matter</strong>.
          </>
        }
        stats={[
          { value: "37%", label: "Avg. reduction in days on market" },
          { value: "24+", label: "Markets served nationwide" },
          { value: "10,000+", label: "Homes photographed" },
        ]}
        testimonial={{
          quote: "DIG changed how we think about photography. It went from a line item to a growth lever.",
          attribution: "Marketing Director, Regional Builder",
        }}
      />

      <LPCta
        headline={
          <>
            Let&rsquo;s build assets that move <strong>homes</strong>.
          </>
        }
        description="If your content isn't driving momentum, it's time to rethink the strategy."
        primaryCta={{ label: "Book a Strategy Call", href: "/contact-page" }}
        secondaryCta={{ label: "Start the FrameFlow Challenge", href: "/frameflow-sell-faster-challenge-0210" }}
      />
    </>
  );
}
