import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { DynamicImage } from "@/components/DynamicImage";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";
import { DarkSection } from "@/components/DarkSection";
import { TestimonialBand } from "@/components/TestimonialBand";

export const metadata: Metadata = {
  alternates: { canonical: "/programs/regional-partnerships" },
  title: "Regional Partnerships",
  description: "One partner in every market you build in. Volume pricing, dedicated capacity, and digDesk ordering for national and regional builders.",
};

const benefits = [
  {
    title: "Volume pricing",
    body: "Commit to volume across your communities and you get discounted rates on all DIG services, structured by your annual volume.",
  },
  {
    title: "Dedicated capacity",
    body: "You get reserved production capacity, so you are not competing for scheduling windows during peak launch seasons.",
  },
  {
    title: "Your brand guidelines, followed",
    body: "Your brand guide, your color standards, and your ModelMatch galleries. Every shoot in every market follows the same brief.",
  },
  {
    title: "Single point of contact",
    body: "One account team manages all four regions for you, so you are not coordinating between vendors or following up across markets.",
  },
  {
    title: "Centralized ordering through digDesk",
    body: "Your marketing team orders through digDesk in every market, with one place to track your assets across every community.",
  },
  {
    title: "Two U.S. regions live in 2026",
    body: "We launched regional partnerships in two large states in 2026. Volume builders in those regions already have committed pricing and dedicated coverage.",
  },
];

const regions = [
  { name: "West", markets: "California, Nevada, Arizona, Pacific Northwest" },
  { name: "Mountain", markets: "Colorado, Utah, Idaho, New Mexico" },
  { name: "Central", markets: "Texas, Oklahoma, Kansas, Missouri" },
  { name: "East", markets: "Florida, Georgia, Carolinas, Mid-Atlantic" },
];

export default function RegionalPartnershipsPage() {
  return (
    <>
      {/* Hero */}
      <DarkSection className="py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <EditableHero
              slotId="programs-regional-partnerships-hero"
              eyebrowDefault="Programs / Regional Partnerships"
              headlineDefault="One partner in every market <strong>you build in</strong>."
              subheadDefault="You get a single point of contact for photography, staging, and video across all four U.S. regions, with volume pricing and dedicated capacity."
            />
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Start a Partnership Conversation
              </Link>
              <Link
                href="/markets/region"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                See all 28 markets &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* Who this is for */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="grid gap-14 lg:grid-cols-[1fr_2fr]">
              <div className="pt-1">
                <EditableTextContent
                  slotId="programs-regional-partnerships-scale"
                  eyebrowDefault="Built For Scale"
                  headlineDefault="For builders in <strong>multiple markets</strong>."
                  bodyDefault=""
                />
              </div>
              <div className="space-y-5 text-[1.0625rem] leading-relaxed text-text-body">
                <p>
                  Regional Partnerships are for builders doing 300 or more homes a year across multiple markets. If you&apos;re managing community rollouts in two or more states, you get one partner and volume pricing.
                </p>
                <p>
                  It is a commitment on both sides. We reserve capacity for your markets, and you commit to volume.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Image + region context */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="overflow-hidden rounded-2xl bg-bg-surface">
                <DynamicImage
                  slotId="offerings-regional-partnerships-img"
                  className="h-full w-full"
                  fallbackClass="h-full w-full bg-gradient-to-br from-bg-surface to-border-light"
                  aspectRatio="4/3"
                />
              </div>
              <div>
                <EditableTextContent
                  slotId="programs-regional-partnerships-regions"
                  eyebrowDefault="Four Regions"
                  headlineDefault="The same quality in <strong>all four regions</strong>."
                  bodyDefault=""
                />
                <div className="mt-8 space-y-4">
                  {regions.map((r) => (
                    <div key={r.name} className="border-b border-border-light pb-4 last:border-0 last:pb-0">
                      <p className="text-sm font-semibold text-text-dark">{r.name}</p>
                      <p className="mt-1 text-sm text-text-body">{r.markets}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link
                    href="/markets/region"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                  >
                    See the interactive market map &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <EditableTextContent
                slotId="programs-regional-partnerships-benefits"
                eyebrowDefault="What You Get"
                headlineDefault="What you get as a <strong>regional partner</strong>."
                bodyDefault=""
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b, i) => (
                <div key={i} className="rounded-xl border border-border-light bg-bg-surface p-6">
                  <h4 className="text-sm font-semibold text-text-dark">{b.title}</h4>
                  <p
                    className="mt-2 text-sm leading-relaxed text-text-body"
                    dangerouslySetInnerHTML={{ __html: b.body }}
                  />
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* FrameFlow connection */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
              <div className="pt-1">
                <EditableTextContent
                  slotId="programs-regional-partnerships-frameflow"
                  eyebrowDefault="digDesk Powered"
                  headlineDefault="Order the same way in <strong>every market</strong>."
                  bodyDefault=""
                  dark={true}
                />
              </div>
              <div className="space-y-5 text-[1.0625rem] leading-relaxed text-text-muted">
                <p>
                  Your marketing team orders through digDesk regardless of which market you&apos;re working in: ModelMatch staging, FrameFlow video, and photography coordinated by your account team.
                </p>
                <p>
                  Your billing, asset delivery, and order tracking all run through the same account.
                </p>
                <div className="pt-2">
                  <Link
                    href="/programs/frameflow"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                  >
                    Learn how FrameFlow Studio works &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* Customer proof */}
      <TestimonialBand ids={["jaime-pilot", "linnea-reach"]} />

      {/* Final CTA */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <EditableTextContent
              slotId="programs-regional-partnerships-cta"
              eyebrowDefault="Start the Conversation"
              headlineDefault="Building in <strong>more than one market</strong>?"
              bodyDefault="Regional partnership pricing is set directly with the DIG team. Start with a strategy call so we can understand your volume, your markets, and your brand."
              dark={true}
            />
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Book a Strategy Call
              </Link>
              <Link
                href="/markets/region"
                className="text-sm font-medium text-white/60 transition-colors hover:text-white"
              >
                View our markets &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>
    </>
  );
}
