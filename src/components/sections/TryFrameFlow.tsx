import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export function TryFrameFlow() {
  return (
    <section className="bg-zinc-900 py-24 text-white">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll>
          <h2>Before you overhaul everything, test it.</h2>
          <p className="mt-6 text-zinc-300">
            The FrameFlow Challenge lets you see how strategic visual sequencing
            can increase engagement and drive faster buyer decisions.
          </p>
          <p className="mt-4 text-zinc-400">
            Risk-free. Built for builders. Focused on outcomes.
          </p>
          <Link
            href="/frameflow-sell-faster-challenge-0210"
            className="cta-button mt-10 inline-block rounded-full bg-white px-8 py-3.5 text-zinc-900 transition-colors hover:bg-zinc-200"
          >
            Start the FrameFlow Challenge
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
