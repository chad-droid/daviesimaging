import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DynamicImage } from "@/components/DynamicImage";
import { EditableContent } from "@/components/EditableContent";

export const metadata: Metadata = {
  title: "FrameFlow | Davies Imaging Group",
  description: "FrameFlow Studio is the digital production module inside digDesk. Order virtual staging and virtual video without a shoot.",
};

const capabilities = [
  { label: "Virtual Staging", desc: "ModelMatch-branded staging from your existing photos", href: "/services/virtual-staging" },
  { label: "Virtual Video", desc: "Digital listing video built from photos, no crew required", href: "/services/virtual-video" },
];

const reasons = [
  {
    title: "No shoot. No crew. No waiting.",
    body: "FrameFlow Studio works entirely from photography you already have. Upload your listing photos and receive staged images and digital video without scheduling a single shoot.",
  },
  {
    title: "Branded, not generic",
    body: "ModelMatch virtual staging uses your builder's own model home photography as the design reference. Every result looks on-spec for your community, not like a stock furniture showroom.",
  },
  {
    title: "Fast turnaround, bulk-ready",
    body: "FrameFlow Studio handles single listings or multi-community volume. Staged images and virtual video delivered fast so your team keeps moving.",
  },
  {
    title: "Integrated with Spec+",
    body: "When you bundle FrameFlow digital services with DIG listing photography, that's Spec+. One coordinated package, one delivery, one flat price.",
  },
];

export default function FrameFlowPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[60vh] bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow dark>Programs / FrameFlow Studio</Eyebrow>
            <EditableContent
              slotId="programs-frameflow-hero"
              fields={[
                { key: "headline", label: "Headline", type: "textarea" as const, defaultValue: "Virtual staging and video. <strong>No shoot required</strong>." },
                { key: "subhead", label: "Subhead", type: "textarea" as const, defaultValue: "FrameFlow Studio is the digital production module inside digDesk. Upload listing photos and receive ModelMatch-staged images and virtual video without scheduling a photographer." },
              ]}
            >
              {(v) => (
                <>
                  <h1 className="text-text-light" dangerouslySetInnerHTML={{ __html: v.headline }} />
                  <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-text-muted">{v.subhead}</p>
                </>
              )}
            </EditableContent>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
      </section>

      {/* What FrameFlow does */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <Eyebrow>What FrameFlow Does</Eyebrow>
              <h2>
                Digital production from <strong>photos you already have</strong>.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-body">
                FrameFlow Studio handles two things: virtual staging and virtual video. Both are digital services that work from existing photography. No new shoot required.
              </p>
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
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-bg-surface">
                <DynamicImage
                  slotId="offerings-frameflow-img"
                  className="h-full w-full object-cover"
                  fallbackClass="h-full w-full"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bg-surface to-border-light [&:has(img)]:hidden">
                  <span className="text-xs font-medium uppercase tracking-widest text-text-muted">digDesk Portal</span>
                </div>
              </div>
              <div>
                <Eyebrow>Inside digDesk</Eyebrow>
                <h2>
                  FrameFlow Studio lives <strong>inside your digDesk portal</strong>.
                </h2>
                <p className="mt-4 text-text-body">
                  digDesk is the DIG client portal. FrameFlow Studio is one of its modules, dedicated to digital production. Log in to digDesk to place FrameFlow orders, track progress, and download assets.
                </p>
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
              <Eyebrow>Why It Works</Eyebrow>
              <h2>
                Four reasons builders use <strong>FrameFlow Studio</strong>.
              </h2>
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
              <Eyebrow>Pricing</Eyebrow>
              <h2>
                No subscription. No commitment. <strong>Pay as you go</strong>.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-body">
                digDesk is built for flexibility. Order when you need it, pay per transaction, and scale up when your volume demands it.
              </p>
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
                  Order exactly what you need, when you need it. Each transaction is billed individually. No contracts, no minimums.
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
                  Full pricing is visible inside your digDesk account. No surprise fees, no hidden line items. What you see is what you pay.
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-6">
              <span className="text-sm text-text-body">
                Virtual Staging starting at <strong className="text-text-dark">$25 / image</strong>
              </span>
              <span className="hidden text-border-light sm:inline">|</span>
              <span className="text-sm text-text-body">
                Virtual Video starting at <strong className="text-text-dark">$150 / video</strong>
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
              <Eyebrow>FrameFlow + Photography</Eyebrow>
              <h2>
                Bundle it with a shoot. <strong>That&apos;s Spec+</strong>.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-body">
                Spec+ combines DIG listing photography with FrameFlow Studio production. One coordinated package, 72-hour delivery, $600 flat. The most efficient way to get standing inventory market-ready.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/programs/spec-plus"
                  className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  See Spec+ Details
                </Link>
                <Link
                  href="/campaigns/frameflow-sell-faster"
                  className="text-sm font-medium text-text-body transition-colors hover:text-accent"
                >
                  Take the FrameFlow Challenge &rarr;
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-dark py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="text-text-light">
              Already a digDesk client? <strong>Start a FrameFlow order</strong>.
            </h2>
            <p className="mt-5 text-text-muted">
              Log in to your digDesk portal and open FrameFlow Studio to submit a virtual staging or virtual video order.
            </p>
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
      </section>
    </>
  );
}
