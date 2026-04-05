import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DarkSection } from "@/components/DarkSection";

export const metadata: Metadata = {
  title: "Careers | Davies Imaging Group",
  description: "Join the DIG team. We're looking for listing photographers, cinematographers, and digital production specialists across our markets.",
};

const values = [
  {
    title: "We think like marketers",
    body: "DIG isn't a photography company that also does staging. We're a marketing asset company. Everyone on the team understands why the work matters, not just how to do it.",
  },
  {
    title: "Craft matters here",
    body: "We hold a high standard because the builders we work with hold one too. Quality is the expectation, not the exception.",
  },
  {
    title: "We're building something",
    body: "The 2026 platform, digDesk, FrameFlow Studio, and Spec+ are live products with real traction. You'd be joining during a real growth phase.",
  },
  {
    title: "28 markets and growing",
    body: "We have offices in Sacramento and Dallas, production in Guadalajara, and photographers across the country. The team is distributed and the work is real.",
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
  {
    title: "Digital Production Specialist",
    type: "Full-time",
    markets: "Guadalajara",
    description: "Produce ModelMatch virtual staging and FrameFlow virtual video from builder photography. Attention to detail, consistency, and speed are the job. Experience with digital staging tools preferred.",
    applyHref: "/careers/apply/digital-production-specialist",
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
              Join a team that thinks about <strong>what happens after the shoot</strong>.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-text-muted">
              Davies Imaging Group is a homebuilder marketing asset company. We build photography, virtual staging, and video that helps builders sell homes faster. We&apos;re looking for people who care about that outcome.
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
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="rounded-2xl border border-border-light bg-bg-surface p-8 text-center lg:p-12">
              <Eyebrow>Don&apos;t See Your Role?</Eyebrow>
              <h2>
                We&apos;re always looking for <strong>great people</strong>.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-body">
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
      </section>
    </>
  );
}
