"use client";

import { useEffect, useRef } from "react";

// Shared anti-spam helper for every form that posts to /api/contact.
// Provides two invisible layers the server enforces:
//   1. Honeypot  — a hidden field real users never see or fill. Add the
//      returned <HoneypotField /> inside the form; send its value as `hp`.
//   2. Timing    — records when the form mounted so the server can reject
//      submissions faster than a human could plausibly type; send `elapsedMs`.
//
// Usage:
//   const { HoneypotField, getSpamFields } = useSpamGuard();
//   ...inside <form>: <HoneypotField />
//   ...in the POST body: ...getSpamFields(formData)
export function useSpamGuard() {
  const mountedAt = useRef<number>(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  // The honeypot is visually hidden, pulled out of the tab order, and told
  // not to autofill — so no human ever touches it, but naive bots fill it in.
  const HoneypotField = () => (
    <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
      <label htmlFor="hp_company_website">Company website</label>
      <input
        id="hp_company_website"
        name="hp"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );

  const getSpamFields = (fd: FormData) => ({
    hp: fd.get("hp") ?? "",
    elapsedMs: mountedAt.current ? Date.now() - mountedAt.current : 99999,
  });

  return { HoneypotField, getSpamFields };
}
