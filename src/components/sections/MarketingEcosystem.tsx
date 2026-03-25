import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export function MarketingEcosystem() {
  return (
    <section className="flex min-h-[60vh] items-center bg-zinc-50 py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll>
          <Eyebrow>Full Ecosystem</Eyebrow>
          <h2>
            Every shoot is built for downstream <strong>velocity</strong>.
          </h2>
          <p className="mt-5 text-zinc-600">
            Website conversion, email campaigns, paid media, sales center
            storytelling, listing refreshes. Modern builder marketing requires
            velocity, not just visuals.
          </p>
          <Link
            href="/work"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600"
          >
            Explore our work <span aria-hidden="true">&rarr;</span>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
