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
      <section className="flex min-h-screen items-center bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Spec+</Eyebrow>
            <h1 className="text-text-light">
              Your inventory needs to move. Spec+ delivers{" "}
              <strong>everything</strong>.
            </h1>
            <p className="lead-text mt-6 text-text-muted" style={{ fontStyle: "italic" }}>
              Virtual staging, virtual video, and photography in one package.
              Built for standing inventory. Ordered through FrameFlow.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="min-h-[70vh] bg-bg-surface py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
          <RevealOnScroll>
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-bg-light to-border-light" />
          </RevealOnScroll>

          <RevealOnScroll>
            <Eyebrow>One Order</Eyebrow>
            <h2>
              Stop managing multiple <strong>vendors</strong>.
            </h2>
            <p className="mt-5 text-text-body">
              Spec+ bundles everything your listing needs into a single order.
              Photography, virtual staging, and virtual video delivered fast so
              homes move faster.
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

      <section className="flex min-h-[60vh] items-center bg-bg-light py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Speed</Eyebrow>
            <h2>
              48-hour turnaround on QMI Close <strong>Kits</strong>.
            </h2>
            <p className="mt-5 text-text-body">
              Move-in-ready homes can&rsquo;t wait. The QMI Close Kit delivers
              photography, staging, and video within 48 hours of the shoot.
            </p>
            <Link
              href="/contact-page"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
            >
              Get started <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
