import type { Metadata } from "next";
import { LPHero } from "@/components/lp/LPHero";
import { LogoStrip } from "@/components/lp/LogoStrip";
import { Solution } from "@/components/lp/Solution";
import { Proof } from "@/components/lp/Proof";
import { LPCta } from "@/components/lp/LPCta";

export const metadata: Metadata = {
  title: "Kolter Homes x DIG | Davies Imaging Group",
  description: "How DIG delivers consistent marketing assets across Kolter Homes communities.",
};

export default function KolterHomesPage() {
  return (
    <>
      <LPHero
        eyebrow="Kolter Homes"
        headline={
          <>
            Consistent assets across every Kolter{" "}
            <strong>community</strong>.
          </>
        }
        subheadline="DIG partners with Kolter Homes to deliver photography, virtual staging, and video that scales across markets and maintains brand consistency."
        primaryCta={{ label: "Book a Strategy Call", href: "/contact-page" }}
      />

      <LogoStrip
        heading="Also trusted by"
        logos={["Beazer Homes", "M/I Homes", "Robert Thomas Homes", "SouthSix"]}
      />

      <Solution
        eyebrow="The Partnership"
        headline={
          <>
            One partner for every{" "}
            <strong>market</strong>.
          </>
        }
        description="From model home launches to spec inventory refreshes, DIG handles the full visual pipeline so Kolter's marketing team can focus on strategy, not vendor coordination."
        ctaLabel="See our work"
        ctaHref="/work"
      />

      <Proof
        eyebrow="Results"
        headline={
          <>
            Numbers that <strong>matter</strong>.
          </>
        }
        stats={[
          { value: "37%", label: "Avg. DOM reduction" },
          { value: "48hr", label: "Spec turnaround" },
          { value: "100%", label: "Brand consistency" },
        ]}
      />

      <LPCta
        headline={
          <>
            Ready to scale your visual{" "}
            <strong>strategy</strong>?
          </>
        }
        primaryCta={{ label: "Book a Strategy Call", href: "/contact-page" }}
        secondaryCta={{ label: "Explore FrameFlow", href: "/services/frameflow" }}
      />
    </>
  );
}
