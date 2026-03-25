import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export function FinalCta() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll>
          <h2>Let&rsquo;s Build Assets That Move Homes.</h2>
          <p className="mt-6 text-zinc-600">
            If your content isn&rsquo;t driving momentum, it&rsquo;s time to
            rethink the strategy.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact-page"
              className="cta-button rounded-full bg-zinc-900 px-8 py-3.5 text-white transition-colors hover:bg-zinc-700"
            >
              Book a Strategy Call
            </Link>
            <Link
              href="/services/frameflow"
              className="cta-button rounded-full border border-zinc-900 px-8 py-3.5 text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white"
            >
              Explore FrameFlow
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
