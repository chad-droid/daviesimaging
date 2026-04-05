import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DynamicImage } from "@/components/DynamicImage";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";

export const metadata: Metadata = {
  title: "Regional Partnerships | Davies Imaging Group",
  description: "One visual partner across every market. Volume pricing, brand consistency, and FrameFlow ordering for national and regional builders.",
};

const benefits = [
  {
    title: "Volume pricing",
    body: "Commit to volume across your communities and unlock discounted rates across all DIG services. Pricing is structured by annual volume, not one-off negotiation.",
  },
  {
    title: "Dedicated capacity",
    body: "Regional partners get reserved production capacity. No competing for scheduling windows during peak launch seasons across your markets.",
  },
  {
    title: "Brand guidelines enforcement",
    body: "Your brand guide, your color standards, your staging references. Every shoot in every market follows the same brief, so your portfolio looks consistent from West to East.",
  },
  {
    title: "Single point of contact",
    body: "One account team manages all four regions. You don&apos;t coordinate between vendors or follow up across markets. DIG handles it.",
  },
  {
    title: "Centralized ordering through digDesk",
    body: "Your marketing team orders through digDesk regardless of market. One platform, one process, and one place to track assets across every community.",
  },
  {
    title: "Two U.S. regions live in 2026",
    body: "DIG launched regional partnership programs in two large states in 2026. Volume builders in those regions are already benefiting from committed pricing and dedicated coverage.",
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
      <section className="min-h-[60vh] bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>Programs / Regional Partnerships</Eyebrow>
            <EditableHero
              slotId="programs-regional-partnerships-hero"
              headlineDefault="One partner, every <strong>market</strong>."
              subheadDefault="DIG's regional partnership model gives national and regional builders a single point of contact for photography, staging, and video across all four U.S. regions. Volume pricing. Dedicated capacity. Brand consistency enforced."
            />
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
      </section>

      {/* Who this is for */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="grid gap-14 lg:grid-cols-[1fr_2fr]">
              <div className="pt-1">
                <Eyebrow>Built For Scale</Eyebrow>
                <EditableTextContent
                  slotId="programs-regional-partnerships-scale"
                  headlineDefault="Volume pricing without quality <strong>compromise</strong>."
                  bodyDefault=""
                />
              </div>
              <div className="space-y-5 text-[1.0625rem] leading-relaxed text-text-body">
                <p>
                  Regional Partnerships are designed for builders doing 300 or more homes annually across multiple markets. If you&apos;re managing community rollouts in two or more states, coordinating with a single vendor at discounted volume pricing is a meaningful operational advantage.
                </p>
                <p>
                  This program is a commitment on both sides. DIG reserves capacity for your markets. You commit to volume. The result is faster scheduling, consistent results, and a partner who knows your brand as well as you do.
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
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-bg-surface">
                <DynamicImage
                  slotId="offerings-regional-partnerships-img"
                  className="h-full w-full object-cover"
                  fallbackClass="h-full w-full"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bg-surface to-border-light [&:has(img)]:hidden">
                  <span className="text-xs font-medium uppercase tracking-widest text-text-muted">Regional Coverage</span>
                </div>
              </div>
              <div>
                <Eyebrow>Four Regions</Eyebrow>
                <EditableTextContent
                  slotId="programs-regional-partnerships-regions"
                  headlineDefault="Consistent quality from West to <strong>East</strong>."
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
              <Eyebrow>What You Get</Eyebrow>
              <EditableTextContent
                slotId="programs-regional-partnerships-benefits"
                headlineDefault="Six things that change when you partner <strong>at scale</strong>."
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
      <section className="bg-bg-dark py-24 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
              <div className="pt-1">
                <Eyebrow dark>FrameFlow Powered</Eyebrow>
                <EditableTextContent
                  slotId="programs-regional-partnerships-frameflow"
                  headlineDefault="Centralized ordering across every <strong>region</strong>."
                  bodyDefault=""
                  dark={true}
                />
              </div>
              <div className="space-y-5 text-[1.0625rem] leading-relaxed text-text-muted">
                <p>
                  Your marketing team orders through digDesk regardless of which market you&apos;re working in. FrameFlow Studio handles virtual staging and virtual video. Photography is coordinated by your dedicated account team. One platform, one process.
                </p>
                <p>
                  Billing, asset delivery, and order tracking are all centralized. No chasing down individual photographers in different states. No disconnected vendor invoices. Everything runs through the same account.
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
      </section>

      {/* Final CTA */}
      <section className="bg-bg-dark py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow dark>Start the Conversation</Eyebrow>
            <EditableTextContent
              slotId="programs-regional-partnerships-cta"
              headlineDefault="Ready to build a partnership that <strong>scales</strong>?"
              bodyDefault="Regional partnership pricing and structure is negotiated directly with the DIG team. The conversation starts with a strategy call to understand your volume, markets, and brand requirements."
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
      </section>
    </>
  );
}
