import type { Metadata } from "next";
import { LPHero } from "@/components/lp/LPHero";
import { LogoStrip } from "@/components/lp/LogoStrip";
import { PainPoints } from "@/components/lp/PainPoints";
import { Solution } from "@/components/lp/Solution";
import { Proof } from "@/components/lp/Proof";
import { LPCta } from "@/components/lp/LPCta";
import { getTestimonials, attributionLine } from "@/data/testimonials";

// A named customer, from src/data/testimonials.ts.
const [t] = getTestimonials(["sarah-skeptic"]);
const proofQuote = t ? { quote: t.quote, attribution: attributionLine(t) } : undefined;

export const metadata: Metadata = {
  alternates: { canonical: "/markets/role/directors" },
  title: "For Directors",
  description: "DIG helps marketing directors produce consistent, high-performing visual assets across every community.",
};

export default function DirectorsPage() {
  return (
    <>
      <LPHero
        eyebrow="For Directors"
        headline={<>Make your homes look <strong>their best</strong>.</>}
        subheadline="Whether you're pre-selling a new community, showcasing a new model park, or getting your new listings online, you get the assets you need from lead to launch to list."
        primaryCta={{ label: "Book a Strategy Call", href: "/contact?intent=strategy" }}
        secondaryCta={{ label: "Explore digDesk", href: "/programs/digdesk" }}
      />
      <LogoStrip logos={["Kolter Homes", "Beazer Homes", "M/I Homes", "Robert Thomas Homes", "SouthSix"]} />
      <PainPoints
        eyebrow="Sound Familiar?"
        headline={<>What takes up your <strong>team&rsquo;s time</strong>.</>}
        points={[
          { title: "Running every shoot", description: "Coordinating with your on-site construction and sales teams, walking the homes, and checking edits takes your team away from marketing." },
          { title: "Separate vendors", description: "Photography, staging, and video from separate vendors means waiting on one before the next can start." },
          { title: "A different look everywhere", description: "When every photographer shoots differently, every community looks different." },
        ]}
      />
      <Solution
        eyebrow="One Partner"
        headline={<>One partner for photography, staging, <strong>and video</strong>.</>}
        description="We coordinate the shoots with your teams in the field, and you order photography, ModelMatch staging, and Flow video in one place."
        ctaLabel="See how it works"
        ctaHref="/about/how-we-do-it"
      />
      <Proof
        eyebrow="Results"
        headline={<>What you can <strong>count on</strong>.</>}
        stats={[
          { value: "28", label: "Markets served nationwide" },
          { value: "72 hrs", label: "Spec+ delivery after the shoot" },
          { value: "$600", label: "Spec+, flat for all home sizes" },
        ]}
        testimonial={proofQuote}
      />
      <LPCta
        headline={<>Have ambitious marketing goals <strong>this year</strong>?</>}
        description="Reach out so we can help you execute. Your satisfaction is guaranteed."
        primaryCta={{ label: "Book a Strategy Call", href: "/contact?intent=strategy" }}
        secondaryCta={{ label: "Start My Free Trial", href: "/modelmatch-datalibrary" }}
      />
    </>
  );
}
