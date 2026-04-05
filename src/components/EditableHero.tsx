"use client";

import { EditableContent } from "./EditableContent";

interface EditableHeroProps {
  slotId: string;
  headlineDefault: string;
  subheadDefault: string;
  dark?: boolean;
}

/**
 * Server-component-safe wrapper around EditableContent for hero sections.
 * The render function lives here (client side), so Server Components can
 * import this without hitting the "functions can't cross the boundary" error.
 */
export function EditableHero({ slotId, headlineDefault, subheadDefault, dark = true }: EditableHeroProps) {
  const fields = [
    { key: "headline", label: "Headline", type: "textarea" as const, defaultValue: headlineDefault },
    { key: "subhead", label: "Subhead", type: "textarea" as const, defaultValue: subheadDefault },
  ];

  return (
    <EditableContent slotId={slotId} fields={fields}>
      {(v) => (
        <>
          <h1
            className={dark ? "text-text-light" : undefined}
            dangerouslySetInnerHTML={{ __html: v.headline }}
          />
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-text-muted">{v.subhead}</p>
        </>
      )}
    </EditableContent>
  );
}
