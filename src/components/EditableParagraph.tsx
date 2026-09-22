"use client";

import { EditableContent } from "./EditableContent";

interface EditableParagraphProps {
  slotId: string;
  bodyDefault: string;
  className?: string;
  /** Use on dark backgrounds */
  dark?: boolean;
}

/**
 * A single editable paragraph with no heading above it.
 *
 * Server-component-safe wrapper around EditableContent: the render function
 * lives here on the client, so Server Component pages only pass strings.
 * Use where a section's supporting copy sits in its own column, apart from
 * the headline (the two-column section headers on /services/showcase).
 */
export function EditableParagraph({
  slotId,
  bodyDefault,
  className = "",
  dark = false,
}: EditableParagraphProps) {
  const fields = [
    { key: "body", label: "Body", type: "textarea" as const, defaultValue: bodyDefault },
  ];

  return (
    <EditableContent slotId={slotId} fields={fields}>
      {(v) => (
        <p
          className={`leading-relaxed ${dark ? "text-white/80" : "text-text-body"} ${className}`}
          dangerouslySetInnerHTML={{ __html: v.body }}
        />
      )}
    </EditableContent>
  );
}
