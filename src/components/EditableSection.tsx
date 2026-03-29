"use client";

import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { EditableContent } from "@/components/EditableContent";

interface EditableSectionProps {
  slotId: string;
  variant: "hero-dark" | "light" | "dark" | "light-split" | "dark-split";
  defaults: {
    eyebrow: string;
    headline: string;
    body: string;
    ctaText?: string;
    ctaUrl?: string;
  };
  children?: React.ReactNode; // Extra content like DynamicImage
}

export function EditableSection({ slotId, variant, defaults, children }: EditableSectionProps) {
  const fields = [
    { key: "eyebrow", label: "Eyebrow", type: "text" as const, defaultValue: defaults.eyebrow },
    { key: "headline", label: "Headline", type: "text" as const, defaultValue: defaults.headline },
    { key: "body", label: "Body", type: "textarea" as const, defaultValue: defaults.body },
    ...(defaults.ctaText !== undefined ? [
      { key: "ctaText", label: "CTA Text", type: "text" as const, defaultValue: defaults.ctaText || "" },
      { key: "ctaUrl", label: "CTA URL", type: "url" as const, defaultValue: defaults.ctaUrl || "/" },
    ] : []),
  ];

  const isDark = variant === "hero-dark" || variant === "dark" || variant === "dark-split";
  const isHero = variant === "hero-dark";
  const isSplit = variant === "light-split" || variant === "dark-split";

  const sectionClass = isHero
    ? "flex min-h-screen items-center bg-bg-dark py-28 text-text-light"
    : isDark
      ? "flex min-h-[60vh] items-center bg-bg-dark py-24 text-text-light"
      : "min-h-[70vh] bg-bg-surface py-24";

  const headlineClass = isDark ? "text-text-light" : "";
  const bodyClass = isDark ? "mt-5 text-text-muted" : "mt-5 text-text-body";
  const ctaClass = isDark
    ? "mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-light transition-colors hover:text-accent-dark-hover"
    : "mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent";

  if (isSplit) {
    return (
      <section className={sectionClass}>
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
          <RevealOnScroll>
            <EditableContent slotId={slotId} fields={fields}>
              {(v) => (
                <>
                  <Eyebrow>{v.eyebrow}</Eyebrow>
                  <h2 className={headlineClass} dangerouslySetInnerHTML={{ __html: v.headline }} />
                  <p className={bodyClass} dangerouslySetInnerHTML={{ __html: v.body }} />
                  {v.ctaText && (
                    <Link href={v.ctaUrl || "/"} className={ctaClass}>
                      {v.ctaText} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )}
                </>
              )}
            </EditableContent>
          </RevealOnScroll>
          {children && <RevealOnScroll>{children}</RevealOnScroll>}
        </div>
      </section>
    );
  }

  return (
    <section className={sectionClass}>
      <div className="mx-auto max-w-3xl px-6 text-center">
        <RevealOnScroll>
          <EditableContent slotId={slotId} fields={fields}>
            {(v) => (
              <>
                <Eyebrow>{v.eyebrow}</Eyebrow>
                {isHero ? (
                  <h1 className="text-text-light" dangerouslySetInnerHTML={{ __html: v.headline }} />
                ) : (
                  <h2 className={headlineClass} dangerouslySetInnerHTML={{ __html: v.headline }} />
                )}
                <p
                  className={isHero ? "lead-text mt-6 text-text-muted" : bodyClass}
                  style={isHero ? { fontStyle: "italic" } : undefined}
                  dangerouslySetInnerHTML={{ __html: v.body }}
                />
                {v.ctaText && (
                  <Link href={v.ctaUrl || "/"} className={ctaClass}>
                    {v.ctaText} <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </>
            )}
          </EditableContent>
        </RevealOnScroll>
      </div>
    </section>
  );
}
