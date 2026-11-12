import type { Metadata } from "next";
import { LPHero } from "@/components/lp/LPHero";
import { LogoStrip } from "@/components/lp/LogoStrip";
import { PainPoints } from "@/components/lp/PainPoints";
import { Solution } from "@/components/lp/Solution";
import { Proof } from "@/components/lp/Proof";
import { LPCta } from "@/components/lp/LPCta";
import { getTestimonials, attributionLine } from "@/data/testimonials";

// A named customer, from src/data/testimonials.ts.
const [t] = getTestimonials(["carrie-portal"]);
const proofQuote = t ? { quote: t.quote, attribution: attributionLine(t) } : undefined;

export const metadata: Metadata = {
  alternates: { canonical: "/markets/role/coordinators" },
  title: "For Coordinators",
  description: "DIG and digDesk make scheduling, ordering, and asset management faster for marketing coordinators.",
};

export default function CoordinatorsPage() {
  return (
    <>
      <LPHero
        eyebrow="For Coordinators"
        headline={<>Everything you need in <strong>one place</strong>.</>}
        subheadline="digDesk is your single point of entry to order, track, revise, and pay for all of your marketing assets."
        primaryCta={{ label: "Explore digDesk", href: "/programs/digdesk" }}
        secondaryCta={{ label: "Book a Demo", href: "/contact?intent=demo" }}
      />
      <LogoStrip logos={["Kolter Homes", "Beazer Homes", "M/I Homes", "Robert Thomas Homes", "SouthSix"]} />
      <PainPoints
        eyebrow="Without digDesk"
        headline={<>What ordering content <strong>usually takes</strong>.</>}
        points={[
          { title: "Back and forth", description: "Ordering content for a lot of communities at once can turn into a mess of emails and calls." },
          { title: "Thousands of files", description: "Some photographers hand you a link to thousands of photos that you have to download, edit, and sort through yourself." },
          { title: "Listings that sit", description: "When a listing has been sitting, refreshing it means starting a new round of coordination." },
        ]}
      />
      <Solution
        eyebrow="digDesk"
        headline={<>Pick what you need for <strong>each home</strong>.</>}
        description="Choose the services you need for each home or neighborhood, see the total, place the order, and get regular updates on its status. Your finished assets are delivered to the same place."
        ctaLabel="Explore digDesk"
        ctaHref="/programs/digdesk"
        imageSlot="markets-role-coordinators-solution-img"
        imageDefault="/client-showcase/spec-artisan-01.webp"
        imageAlt="Listing photograph of a spec home"
      />
      <Proof
        eyebrow="Impact"
        headline={<>What you can <strong>count on</strong>.</>}
        stats={[
          { value: "1", label: "Platform for all orders" },
          { value: "72hr", label: "Spec+ turnaround" },
          { value: "26", label: "Markets supported" },
        ]}
        testimonial={proofQuote}
      />
      <LPCta
        headline={<>Ready to see <strong>digDesk</strong>?</>}
        primaryCta={{ label: "Book a Demo", href: "/contact?intent=demo" }}
        secondaryCta={{ label: "Explore digDesk", href: "/programs/digdesk" }}
      />
    </>
  );
}
