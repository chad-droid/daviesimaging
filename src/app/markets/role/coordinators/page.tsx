import type { Metadata } from "next";
import { LPHero } from "@/components/lp/LPHero";
import { LogoStrip } from "@/components/lp/LogoStrip";
import { PainPoints } from "@/components/lp/PainPoints";
import { Solution } from "@/components/lp/Solution";
import { Proof } from "@/components/lp/Proof";
import { LPCta } from "@/components/lp/LPCta";

export const metadata: Metadata = {
  title: "For Coordinators | Davies Imaging Group",
  description: "DIG and digDesk make scheduling, ordering, and asset management faster for marketing coordinators.",
};

export default function CoordinatorsPage() {
  return (
    <>
      <LPHero
        eyebrow="For Coordinators"
        headline={<>One platform to manage every <strong>order</strong>.</>}
        subheadline="digDesk replaces the email chains, spreadsheets, and vendor juggling. Schedule shoots, order staging, track delivery, all in one place."
        primaryCta={{ label: "Open digDesk", href: "/programs/digdesk" }}
        secondaryCta={{ label: "Book a Demo", href: "/contact" }}
      />
      <LogoStrip logos={["Kolter Homes", "Beazer Homes", "M/I Homes", "Robert Thomas Homes", "SouthSix"]} />
      <PainPoints
        eyebrow="Daily Friction"
        headline={<>Too many vendors, too many <strong>threads</strong>.</>}
        points={[
          { title: "Scheduling Chaos", description: "Coordinating photographers, stagers, and videographers across communities burns hours every week." },
          { title: "No Single Source", description: "Assets scattered across email, Dropbox, and vendor portals. Finding the right file takes longer than it should." },
          { title: "Reorder Friction", description: "Every new community means starting from scratch with vendor coordination." },
        ]}
      />
      <Solution
        eyebrow="digDesk"
        headline={<>Order, track, and receive in one <strong>app</strong>.</>}
        description="digDesk centralizes ordering for photography, virtual staging, virtual video, and Spec+ packages. One login, one dashboard, every asset delivered and organized."
        ctaLabel="Explore digDesk"
        ctaHref="/programs/digdesk"
      />
      <Proof
        eyebrow="Impact"
        headline={<>Less coordination, more <strong>output</strong>.</>}
        stats={[
          { value: "1", label: "Platform for all orders" },
          { value: "48hr", label: "Spec turnaround" },
          { value: "28", label: "Markets supported" },
        ]}
      />
      <LPCta
        headline={<>Ready to simplify your <strong>workflow</strong>?</>}
        primaryCta={{ label: "Book a Demo", href: "/contact" }}
        secondaryCta={{ label: "Explore digDesk", href: "/programs/digdesk" }}
      />
    </>
  );
}
