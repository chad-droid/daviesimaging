import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DynamicImage } from "@/components/DynamicImage";
import { SpecFaq } from "@/components/SpecFaq";
import { EditableContent } from "@/components/EditableContent";

export const metadata: Metadata = {
  title: "Spec+ | Davies Imaging Group",
  description: "The complete spec home asset package: 25 listing photos, 8 virtually staged images, and 1 virtual video. $600 flat, 72-hour delivery via FrameFlow.",
};

const included = [
  { label: "25 MLS-ready listing images", detail: "HDR photography, professionally retouched" },
  { label: "8 ModelMatch virtually staged images", detail: "Branded to your model home, not generic furniture" },
  { label: "1 FrameFlow virtual video", detail: "Built from your photos, wide format, ready to deploy" },
  { label: "72-hour delivery after photography", detail: "From shoot to delivery, no waiting" },
  { label: "Sky replacement + exterior retouching", detail: "Every exterior looks its best" },
  { label: "Coordinated through digDesk", detail: "Photography + FrameFlow production managed in one place" },
];

const steps = [
  { number: "01", title: "Place your order in digDesk", detail: "Select Spec+, add the community and address, submit." },
  { number: "02", title: "We schedule and shoot", detail: "DIG coordinates the shoot in your market. You don't lift a finger." },
  { number: "03", title: "Assets delivered in 72 hours", detail: "Photography, staging, and video delivered in one package, ready to publish." },
];

export default function SpecPlusPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[60vh] bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow dark>Programs / Spec+</Eyebrow>
            <EditableContent
              slotId="programs-spec-plus-hero"
              fields={[
                { key: "headline", label: "Headline", type: "textarea" as const, defaultValue: "Your inventory needs to move. Spec+ delivers <strong>everything</strong>." },
                { key: "subhead", label: "Subhead", type: "textarea" as const, defaultValue: "DIG listing photography combined with FrameFlow Studio digital production. $600 flat, regardless of home size. Delivered in 72 hours." },
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
                Order via digDesk
              </a>
              <Link
                href="/contact"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                Talk to someone first &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Pricing callout */}
      <section className="border-b border-border-light bg-bg-light py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-col items-center justify-center gap-8 text-center sm:flex-row sm:text-left">
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-4xl font-bold text-text-dark">$600</span>
              <span className="mt-1 text-sm text-text-muted">Flat rate, all home sizes</span>
            </div>
            <div className="hidden h-12 w-px bg-border-light sm:block" />
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-4xl font-bold text-text-dark">72 hrs</span>
              <span className="mt-1 text-sm text-text-muted">Delivery after photography</span>
            </div>
            <div className="hidden h-12 w-px bg-border-light sm:block" />
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-4xl font-bold text-text-dark">3</span>
              <span className="mt-1 text-sm text-text-muted">Asset types in one order</span>
            </div>
            <div className="hidden h-12 w-px bg-border-light sm:block" />
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-4xl font-bold text-text-dark">28</span>
              <span className="mt-1 text-sm text-text-muted">U.S. markets covered</span>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <Eyebrow>Package Contents</Eyebrow>
                <h2>
                  Everything your listing needs. <strong>Nothing it doesn&apos;t</strong>.
                </h2>
                <p className="mt-4 text-text-body">
                  Spec+ was built for one purpose: get standing inventory listed, marketed, and sold faster. Every element in the package earns its place.
                </p>
                <ul className="mt-8 space-y-4">
                  {included.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                        <svg
                          viewBox="0 0 16 16"
                          className="h-3 w-3 text-accent"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path d="M3 8l3 3.5 7-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-sm font-medium text-text-dark">{item.label}</p>
                        <p className="mt-0.5 text-xs text-text-muted">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-bg-light lg:aspect-auto">
                <DynamicImage
                  slotId="offerings-spec-plus-img"
                  className="h-full w-full object-cover"
                  fallbackClass="h-full w-full"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bg-surface to-border-light [&:has(img)]:hidden">
                  <span className="text-xs font-medium uppercase tracking-widest text-text-muted">Spec+ Example</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="text-center">
              <Eyebrow>How It Works</Eyebrow>
              <h2>
                Order today. Assets in <strong>72 hours</strong>.
              </h2>
            </div>
            <div className="mt-14 grid gap-8 sm:grid-cols-3">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col">
                  <span className="font-mono text-3xl font-light text-border-light">{step.number}</span>
                  <h4 className="mt-3 text-base font-semibold text-text-dark">{step.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-text-body">{step.detail}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ModelMatch callout */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="rounded-2xl border border-border-light bg-bg-surface p-8 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <Eyebrow>ModelMatch Virtual Staging</Eyebrow>
                  <h3>
                    Not generic furniture. <strong>Your builder&apos;s design palette</strong>.
                  </h3>
                  <p className="mt-4 text-text-body">
                    Spec+ virtual staging uses your model home photography as the design reference. The result looks branded and on-spec, because it is. No mismatched styles, no generic staging templates.
                  </p>
                  <Link
                    href="/services/virtual-staging"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
                  >
                    Learn about virtual staging <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
                <div className="space-y-3 text-sm">
                  {[
                    "Uses approved model home photos as the design reference",
                    "Matches the builder's established design palette and material selections",
                    "Each staged image reflects the community, not a generic library",
                    "8 staged images per Spec+ order, more available as add-ons",
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-2.5 text-text-body">
                      <svg viewBox="0 0 16 16" className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M3 8l3 3.5 7-7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="mb-10 text-center">
              <Eyebrow>Common Questions</Eyebrow>
              <h2>
                Everything you need to <strong>know before ordering</strong>.
              </h2>
            </div>
            <SpecFaq />
          </RevealOnScroll>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-bg-dark py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow dark>Ready to Order</Eyebrow>
            <h2 className="text-text-light">
              $600. 72 hours. <strong>Move faster</strong>.
            </h2>
            <p className="mt-5 text-text-muted">
              Stop managing vendors. Stop waiting on turnarounds. Order Spec+ through digDesk and get photography, staging, and video in one coordinated delivery.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://desk.daviesimaging.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Order via digDesk
              </a>
              <Link
                href="/gallery/listings"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                See Spec+ results &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
