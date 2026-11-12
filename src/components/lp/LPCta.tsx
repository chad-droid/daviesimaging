import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { DarkSection } from "@/components/DarkSection";

interface LPCtaProps {
  headline: React.ReactNode;
  description?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

/** Closing section for landing and role pages. Dark, like every other page's final CTA. */
export function LPCta({
  headline,
  description,
  primaryCta,
  secondaryCta,
}: LPCtaProps) {
  return (
    <DarkSection className="py-24 text-text-light">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll>
          <h2 className="text-text-light">{headline}</h2>
          {description && (
            <p className="mx-auto mt-5 max-w-xl text-text-muted">{description}</p>
          )}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
            <Link
              href={primaryCta.href}
              className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              {primaryCta.label}
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                {secondaryCta.label} <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </DarkSection>
  );
}
