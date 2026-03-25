import type { Metadata } from "next";
import { LPHero } from "@/components/lp/LPHero";
import { LogoStrip } from "@/components/lp/LogoStrip";
import { PainPoints } from "@/components/lp/PainPoints";
import { Solution } from "@/components/lp/Solution";
import { Proof } from "@/components/lp/Proof";
import { LPCta } from "@/components/lp/LPCta";

export const metadata: Metadata = {
  title: "For Regional & National Builders | Davies Imaging Group",
  description:
    "DIG delivers consistent, scalable marketing assets across markets for builders doing 300+ homes annually.",
};

export default function RegionalBuildersPage() {
  return (
    <>
      <LPHero
        eyebrow="For Regional & National Builders"
        headline={
          <>
            Consistent assets across every market you build{" "}
            <strong>in</strong>.
          </>
        }
        subheadline="Builders doing 300+ homes annually need a visual partner who scales with them. One standard, every region."
        primaryCta={{ label: "Book a Strategy Call", href: "/contact-page" }}
        secondaryCta={{ label: "Regional Partnerships", href: "/offerings/regional-partnerships" }}
      />

      <LogoStrip
        logos={["Kolter Homes", "Beazer Homes", "M/I Homes", "Robert Thomas Homes", "SouthSix"]}
      />

      <PainPoints
        eyebrow="Scaling Challenges"
        headline={
          <>
            Your assets shouldn&rsquo;t make growth{" "}
            <strong>harder</strong>.
          </>
        }
        points={[
          {
            title: "Market-to-Market Inconsistency",
            description: "Different photographers in every market means different quality and a fragmented brand.",
          },
          {
            title: "Coordination Overhead",
            description: "Managing vendors across 10+ markets burns time your marketing team doesn't have.",
          },
          {
            title: "No Economies of Scale",
            description: "Per-shoot pricing without volume benefits or strategic alignment.",
          },
        ]}
      />

      <Solution
        eyebrow="One Partner"
        headline={
          <>
            Single vendor across every{" "}
            <strong>region</strong>.
          </>
        }
        description="DIG's regional partnership model gives national builders one point of contact for photography, staging, and video. Consistent quality, volume pricing, brand guidelines enforced everywhere."
        ctaLabel="Explore partnerships"
        ctaHref="/offerings/regional-partnerships"
      />

      <Proof
        eyebrow="Scale"
        headline={
          <>
            Coverage without <strong>compromise</strong>.
          </>
        }
        stats={[
          { value: "24+", label: "Markets served" },
          { value: "4", label: "Regions covered" },
          { value: "10,000+", label: "Homes delivered" },
        ]}
        testimonial={{
          quote: "Before DIG, we had a different vendor in every market. Now we have one partner and our brand looks the same everywhere.",
          attribution: "CMO, National Builder",
        }}
      />

      <LPCta
        headline={
          <>
            Ready to simplify your marketing{" "}
            <strong>operations</strong>?
          </>
        }
        description="Let's talk about a regional partnership that scales with your business."
        primaryCta={{ label: "Book a Strategy Call", href: "/contact-page" }}
        secondaryCta={{ label: "Explore FrameFlow", href: "/services/frameflow" }}
      />
    </>
  );
}
