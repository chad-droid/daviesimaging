import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export function SpecPlus() {
  return (
    <section className="bg-zinc-50 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <RevealOnScroll>
          {/* Visual placeholder */}
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center">
            <span className="text-sm uppercase tracking-widest text-zinc-400">
              Spec+ Visual
            </span>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <h4>Spec+</h4>
          <h2 className="mt-3">
            Your inventory needs to move. Spec+ delivers everything.
          </h2>
          <p className="mt-4 text-zinc-600">
            Virtual staging. Virtual video. Photography. All in one package,
            built for standing inventory.
          </p>
          <p className="mt-4 text-zinc-600">
            Stop managing multiple vendors. Start moving homes faster.
          </p>
          <Link
            href="/services/spec"
            className="cta-button mt-8 inline-block rounded-full bg-zinc-900 px-6 py-3 text-white transition-colors hover:bg-zinc-700"
          >
            Order via FrameFlow
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
