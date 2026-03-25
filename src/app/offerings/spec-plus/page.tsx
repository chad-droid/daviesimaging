import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Spec+ | Davies Imaging Group",
  description: "The complete spec home asset package: virtual staging, virtual video, and photography in one order via FrameFlow.",
};

export default function SpecPlusPage() {
  return (
    <>
      <section className="flex min-h-screen items-center bg-zinc-900 py-28 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Spec+</Eyebrow>
            <h1>
              Your inventory needs to move. Spec+ delivers{" "}
              <strong>everything</strong>.
            </h1>
            <p className="lead-text mt-6 text-zinc-300" style={{ fontStyle: "italic" }}>
              Virtual staging, virtual video, and photography in one package.
              Built for standing inventory. Ordered through FrameFlow.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="min-h-[70vh] bg-white py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
          <RevealOnScroll>
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-zinc-200 to-zinc-300" />
          </RevealOnScroll>

          <RevealOnScroll>
            <Eyebrow>One Order</Eyebrow>
            <h2>
              Stop managing multiple <strong>vendors</strong>.
            </h2>
            <p className="mt-5 text-zinc-600">
              Spec+ bundles everything your listing needs into a single order.
              Photography, virtual staging, and virtual video delivered fast so
              homes move faster.
            </p>
            <Link
              href="/offerings/frameflow"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600"
            >
              Order via FrameFlow <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      <section className="flex min-h-[60vh] items-center bg-zinc-50 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Speed</Eyebrow>
            <h2>
              48-hour turnaround on QMI Close <strong>Kits</strong>.
            </h2>
            <p className="mt-5 text-zinc-600">
              Move-in-ready homes can&rsquo;t wait. The QMI Close Kit delivers
              photography, staging, and video within 48 hours of the shoot.
            </p>
            <Link
              href="/contact-page"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600"
            >
              Get started <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
