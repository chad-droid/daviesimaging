import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DynamicImage } from "@/components/DynamicImage";

interface SolutionProps {
  eyebrow?: string;
  headline: React.ReactNode;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Admin image slot for the right-hand image. Without it the placeholder block shows. */
  imageSlot?: string;
  /** Local image shown until one is assigned to the slot. */
  imageDefault?: string;
  imageAlt?: string;
}

export function Solution({
  eyebrow = "The Solution",
  headline,
  description,
  ctaLabel,
  ctaHref,
  imageSlot,
  imageDefault,
  imageAlt,
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
          {imageSlot ? (
            <DynamicImage
              slotId={imageSlot}
              defaultSrc={imageDefault}
              defaultAlt={imageAlt}
              aspectRatio="4/3"
              className="rounded-lg"
            />
          ) : (
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-bg-light to-border-light" />
          )}
        </RevealOnScroll>
      </div>
    </section>
  );
}
