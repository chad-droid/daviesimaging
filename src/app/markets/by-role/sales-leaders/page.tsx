import type { Metadata } from "next";
import { LPHero } from "@/components/lp/LPHero";
import { LogoStrip } from "@/components/lp/LogoStrip";
import { PainPoints } from "@/components/lp/PainPoints";
import { Solution } from "@/components/lp/Solution";
import { Proof } from "@/components/lp/Proof";
import { LPCta } from "@/components/lp/LPCta";

export const metadata: Metadata = {
  title: "For Sales Leaders | Davies Imaging Group",
  description:
    "DIG gives sales leaders the visual assets they need to close faster.",
};

export default function SalesLeadersPage() {
  return (
    <>
      <LPHero
        eyebrow="For Sales Leaders"
        headline={
          <>
            Give your sales team assets that help{" "}
            <strong>close</strong>.
          </>
        }
        subheadline="Your agents need more than floor plans and MLS photos. DIG delivers photography, video, and virtual staging designed for buyer connection."
        primaryCta={{ label: "Book a Strategy Call", href: "/contact-page" }}
        secondaryCta={{ label: "See Spec+ Packages", href: "/services/spec" }}
      />

      <LogoStrip
        logos={["Kolter Homes", "Beazer Homes", "M/I Homes", "Robert Thomas Homes", "SouthSix"]}
      />

      <PainPoints
        eyebrow="What's Costing You"
        headline={
          <>
            The difference between assets that sit and assets that{" "}
            <strong>sell</strong>.
          </>
        }
        points={[
          {
            title: "Spec Homes Sitting",
            description: "Standing inventory burns carry cost every day. Generic listing photos don't create urgency.",
          },
          {
            title: "No Sales Center Assets",
            description: "Your team walks buyers through a model with nothing but a brochure.",
          },
          {
            title: "Slow Turnaround",
            description: "By the time assets arrive, the launch window has passed.",
          },
        ]}
      />

      <Solution
        eyebrow="Built to Close"
        headline={
          <>
            Assets designed for the sales{" "}
            <strong>process</strong>.
          </>
        }
        description="Every DIG package supports the close: Spec+ bundles, 48-hour QMI Close Kits, sales center video loops, and virtual staging before furniture arrives."
        ctaLabel="Explore Spec+"
        ctaHref="/services/spec"
      />

      <Proof
        eyebrow="Impact"
        headline={
          <>
            Built to reduce days on <strong>market</strong>.
          </>
        }
        stats={[
          { value: "48hr", label: "QMI Close Kit turnaround" },
          { value: "37%", label: "Avg. DOM reduction" },
          { value: "3-in-1", label: "Photo + staging + video per order" },
        ]}
        testimonial={{
          quote: "Homes are moving faster because buyers can see the lifestyle, not just the layout.",
          attribution: "VP of Sales, National Builder",
        }}
      />

      <LPCta
        headline={
          <>
            Stop losing closings to bad <strong>assets</strong>.
          </>
        }
        description="Your sales team deserves visuals that match the quality of the homes they're selling."
        primaryCta={{ label: "Book a Strategy Call", href: "/contact-page" }}
        secondaryCta={{ label: "Start the FrameFlow Challenge", href: "/frameflow-sell-faster-challenge-0210" }}
      />
    </>
  );
}
