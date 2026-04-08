"use client";

import { EditableContent } from "./EditableContent";
import { Eyebrow } from "./Eyebrow";

interface EditableTextContentProps {
  slotId: string;
  headlineDefault: string;
  bodyDefault: string;
  /** Optional eyebrow label above the headline — adds an editable eyebrow field to the admin panel */
  eyebrowDefault?: string;
  /** Use on dark backgrounds */
  dark?: boolean;
  /** h2 (default) or h3 */
  headingLevel?: "h2" | "h3";
}

/**
 * Editable eyebrow + headline + body paragraph group.
 * Renders NO layout wrapper — the page controls all structure.
 * Safe to import from Server Component pages: only serializable props cross the boundary.
 *
 * Usage:
 *   <EditableTextContent
 *     slotId="services-listing-whatyouget"
 *     eyebrowDefault="What You Get"
 *     headlineDefault="Every listing, same <strong>standard</strong>."
 *     bodyDefault="Whether it's the first home or the fiftieth..."
 *   />
 */
export function EditableTextContent({
  slotId,
  headlineDefault,
  bodyDefault,
  eyebrowDefault,
  dark = false,
  headingLevel = "h2",
}: EditableTextContentProps) {
  const fields = [
    ...(eyebrowDefault !== undefined
      ? [{ key: "eyebrow", label: "Eyebrow", type: "text" as const, defaultValue: eyebrowDefault }]
      : []),
    { key: "headline", label: "Headline", type: "text" as const, defaultValue: headlineDefault },
    { key: "body", label: "Body", type: "textarea" as const, defaultValue: bodyDefault },
  ];

  const headlineClass = dark ? "text-text-light" : "";
  const bodyClass = dark
    ? "mt-4 leading-relaxed text-white/80"
    : "mt-4 leading-relaxed text-text-body";

  return (
    <EditableContent slotId={slotId} fields={fields}>
      {(v) => (
        <>
          {(v.eyebrow || eyebrowDefault) && (
            <Eyebrow dark={dark}>{v.eyebrow || eyebrowDefault!}</Eyebrow>
          )}
          {headingLevel === "h3" ? (
            <h3 className={headlineClass} dangerouslySetInnerHTML={{ __html: v.headline }} />
          ) : (
            <h2 className={headlineClass} dangerouslySetInnerHTML={{ __html: v.headline }} />
          )}
          {v.body && (
            <p className={bodyClass} dangerouslySetInnerHTML={{ __html: v.body }} />
          )}
        </>
      )}
    </EditableContent>
  );
}
