"use client";

import { useEffect, useState } from "react";

export function EmailCaptureModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("dig-modal-dismissed");
    if (dismissed) return;

    const timer = setTimeout(() => setOpen(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setOpen(false);
    sessionStorage.setItem("dig-modal-dismissed", "1");
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-md rounded-lg bg-bg-surface p-8 shadow-2xl">
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-4 top-4 text-accent-secondary transition-colors hover:text-accent"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent-secondary">
          Stay in the Loop
        </p>
        <h3 className="mt-2">
          Get builder marketing <strong>insights</strong>.
        </h3>
        <p className="mt-2 text-sm text-text-body">
          Strategy, trends, and case studies delivered to your inbox.
        </p>

        <form
          action="https://mailchi.mp/daviesimaging/sign-up-for-updates"
          method="post"
          target="_blank"
          className="mt-6 space-y-3"
        >
          <input
            type="text"
            name="FNAME"
            placeholder="First name"
            className="w-full rounded-lg border border-border-light px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
          />
          <input
            type="email"
            name="EMAIL"
            placeholder="Email address"
            required
            className="w-full rounded-lg border border-border-light px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
          />
          <button
            type="submit"
            className="cta-button w-full rounded-full bg-accent px-6 py-3 text-text-light transition-colors hover:bg-accent-hover"
          >
            Subscribe
          </button>
        </form>

        <button
          type="button"
          onClick={dismiss}
          className="mt-4 block w-full text-center text-xs text-accent-secondary transition-colors hover:text-accent"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
