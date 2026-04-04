"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

const options = [
  {
    id: "demo",
    title: "Schedule a Demo",
    description: "15-minute walkthrough of digDesk and FrameFlow Studio. No pressure.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    id: "signup",
    title: "Create an Account",
    description: "Ready to order? Sign up for digDesk. We review and activate within 1 business day.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    external: true,
    href: "https://desk.daviesimaging.com/register",
  },
  {
    id: "specs",
    title: "Get My Specs Moving",
    description: "Talk through how Spec+ and FrameFlow can reduce your days on market.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    id: "strategy",
    title: "Book a Strategy Call",
    description: "Talk through your marketing goals and see where DIG fits.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    id: "other",
    title: "Something Else",
    description: "General questions, partnerships, press, or media inquiries.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

function ContactContent() {
  const searchParams = useSearchParams();
  const intentParam = searchParams.get("intent");

  const [selected, setSelected] = useState<string | null>(intentParam ?? null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If intent=demo pre-selected from URL, scroll past option list
  useEffect(() => {
    if (intentParam) setSelected(intentParam);
  }, [intentParam]);

  if (submitted) {
    return (
      <section className="flex min-h-screen items-center bg-bg-surface py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Thank You</Eyebrow>
            <h1>
              We&rsquo;ll be in <strong>touch</strong>.
            </h1>
            <p className="mt-5 text-text-body">
              Someone from the DIG team will reach out within 1 business day.
            </p>
            <div className="mt-10 rounded-lg border border-border-light bg-bg-light p-6 text-left">
              <p className="text-sm font-semibold text-text-dark">What happens next</p>
              <ul className="mt-3 space-y-2 text-sm text-text-body">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  We review your submission within 1 business day
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {selected === "signup"
                    ? "We activate your digDesk account and send login details"
                    : selected === "demo"
                    ? "We reach out to book your 15-minute walkthrough"
                    : "We reach out with a plan tailored to your homes"}
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  You can also create your account directly at{" "}
                  <a href="https://desk.daviesimaging.com/register" target="_blank" rel="noopener noreferrer" className="font-medium text-accent hover:underline">
                    desk.daviesimaging.com
                  </a>
                </li>
              </ul>
            </div>
            <Link href="/" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-text-body hover:text-accent">
              &larr; Back to home
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    );
  }

  const selectedOpt = options.find((o) => o.id === selected);

  return (
    <section className="min-h-screen bg-bg-surface py-24">
      <div className="mx-auto max-w-2xl px-6">

        {/* Step 1: Choose */}
        {!selected && (
          <RevealOnScroll>
            <div className="text-center">
              <Eyebrow>Get in Touch</Eyebrow>
              <h1>
                What brings you <strong>here</strong>?
              </h1>
              <p className="mt-5 text-text-body">
                Choose the option that fits and we&rsquo;ll take it from there.
              </p>
            </div>

            <div className="mt-12 space-y-3">
              {options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    if (opt.external && opt.href) {
                      window.open(opt.href, "_blank", "noopener,noreferrer");
                    } else {
                      setSelected(opt.id);
                    }
                  }}
                  className={`group w-full rounded-xl border p-5 text-left transition-all hover:border-accent hover:shadow-sm ${
                    opt.id === "signup"
                      ? "border-accent bg-accent/[0.03]"
                      : "border-border-light"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`mt-0.5 flex-shrink-0 transition-colors group-hover:text-accent ${
                      opt.id === "signup" ? "text-accent" : "text-text-muted"
                    }`}>
                      {opt.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-text-dark">{opt.title}</p>
                        {opt.id === "signup" && (
                          <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                            New
                          </span>
                        )}
                        {opt.external && (
                          <svg className="h-3.5 w-3.5 flex-shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                          </svg>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm text-text-body">{opt.description}</p>
                    </div>
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>

            <p className="mt-8 text-center text-xs text-text-muted">
              Already have an account?{" "}
              <a href="https://desk.daviesimaging.com" target="_blank" rel="noopener noreferrer" className="font-medium text-text-dark hover:text-accent">
                Log in to digDesk &rarr;
              </a>
            </p>
          </RevealOnScroll>
        )}

        {/* Step 2: Form */}
        {selected && selectedOpt && (
          <RevealOnScroll>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-text-dark"
            >
              <span aria-hidden="true">&larr;</span> Back
            </button>

            <Eyebrow>{selectedOpt.title}</Eyebrow>
            <h2>
              {selected === "demo" && <>Let&rsquo;s book your <strong>walkthrough</strong>.</>}
              {selected === "specs" && <>Tell us about your <strong>homes</strong>.</>}
              {selected === "strategy" && <>Tell us about your <strong>goals</strong>.</>}
              {selected === "other" && <>How can we <strong>help</strong>?</>}
            </h2>
            <p className="mt-4 text-text-body">
              {selected === "demo"
                ? "Leave your details and we'll reach out within 1 business day to pick a time. 15 minutes, no deck, no pressure."
                : "No long sales process. Just a quick conversation about what you need."}
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                setError(null);
                const fd = new FormData(e.currentTarget);
                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      firstName: fd.get("firstName"),
                      lastName: fd.get("lastName"),
                      email: fd.get("email"),
                      company: fd.get("company"),
                      message: fd.get("message"),
                      intent: selectedOpt.title,
                    }),
                  });
                  if (!res.ok) throw new Error("Submission failed");
                  setSubmitted(true);
                } catch {
                  setError("Something went wrong. Please try again or email us directly at info@daviesimaging.com.");
                } finally {
                  setLoading(false);
                }
              }}
              className="mt-10 space-y-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="meta-text mb-1.5 block">First Name</label>
                  <input
                    id="firstName" name="firstName" type="text" required
                    className="w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-dark outline-none transition-colors focus:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="meta-text mb-1.5 block">Last Name</label>
                  <input
                    id="lastName" name="lastName" type="text" required
                    className="w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-dark outline-none transition-colors focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="meta-text mb-1.5 block">Email</label>
                <input
                  id="email" name="email" type="email" required
                  className="w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-dark outline-none transition-colors focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="company" className="meta-text mb-1.5 block">Company / Builder</label>
                <input
                  id="company" name="company" type="text"
                  className="w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-dark outline-none transition-colors focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="message" className="meta-text mb-1.5 block">
                  {selected === "demo" ? "Anything we should know before the call?" : "Tell us about your homes"}
                </label>
                <textarea
                  id="message" name="message" rows={4}
                  placeholder={
                    selected === "demo"
                      ? "Markets, volume, specific questions about FrameFlow or Spec+..."
                      : "How many specs are you sitting on? What markets? What's your biggest challenge right now?"
                  }
                  className="w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-dark placeholder:text-text-muted outline-none transition-colors focus:border-accent"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="cta-button w-full rounded-full bg-accent px-8 py-3.5 text-text-light transition-colors hover:bg-accent-hover disabled:opacity-50"
              >
                {loading ? "Sending..." : selected === "demo" ? "Request a Demo" : "Send Message"}
              </button>
            </form>

            {/* Shortcut to self-serve signup */}
            {selected !== "signup" && (
              <div className="mt-8 rounded-xl border border-border-light bg-bg-light p-5">
                <p className="text-sm font-semibold text-text-dark">Want to skip ahead?</p>
                <p className="mt-1 text-sm text-text-body">
                  You can create your digDesk account directly. Our team reviews and activates all new accounts within 1 business day.
                </p>
                <a
                  href="https://desk.daviesimaging.com/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                >
                  Create your account at digDesk &rarr;
                </a>
              </div>
            )}
          </RevealOnScroll>
        )}

      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <Suspense>
      <ContactContent />
    </Suspense>
  );
}
