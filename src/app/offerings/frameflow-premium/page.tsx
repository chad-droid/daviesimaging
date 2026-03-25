import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "FrameFlow Premium | Davies Imaging Group",
  description: "Higher-cost, more specific digital work. Pilot program.",
  robots: { index: false, follow: false },
};

export default function FrameFlowPremiumPage() {
  return (
    <>
      <section className="flex min-h-screen items-center bg-zinc-900 py-28 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>FrameFlow Premium</Eyebrow>
            <h1>
              Premium digital work for builders who need{" "}
              <strong>more</strong>.
            </h1>
            <p className="lead-text mt-6 text-zinc-300" style={{ fontStyle: "italic" }}>
              Higher-craft virtual staging and video with expanded creative
              direction. Currently in pilot with select builders.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="flex min-h-[70vh] items-center bg-white py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Pilot Program</Eyebrow>
            <h2>
              Invitation <strong>only</strong>.
            </h2>
            <p className="mt-5 text-zinc-600">
              FrameFlow Premium is currently available to pilot participants.
              If you&rsquo;re interested in joining the program, reach out to
              the DIG team directly.
            </p>
            <Link
              href="/contact-page"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600"
            >
              Get in touch <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
