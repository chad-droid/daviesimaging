"use client";

/**
 * useEditableSlot — universal hook for inline admin editing
 *
 * Drop into ANY "use client" component. Returns:
 *   v           — processed field values (defaults shown instantly, DB merges in background)
 *   editOverlay — JSX containing the Edit button + modal (render inside a `relative` container)
 *
 * Example:
 *   const { v, editOverlay } = useEditableSlot("my-slot", fields);
 *   return (
 *     <section className="relative ...">
 *       {editOverlay}
 *       <h2 dangerouslySetInnerHTML={{ __html: v.headline }} />
 *       <p>{v.body}</p>
 *     </section>
 *   );
 *
 * No render-prop restructuring. No component wrapping. Works with any layout,
 * any animation library, any number of sub-components.
 */

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const ADMIN_KEY = "dig-admin-auth";

export type SlotField = {
  key: string;
  label: string;
  type: "text" | "textarea" | "url";
  defaultValue: string;
};

export function useEditableSlot(slotId: string, fields: SlotField[]) {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // DB values loaded in the background — start empty, merge in when ready
  const [dbValues, setDbValues] = useState<Record<string, string>>({});

  // Values shown in the edit modal — synced to db on open
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  // Admin detection
  useEffect(() => {
    setIsAdmin(sessionStorage.getItem(ADMIN_KEY) === "true");
  }, [pathname]);

  // Background-load saved content — never blocks render
  useEffect(() => {
    fetch(`/api/site-content?slot=${encodeURIComponent(slotId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.content) setDbValues(data.content);
      })
      .catch(() => {});
  }, [slotId]);

  // Build current display values: defaults → db values
  const defaults: Record<string, string> = {};
  fields.forEach((f) => { defaults[f.key] = f.defaultValue; });
  const raw = { ...defaults, ...dbValues };

  // Process bold markdown: **word** and *word* → <strong>
  const v: Record<string, string> = {};
  fields.forEach((f) => {
    let val = raw[f.key] ?? f.defaultValue;
    if (f.type === "text" || f.type === "textarea") {
      val = val
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<strong>$1</strong>");
    }
    v[f.key] = val;
  });

  function openEdit() {
    // Snapshot current db+default state into edit form
    setEditValues({ ...defaults, ...dbValues });
    setEditing(true);
  }

  async function save() {
    setSaving(true);
    try {
      await fetch("/api/site-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId, content: editValues }),
      });
      setDbValues(editValues);
    } finally {
      setSaving(false);
      setEditing(false);
    }
  }

  const isCTAKey = (key: string) =>
    ["ctaText", "cta1Text", "cta2Text", "secondaryCta"].includes(key);

  const editOverlay = (
    <>
      {/* Edit button — visible to admin only */}
      {isAdmin && !editing && (
        <button
          onClick={(e) => { e.stopPropagation(); openEdit(); }}
          className="absolute right-2 top-2 z-[80] flex items-center gap-1.5 rounded-full bg-[#6A5ACD] px-3 py-1.5 text-[10px] font-semibold text-white shadow-lg transition-transform hover:scale-105"
          title={`Edit: ${slotId}`}
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
          Edit
        </button>
      )}

      {/* Modal */}
      {editing && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 p-4 pt-16"
          onClick={() => setEditing(false)}
        >
          <div
            className="w-full max-w-lg rounded-lg bg-[#1E1E1E] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-[#2C2C2C] px-6 py-4">
              <div>
                <p className="text-sm font-semibold text-[#F5F5F5]">Edit Content</p>
                <p className="mt-0.5 text-[10px] text-[#555]">{slotId}</p>
              </div>
              <button onClick={() => setEditing(false)} className="text-[#666] hover:text-[#F5F5F5]">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Fields */}
            <div className="max-h-[65vh] space-y-4 overflow-y-auto p-6">
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="mb-1.5 flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#666]">
                    {field.label}
                    {(field.type === "text" || field.type === "textarea") && !isCTAKey(field.key) && (
                      <span className="normal-case tracking-normal text-[#6A5ACD]">**bold**</span>
                    )}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={editValues[field.key] ?? field.defaultValue}
                      onChange={(e) =>
                        setEditValues({ ...editValues, [field.key]: e.target.value })
                      }
                      rows={3}
                      className="w-full rounded border border-[#2C2C2C] bg-[#121212] px-3 py-2 text-sm text-[#F5F5F5] outline-none focus:border-[#6A5ACD]"
                    />
                  ) : (
                    <input
                      type={field.type === "url" ? "url" : "text"}
                      value={editValues[field.key] ?? field.defaultValue}
                      onChange={(e) =>
                        setEditValues({ ...editValues, [field.key]: e.target.value })
                      }
                      className="w-full rounded border border-[#2C2C2C] bg-[#121212] px-3 py-2 text-sm text-[#F5F5F5] outline-none focus:border-[#6A5ACD]"
                      placeholder={field.type === "url" ? "https://..." : ""}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 border-t border-[#2C2C2C] px-6 py-4">
              <button
                onClick={() => setEditing(false)}
                className="rounded-full border border-[#2C2C2C] px-4 py-2 text-xs font-semibold text-[#A8A2D0]"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="rounded-full bg-[#6A5ACD] px-5 py-2 text-xs font-semibold text-white hover:bg-[#5848B5] disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return { v, editOverlay };
}
