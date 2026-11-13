import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { DynamicImage } from "@/components/DynamicImage";
import { ModelMatchDemo } from "@/components/ModelMatchDemo";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";
import { DarkSection } from "@/components/DarkSection";
import { JsonLd } from "@/components/JsonLd";
import { buildServiceSchema, buildBreadcrumbSchema } from "@/lib/seo";
import { TestimonialBand } from "@/components/TestimonialBand";
import { ProductTags } from "@/components/ProductTags";

export const metadata: Metadata = {
  alternates: { canonical: "/services/virtual-staging" },
  title: "ModelMatch: Virtual Staging for New Construction Homes",
  description: "Your model home merchandising becomes furniture and accessory galleries you can reuse across your vacant inventory.",
};

const steps = [
  {
    number: "01",
    title: "Build your ModelMatch Gallery",
    body: "Upload existing model home photography into your account. These images become your permanent design reference library.",
  },
  {
    number: "02",
    title: "Create a virtual staging order",
    body: "Place a new order in digDesk. Upload the vacant listing photos you want staged.",
  },
  {
    number: "03",
    title: "Select your ModelMatch Gallery",
    body: "Choose the model home reference set that best matches the community or floorplan. Our team handles the rest.",
  },
  {
    number: "04",
    title: "Receive polished, on-brand results",
    body: "Finished staged images are delivered to your digDesk portal within one business day, ready to publish across every channel.",
  },
];

const differentiators = [
  {
    title: "Based on your own models",
    body: "We use your approved model home photography as the design source, so the result reflects your community.",
  },
  {
    title: "Matches your design palette",
    body: "Material selections, furniture style, and color palette are pulled from your existing photography, so every staged image is brand-consistent.",
  },
  {
    title: "Works on photos you already have",
    body: "No new shoot required. Send existing listing photography and receive staged images ready for MLS, website, and paid media.",
  },
  {
    title: "Order by itself or inside Spec+",
    body: "Order standalone through digDesk or bundle inside Spec+ for photography, staging, and video in one delivery.",
  },
];

