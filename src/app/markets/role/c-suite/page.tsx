import type { Metadata } from "next";
import { LPHero } from "@/components/lp/LPHero";
import { LogoStrip } from "@/components/lp/LogoStrip";
import { PainPoints } from "@/components/lp/PainPoints";
import { Solution } from "@/components/lp/Solution";
import { Proof } from "@/components/lp/Proof";
import { LPCta } from "@/components/lp/LPCta";

export const metadata: Metadata = {
  title: "For C-Suite | Davies Imaging Group",
  description: "DIG delivers strategic growth, cost efficiency, and competitive advantage through visual marketing for builder leadership.",
};

export default function CSuitePage() {
  return (
    <>
      <LPHero
        eyebrow="For C-Suite"
        headline={<>Visual marketing as a competitive <strong>advantage</strong>.</>}
        subheadline="Builder leadership needs partners who think in terms of cost per home, days on market, and brand equity. DIG delivers measurable marketing ROI."
        primaryCta={{ label: "Book a Strategy Call", href: "/contact" }}
        secondaryCta={{ label: "Regional Partnerships", href: "/programs/regional-partnerships" }}
      />
      <LogoStrip logos={["Kolter Homes", "Beazer Homes", "M/I Homes", "Robert Thomas Homes", "SouthSix"]} />
      <PainPoints
        eyebrow="Strategic Gaps"
        headline={<>Photography is a line item. It should be a <strong>lever</strong>.</>}
        points={[
          { title: "No Measurable ROI", description: "Marketing spend on photography has no baseline, no tracking, and no connection to sales velocity." },
          { title: "Vendor Fragmentation", description: "Dozens of vendor relationships across markets create cost inefficiency and quality variance." },
          { title: "Brand Risk", description: "Inconsistent visual quality across communities undermines the brand you've built." },
        ]}
      />
      <Solution
        eyebrow="Partnership Model"
        headline={<>Predictable cost. Measurable <strong>impact</strong>.</>}
        description="DIG's regional partnerships provide volume pricing, dedicated capacity, and performance data that connects visual assets to days on market, listing engagement, and buyer conversion."
        ctaLabel="Explore partnerships"
        ctaHref="/programs/regional-partnerships"
      />
      <Proof
        eyebrow="Business Impact"
        headline={<>Results the board <strong>sees</strong>.</>}
        stats={[
          { value: "37%", label: "Avg. DOM reduction" },
          { value: "2.4x", label: "Listing engagement increase" },
          { value: "4", label: "Regions, one partner" },
        ]}
        testimonial={{
          quote: "DIG isn't a photography vendor. They're a strategic partner that helps us move homes faster in every market.",
          attribution: "CEO, Regional Builder",
        }}
      />
      <LPCta
        headline={<>Let&rsquo;s talk about <strong>growth</strong>.</>}
        description="Strategic partnerships start with a conversation."
        primaryCta={{ label: "Book a Strategy Call", href: "/contact" }}
        secondaryCta={{ label: "Explore digDesk", href: "/programs/digdesk" }}
      />
    </>
  );
}
