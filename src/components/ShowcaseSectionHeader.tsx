"use client";

import { EditableContent } from "./EditableContent";

interface ShowcaseSectionHeaderProps {
  slotId: string;
  /** Category name. The largest thing in the section. */
  eyebrowDefault: string;
  headlineDefault: string;
  /** Opening sentence. */
  leadDefault: string;
  /** Closing detail. Omit where a section only carries the one sentence. */
  tailDefault?: string;
  /** Use on dark backgrounds */
  dark?: boolean;
}

/**
 * Section header for /services/showcase: category name, headline, then body.
 *
 * The ladder runs largest to smallest in reading order, so the category name
 * leads the section and the copy steps down under it:
 *
 *   width    category   headline   body
 *   <640     1.5rem     1.25rem    1rem
 *   >=640    1.875rem   1.4375rem  1rem
 *   >=1024   2.25rem    1.625rem   1rem
 *   >=1280   2.5rem     1.75rem    1rem
 *   >=1536   2.75rem    1.875rem   1rem
 *   >=1920   3rem       2rem       1rem
 *
 * Both tiers step with the h2 scale in globals.css rather than sitting at a
 * fixed size. A fixed size breaks the order on small screens, where the root
 * and the headings shrink but a hard-coded value does not.
 *
 * The category name is styled here rather than through <Eyebrow>, which is
 * locked to text-xs for the rest of the site. Colour and treatment match it.
 *
 * Server-component-safe: the render function lives here on the client, so
 * pages pass only strings across the boundary.
 */
const CATEGORY_SIZE =
  "text-[1.5rem] sm:text-[1.875rem] lg:text-[2.25rem] xl:text-[2.5rem] 2xl:text-[2.75rem] min-[1920px]:text-[3rem]";

const HEADLINE_SIZE =
  "text-[1.25rem] sm:text-[1.4375rem] lg:text-[1.625rem] xl:text-[1.75rem] 2xl:text-[1.875rem] min-[1920px]:text-[2rem]";

export function ShowcaseSectionHeader({
  slotId,
  eyebrowDefault,
  headlineDefault,
  leadDefault,
  tailDefault,
  dark = false,
}: ShowcaseSectionHeaderProps) {
  const fields = [
    { key: "eyebrow", label: "Category", type: "text" as const, defaultValue: eyebrowDefault },
    { key: "headline", label: "Headline", type: "text" as const, defaultValue: headlineDefault },
    { key: "lead", label: "Lead sentence", type: "textarea" as const, defaultValue: leadDefault },
    ...(tailDefault !== undefined
      ? [{ key: "tail", label: "Detail sentence", type: "textarea" as const, defaultValue: tailDefault }]
      : []),
  ];

  // Unchanged from the single-size body this replaces. Only sizes move.
  const copyColour = dark ? "text-white/80" : "text-text-body";
  const categoryColour = dark ? "text-accent-dark-hover" : "text-accent";

  return (
    <EditableContent slotId={slotId} fields={fields}>
      {(v) => (
        <>
          {(v.eyebrow || eyebrowDefault) && (
            <p
              className={`mb-3 font-bold uppercase leading-tight tracking-normal ${CATEGORY_SIZE} ${categoryColour}`}
            >
              {v.eyebrow || eyebrowDefault}
            </p>
          )}
          <h2
            className={`${HEADLINE_SIZE} leading-snug ${dark ? "text-text-light" : ""}`}
            dangerouslySetInnerHTML={{ __html: v.headline }}
          />
          {v.lead && (
            <p
              className={`mt-4 text-base leading-relaxed ${copyColour}`}
              dangerouslySetInnerHTML={{ __html: v.lead }}
            />
          )}
          {v.tail && (
            <p
              className={`mt-2 text-base leading-relaxed ${copyColour}`}
              dangerouslySetInnerHTML={{ __html: v.tail }}
            />
          )}
        </>
      )}
    </EditableContent>
  );
}
