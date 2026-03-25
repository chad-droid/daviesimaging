import type { Metadata } from "next";
import { LPHero } from "@/components/lp/LPHero";
import { LogoStrip } from "@/components/lp/LogoStrip";
import { Solution } from "@/components/lp/Solution";
import { Proof } from "@/components/lp/Proof";
import { LPCta } from "@/components/lp/LPCta";

export const metadata: Metadata = {
  title: "Beazer Homes x DIG | Davies Imaging Group",
  description: "How DIG supports Beazer Homes with scalable marketing assets and FrameFlow.",
};

export default function BeazerHomesPage() {
  return (
    <>
      <LPHero
        eyebrow="Beazer Homes"
        headline={
          <>
            Marketing assets built for Beazer&rsquo;s{" "}
            <strong>scale</strong>.
          </>
        }
        subheadline="DIG delivers photography, staging, and video across Beazer communities nationwide. One process, consistent quality, FrameFlow ordering."
        primaryCta={{ label: "Book a Strategy Call", href: "/contact-page" }}
      />

      <LogoStrip
        heading="Also trusted by"
        logos={["Kolter Homes", "M/I Homes", "Robert Thomas Homes", "SouthSix"]}
      />

      <Solution
        eyebrow="The Partnership"
        headline={
          <>
            FrameFlow-powered delivery at{" "}
            <strong>scale</strong>.
          </>
        }
        description="Beazer's marketing team uses FrameFlow to order Spec+ packages, virtual staging, and video across markets. Fast turnaround, zero vendor coordination."
        ctaLabel="Explore FrameFlow"
        ctaHref="/services/frameflow"
      />

      <Proof
        eyebrow="Impact"
        headline={
          <>
            Faster listings, faster{" "}
            <strong>closings</strong>.
          </>
        }
        stats={[
          { value: "37%", label: "Avg. DOM reduction" },
          { value: "3-in-1", label: "Photo + staging + video" },
          { value: "24+", label: "Markets covered" },
        ]}
      />

      <LPCta
        headline={
          <>
            Let&rsquo;s build assets that move{" "}
            <strong>homes</strong>.
          </>
        }
        primaryCta={{ label: "Book a Strategy Call", href: "/contact-page" }}
        secondaryCta={{ label: "Start the FrameFlow Challenge", href: "/frameflow-sell-faster-challenge-0210" }}
      />
    </>
  );
}
