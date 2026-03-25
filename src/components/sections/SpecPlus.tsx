import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export function SpecPlus() {
  return (
    <section className="min-h-[70vh] bg-zinc-50 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* Image-dominant side */}
        <RevealOnScroll>
          <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-zinc-300 to-zinc-400" />
        </RevealOnScroll>

        {/* Copy side — no competing imagery */}
        <RevealOnScroll>
          <Eyebrow>Spec+</Eyebrow>
          <h2>
            Your inventory needs to move. Spec+ delivers{" "}
            <strong>everything</strong>.
          </h2>
          <p className="mt-5 text-zinc-600">
            Virtual staging, virtual video, and photography in one package built
            for standing inventory. Stop managing multiple vendors.
          </p>
          <Link
            href="/offerings/spec-plus"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600"
          >
            Order via FrameFlow <span aria-hidden="true">&rarr;</span>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
