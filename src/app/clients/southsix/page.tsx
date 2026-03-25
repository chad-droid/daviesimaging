import type { Metadata } from "next";
import { LPHero } from "@/components/lp/LPHero";
import { LogoStrip } from "@/components/lp/LogoStrip";
import { Solution } from "@/components/lp/Solution";
import { Proof } from "@/components/lp/Proof";
import { LPCta } from "@/components/lp/LPCta";

export const metadata: Metadata = {
  title: "SouthSix x DIG | Davies Imaging Group",
  description: "How DIG partners with SouthSix to deliver premium visual assets.",
};

export default function SouthSixPage() {
  return (
    <>
      <LPHero
        eyebrow="SouthSix"
        headline={
          <>
            Premium assets for premium{" "}
            <strong>homes</strong>.
          </>
        }
        subheadline="DIG delivers lifestyle photography and video that matches the caliber SouthSix builds. Every shoot tells the story buyers need to hear."
        primaryCta={{ label: "Book a Strategy Call", href: "/contact-page" }}
      />

      <LogoStrip
        heading="Also trusted by"
        logos={["Kolter Homes", "Beazer Homes", "M/I Homes", "Robert Thomas Homes"]}
      />

      <Solution
        eyebrow="The Partnership"
        headline={
          <>
            Lifestyle photography that sells the{" "}
            <strong>dream</strong>.
          </>
        }
        description="SouthSix homes deserve more than standard real estate photography. DIG builds visual narratives with lifestyle talent, architectural detail, and strategic sequencing."
        ctaLabel="See lifestyle work"
        ctaHref="/work/lifestyle"
      />

      <Proof
        eyebrow="Results"
        headline={
          <>
            Quality that <strong>converts</strong>.
          </>
        }
        stats={[
          { value: "37%", label: "Avg. DOM reduction" },
          { value: "2.4x", label: "Listing engagement" },
          { value: "100%", label: "Brand alignment" },
        ]}
      />

      <LPCta
        headline={
          <>
            Ready to elevate your{" "}
            <strong>visuals</strong>?
          </>
        }
        primaryCta={{ label: "Book a Strategy Call", href: "/contact-page" }}
        secondaryCta={{ label: "Explore Premium", href: "/services/premium" }}
      />
    </>
  );
}
