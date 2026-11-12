import type { Metadata } from "next";
import { LPHero } from "@/components/lp/LPHero";
import { LogoStrip } from "@/components/lp/LogoStrip";
import { PainPoints } from "@/components/lp/PainPoints";
import { Solution } from "@/components/lp/Solution";
import { Proof } from "@/components/lp/Proof";
import { LPCta } from "@/components/lp/LPCta";
import { getTestimonials, attributionLine } from "@/data/testimonials";

// A named customer, from src/data/testimonials.ts.
const [t] = getTestimonials(["jordan-cost"]);
const proofQuote = t ? { quote: t.quote, attribution: attributionLine(t) } : undefined;

export const metadata: Metadata = {
  alternates: { canonical: "/markets/role/c-suite" },
  title: "For C-Suite",
  description: "DIG delivers strategic growth, cost efficiency, and competitive advantage through visual marketing for builder leadership.",
};

export default function CSuitePage() {
  return (
    <>
      <LPHero
        eyebrow="For C-Suite"
        headline={<>Great marketing is an operational <strong>force multiplier</strong>.</>}
        subheadline="If your brand needs a boost, you only need one partner to deliver remarkable results."
        primaryCta={{ label: "Book a Strategy Call", href: "/contact" }}
        secondaryCta={{ label: "Regional Partnerships", href: "/programs/regional-partnerships" }}
      />
      <LogoStrip logos={["Kolter Homes", "Beazer Homes", "M/I Homes", "Robert Thomas Homes", "SouthSix"]} />
      <PainPoints
        eyebrow="Slow Sales"
        headline={<>What slow inventory <strong>costs you</strong>.</>}
        points={[
          { title: "Carry", description: "Carry on a spec runs about $25 a day for every $100,000 of list price." },
          { title: "Price cuts", description: "Cutting price is the usual answer to slow sales. Updating your presentation gives your new homes a second chance at success first." },
          { title: "Many vendors", description: "Separate vendors in every market cost more and look different from one community to the next." },
        ]}
      />
      <Solution
        eyebrow="Partnership Model"
        headline={<>Spec photography costs about <strong>four days of carry</strong>.</>}
        description="Spec photography runs about 0.1% of list price. If better presentation helps a home sell four days sooner, it has paid for itself. Regional Partnerships add volume pricing and dedicated capacity across your markets."
        ctaLabel="Explore partnerships"
        ctaHref="/programs/regional-partnerships"
        imageSlot="markets-role-c-suite-solution-img"
        imageDefault="/client-showcase/listing-06.webp"
        imageAlt="Listing photograph of a home"
      />
      <Proof
        eyebrow="Business Impact"
        headline={<>What you can <strong>count on</strong>.</>}
        stats={[
          { value: "$600", label: "Spec+, flat for all home sizes" },
          { value: "28", label: "Markets served" },
          { value: "4", label: "Regions, one partner" },
        ]}
        testimonial={proofQuote}
      />
      <LPCta
        headline={<>Have ambitious sales goals <strong>this year</strong>?</>}
        description="Reach out so we can help you execute with operational excellence. Your satisfaction is guaranteed."
        primaryCta={{ label: "Book a Strategy Call", href: "/contact?intent=strategy" }}
        secondaryCta={{ label: "Explore digDesk", href: "/programs/digdesk" }}
      />
    </>
  );
}
