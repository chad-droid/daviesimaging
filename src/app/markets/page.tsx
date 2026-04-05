import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DarkSection } from "@/components/DarkSection";

export const metadata: Metadata = {
  title: "Markets | Davies Imaging Group",
  description: "DIG serves builders by type, role, and region. Find the page built for you.",
};

const dimensions = [
  {
    title: "By Type",
    href: "/markets/type",
    description: "Detached, attached, luxury, BTR, multifamily. Different build types have different asset needs. Find the approach built for how you operate.",
    examples: ["Single-family detached", "Townhomes + attached", "Luxury and estate", "Build-to-rent", "Multifamily"],
  },
  {
    title: "By Role",
    href: "/markets/role",
    description: "Coordinators, directors, executives, and C-suite leaders each have different pressures. We built pages that speak directly to yours.",
    examples: ["Marketing Coordinators", "Marketing Directors", "VP level", "C-Suite"],
  },
  {
    title: "By Region",
    href: "/markets/region",
    description: "DIG operates across 28 U.S. markets in four regions, with offices in Sacramento, Dallas, and Guadalajara. Same quality, same process, everywhere.",
    examples: ["West", "Mountain", "Central", "East"],
  },
];

export default function MarketsIndex() {
  return (
    <>
      {/* Hero */}
      <DarkSection className="min-h-[55vh] py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>Markets</Eyebrow>
            <h1 className="text-text-light">Who DIG <strong>serves</strong>.</h1>
            <p className="mt-5 max-w-xl text-lg text-text-muted">
              Three ways to find the right fit: by what you build, who you are, or where you operate. Every page is written for your specific situation.
            </p>
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* Dimensions grid */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="grid gap-6 lg:grid-cols-3">
              {dimensions.map((dim) => (
                <Link
                  key={dim.href}
                  href={dim.href}
                  className="group flex flex-col rounded-xl border border-border-light bg-bg-surface p-6 transition-all hover:border-accent hover:shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-text-dark transition-colors group-hover:text-accent">
                    {dim.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-body">{dim.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {dim.examples.map((ex) => (
                      <span key={ex} className="rounded-full bg-bg-light px-2.5 py-0.5 text-[11px] text-text-muted">
                        {ex}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors group-hover:text-accent">
                    Explore <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="rounded-2xl border border-border-light bg-bg-surface p-8 text-center lg:p-12">
              <Eyebrow>Not sure where to start?</Eyebrow>
              <h2 className="mt-2">
                Just talk to <strong>someone</strong>.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-text-body">
                A 15-minute conversation with the DIG team is the fastest way to find the right service, offering, and approach for your specific situation.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Book a Strategy Call
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
