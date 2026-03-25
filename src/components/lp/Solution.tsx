import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

interface SolutionProps {
  eyebrow?: string;
  headline: React.ReactNode;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function Solution({
  eyebrow = "The Solution",
  headline,
  description,
  ctaLabel,
  ctaHref,
}: SolutionProps) {
  return (
    <section className="min-h-[70vh] bg-zinc-50 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
        <RevealOnScroll>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2>{headline}</h2>
          <p className="mt-5 text-zinc-600">{description}</p>
          {ctaLabel && ctaHref && (
            <Link
              href={ctaHref}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600"
            >
              {ctaLabel} <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-zinc-200 to-zinc-300" />
        </RevealOnScroll>
      </div>
    </section>
  );
}
