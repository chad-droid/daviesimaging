import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DynamicImage } from "@/components/DynamicImage";

export const metadata: Metadata = {
  title: "Virtual Video | Davies Imaging Group",
  description: "Virtual video walkthroughs created from existing photography. No shoot, no crew, fast delivery.",
};

export default function VirtualVideoPage() {
  return (
    <>
      <section className="flex min-h-screen items-center bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Virtual Video</Eyebrow>
            <h1 className="text-text-light">
              Walkthrough video without the <strong>crew</strong>.
            </h1>
            <p className="lead-text mt-6 text-text-muted" style={{ fontStyle: "italic" }}>
              Virtual video transforms existing photography into smooth,
              cinematic walkthroughs. No shoot day, no scheduling, fast
              delivery.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="min-h-[70vh] bg-bg-surface py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
          <RevealOnScroll>
            <DynamicImage slotId="services-virtual-video-img" aspectRatio="16/9" className="rounded-lg" fallbackClass="bg-gradient-to-br from-bg-light to-border-light" />
          </RevealOnScroll>

          <RevealOnScroll>
            <Eyebrow>From Photos to Video</Eyebrow>
            <h2>
              Turn stills into buyer <strong>experience</strong>.
            </h2>
            <p className="mt-5 text-text-body">
              Virtual video works alongside virtual staging or standalone. Order
              through FrameFlow for fast turnaround on listings that need video
              without a production day.
            </p>
            <Link
              href="/offerings/frameflow"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
            >
              Order via FrameFlow <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
