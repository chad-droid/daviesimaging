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
      <section className="flex min-h-screen items-center bg-zinc-900 py-28 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>FrameFlow</Eyebrow>
            <h1>
              The platform that powers every DIG{" "}
              <strong>delivery</strong>.
            </h1>
            <p className="lead-text mt-6 text-zinc-300" style={{ fontStyle: "italic" }}>
              Order Spec+ packages, virtual staging, virtual video, and more.
              One app, every service, streamlined for builder marketing teams.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="min-h-[70vh] bg-white py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
          <RevealOnScroll>
            <Eyebrow>How It Works</Eyebrow>
            <h2>
              Strategic sequencing, not just{" "}
              <strong>photography</strong>.
            </h2>
            <p className="mt-5 text-zinc-600">
              FrameFlow organizes visuals into guided buyer narratives that
              increase engagement and reduce days on market. Every image has a
              purpose and a position.
            </p>
            <Link
              href="/frameflow-sell-faster-challenge-0210"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600"
            >
              Try the challenge <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-zinc-200 to-zinc-300" />
          </RevealOnScroll>
        </div>
      </section>

      <section className="flex min-h-[70vh] items-center bg-zinc-50 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Order Anything</Eyebrow>
            <h2>
              One app for every DIG <strong>service</strong>.
            </h2>
            <p className="mt-5 text-zinc-600">
              Spec+ packages, standalone virtual staging, virtual video, and
              premium photography. All ordered, tracked, and delivered through
              FrameFlow.
            </p>
            <Link
              href="/contact-page"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600"
            >
              Book a demo <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
