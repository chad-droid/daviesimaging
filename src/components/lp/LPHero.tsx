import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";

interface LPHeroProps {
  eyebrow?: string;
  headline: React.ReactNode;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function LPHero({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
}: LPHeroProps) {
  return (
    <section className="flex min-h-screen items-center bg-bg-dark py-28 text-text-light">
      <div className="mx-auto max-w-3xl px-6 text-center">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="text-text-light">{headline}</h1>
        <p
          className="lead-text mt-6 text-text-muted"
          style={{ fontStyle: "italic" }}
        >
          {subheadline}
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href={primaryCta.href}
            className="cta-button rounded-full bg-bg-surface px-8 py-3.5 text-text-dark transition-colors hover:bg-border-light"
          >
            {primaryCta.label}
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="cta-button rounded-full border border-text-light/30 px-8 py-3.5 text-text-light transition-colors hover:border-text-light/60"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
