import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { DynamicImage } from "@/components/DynamicImage";
import { SpecFaq } from "@/components/SpecFaq";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, buildServiceSchema, buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo";
import { specFaqs } from "@/lib/faq-data";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";
import { DarkSection } from "@/components/DarkSection";
import { TestimonialBand } from "@/components/TestimonialBand";
import { ProductTags } from "@/components/ProductTags";

export const metadata: Metadata = {
  alternates: { canonical: "/programs/spec-plus" },
  title: "Spec+: Spec Home Photography, Staging and Video for $600",
  description: "Spec+ combines listing photography, ModelMatch virtual staging and a FrameFlow video in one order. 25 photos, 8 staged images and 1 video for $600 flat, delivered within 72 hours of the shoot.",
};

const included = [
  { label: "25 MLS-ready listing images", detail: "HDR photography, professionally retouched" },
  { label: "8 ModelMatch virtually staged images", detail: "Staged with your own model home merchandising" },
  { label: "1 FrameFlow video", detail: "Built from your photos, in wide format" },
  { label: "Delivered within 72 hours of the shoot", detail: "Photography, staging and video arrive together" },
  { label: "Sky replacement + exterior retouching", detail: "Every exterior looks its best" },
  { label: "Ordered through digDesk", detail: "Order, track, revise and pay in one place" },
];

const steps = [
  { number: "01", title: "Place your order in digDesk", detail: "Select Spec+, add the community and address, submit." },
  { number: "02", title: "We schedule and shoot", detail: "We coordinate the shoot with your sales team in the field." },
  { number: "03", title: "Assets delivered in 72 hours", detail: "Photography, staging and video are delivered together in digDesk." },
];

export default function SpecPlusPage() {
  return (
    <>
      <JsonLd
        data={buildServiceSchema({
          name: "Spec+",
          description:
            "Listing photography, ModelMatch virtual staging and a FrameFlow video for spec homes, in one order: 25 photos, 8 staged images and 1 video, delivered within 72 hours of the shoot.",
          path: "/programs/spec-plus",
          serviceType: "Photography",
          offers: [{ name: "Spec+ order, any home size", price: 600 }],
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Programs", path: "/programs" },
          { name: "Spec+", path: "/programs/spec-plus" },
        ])}
      />
      {/* Matches the questions <SpecFaq /> shows further down this page. */}
      <JsonLd data={buildFaqSchema(specFaqs, `${SITE_URL}/programs/spec-plus`)} />
      {/* Hero */}
      <DarkSection className="py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <EditableHero
              slotId="programs-spec-plus-hero"
              eyebrowDefault="Programs / Spec+"
              headlineDefault="List your spec homes looking their <strong>absolute best</strong>."
              subheadDefault="You get our listing photography, ModelMatch virtual staging and a FrameFlow video in one order. $600 flat, regardless of home size, delivered within 72 hours of the shoot."
            />
            <ProductTags line="Production + Match + Flow" stage="List" />
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
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
      </DarkSection>

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
              <span className="text-4xl font-bold text-text-dark">26</span>
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
                <EditableTextContent
                  slotId="programs-spec-plus-package"
                  eyebrowDefault="Package Contents"
                  headlineDefault="What comes in a <strong>Spec+ order</strong>."
                  bodyDefault="Your listings look their absolute best while your team focuses on essential marketing activities rather than coordination and retouching."
                />
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

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-bg-surface to-border-light lg:aspect-auto">
                <DynamicImage
                  slotId="offerings-spec-plus-img"
                  className="absolute inset-0 h-full w-full"
                  fallbackClass="h-full w-full"
                />
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
              <EditableTextContent
                slotId="programs-spec-plus-how-it-works"
                eyebrowDefault="How It Works"
                headlineDefault="How a Spec+ order <strong>works</strong>."
                bodyDefault=""
              />
            </div>
            <div className="mt-14 grid gap-8 sm:grid-cols-3">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col">
                  <span className="font-mono text-3xl font-light text-text-muted">{step.number}</span>
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
                  <EditableTextContent
                    slotId="programs-spec-plus-modelmatch"
                    eyebrowDefault="ModelMatch Virtual Staging"
                    headlineDefault="Your model home merchandising, in <strong>every listing</strong>."
                    bodyDefault="If you have beautiful model home merchandising but feel like your spec home presentation can use a boost, ModelMatch was designed to extend the investment you've made into your model homes and insert that merchandising into each and every one of your listings."
                    headingLevel="h3"
                  />
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
                    "Each staged image reflects the community it belongs to",
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
              <EditableTextContent
                slotId="programs-spec-plus-faq"
                eyebrowDefault="Common Questions"
                headlineDefault="Before you <strong>order</strong>."
                bodyDefault=""
              />
            </div>
            <SpecFaq />
          </RevealOnScroll>
        </div>
      </section>

      {/* Customer proof */}
      <TestimonialBand ids={["jaime-speed"]} />

      {/* Final CTA */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <EditableTextContent
              slotId="programs-spec-plus-cta"
              eyebrowDefault="Ready to Order"
              headlineDefault="Spec photography costs about <strong>four days of carry</strong>."
              bodyDefault="Carry on a spec runs about $25 a day for every $100,000 of list price. Spec photography runs about 0.1% of list price. If better presentation helps a home sell four days sooner, it has paid for itself."
              dark={true}
            />
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
      </DarkSection>
    </>
  );
}
