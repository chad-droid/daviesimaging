"use client";

import Link from "next/link";
import Image from "next/image";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { EditableContent } from "@/components/EditableContent";
import { DynamicImage } from "@/components/DynamicImage";

function extractYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?\s]+)/);
  return match ? match[1] : null;
}

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
  children?: React.ReactNode;
}

export function EditableSection({ slotId, variant, defaults, children }: EditableSectionProps) {
  const isHero = variant === "hero-dark";
  const isDark = isHero || variant === "dark" || variant === "dark-split";
  const isSplit = variant === "light-split" || variant === "dark-split";

  const fields = [
    { key: "eyebrow", label: "Eyebrow", type: "text" as const, defaultValue: defaults.eyebrow },
    { key: "headline", label: "Headline", type: "text" as const, defaultValue: defaults.headline },
    { key: "body", label: "Body", type: "textarea" as const, defaultValue: defaults.body },
    ...(defaults.ctaText !== undefined ? [
      { key: "ctaText", label: "CTA Text", type: "text" as const, defaultValue: defaults.ctaText || "" },
      { key: "ctaUrl", label: "CTA URL", type: "url" as const, defaultValue: defaults.ctaUrl || "/" },
    ] : []),
    ...(isHero ? [
      { key: "bgImageUrl", label: "Background Image URL", type: "url" as const, defaultValue: "" },
      { key: "bgVideoUrl", label: "Background Video (YouTube URL)", type: "url" as const, defaultValue: "" },
    ] : []),
  ];

  const headlineClass = isDark ? "text-text-light" : "";
  const bodyClass = isDark ? "mt-5 text-text-muted" : "mt-5 text-text-body";
  const ctaClass = isDark
    ? "mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-light transition-colors hover:text-accent-dark-hover"
    : "mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent";

  if (isSplit) {
    const sectionClass = isDark
      ? "flex min-h-[60vh] items-center bg-bg-dark py-24 text-text-light"
      : "min-h-[70vh] bg-bg-surface py-24";
    return (
      <section className={sectionClass}>
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
          <RevealOnScroll>
            <EditableContent slotId={slotId} fields={fields}>
              {(v) => (
                <>
                  <Eyebrow dark={isDark}>{v.eyebrow}</Eyebrow>
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

  // Hero or standard section
  return (
    <EditableContent slotId={slotId} fields={fields}>
      {(v) => {
        const ytId = isHero && v.bgVideoUrl ? extractYoutubeId(v.bgVideoUrl) : null;
        const bgImage = isHero ? v.bgImageUrl : null;
        const hasBg = !!(ytId || bgImage);

        const sectionClass = isHero
          ? "relative flex -mt-16 min-h-screen items-center overflow-hidden bg-bg-dark py-28 text-text-light"
          : isDark
            ? "flex min-h-[60vh] items-center bg-bg-dark py-24 text-text-light"
            : "min-h-[70vh] bg-bg-surface py-24";

        return (
          <section className={sectionClass}>
            {/* Hero background: video or image */}
            {isHero && ytId && (
              <div className="absolute inset-0 overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&modestbranding=1&playsinline=1`}
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ width: "177.78vh", height: "56.25vw", minWidth: "100vw", minHeight: "100vh" }}
                  allow="autoplay; encrypted-media"
                  tabIndex={-1}
                />
              </div>
            )}
            {isHero && bgImage && !ytId && (
              <div className="absolute inset-0">
                <Image
                  src={bgImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
            )}
            {/* Dark overlay for hero backgrounds */}
            {isHero && hasBg && (
              <div className="absolute inset-0 bg-black/45" />
            )}
            {/* Hero image slot (from DynamicImage / site_assets) */}
            {isHero && !hasBg && (
              <DynamicImage
                slotId={`${slotId}-bg`}
                className="absolute inset-0"
                fallbackClass=""
                aspectRatio="auto"
              />
            )}

            <div className={`${isHero ? "relative z-10" : ""} mx-auto max-w-3xl px-6 text-center`}>
              <RevealOnScroll>
                <Eyebrow dark={isDark}>{v.eyebrow}</Eyebrow>
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
              </RevealOnScroll>
            </div>
          </section>
        );
      }}
    </EditableContent>
  );
}
