"use client";

import { EditableContent } from "./EditableContent";
import { Eyebrow } from "./Eyebrow";

interface ShowcaseSectionHeaderProps {
  slotId: string;
  /** Chapter number shown before the product name, e.g. "01". */
  index: string;
  /** Product name. Renders as the eyebrow, never as the headline. */
  eyebrowDefault: string;
  headlineDefault: string;
  /** Opening sentence. */
  leadDefault: string;
  /** Closing detail. Omit where a chapter only carries the one sentence. */
  tailDefault?: string;
}

/**
 * Chapter header for /services/showcase, on a dark background.
 *
 * Follows the site's type system: the product name is a small eyebrow, the
 * Cormorant headline is the largest thing in the chapter, and the body sits
 * beside it from lg up. The product name is deliberately not a display
 * heading. Bold uppercase sans at headline size is the one treatment the rest
 * of the site never uses.
 *
 * Server-component-safe: the render function lives here on the client, so
 * pages pass only strings across the boundary.
 */
export function ShowcaseSectionHeader({
  slotId,
  index,
  eyebrowDefault,
  headlineDefault,
  leadDefault,
  tailDefault,
}: ShowcaseSectionHeaderProps) {
  const fields = [
    { key: "eyebrow", label: "Product name", type: "text" as const, defaultValue: eyebrowDefault },
    { key: "headline", label: "Headline", type: "text" as const, defaultValue: headlineDefault },
    { key: "lead", label: "Lead sentence", type: "textarea" as const, defaultValue: leadDefault },
    ...(tailDefault !== undefined
      ? [{ key: "tail", label: "Detail sentence", type: "textarea" as const, defaultValue: tailDefault }]
      : []),
  ];

  return (
    <EditableContent slotId={slotId} fields={fields}>
      {(v) => (
        <div className="lg:grid lg:grid-cols-[3fr_2fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow dark>{`${index} / ${v.eyebrow || eyebrowDefault}`}</Eyebrow>
            <h2
              className="text-text-light lg:text-[3rem] lg:leading-[1.08] xl:text-[3.5rem]"
              dangerouslySetInnerHTML={{ __html: v.headline }}
            />
          </div>
          <div className="mt-6 lg:mt-0 lg:pb-2">
            {v.lead && (
              <p
                className="text-lg leading-relaxed text-white/80"
                dangerouslySetInnerHTML={{ __html: v.lead }}
              />
            )}
            {v.tail && (
              <p
                className="mt-3 text-base leading-relaxed text-white/60"
                dangerouslySetInnerHTML={{ __html: v.tail }}
              />
            )}
          </div>
        </div>
      )}
    </EditableContent>
  );
}
