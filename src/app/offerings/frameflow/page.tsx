import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "FrameFlow | Davies Imaging Group",
  description: "The ordering platform and visual sequencing system for homebuilders. Order Spec+, virtual staging, and virtual video through FrameFlow.",
};

export default function FrameFlowPage() {
  return (
    <>
      <section className="flex min-h-screen items-center bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>FrameFlow</Eyebrow>
            <h1 className="text-text-light">
              The platform behind every high-performing DIG{" "}
              <strong>listing</strong>.
            </h1>
            <p className="lead-text mt-6 text-text-muted" style={{ fontStyle: "italic" }}>
              Order Spec+ packages, virtual staging, virtual video, and more.
              One app, every service, streamlined for builder marketing teams.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="min-h-[70vh] bg-bg-surface py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
          <RevealOnScroll>
            <Eyebrow>How It Works</Eyebrow>
            <h2>
              Strategic sequencing, not just{" "}
              <strong>photography</strong>.
            </h2>
            <p className="mt-5 text-text-body">
              FrameFlow organizes visuals into guided buyer narratives that
              increase engagement and reduce days on market. Every image has a
              purpose and a position.
            </p>
            <Link
              href="/campaigns/frameflow-sell-faster"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
            >
              Try the challenge <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-bg-light to-border-light" />
          </RevealOnScroll>
        </div>
      </section>

      <section className="flex min-h-[70vh] items-center bg-bg-light py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Order Anything</Eyebrow>
            <h2>
              One app for every DIG <strong>service</strong>.
            </h2>
            <p className="mt-5 text-text-body">
              Spec+ packages, standalone virtual staging, virtual video, and
              premium photography. All ordered, tracked, and delivered through
              FrameFlow.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
            >
              Book a demo <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
