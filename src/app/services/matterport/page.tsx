import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Matterport | Davies Imaging Group",
  description: "Matterport 3D virtual tours for model homes and communities. Immersive buyer experiences.",
};

export default function MatterportPage() {
  return (
    <>
      <section className="flex min-h-screen items-center bg-bg-dark py-28 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Matterport</Eyebrow>
            <h1>
              Immersive 3D tours that let buyers walk <strong>through</strong>.
            </h1>
            <p className="lead-text mt-6 text-zinc-300" style={{ fontStyle: "italic" }}>
              Matterport virtual tours give remote buyers the confidence to
              move forward. Built for model homes and community showcases.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="min-h-[70vh] bg-bg-surface py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
          <RevealOnScroll>
            <Eyebrow>Beyond Photos</Eyebrow>
            <h2>
              The next best thing to being <strong>there</strong>.
            </h2>
            <p className="mt-5 text-zinc-600">
              Matterport tours let buyers explore every room at their own pace.
              Embed on your website, share via email, or display in sales
              centers for out-of-market buyers.
            </p>
            <Link
              href="/contact-page"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 transition-colors hover:text-accent"
            >
              Book a strategy call <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-bg-light to-border-light" />
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
