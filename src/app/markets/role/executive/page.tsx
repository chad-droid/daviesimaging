import type { Metadata } from "next";
import { LPHero } from "@/components/lp/LPHero";
import { LogoStrip } from "@/components/lp/LogoStrip";
import { PainPoints } from "@/components/lp/PainPoints";
import { Solution } from "@/components/lp/Solution";
import { Proof } from "@/components/lp/Proof";
import { LPCta } from "@/components/lp/LPCta";
import { getTestimonials, attributionLine } from "@/data/testimonials";

// A named customer, from src/data/testimonials.ts.
const [t] = getTestimonials(["jaime-pilot"]);
const proofQuote = t ? { quote: t.quote, attribution: attributionLine(t) } : undefined;

export const metadata: Metadata = {
  alternates: { canonical: "/markets/role/executive" },
  title: "For Executives",
  description: "DIG delivers regional coverage, vendor consolidation, and scalable asset partnerships for VP-level leaders.",
};

export default function ExecutivePage() {
  return (
    <>
      <LPHero
        eyebrow="For Executives"
        headline={<>One partner in every market <strong>you build in</strong>.</>}
        subheadline="You get the same quality in each of our service lines, in 26 markets across the United States, with volume pricing and one account team."
        primaryCta={{ label: "Book a Strategy Call", href: "/contact" }}
        secondaryCta={{ label: "Regional Partnerships", href: "/programs/regional-partnerships" }}
      />
      <LogoStrip logos={["Kolter Homes", "Beazer Homes", "M/I Homes", "Robert Thomas Homes", "SouthSix"]} />
      <PainPoints
        eyebrow="As You Grow"
        headline={<>What growth does to your <strong>vendor list</strong>.</>}
        points={[
          { title: "A different look in every market", description: "Different photographers in every market means different quality from one community to the next." },
          { title: "Time spent managing vendors", description: "Your directors spend their time managing vendors when they could be marketing homes." },
          { title: "No volume pricing", description: "You pay per shoot in every market, with no benefit for the volume you bring." },
        ]}
      />
      <Solution
        eyebrow="Regional Partnerships"
        headline={<>One partner across every <strong>region</strong>.</>}
        description="Regional Partnerships give you a single point of contact, volume pricing, and your brand guidelines followed across West, Mountain, Central, and East."
        ctaLabel="Explore partnerships"
        ctaHref="/programs/regional-partnerships"
        imageSlot="markets-role-executive-solution-img"
        imageDefault="/client-showcase/spec-palatka-01.webp"
        imageAlt="Listing photograph of a spec home"
      />
      <Proof
        eyebrow="Scale"
        headline={<>Coverage you can <strong>count on</strong>.</>}
        stats={[
          { value: "26", label: "Markets served" },
          { value: "4", label: "Regions covered" },
          { value: "Weeks", label: "To onboard a trained photographer in a new market" },
        ]}
        testimonial={proofQuote}
      />
      <LPCta
        headline={<>Ready to simplify your marketing <strong>operations</strong>?</>}
        primaryCta={{ label: "Book a Strategy Call", href: "/contact?intent=strategy" }}
        secondaryCta={{ label: "Explore digDesk", href: "/programs/digdesk" }}
      />
    </>
  );
}
