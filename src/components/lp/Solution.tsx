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
    <section className="min-h-[70vh] bg-bg-light py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
        <RevealOnScroll>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2>{headline}</h2>
          <p className="mt-5 text-text-body">{description}</p>
          {ctaLabel && ctaHref && (
            <Link
              href={ctaHref}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
            >
              {ctaLabel} <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-bg-light to-border-light" />
        </RevealOnScroll>
      </div>
    </section>
  );
}
