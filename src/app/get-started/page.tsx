import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DarkSection } from "@/components/DarkSection";

export const metadata: Metadata = {
  alternates: { canonical: "/get-started" },
  title: "Get Started",
  description: "Schedule a demo with the DIG team, or start a free trial and see one of your own spec homes staged with ModelMatch.",
};

// Same order and titles as the tiles on /contact: trial first, then demo.
const PATHS = [
  {
    tag: "Your first home is free",
    title: "Start Free Trial",
    description:
      "See ModelMatch on one of your own homes before you order anything. The first eight staged images are on us.",
    points: [
      "Eight staged images of your own spec home, free",
      "Staged with furniture from your own model homes",
      "Delivered in 1 business day",
      "No contract and no credit card",
    ],
    href: "/modelmatch-datalibrary",
    cta: "Start My Free Trial",
    note: "Send one model home and one vacant spec to begin",
  },
  {
    tag: "Recommended for new clients",
    title: "Schedule Demo",
    description:
      "A 15-minute walkthrough with the DIG team. We show you digDesk, FrameFlow Studio, and the Spec+ ordering flow. You ask questions. No deck, no pressure.",
    points: [
      "See digDesk and virtual staging live",
      "Watch a Spec+ order from submission to delivery",
      "Ask about your specific markets and volume",
      "15 minutes, no commitment required",
    ],
    href: "/contact?intent=demo",
    cta: "Schedule a Demo",
    note: "Leave your details, then pick a time on the next screen",
  },
];

export default function GetStartedPage() {
  return (
    <div className="theme-dark">
      <DarkSection className="py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>Get Started</Eyebrow>
            <h1 className="text-text-light">
              Two ways to <strong>get started</strong>.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-text-muted">
              Schedule a 15-minute demo with the DIG team, or start a free trial and see one of your own spec homes staged with ModelMatch.
            </p>
          </RevealOnScroll>
        </div>
      </DarkSection>
    <section className="bg-bg-surface py-20">
      <div className="mx-auto max-w-4xl px-6">

        <RevealOnScroll>
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
            {PATHS.map((path, i) => (
              <div
                key={path.title}
                className={`flex flex-col rounded-2xl border p-7 lg:p-9 ${
                  i === 0
                    ? "theme-light border-bg-surface bg-bg-surface"
                    : "border-border-light bg-bg-light"
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent">{path.tag}</p>
                <h2 className="mt-5 text-[2rem] leading-[1.1] lg:text-[2.5rem]">{path.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-body lg:text-base">{path.description}</p>

                <ul className="mt-6 space-y-2.5">
                  {path.points.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-text-body">
                      <svg viewBox="0 0 16 16" className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M3 8l3 3.5 7-7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <Link
                    href={path.href}
                    className="flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                  >
                    {path.cta}
                  </Link>
                  <p className="mt-3 text-center text-xs text-text-muted">{path.note}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Already a client */}
        <RevealOnScroll>
          <div className="mt-10 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
            <span className="text-sm text-text-muted">Ready to order?</span>
            <a
              href="https://desk.daviesimaging.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-text-dark transition-colors hover:text-accent"
            >
              Create a digDesk account &rarr;
            </a>
            <span className="hidden text-border-light sm:inline">|</span>
            <span className="text-sm text-text-muted">Already have an account?</span>
            <a
              href="https://desk.daviesimaging.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-text-dark transition-colors hover:text-accent"
            >
              Log in to digDesk &rarr;
            </a>
          </div>
        </RevealOnScroll>

        {/* Trust notes */}
        <RevealOnScroll>
          <div className="mt-16 grid gap-4 rounded-2xl border border-border-light bg-bg-light p-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "28 U.S. markets", sub: "Photography and digital services nationwide" },
              { label: "95% first-delivery success rate", sub: "Assets ready to publish without changes" },
            { label: "Pay as you go", sub: "No subscription, no minimum commitment" },
              { label: "1 business day", sub: "Free trial images delivered" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-sm font-semibold text-text-dark">{item.label}</p>
                <p className="mt-1 text-xs text-text-muted">{item.sub}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
    </div>
  );
}
