import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export function TryFrameFlow() {
  return (
    <section className="flex min-h-[60vh] items-center bg-zinc-900 py-24 text-white">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll>
          <Eyebrow>FrameFlow Challenge</Eyebrow>
          <h2>
            Before you overhaul everything, <strong>test</strong> it.
          </h2>
          <p className="mt-5 text-zinc-400">
            The FrameFlow Challenge lets you see how strategic visual sequencing
            increases engagement and drives faster buyer decisions. Risk-free,
            built for builders.
          </p>
          <Link
            href="/frameflow-sell-faster-challenge-0210"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-zinc-300"
          >
            Start the challenge <span aria-hidden="true">&rarr;</span>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
