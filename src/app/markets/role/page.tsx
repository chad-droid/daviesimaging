import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { EditableTextContent } from "@/components/EditableTextContent";
import { DarkSection } from "@/components/DarkSection";

export const metadata: Metadata = {
  title: "Markets by Role | Davies Imaging Group",
  description: "DIG serves marketing coordinators, directors, executives, and C-suite leaders at homebuilders. Find the page built for your role.",
};

const roles = [
  {
    title: "Coordinators",
    description: "You schedule shoots, submit orders, and manage assets day to day. FrameFlow Studio and digDesk are built to make your workflow faster and your deliveries more predictable.",
    pain: "Chasing vendors, missed deadlines, inconsistent output",
    solution: "One platform, one team, 95% first-delivery success rate",
    href: "/markets/role/coordinators",
  },
  {
    title: "Marketing Directors",
    description: "Brand consistency across communities, multi-market rollouts, and assets that perform across every channel. DIG aligns creative to your marketing strategy, not just your shoot calendar.",
    pain: "Inconsistent photography across markets, assets that only live in one place",
    solution: "Standardized production across 28 markets, assets built for downstream deployment",
    href: "/markets/role/directors",
  },
  {
    title: "VP Level",
    description: "Regional coverage, vendor consolidation, and scalable asset partnerships that reduce cost and complexity across your portfolio.",
    pain: "Managing multiple vendors across regions, unpredictable quality and pricing",
    solution: "Regional Partnerships with volume pricing, dedicated capacity, and one account team",
    href: "/markets/role/executive",
  },
  {
    title: "C-Suite",
    description: "Strategic growth, cost efficiency, and competitive advantage through visual marketing that moves inventory faster and supports your sales team.",
    pain: "Days on market, carry costs, sales team without the right tools to close",
    solution: "Spec+ packages that reduce time from listing to sale through superior marketing assets",
    href: "/markets/role/c-suite",
  },
];

export default function ByRolePage() {
  return (
    <>
      {/* Hero */}
      <DarkSection className="min-h-[55vh] py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>About / Who We Help</Eyebrow>
            <h1 className="text-text-light">
              Built for the people who move <strong>homes</strong>.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-text-muted">
              Every role in a homebuilding organization has different pressures. We built pages that speak directly to yours.
            </p>
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* Roles */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="grid gap-6 sm:grid-cols-2">
              {roles.map((role) => (
                <Link
                  key={role.href}
                  href={role.href}
                  className="group flex flex-col rounded-xl border border-border-light bg-bg-surface p-6 transition-all hover:border-accent hover:shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-text-dark transition-colors group-hover:text-accent">
                    {role.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-body">{role.description}</p>
                  <div className="mt-5 space-y-2 border-t border-border-light pt-4">
                    <div className="flex items-start gap-2 text-xs text-text-muted">
                      <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-text-muted" />
                      <span><strong className="text-text-body">Problem:</strong> {role.pain}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-text-muted">
                      <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span><strong className="text-text-body">DIG answer:</strong> {role.solution}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Regional partnerships callout */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="rounded-2xl border border-border-light bg-bg-surface p-8 text-center lg:p-12">
              <EditableTextContent
                slotId="markets-role-scale"
                eyebrowDefault="Scale"
                headlineDefault="Need coverage across multiple <strong>markets</strong>?"
                bodyDefault="DIG's Regional Partnerships program gives national builders one partner, volume pricing, and consistent quality across every region."
              />
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/programs/regional-partnerships"
                  className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Explore Regional Partnerships
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-medium text-text-body transition-colors hover:text-accent"
                >
                  Book a strategy call &rarr;
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
