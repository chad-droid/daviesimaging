import type { Metadata } from "next";
import { LPHero } from "@/components/lp/LPHero";
import { LogoStrip } from "@/components/lp/LogoStrip";
import { PainPoints } from "@/components/lp/PainPoints";
import { Solution } from "@/components/lp/Solution";
import { Proof } from "@/components/lp/Proof";
import { LPCta } from "@/components/lp/LPCta";

export const metadata: Metadata = {
  title: "For Executives | Davies Imaging Group",
  description: "DIG delivers regional coverage, vendor consolidation, and scalable asset partnerships for VP-level leaders.",
};

export default function ExecutivePage() {
  return (
    <>
      <LPHero
        eyebrow="For Executives"
        headline={<>Consolidate vendors. Scale <strong>coverage</strong>.</>}
        subheadline="VP-level oversight requires predictable quality across markets, vendor simplification, and a partner who can grow with the business."
        primaryCta={{ label: "Book a Strategy Call", href: "/contact" }}
        secondaryCta={{ label: "Regional Partnerships", href: "/offerings/regional-partnerships" }}
      />
      <LogoStrip logos={["Kolter Homes", "Beazer Homes", "M/I Homes", "Robert Thomas Homes", "SouthSix"]} />
      <PainPoints
        eyebrow="VP Challenges"
        headline={<>Growth creates vendor <strong>sprawl</strong>.</>}
        points={[
          { title: "Market-to-Market Inconsistency", description: "Different photographers in every market means different quality and a fragmented brand." },
          { title: "Coordination Overhead", description: "Your directors spend more time managing vendors than managing strategy." },
          { title: "No Economies of Scale", description: "Per-shoot pricing across 10+ markets without volume benefits or strategic alignment." },
        ]}
      />
      <Solution
        eyebrow="Regional Partnerships"
        headline={<>One partner across every <strong>region</strong>.</>}
        description="DIG's regional partnership model gives you a single point of contact, volume pricing, and brand guidelines enforced across West, Mountain, Central, and East."
        ctaLabel="Explore partnerships"
        ctaHref="/offerings/regional-partnerships"
      />
      <Proof
        eyebrow="Scale"
        headline={<>Coverage without <strong>compromise</strong>.</>}
        stats={[
          { value: "28", label: "Markets served" },
          { value: "4", label: "Regions covered" },
          { value: "10,000+", label: "Homes delivered" },
        ]}
        testimonial={{
          quote: "Before DIG, we had a different vendor in every market. Now we have one partner and our brand looks the same everywhere.",
          attribution: "CMO, National Builder",
        }}
      />
      <LPCta
        headline={<>Ready to simplify your marketing <strong>operations</strong>?</>}
        primaryCta={{ label: "Book a Strategy Call", href: "/contact" }}
        secondaryCta={{ label: "Explore FrameFlow", href: "/offerings/frameflow" }}
      />
    </>
  );
}
