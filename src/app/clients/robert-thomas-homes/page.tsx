import type { Metadata } from "next";
import { LPHero } from "@/components/lp/LPHero";
import { LogoStrip } from "@/components/lp/LogoStrip";
import { Solution } from "@/components/lp/Solution";
import { Proof } from "@/components/lp/Proof";
import { LPCta } from "@/components/lp/LPCta";

export const metadata: Metadata = {
  title: "Robert Thomas Homes x DIG | Davies Imaging Group",
  description: "How DIG supports Robert Thomas Homes with consistent visual assets.",
};

export default function RobertThomasHomesPage() {
  return (
    <>
      <LPHero
        eyebrow="Robert Thomas Homes"
        headline={
          <>
            Assets that match the craft behind every{" "}
            <strong>home</strong>.
          </>
        }
        subheadline="DIG delivers photography, virtual staging, and video that reflects the quality and attention Robert Thomas Homes puts into every build."
        primaryCta={{ label: "Book a Strategy Call", href: "/contact-page" }}
      />

      <LogoStrip
        heading="Also trusted by"
        logos={["Kolter Homes", "Beazer Homes", "M/I Homes", "SouthSix"]}
      />

      <Solution
        eyebrow="The Partnership"
        headline={
          <>
            Consistent quality across every{" "}
            <strong>community</strong>.
          </>
        }
        description="From model home launches to spec inventory, DIG handles the full visual pipeline. FrameFlow ordering keeps everything streamlined and on schedule."
        ctaLabel="Explore FrameFlow"
        ctaHref="/offerings/frameflow"
      />

      <Proof
        eyebrow="Impact"
        headline={
          <>
            Results that <strong>compound</strong>.
          </>
        }
        stats={[
          { value: "37%", label: "Avg. DOM reduction" },
          { value: "48hr", label: "Spec turnaround" },
          { value: "10,000+", label: "Homes delivered" },
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
