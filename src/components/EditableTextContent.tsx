"use client";

import { EditableContent } from "./EditableContent";

interface EditableTextContentProps {
  slotId: string;
  headlineDefault: string;
  bodyDefault: string;
  /** Use on dark backgrounds */
  dark?: boolean;
  /** h2 (default) or h3 */
  headingLevel?: "h2" | "h3";
}

/**
 * Editable headline + body paragraph pair.
 * Renders NO layout wrapper — the page controls all structure.
 * Safe to import from Server Component pages: only serializable props cross the boundary.
 *
 * Usage:
 *   <EditableTextContent
 *     slotId="services-listing-whatyouget"
 *     headlineDefault="Every listing, same <strong>standard</strong>."
 *     bodyDefault="Whether it's the first home or the fiftieth..."
 *   />
 */
export function EditableTextContent({
  slotId,
  headlineDefault,
  bodyDefault,
  dark = false,
  headingLevel = "h2",
}: EditableTextContentProps) {
  const fields = [
    { key: "headline", label: "Headline", type: "text" as const, defaultValue: headlineDefault },
    { key: "body", label: "Body", type: "textarea" as const, defaultValue: bodyDefault },
  ];

  const headlineClass = dark ? "text-text-light" : "";
  const bodyClass = dark
    ? "mt-4 leading-relaxed text-text-muted"
    : "mt-4 leading-relaxed text-text-body";

  return (
    <EditableContent slotId={slotId} fields={fields}>
      {(v) => (
        <>
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
