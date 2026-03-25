import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "FrameFlow Demo | Davies Imaging Group",
  description: "See the FrameFlow platform in action. Request a live walkthrough.",
};

export default function FrameFlowDemoPage() {
  return (
    <>
      <section className="flex min-h-screen items-center bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>FrameFlow Demo</Eyebrow>
            <h1 className="text-text-light">
              See the platform before you <strong>commit</strong>.
            </h1>
            <p className="lead-text mt-6 text-text-muted" style={{ fontStyle: "italic" }}>
              A live walkthrough of FrameFlow: ordering, tracking, delivery,
              and reporting. Built for builder marketing teams.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="flex min-h-[70vh] items-center bg-bg-surface py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Request a Demo</Eyebrow>
            <h2>
              15 minutes. Zero <strong>pressure</strong>.
            </h2>
            <p className="mt-5 text-text-body">
              We&rsquo;ll walk you through FrameFlow, answer questions, and
              show you how builders are using it to streamline ordering
              across markets.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
            >
              Request a demo <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
