"use client";

import { useState, useEffect } from "react";

const ADMIN_PASSWORD = "password123";
const STORAGE_KEY = "dig-admin-auth";

export function AdminAuth({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved === "true") setAuthed(true);
    setChecking(false);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
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
            className={`w-full rounded-lg border px-4 py-3 text-sm text-[#F5F5F5] outline-none transition-colors bg-[#1E1E1E] ${
              error ? "border-[#E57373]" : "border-[#2C2C2C] focus:border-[#6A5ACD]"
            }`}
          />
          {error && (
            <p className="mt-2 text-xs text-[#E57373]">Incorrect password</p>
          )}
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-[#6A5ACD] py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#5848B5]"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
