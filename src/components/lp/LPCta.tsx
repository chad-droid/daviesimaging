import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";

interface LPCtaProps {
  headline: React.ReactNode;
  description?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function LPCta({
  headline,
  description,
  primaryCta,
  secondaryCta,
}: LPCtaProps) {
  return (
    <section className="flex min-h-[60vh] items-center bg-white py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll>
          <h2>{headline}</h2>
          {description && (
            <p className="mt-5 text-zinc-600">{description}</p>
          )}
          <div className="mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600"
            >
              {primaryCta.label} <span aria-hidden="true">&rarr;</span>
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600"
              >
                {secondaryCta.label} <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
