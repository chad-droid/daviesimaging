import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DarkSection } from "@/components/DarkSection";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/programs" },
  title: "Programs",
  description: "digDesk, FrameFlow Studio, Spec+, and Regional Partnerships: how you order and manage DIG services.",
};

const platform = {
  title: "digDesk",
  href: "/programs/digdesk",
  description: "Everything you need in one place. The single point of entry to order, track, revise, and pay for all of your marketing assets.",
  cta: "Explore digDesk",
};

const offerings = [
  {
    title: "FrameFlow Studio",
    href: "/programs/frameflow",
    tag: "Ordering Platform",
    description: "Where you order ModelMatch staging and FrameFlow video inside digDesk. Upload your listing photos, with no shoot to schedule.",
    price: "Starting at $25 / image",
    cta: "Explore FrameFlow Studio",
  },
  {
    title: "Spec+",
    href: "/programs/spec-plus",
    tag: "Most Popular",
    description: "Listing photography, ModelMatch staging and a FrameFlow video in one order. 25 photos, 8 staged images, and 1 video for $600 flat.",
    price: "$600 flat per listing",
    cta: "See Spec+ Details",
    featured: true,
  },
];

export default function ProgramsIndex() {
  return (
    <div className="theme-dark">
      <JsonLd data={buildBreadcrumbSchema([{ name: "Programs", path: "/programs" }])} />
      {/* Hero */}
      <DarkSection className="py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>Programs</Eyebrow>
            <h1 className="text-text-light">How you <strong>order</strong>.</h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-text-muted">
              How you order from DIG. There is no subscription and no minimum.
            </p>
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* digDesk platform banner */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="rounded-2xl border border-border-light bg-bg-dark p-8 lg:p-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <Eyebrow dark>The Platform</Eyebrow>
                  <h2 className="mt-2 text-text-light">
                    Everything runs through <strong>digDesk</strong>.
                  </h2>
                  <p className="mt-3 max-w-xl text-text-muted text-[1.0625rem] leading-relaxed">
                    {platform.description}
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end lg:gap-3">
                  <Link
                    href={platform.href}
                    className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover whitespace-nowrap"
                  >
                    {platform.cta} &rarr;
                  </Link>
                  <a
                    href="https://desk.daviesimaging.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-text-muted transition-colors hover:border-white/40 hover:text-text-light whitespace-nowrap text-center"
                  >
                    Log In
                  </a>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Offerings grid */}
      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-10 text-center">
              <Eyebrow>Packages and Programs</Eyebrow>
              <h2>What builders <strong>order</strong>.</h2>
            </div>
            <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-2">
              {offerings.map((off) => (
                <div
                  key={off.href}
                  className={`flex flex-col rounded-xl border p-6 ${
                    off.featured
                      ? "border-accent bg-bg-surface shadow-md"
                      : "border-border-light bg-bg-surface"
                  }`}
                >
                  <div className="mb-4 flex items-start justify-between gap-2">
                    <h3 className="text-xl font-semibold text-text-dark">{off.title}</h3>
                    {off.tag && (
                      <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        off.featured ? "bg-accent/10 text-accent" : "bg-bg-light text-text-muted"
                      }`}>
                        {off.tag}
                      </span>
                    )}
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-text-body">{off.description}</p>
                  <div className="mt-6 border-t border-border-light pt-4">
                    <p className={`text-sm font-semibold ${off.featured ? "text-accent" : "text-text-dark"}`}>
                      {off.price}
                    </p>
                  </div>
                  <Link
                    href={off.href}
                    className={`mt-4 inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                      off.featured
                        ? "text-accent hover:underline"
                        : "text-text-dark hover:text-accent"
                    }`}
                  >
                    {off.cta} <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Get started CTA */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="text-center">
              <Eyebrow dark>Ready to Order</Eyebrow>
              <h2 className="text-text-light">
                Two ways to get <strong>into digDesk</strong>.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-muted">
                Schedule a 15-minute demo and we will walk you through the platform, or submit your account request directly and start ordering within one business day.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/get-started"
                  className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Get Started
                </Link>
                <Link
                  href="/programs/digdesk"
                  className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
                >
                  Learn about digDesk &rarr;
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>
    </div>
  );
}
