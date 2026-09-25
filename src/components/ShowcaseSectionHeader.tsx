"use client";

import { EditableContent } from "./EditableContent";
import { Eyebrow } from "./Eyebrow";

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

/**
 * Section header for /services/showcase: eyebrow, headline, then a two-step
 * body (lead + optional tail).
 *
 * Renders exactly like EditableTextContent (standard Eyebrow, global h2,
 * body copy) so the page matches every other Solutions page. It stays its own
 * component only because the saved slots use `lead` / `tail` keys rather than
 * a single `body`.
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
    { key: "eyebrow", label: "Eyebrow", type: "text" as const, defaultValue: eyebrowDefault },
    { key: "headline", label: "Headline", type: "text" as const, defaultValue: headlineDefault },
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
          {(v.eyebrow || eyebrowDefault) && (
            <Eyebrow dark={dark}>{v.eyebrow || eyebrowDefault}</Eyebrow>
          )}
          <h2
            className={dark ? "text-text-light" : undefined}
            dangerouslySetInnerHTML={{ __html: v.headline }}
          />
          {v.lead && (
            <p
              className={`mt-4 leading-relaxed ${copyColour}`}
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
