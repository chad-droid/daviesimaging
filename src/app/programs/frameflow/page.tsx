import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { DynamicImage } from "@/components/DynamicImage";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";
import { DarkSection } from "@/components/DarkSection";

export const metadata: Metadata = {
  alternates: { canonical: "/programs/frameflow" },
  title: "FrameFlow",
  description: "FrameFlow Studio is where you order ModelMatch staging and FrameFlow video inside digDesk, from the photos you already have.",
};

const capabilities = [
  { label: "ModelMatch", desc: "Staging built from your own model home merchandising", href: "/services/virtual-staging" },
  { label: "FrameFlow", desc: "Lifelike video from your existing images", href: "/services/virtual-video" },
];

const reasons = [
  {
    title: "No shoot to schedule",
    body: "FrameFlow Studio works from the photography you already have. Upload your listing photos and get staged images and video.",
  },
  {
    title: "Built from your own models",
    body: "ModelMatch uses your model home merchandising, so every result looks like it belongs in your community.",
  },
  {
    title: "One listing or a whole community",
    body: "Order for a single listing or across multiple communities.",
  },
  {
    title: "Part of Spec+",
    body: "Bundle these with our listing photography and you have Spec+: one order and one flat price.",
  },
];

export default function FrameFlowPage() {
  return (
    <>
      {/* Hero */}
      <DarkSection className="min-h-[60vh] py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <EditableHero
              slotId="programs-frameflow-hero"
              eyebrowDefault="Programs / FrameFlow Studio"
              headlineDefault="Need staging and video from the photos you <strong>already have</strong>?"
              subheadDefault="FrameFlow Studio is where you order them inside digDesk. Upload your listing photos and get ModelMatch staged images and FrameFlow video."
            />
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="https://desk.daviesimaging.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Open in digDesk
              </a>
              <Link
                href="/contact"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                Book a demo &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* What FrameFlow does */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <EditableTextContent
                slotId="programs-frameflow-what-it-does"
                eyebrowDefault="What FrameFlow Does"
                headlineDefault="Two things you can order <strong>without a shoot</strong>."
                bodyDefault="FrameFlow Studio handles ModelMatch virtual staging and FrameFlow video. Both work from your existing photography."
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {capabilities.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group rounded-xl border border-border-light bg-bg-surface p-6 transition-all hover:border-accent hover:shadow-md"
                >
                  <h4 className="text-base font-semibold text-text-dark transition-colors group-hover:text-accent">
                    {s.label}
                  </h4>
                  <p className="mt-1 text-sm text-text-body">{s.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-text-muted transition-colors group-hover:text-accent">
                    Learn more &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* How it fits into digDesk */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="overflow-hidden rounded-2xl bg-bg-surface">
                <DynamicImage
                  slotId="offerings-frameflow-img"
                  className="h-full w-full"
                  fallbackClass="h-full w-full bg-gradient-to-br from-bg-surface to-border-light"
                  aspectRatio="4/3"
                />
              </div>
              <div>
                <EditableTextContent
                  slotId="programs-frameflow-inside-digdesk"
                  eyebrowDefault="Inside digDesk"
                  headlineDefault="FrameFlow Studio lives <strong>inside your digDesk portal</strong>."
                  bodyDefault="Log in to digDesk to place your orders, track progress, and download your assets."
                />
                <p className="mt-4 text-text-body">
                  Not a digDesk client yet? Book a demo and we&apos;ll set up your account.
                </p>
                <div className="mt-8 flex gap-3">
                  <a
                    href="https://desk.daviesimaging.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                  >
                    Log in to digDesk
                  </a>
                  <Link
                    href="/contact"
                    className="rounded-full border border-border-light px-5 py-2 text-sm font-medium text-text-body transition-colors hover:border-accent hover:text-accent"
                  >
                    Book a demo
                  </Link>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Why FrameFlow */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <EditableTextContent
                slotId="programs-frameflow-why"
                eyebrowDefault="Why It Works"
                headlineDefault="Why builders use <strong>FrameFlow Studio</strong>."
                bodyDefault=""
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {reasons.map((r, i) => (
                <div key={i} className="rounded-xl border border-border-light bg-bg-surface p-6">
                  <h4 className="text-base font-semibold text-text-dark">{r.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-text-body">{r.body}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* How pricing works */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <EditableTextContent
                slotId="programs-frameflow-pricing"
                eyebrowDefault="Pricing"
                headlineDefault="Pay as <strong>you go</strong>."
                bodyDefault="Order when you need it and pay per order. There is no subscription and no minimum."
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border-light bg-bg-surface p-6 text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-bg-light">
                  <svg className="h-5 w-5 text-text-dark" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                </div>
                <h4 className="text-sm font-semibold text-text-dark">Pay As You Go</h4>
                <p className="mt-2 text-sm leading-relaxed text-text-body">
                  Order what you need, when you need it. Each order is billed individually.
                </p>
              </div>
              <div className="rounded-xl border-2 border-accent bg-bg-surface p-6 text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                  <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="mb-2 inline-flex rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-accent">Best for volume</div>
                <h4 className="text-sm font-semibold text-text-dark">Credit Balance</h4>
                <p className="mt-2 text-sm leading-relaxed text-text-body">
                  Pre-load credits into your digDesk account. Better value for teams ordering at volume across multiple communities.
                </p>
              </div>
              <div className="rounded-xl border border-border-light bg-bg-surface p-6 text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-bg-light">
                  <svg className="h-5 w-5 text-text-dark" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-sm font-semibold text-text-dark">Transparent Pricing</h4>
                <p className="mt-2 text-sm leading-relaxed text-text-body">
                  You see full pricing inside your digDesk account before you order.
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-6">
              <span className="text-sm text-text-body">
                ModelMatch starting at <strong className="text-text-dark">$25 / image</strong>
              </span>
              <span className="hidden text-border-light sm:inline">|</span>
              <span className="text-sm text-text-body">
                FrameFlow starting at <strong className="text-text-dark">$150 / video</strong>
              </span>
              <span className="hidden text-border-light sm:inline">|</span>
              <a href="https://desk.daviesimaging.com/register" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-accent hover:underline">
                Create a free account to order &rarr;
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Spec+ connection */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="rounded-2xl border border-border-light bg-bg-surface p-8 text-center lg:p-12">
              <EditableTextContent
                slotId="programs-frameflow-spec-plus"
                eyebrowDefault="FrameFlow + Photography"
                headlineDefault="Add a shoot and you have <strong>Spec+</strong>."
                bodyDefault="Spec+ combines our listing photography with ModelMatch staging and a FrameFlow video for $600 flat, delivered within 72 hours of the shoot."
              />
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/programs/spec-plus"
                  className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  See Spec+ Details
                </Link>
                <Link
                  href="/modelmatch-datalibrary"
                  className="text-sm font-medium text-text-body transition-colors hover:text-accent"
                >
                  Start My Free Trial &rarr;
                </Link>
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
              slotId="programs-frameflow-cta"
              headlineDefault="Already a digDesk client? <strong>Start a FrameFlow order</strong>."
              bodyDefault="Log in to your digDesk portal and open FrameFlow Studio to submit a ModelMatch or FrameFlow order."
              dark={true}
            />
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://desk.daviesimaging.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Open digDesk
              </a>
              <Link
                href="/contact"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                Not a client yet? Book a demo &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>
    </>
  );
}