export default function VirtualStagingPage() {
  return (
    <>
      <JsonLd
        data={buildServiceSchema({
          name: "ModelMatch Virtual Staging",
          description:
            "Reference-based virtual staging using a builder's approved model home photography as the design reference, so staged rooms match the community's actual style.",
          path: "/services/virtual-staging",
          serviceType: "Virtual Staging",
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Solutions", path: "/services" },
          { name: "ModelMatch", path: "/services/virtual-staging" },
        ])}
      />
      {/* Hero */}
      <DarkSection className="py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <EditableHero
              slotId="services-virtual-staging-hero"
              eyebrowDefault="Solutions / ModelMatch"
              headlineDefault="Virtual staging that matches your <strong>model homes</strong>."
              subheadDefault="Your model home merchandising becomes bespoke furniture and accessory galleries you can reuse across your vacant inventory."
            />
            <ProductTags line="Match" stage="List" />
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
                href="/gallery/listings"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                See staged results &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* What makes it different */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <EditableTextContent
                  slotId="services-virtual-staging-modelmatch"
                  eyebrowDefault="The ModelMatch Difference"
                  headlineDefault="Built from the furniture in your <strong>own models</strong>."
                  bodyDefault="Instead of a generic furniture library, we build your staging from the furniture and decor in your own model homes, so a spec in the listing looks like it belongs in the same community as the model."
                />
                <p className="mt-4 text-text-body">
                  Our Match system of interior design is built off your existing model home identity. That means your virtual assets look and feel like the real thing before anything is staged.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/programs/spec-plus"
                    className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                  >
                    Bundle in Spec+
                  </Link>
                  <Link
                    href="/contact"
                    className="rounded-full border border-border-light px-5 py-2 text-sm font-medium text-text-body transition-colors hover:border-accent hover:text-accent"
                  >
                    Ask a question
                  </Link>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl bg-bg-light">
                <DynamicImage
                  slotId="services-virtual-staging-img"
                  className="h-full w-full"
                  fallbackClass="h-full w-full bg-gradient-to-br from-bg-surface to-border-light"
                  aspectRatio="4/3"
                  disableLightbox
                  disableBeforeAfter
                />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* How ModelMatch Works — 4 steps */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-14 text-center">
              <EditableTextContent
                slotId="services-virtual-staging-how-it-works"
                eyebrowDefault="How It Works"
                headlineDefault="How ModelMatch <strong>works</strong>."
                bodyDefault="ModelMatch is built around your account. Once your reference library is set up, every future order uses it automatically."
                dark={true}
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <div key={step.number} className="relative rounded-xl border border-white/10 bg-white/5 p-6">
                  <span className="font-mono text-3xl font-bold text-accent-dark-hover">{step.number}</span>
                  <h4 className="mt-4 text-base font-semibold text-text-light">{step.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.body}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* Interactive ModelMatch Demo */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <EditableTextContent
                slotId="services-virtual-staging-progression"
                eyebrowDefault="See the Progression"
                headlineDefault="From your model home to your <strong>vacant listing</strong>."
                bodyDefault="Each room below shows the three-stage ModelMatch process: source reference images, the vacant listing photo, and the finished staged output. Select a room to explore the difference."
              />
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <ModelMatchDemo />
          </RevealOnScroll>
        </div>
      </section>

      {/* Why it works — differentiators */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <EditableTextContent
                slotId="services-virtual-staging-why"
                eyebrowDefault="Why Builders Choose ModelMatch"
                headlineDefault="Why builders use <strong>ModelMatch</strong>."
                bodyDefault=""
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {differentiators.map((item, i) => (
                <div key={i} className="rounded-xl border border-border-light bg-bg-surface p-6">
                  <h4 className="text-base font-semibold text-text-dark">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-text-body">{item.body}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Pricing / How to order */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="text-center">
              <EditableTextContent
                slotId="services-virtual-staging-pricing"
                eyebrowDefault="Pricing"
                headlineDefault="Standalone or <strong>bundled in Spec+</strong>."
                bodyDefault="Order ModelMatch by itself through digDesk, or bundle it with listing photography and a FrameFlow video inside Spec+ for one flat price."
              />
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-border-light p-6">
                <h4 className="text-base font-semibold text-text-dark">ModelMatch by itself</h4>
                <p className="mt-2 text-sm text-text-body">Already have photos? Upload them through digDesk and receive ModelMatch-staged images ready to publish.</p>
                <p className="mt-4 font-serif text-2xl font-semibold text-text-dark">
                  Starting at $25
                  <span className="ml-1 text-sm font-sans font-normal text-text-muted">/ image</span>
                </p>
                <a
                  href="https://desk.daviesimaging.com/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                >
                  Create an account to order &rarr;
                </a>
              </div>
              <div className="rounded-xl border-2 border-accent p-6">
                <div className="mb-2 inline-flex rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-accent">Best Value</div>
                <h4 className="text-base font-semibold text-text-dark">Spec+ Bundle</h4>
                <p className="mt-2 text-sm text-text-body">Photography + 8 staged images + virtual video in one $600 order. 72-hour delivery after the shoot.</p>
                <p className="mt-4 font-serif text-2xl font-semibold text-text-dark">
                  $600 flat
                  <span className="ml-1 text-sm font-sans font-normal text-text-muted">/ property</span>
                </p>
                <Link
                  href="/programs/spec-plus"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                >
                  Learn about Spec+ &rarr;
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Customer proof */}
      <TestimonialBand ids={["kim-modelmatch", "carrie-staging"]} />

      {/* Final CTA */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <EditableTextContent
              slotId="services-virtual-staging-cta"
              headlineDefault="Your first home is <strong>free</strong>."
              bodyDefault="See ModelMatch on one of your own spec homes. The first eight staged images are on us."
              dark={true}
            />
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/modelmatch-datalibrary"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Start My Free Trial
              </Link>
              <Link
                href="/programs/spec-plus"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                See full Spec+ pricing &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>
    </>
  );
}
