import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Programs | Davies Imaging Group",
  description: "digDesk, FrameFlow Studio, Spec+, and Regional Partnerships. How builders purchase and manage DIG services.",
};

const platform = {
  title: "digDesk",
  href: "/programs/digdesk",
  description: "The DIG client portal. Every service, every order, every asset — one dashboard. FrameFlow Studio, Spec+, listing photography, Premium photography requests, and ModelMatch gallery management all live here.",
  cta: "Explore digDesk",
};

const offerings = [
  {
    title: "FrameFlow Studio",
    href: "/programs/frameflow",
    tag: "Ordering Platform",
    description: "The digital production module inside digDesk. Upload listing photos and receive ModelMatch-staged images and virtual video without scheduling a photographer. Entry point for all digital orders.",
    price: "Starting at $25 / image",
    cta: "Explore FrameFlow Studio",
  },
  {
    title: "Spec+",
    href: "/programs/spec-plus",
    tag: "Most Popular",
    description: "The complete spec home asset package. 25 listing photos, 8 ModelMatch virtually staged images, and 1 virtual video. One coordinated order, one delivery, $600 flat.",
    price: "$600 flat per listing",
    cta: "See Spec+ Details",
    featured: true,
  },
  {
    title: "Regional Partnerships",
    href: "/programs/regional-partnerships",
    tag: "VP + C-Suite",
    description: "Volume commitment program for national and regional builders. Price discounts in exchange for volume guarantees. Dedicated capacity and brand consistency across all four U.S. regions.",
    price: "Custom pricing by volume",
    cta: "Explore Regional Partnerships",
  },
];

export default function ProgramsIndex() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[55vh] bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>Programs</Eyebrow>
            <h1 className="text-text-light">How builders <strong>purchase</strong>.</h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-text-muted">
              Streamlined packages and platforms designed for how builder marketing teams actually buy. No subscriptions, no minimums, no surprises.
            </p>
          </RevealOnScroll>
        </div>
      </section>

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
            <div className="grid gap-6 lg:grid-cols-3">
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
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="rounded-2xl border border-border-light bg-bg-surface p-8 text-center lg:p-12">
              <Eyebrow>Ready to Order</Eyebrow>
              <h2 className="mt-2">
                Two ways to get <strong>into digDesk</strong>.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-body">
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
                  className="text-sm font-medium text-text-body transition-colors hover:text-accent"
                >
                  Learn about digDesk &rarr;
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
