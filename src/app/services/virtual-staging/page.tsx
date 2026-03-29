import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DynamicImage } from "@/components/DynamicImage";

export const metadata: Metadata = {
  title: "Virtual Staging | Davies Imaging Group",
  description: "Virtual staging for builders who need furnished visuals without physical staging. No shoot required.",
};

export default function VirtualStagingPage() {
  return (
    <>
      <section className="flex min-h-screen items-center bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Virtual Staging</Eyebrow>
            <h1 className="text-text-light">
              Furnished visuals without the <strong>furniture</strong>.
            </h1>
            <p className="lead-text mt-6 text-text-muted" style={{ fontStyle: "italic" }}>
              Transform empty rooms into styled spaces. No physical staging, no
              shoot required, fast turnaround.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="min-h-[70vh] bg-bg-surface py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
          <RevealOnScroll>
            <Eyebrow>No Shoot Required</Eyebrow>
            <h2>
              Already have photos? We handle the <strong>rest</strong>.
            </h2>
            <p className="mt-5 text-text-body">
              Send us your existing photography and we&rsquo;ll deliver
              virtually staged images ready for MLS, website, and marketing
              deployment.
            </p>
            <Link
              href="/offerings/frameflow"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
            >
              Order via FrameFlow <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealOnScroll>

          <RevealOnScroll>
            <DynamicImage slotId="services-virtual-staging-img" className="rounded-lg" fallbackClass="bg-gradient-to-br from-bg-light to-border-light" />
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
