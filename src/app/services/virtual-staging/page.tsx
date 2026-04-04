import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DynamicImage } from "@/components/DynamicImage";
import { ModelMatchDemo } from "@/components/ModelMatchDemo";

export const metadata: Metadata = {
  title: "Virtual Staging | Davies Imaging Group",
  description: "ModelMatch virtual staging uses your builder's own model home photography as the design reference. Branded, on-spec results for every listing.",
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
    body: "Place a new order in FrameFlow Studio. Upload the vacant listing photos you want staged.",
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
    title: "Reference-based, not random",
    body: "We use your approved model home photography as the design source. The result reflects your community, not a stock furniture catalog.",
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
    title: "Fast turnaround, bulk-friendly",
    body: "Order standalone through FrameFlow Studio or bundle inside Spec+ for photography, staging, and video in one delivery.",
  },
];

export default function VirtualStagingPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[60vh] bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow dark>Solutions / Virtual Staging</Eyebrow>
            <h1 className="text-text-light">
              Staging that looks like your community. Because <strong>it is</strong>.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-text-muted">
              DIG virtual staging uses your builder&apos;s own model home photography as the design reference. Every staged image is branded and on-spec, not a generic template.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://desk.daviesimaging.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Order via FrameFlow Studio
              </a>
              <Link
                href="/gallery/spec-homes"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                See staged results &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* What makes it different */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <Eyebrow>The ModelMatch Difference</Eyebrow>
                <h2>
                  Not furniture swaps. <strong>Brand-matched staging</strong>.
                </h2>
                <p className="mt-4 text-text-body">
                  Most virtual staging services drop generic furniture into empty rooms. DIG builds a permanent staging reference library from your actual model home photography. Every staged image reflects your builder&apos;s design identity.
                </p>
                <p className="mt-4 text-text-body">
                  The result: staged listings that feel like an extension of your community, not a furniture showroom. Buyers recognize the brand. That recognition builds trust.
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
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-bg-light">
                <DynamicImage
                  slotId="services-virtual-staging-img"
                  className="h-full w-full object-cover"
                  fallbackClass="h-full w-full"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bg-surface to-border-light [&:has(img)]:hidden">
                  <span className="text-xs font-medium uppercase tracking-widest text-text-muted">ModelMatch Example</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* How ModelMatch Works — 4 steps */}
      <section className="bg-bg-dark py-24 text-text-light">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-14 text-center">
              <Eyebrow dark>How It Works</Eyebrow>
              <h2 className="text-text-light">
                Four steps to <strong>on-brand staging</strong>.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-muted">
                ModelMatch is built around your account. Once your reference library is set up, every future order uses it automatically.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <div key={step.number} className="relative rounded-xl border border-white/10 bg-white/5 p-6">
                  <span className="font-mono text-3xl font-bold text-accent/60">{step.number}</span>
                  <h4 className="mt-4 text-base font-semibold text-text-light">{step.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.body}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Interactive ModelMatch Demo */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <Eyebrow>See the Progression</Eyebrow>
              <h2>
                Reference. Vacant. <strong>Result</strong>.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-body">
                Each room below shows the three-stage ModelMatch process: source reference images, the vacant listing photo, and the finished staged output. Select a room to explore the difference.
              </p>
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
              <Eyebrow>Why Builders Choose ModelMatch</Eyebrow>
              <h2>
                Every listing. <strong>Same brand</strong>.
              </h2>
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
              <Eyebrow>Pricing</Eyebrow>
              <h2>
                Standalone or <strong>bundled in Spec+</strong>.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-body">
                Order virtual staging by itself through FrameFlow Studio, or bundle it with listing photography and virtual video inside Spec+ for one flat price.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-border-light p-6">
                <h4 className="text-base font-semibold text-text-dark">Standalone Virtual Staging</h4>
                <p className="mt-2 text-sm text-text-body">Already have photos? Upload them through FrameFlow Studio and receive ModelMatch-staged images ready to publish.</p>
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

      {/* Final CTA */}
      <section className="bg-bg-dark py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="text-text-light">
              Ready to see ModelMatch <strong>on your listings</strong>?
            </h2>
            <p className="mt-5 text-text-muted">
              Send us a community name and existing model home photography. We&apos;ll show you exactly what ModelMatch staging looks like for your builder before you order.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Request a sample
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
      </section>
    </>
  );
}
