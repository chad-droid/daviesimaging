"use client";

import { EditableContent } from "./EditableContent";
import { Eyebrow as EyebrowInner } from "./Eyebrow";

interface EditableHeroProps {
  slotId: string;
  headlineDefault: string;
  subheadDefault: string;
  dark?: boolean;
  /** Optional eyebrow label above the headline — adds an editable eyebrow field to the admin panel */
  eyebrowDefault?: string;
}

/**
 * Server-component-safe wrapper around EditableContent for hero sections.
 * The render function lives here (client side), so Server Components can
 * import this without hitting the "functions can't cross the boundary" error.
 */
export function EditableHero({ slotId, headlineDefault, subheadDefault, dark = true, eyebrowDefault }: EditableHeroProps) {
  const fields = [
    ...(eyebrowDefault !== undefined
      ? [{ key: "eyebrow", label: "Eyebrow", type: "text" as const, defaultValue: eyebrowDefault }]
      : []),
    { key: "headline", label: "Headline", type: "textarea" as const, defaultValue: headlineDefault },
    { key: "subhead", label: "Subhead", type: "textarea" as const, defaultValue: subheadDefault },
  ];

  return (
    <EditableContent slotId={slotId} fields={fields}>
      {(v) => (
        <>
          {(v.eyebrow || eyebrowDefault) && (
            <EyebrowInner dark={dark}>{v.eyebrow || eyebrowDefault!}</EyebrowInner>
          )}
          <h1
            className={dark ? "text-text-light" : undefined}
            dangerouslySetInnerHTML={{ __html: v.headline }}
          />
          <p className={`mt-6 max-w-2xl text-xl leading-relaxed ${dark ? "text-white/80" : "text-text-muted"}`}>{v.subhead}</p>
        </>
      )}
    </EditableContent>
  );
}
