import type { Metadata } from "next";
import { LPHero } from "@/components/lp/LPHero";
import { LogoStrip } from "@/components/lp/LogoStrip";
import { PainPoints } from "@/components/lp/PainPoints";
import { Solution } from "@/components/lp/Solution";
import { Proof } from "@/components/lp/Proof";
import { LPCta } from "@/components/lp/LPCta";

export const metadata: Metadata = {
  title: "FrameFlow Sell Faster Challenge | Davies Imaging Group",
  description:
    "See how strategic visual sequencing can increase engagement and drive faster buyer decisions. Risk-free.",
};

export default function FrameFlowChallengePage() {
  return (
    <>
      <LPHero
        eyebrow="FrameFlow Challenge"
        headline={
          <>
            Before you overhaul everything, <strong>test</strong> it.
          </>
        }
        subheadline="The FrameFlow Sell Faster Challenge lets you see how strategic visual sequencing increases engagement and drives faster buyer decisions. Risk-free, built for builders."
        primaryCta={{ label: "Start the Challenge", href: "/contact-page" }}
        secondaryCta={{ label: "Book a Strategy Call", href: "/contact-page" }}
      />

      <LogoStrip
        heading="Builders already using FrameFlow"
        logos={["Kolter Homes", "Beazer Homes", "M/I Homes", "Robert Thomas Homes", "SouthSix"]}
      />

      <PainPoints
        eyebrow="The Problem"
        headline={
          <>
            Most builder photography <strong>underperforms</strong>.
          </>
        }
        points={[
          {
            title: "No Strategic Sequencing",
            description: "Photos uploaded in random order. No guided visual story for buyers.",
          },
          {
            title: "Single-Use Assets",
            description: "Shoots produce images for one channel with no deployment strategy.",
          },
          {
            title: "No Measurable Outcome",
            description: "No baseline, no comparison, no way to know if visuals drive engagement.",
          },
        ]}
      />

      <Solution
        eyebrow="The Challenge"
        headline={
          <>
            One community. One test. Zero{" "}
            <strong>risk</strong>.
          </>
        }
        description="We take one community or model home and apply the FrameFlow methodology. You see the difference in engagement, buyer behavior, and listing performance."
        ctaLabel="See how it works"
        ctaHref="/offerings/frameflow"
      />

      <Proof
        eyebrow="What Builders See"
        headline={
          <>
            Results that speak for <strong>themselves</strong>.
          </>
        }
        stats={[
          { value: "37%", label: "Avg. reduction in days on market" },
          { value: "2.4x", label: "Increase in listing engagement" },
          { value: "0", label: "Risk to get started" },
        ]}
        testimonial={{
          quote: "We ran the challenge on one community and saw results immediately. Now every community goes through FrameFlow.",
          attribution: "Marketing Director, Regional Builder",
        }}
      />

      <LPCta
        headline={
          <>
            See the difference for <strong>yourself</strong>.
          </>
        }
        description="One community, one challenge, zero risk."
        primaryCta={{ label: "Start the FrameFlow Challenge", href: "/contact-page" }}
        secondaryCta={{ label: "Book a Strategy Call", href: "/contact-page" }}
      />
    </>
  );
}
