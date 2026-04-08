import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Get Started | Davies Imaging Group",
  description: "Schedule a demo of digDesk and FrameFlow Studio, or create an account and start ordering today.",
};

export default function GetStartedPage() {
  return (
    <section className="min-h-screen bg-bg-surface py-28">
      <div className="mx-auto max-w-4xl px-6">
        <RevealOnScroll>
          <div className="mb-14 text-center">
            <Eyebrow>Get Started</Eyebrow>
            <h1>
              Two ways to <strong>get into digDesk</strong>.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-text-body">
              Schedule a 15-minute demo with the DIG team, or create your account directly and start ordering right away. All accounts are reviewed by our team before activation.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="grid gap-6 lg:grid-cols-2">

            {/* Path 1 — Schedule Demo */}
            <div className="flex flex-col rounded-2xl border border-border-light bg-bg-surface p-8 shadow-sm">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-bg-light">
                <svg className="h-6 w-6 text-text-dark" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>

              <div className="mb-1 flex items-center gap-2">
                <span className="rounded-full bg-bg-light px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-text-muted">Recommended for new clients</span>
              </div>

              <h2 className="mt-3 text-[1.5rem]">
                Schedule a <strong>Demo</strong>
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-text-body">
                A 15-minute walkthrough with the DIG team. We show you digDesk, FrameFlow Studio, and the Spec+ ordering flow. You ask questions. No deck, no pressure.
              </p>

              <ul className="mt-6 space-y-2.5">
                {[
                  "See digDesk and virtual staging live",
                  "Watch a Spec+ order from submission to delivery",
                  "Ask about your specific markets and volume",
                  "15 minutes, no commitment required",
                ].map((item) => (
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
                  href="/contact?intent=demo"
                  className="flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Schedule a Demo
                </Link>
                <p className="mt-3 text-center text-xs text-text-muted">
                  We respond within 1 business day to book a time
                </p>
              </div>
            </div>

            {/* Path 2 — Create Account */}
            <div className="flex flex-col rounded-2xl border-2 border-accent bg-bg-surface p-8 shadow-sm">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>

              <div className="mb-1 flex items-center gap-2">
                <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-accent">Ready to order</span>
              </div>

              <h2 className="mt-3 text-[1.5rem]">
                Create an <strong>Account</strong>
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-text-body">
                Go directly to digDesk and submit your account request. Our team reviews every new account and activates it within 1 business day. Once active, you can place Spec+ and FrameFlow Studio orders immediately. No subscription or commitment required.
              </p>

              <ul className="mt-6 space-y-2.5">
                {[
                  "Submit your account info in under 5 minutes",
                  "Admin review and activation within 1 business day",
                  "Instant access to digDesk on activation",
                  "Order Spec+ and standalone digital services right away",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-text-body">
                    <svg viewBox="0 0 16 16" className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M3 8l3 3.5 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <a
                  href="https://desk.daviesimaging.com/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Create Your Account
                </a>
                <p className="mt-3 text-center text-xs text-text-muted">
                  Accounts require admin approval before activation
                </p>
              </div>
            </div>

          </div>
        </RevealOnScroll>

        {/* Already a client */}
        <RevealOnScroll>
          <div className="mt-10 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
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
              { label: "1 business day", sub: "Account activation after admin review" },
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
  );
}
