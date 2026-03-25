import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export function FinalCta() {
  return (
    <section className="flex min-h-[60vh] items-center bg-white py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll>
          <h2>
            Let&rsquo;s build assets that move <strong>homes</strong>.
          </h2>
          <p className="mt-5 text-zinc-600">
            If your content isn&rsquo;t driving momentum, it&rsquo;s time to
            rethink the strategy.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              href="/contact-page"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600"
            >
              Book a Strategy Call <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="/services/frameflow"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600"
            >
              Explore FrameFlow <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
