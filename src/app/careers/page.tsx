import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DarkSection } from "@/components/DarkSection";

export const metadata: Metadata = {
  alternates: { canonical: "/careers" },
  title: "Careers",
  description: "Join the DIG team. We're looking for listing photographers and cinematographers across our markets.",
};

const values = [
  {
    title: "We think like marketers",
    body: "Everyone on the team understands why the work matters to a builder's marketing team, as well as how to do it.",
  },
  {
    title: "Craft matters here",
    body: "We hold a high standard because the builders we work with hold one too.",
  },
  {
    title: "We're building something",
    body: "digDesk, FrameFlow Studio, and Spec+ are live products, and you'd be joining while we grow.",
  },
  {
    title: "28 markets and growing",
    body: "We have offices in Sacramento and Dallas, production in Guadalajara, and photographers across the country.",
  },
];

const openRoles = [
  {
    title: "Listing Photographer",
    type: "Freelance / Contract",
    markets: "Any U.S. market",
    description: "DIG works with experienced listing photographers across all 28 markets and is actively expanding its network. If you shoot residential or homebuilder work and want consistent volume, let's talk.",
    applyHref: "/careers/apply/listing-photographer",
  },
  {
    title: "Cinematographer",
    type: "Freelance / Contract",
    markets: "Any U.S. market",
    description: "DIG is building out its video production network for community walkthroughs, lifestyle campaigns, and builder brand films. If you shoot real estate or homebuilder video and want consistent work, we want to hear from you.",
    applyHref: "/careers/apply/cinematographer",
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <DarkSection className="min-h-[55vh] py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>Careers at DIG</Eyebrow>
            <h1 className="text-text-light">
              Help the world&rsquo;s best home builders look <strong>their best</strong>.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-text-muted">
              Davies Imaging Group is a visual asset platform for home builders. We&apos;re looking for photographers and cinematographers who want to make the world&apos;s best home builders look their best.
            </p>
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* Values */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <Eyebrow>Why DIG</Eyebrow>
              <h2>
                What it&apos;s like to <strong>work here</strong>.
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {values.map((v, i) => (
                <div key={i} className="rounded-xl border border-border-light bg-bg-surface p-6">
                  <h4 className="text-base font-semibold text-text-dark">{v.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-text-body">{v.body}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Open roles */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <Eyebrow>Open Positions</Eyebrow>
              <h2>
                Roles we&apos;re <strong>actively filling</strong>.
              </h2>
            </div>
            <div className="space-y-4">
              {openRoles.map((role, i) => (
                <div key={i} className="rounded-xl border border-border-light bg-bg-surface p-6 lg:p-8">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-text-dark">{role.title}</h3>
                      <div className="mt-1.5 flex flex-wrap gap-2">
                        <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-accent">
                          {role.type}
                        </span>
                        <span className="rounded-full bg-bg-light px-2.5 py-0.5 text-[11px] text-text-muted">
                          {role.markets}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={role.applyHref}
                      className="mt-2 flex-shrink-0 rounded-full border border-border-light px-4 py-1.5 text-sm font-medium text-text-body transition-colors hover:border-accent hover:text-accent sm:mt-0"
                    >
                      Apply &rarr;
                    </Link>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-text-body">{role.description}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* General interest */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="text-center">
              <Eyebrow dark>Don&apos;t See Your Role?</Eyebrow>
              <h2 className="text-text-light">
                We&apos;re always looking for <strong>great people</strong>.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-muted">
                If you&apos;re a photographer, editor, or someone who understands homebuilder marketing and wants to do better work, send us a note. We hire for fit as much as for role.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Introduce Yourself
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>
    </>
  );
}
