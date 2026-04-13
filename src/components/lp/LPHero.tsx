import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { DarkSection } from "@/components/DarkSection";

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
    <DarkSection className="min-h-[60vh] py-28 text-text-light">
      <div className="mx-auto max-w-4xl px-6">
        {eyebrow && <Eyebrow dark>{eyebrow}</Eyebrow>}
        <h1 className="text-text-light">{headline}</h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-text-muted">
          {subheadline}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href={primaryCta.href}
            className="cta-button rounded-full bg-accent px-8 py-3.5 text-text-light transition-colors hover:bg-accent-hover"
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
    </DarkSection>
  );
}
