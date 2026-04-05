"use client";

import { useState, useEffect } from "react";

// sessionStorage key — used by useEditableSlot to gate edit UI.
// The actual password never touches the client. Validation happens server-side
// via /api/admin-auth so the password is never shipped in the JS bundle.
export const ADMIN_STORAGE_KEY = "dig-admin-auth";

export function AdminAuth({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(ADMIN_STORAGE_KEY);
    if (saved === "true") setAuthed(true);
    setChecking(false);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: input }),
      });
      if (res.ok) {
        sessionStorage.setItem(ADMIN_STORAGE_KEY, "true");
        setAuthed(true);
      } else {
        setError(true);
        setInput("");
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (checking) return null;

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#121212]">
        <form onSubmit={handleSubmit} className="w-full max-w-xs text-center">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.15em] text-[#A8A2D0]">
            Admin Access
          </p>
          <input
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            placeholder="Password"
            autoFocus
            disabled={loading}
            className={`w-full rounded-lg border px-4 py-3 text-sm text-[#F5F5F5] outline-none transition-colors bg-[#1E1E1E] disabled:opacity-50 ${
              error ? "border-[#E57373]" : "border-[#2C2C2C] focus:border-[#6A5ACD]"
            }`}
          />
          {error && (
            <p className="mt-2 text-xs text-[#E57373]">Incorrect password</p>
          )}
          <button
            type="submit"
            disabled={loading || !input}
            className="mt-4 w-full rounded-full bg-[#6A5ACD] py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#5848B5] disabled:opacity-50"
          >
            {loading ? "Verifying…" : "Enter"}
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
