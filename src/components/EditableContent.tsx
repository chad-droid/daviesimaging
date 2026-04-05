"use client";

/**
 * EditableContent — thin wrapper around useEditableSlot.
 *
 * Keeps the render-prop API intact so existing callers (HeroVideo, AssetVsContent, etc.)
 * continue working without changes. Internally uses useEditableSlot so all sections
 * share the same engine: defaults shown immediately, no content flash, same modal UX.
 */

import { useEditableSlot, type SlotField } from "@/lib/useEditableSlot";

interface ContentEditorProps {
  slotId: string;
  fields: SlotField[];
  children: (values: Record<string, string>) => React.ReactNode;
}

export function EditableContent({ slotId, fields, children }: ContentEditorProps) {
  const { v, editOverlay } = useEditableSlot(slotId, fields);

  return (
    <div className="relative">
      {editOverlay}
      {children(v)}
    </div>
  );
}
