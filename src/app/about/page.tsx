import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";
import { DarkSection } from "@/components/DarkSection";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About Us",
  description:
    "DIG is a visual asset platform for home builders, aiding your marketing team from lead to launch to listing.",
};

const pillars = [
  {
    title: "You order everything in one place",
    body: "Everything is ordered through digDesk, the single point of entry to manage your orders, revisions, and payments.",
  },
  {
    title: "Photographers already in your market",
    body: "We have national partnerships with some of the industry's most recognized brands, meaning their photographers are already operating in your market.",
  },
  {
    title: "You save days of listing time",
    body: "Our services minimize the time to order everything you need to communicate your value to buyers in any market, saving lean marketing teams days of valuable listing time.",
  },
];

const stats = [
  { value: "28", label: "Markets nationwide" },
  { value: "95%", label: "First-delivery success rate" },
  { value: "72 hrs", label: "Spec+ delivery after shoot" },
  { value: "5-Star", label: "Client reviews" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <DarkSection className="py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <EditableHero
              slotId="about-main-hero"
              eyebrowDefault="About / Why We Exist"
              headlineDefault="Our team is built around one simple value: <strong>we take care of you</strong>."
              subheadDefault="Great marketing is an operational force multiplier. If your brand needs a boost, you only need one partner to deliver remarkable results."
            />
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* Origin Story */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="grid gap-14 lg:grid-cols-[1fr_2fr]">
              <div className="pt-1">
                <EditableTextContent
                  slotId="about-origin"
                  eyebrowDefault="Origin"
                  headlineDefault="We started with <strong>model home photography</strong>."
                  bodyDefault=""
                />
              </div>
              <div className="space-y-5 text-[1.0625rem] leading-relaxed text-text-body">
                <p>
                  Our launch services are what DIG&apos;s reputation was built on: model home photography, video, and Matterport for the world&apos;s best home builders.
                </p>
                <p>
                  Since then our services have expanded from our core model home photography to also include listing photography, ModelMatch virtual staging, and Flow video, so you can get all the assets you need from lead to launch to list.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-bg-light py-16">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s, i) => (
                <div key={i} className="rounded-xl border border-border-light bg-bg-surface p-6 text-center">
                  <p className="text-3xl font-semibold text-text-dark" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-accent">{s.label}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* We Understand */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="grid gap-14 lg:grid-cols-[1fr_2fr]">
              <div className="pt-1">
                <EditableTextContent
                  slotId="about-perspective"
                  eyebrowDefault="Perspective"
                  headlineDefault="Built for home builder <strong>marketing teams</strong>."
                  bodyDefault=""
                />
              </div>
              <div className="space-y-5 text-[1.0625rem] leading-relaxed text-text-body">
                <p>
                  Whether you&apos;re pre-selling a new community, showcasing a new model park, or getting your new listings online, our suite of marketing services is designed to make the world&apos;s best home builders look their best.
                </p>
                <p>
                  Regardless of the market you operate in, you get the same award-winning quality in each of our service lines. We&apos;re proud to serve 28 markets across the United States, and that&apos;s growing.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* How we think */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <EditableTextContent
                slotId="about-approach"
                eyebrowDefault="Our Approach"
                headlineDefault="What you get with <strong>DIG</strong>."
                bodyDefault=""
                dark={true}
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {pillars.map((p, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/14"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-mono text-[10px] text-white/25">0{i + 1}</span>
                  </div>
                  <h4 className="text-base font-semibold text-text-light">{p.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">{p.body}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* Five-Step Strategy */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="grid gap-14 lg:grid-cols-[1fr_2fr]">
              <div className="pt-1">
                <EditableTextContent
                  slotId="about-how-we-work"
                  eyebrowDefault="How We Work"
                  headlineDefault="One team of <strong>specialists</strong>."
                  bodyDefault=""
                />
              </div>
              <div className="space-y-5 text-[1.0625rem] leading-relaxed text-text-body">
                <p>
                  Instead of managing multiple vendors across multiple processes just to get a finished set of marketing assets, you work with one team that knows how to bring it all together.
                </p>
                <p>
                  You feel taken care of because communication is fast, scheduling is easy, and assets are delivered right the first time. 95% of our deliveries are ready to post without any changes needed.
                </p>
                <div className="pt-2">
                  <Link
                    href="/about/how-we-do-it"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                  >
                    How we do it &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <EditableTextContent
              slotId="about-cta"
              eyebrowDefault="Let's Work Together"
              headlineDefault="Have ambitious marketing and sales goals <strong>this year</strong>?"
              bodyDefault="Reach out so we can help you execute with operational excellence and deliver breathtaking quality to your home buyers in each of the markets you build in. Your satisfaction is guaranteed."
              dark={true}
            />
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Book a Strategy Call
              </Link>
              <Link
                href="/programs/digdesk"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                Explore digDesk &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>
    </>
  );
}
