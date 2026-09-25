"use client";

import { EditableContent } from "./EditableContent";

interface ShowcaseSectionHeaderProps {
  slotId: string;
  eyebrowDefault: string;
  headlineDefault: string;
  /** Opening sentence. */
  leadDefault: string;
  /** Closing detail. Omit where a section only carries the one sentence. */
  tailDefault?: string;
  /** Use on dark backgrounds */
  dark?: boolean;
}

/** Steps with the global heading scale, one notch under the hero h1. */
const NAME_SIZE =
  "text-[1.875rem] md:text-[2.25rem] lg:text-[2.75rem] xl:text-[3rem] 2xl:text-[3.5rem] min-[1920px]:text-[3.875rem]";

/**
 * Section header for /services/showcase: product name, tagline, then a
 * two-step body (lead + optional tail).
 *
 * The product name is the featured element: a Cormorant h2 sized one step
 * under the page hero h1, so each product reads as its own chapter. The
 * tagline drops to h3 beneath it. Both keep the site fonts, so the page still
 * matches the rest of the Solutions pages.
 *
 * The `eyebrow` / `headline` keys are kept so saved slot copy survives.
 *
 * Server-component-safe: the render function lives here on the client, so
 * pages pass only strings across the boundary.
 */
export function ShowcaseSectionHeader({
  slotId,
  eyebrowDefault,
  headlineDefault,
  leadDefault,
  tailDefault,
  dark = false,
}: ShowcaseSectionHeaderProps) {
  const fields = [
    { key: "eyebrow", label: "Product name", type: "text" as const, defaultValue: eyebrowDefault },
    { key: "headline", label: "Tagline", type: "text" as const, defaultValue: headlineDefault },
    { key: "lead", label: "Lead sentence", type: "textarea" as const, defaultValue: leadDefault },
    ...(tailDefault !== undefined
      ? [{ key: "tail", label: "Detail sentence", type: "textarea" as const, defaultValue: tailDefault }]
      : []),
  ];

  const copyColour = dark ? "text-white/80" : "text-text-body";

  return (
    <EditableContent slotId={slotId} fields={fields}>
      {(v) => (
        <>
          <h2
            className={`${NAME_SIZE} font-semibold leading-[1.05] tracking-[-0.01em] ${dark ? "text-text-light" : ""}`}
          >
            {v.eyebrow || eyebrowDefault}
          </h2>
          <h3
            className={`mt-3 ${dark ? "text-text-light" : ""}`}
            dangerouslySetInnerHTML={{ __html: v.headline }}
          />
          {v.lead && (
            <p
              className={`mt-5 leading-relaxed ${copyColour}`}
              dangerouslySetInnerHTML={{ __html: v.lead }}
            />
          )}
          {v.tail && (
            <p
              className={`mt-2 leading-relaxed ${copyColour}`}
              dangerouslySetInnerHTML={{ __html: v.tail }}
            />
          )}
        </>
      )}
    </EditableContent>
  );
}
