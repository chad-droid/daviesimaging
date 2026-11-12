import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DarkSection } from "@/components/DarkSection";

export const metadata: Metadata = {
  alternates: { canonical: "/markets" },
  title: "Markets",
  description: "Find how DIG helps you by what you build, your role, or the markets you build in.",
};

const dimensions = [
  {
    title: "By Type",
    href: "/markets/type",
    description: "Detached, attached, luxury, build-to-rent, or multifamily. See which services fit what you build.",
    examples: ["Single-family detached", "Townhomes + attached", "Luxury and estate", "Build-to-rent", "Multifamily"],
  },
  {
    title: "By Role",
    href: "/markets/role",
    description: "Whether you place the orders or set the budget, see how DIG helps you and your team.",
    examples: ["Marketing Coordinators", "Marketing Directors", "VP level", "C-Suite"],
  },
  {
    title: "By Region",
    href: "/markets/region",
    description: "You get the same quality in 28 U.S. markets across four regions, with offices in Sacramento, Dallas, and Guadalajara.",
    examples: ["West", "Mountain", "Central", "East"],
  },
];

export default function MarketsIndex() {
  return (
    <>
      {/* Hero */}
      <DarkSection className="py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>Markets</Eyebrow>
            <h1 className="text-text-light">Find how DIG <strong>helps you</strong>.</h1>
            <p className="mt-5 max-w-xl text-lg text-text-muted">
              Find your fit by what you build, your role, or where you build.
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
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="text-center">
              <Eyebrow dark>Not sure where to start?</Eyebrow>
              <h2 className="text-text-light">
                Just talk to <strong>someone</strong>.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-text-muted">
                A 15-minute conversation with our team is the fastest way to find the right services for your communities.
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
      </DarkSection>
    </>
  );
}
