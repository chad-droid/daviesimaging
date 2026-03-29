"use client";

import { useState, useEffect, useCallback } from "react";

const ADMIN_KEY = "dig-admin-auth";

interface ContentEditorProps {
  slotId: string;
  fields: {
    key: string;
    label: string;
    type: "text" | "textarea" | "url";
    defaultValue: string;
  }[];
  children: (values: Record<string, string>) => React.ReactNode;
}

export function EditableContent({ slotId, fields, children }: ContentEditorProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  // Check admin
  useEffect(() => {
    if (sessionStorage.getItem(ADMIN_KEY) === "true") setIsAdmin(true);
  }, []);

  // Load saved content
  const loadContent = useCallback(async () => {
    try {
      const res = await fetch(`/api/site-content?slot=${encodeURIComponent(slotId)}`);
      const data = await res.json();
      if (data.content) {
        setValues(data.content);
      } else {
        // Use defaults
        const defaults: Record<string, string> = {};
        fields.forEach((f) => { defaults[f.key] = f.defaultValue; });
        setValues(defaults);
      }
    } catch {
      const defaults: Record<string, string> = {};
      fields.forEach((f) => { defaults[f.key] = f.defaultValue; });
      setValues(defaults);
    }
    setLoaded(true);
  }, [slotId, fields]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  async function save() {
    setSaving(true);
    await fetch("/api/site-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slotId, content: values }),
    });
    setSaving(false);
    setEditing(false);
  }

  if (!loaded) return null;

  // Get current values (saved or defaults)
  const current: Record<string, string> = {};
  fields.forEach((f) => {
    current[f.key] = values[f.key] ?? f.defaultValue;
  });

  return (
    <div className="relative">
      {/* Admin edit button — always visible, high z-index */}
      {isAdmin && !editing && (
        <button
          onClick={(e) => { e.stopPropagation(); setEditing(true); }}
          className="absolute right-0 top-0 z-[80] flex items-center gap-1.5 rounded-full bg-[#6A5ACD] px-3 py-1.5 text-[10px] font-semibold text-white shadow-lg transition-transform hover:scale-105"
          title="Edit content"
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
          Edit
        </button>
      )}

      {/* Render content */}
      {children(current)}

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-lg rounded-lg bg-[#1E1E1E] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#2C2C2C] px-6 py-4">
              <p className="text-sm font-semibold text-[#F5F5F5]">Edit Content</p>
              <button onClick={() => setEditing(false)} className="text-[#666] hover:text-[#F5F5F5]">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 p-6">
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="mb-1.5 block text-[10px] uppercase tracking-widest text-[#666]">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={values[field.key] ?? field.defaultValue}
                      onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                      rows={3}
                      className="w-full rounded border border-[#2C2C2C] bg-[#121212] px-3 py-2 text-sm text-[#F5F5F5] outline-none focus:border-[#6A5ACD]"
                    />
                  ) : (
                    <input
                      type={field.type === "url" ? "url" : "text"}
                      value={values[field.key] ?? field.defaultValue}
                      onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                      className="w-full rounded border border-[#2C2C2C] bg-[#121212] px-3 py-2 text-sm text-[#F5F5F5] outline-none focus:border-[#6A5ACD]"
                      placeholder={field.type === "url" ? "https://..." : ""}
                    />
                  )}
                </div>
              ))}
            </div>

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
    </div>
  );
}
