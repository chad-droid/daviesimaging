"use client";

import { useState } from "react";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

const options = [
  {
    id: "specs",
    title: "Get My Specs Moving",
    description: "See how FrameFlow and Spec+ can reduce your days on market.",
  },
  {
    id: "demo",
    title: "See FrameFlow in Action",
    description: "A quick 15-minute walkthrough. No pressure, no long sales process.",
  },
  {
    id: "strategy",
    title: "Book a Strategy Call",
    description: "Talk through your marketing goals and see how DIG fits.",
  },
  {
    id: "other",
    title: "Something Else",
    description: "General questions, partnerships, or media inquiries.",
  },
];

export default function ContactPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
              Someone from the DIG team will reach out within 24 hours.
            </p>
            <div className="mt-10 rounded-lg border border-border-light bg-bg-light p-6 text-left">
              <p className="text-sm font-semibold text-text-dark">What happens next</p>
              <ul className="mt-3 space-y-2 text-sm text-text-body">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  We review your submission within 24 hours
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  We reach out with a quick plan tailored to your homes
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  If it makes sense, we book a 15-minute walkthrough
                </li>
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-bg-surface py-24">
      <div className="mx-auto max-w-2xl px-6">
        {/* Step 1: Choose */}
        {!selected && (
          <RevealOnScroll>
            <div className="text-center">
              <Eyebrow>Get in Touch</Eyebrow>
              <h1>
                Let&rsquo;s get your specs <strong>moving</strong>.
              </h1>
              <p className="mt-5 text-text-body">
                Tell us a little about your homes and we&rsquo;ll show you
                exactly how FrameFlow can help.
              </p>
            </div>

            <div className="mt-14 space-y-4">
              {options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelected(opt.id)}
                  className="w-full rounded-lg border border-border-light p-6 text-left transition-colors hover:border-accent-secondary"
                >
                  <h3>{opt.title}</h3>
                  <p className="mt-1 text-sm text-accent-secondary">
                    {opt.description}
                  </p>
                </button>
              ))}
            </div>
          </RevealOnScroll>
        )}

        {/* Step 2: Form */}
        {selected && (
          <RevealOnScroll>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent-secondary transition-colors hover:text-accent"
            >
              <span aria-hidden="true">&larr;</span> Back
            </button>

            <Eyebrow>
              {options.find((o) => o.id === selected)?.title}
            </Eyebrow>
            <h2>
              Tell us about your <strong>homes</strong>.
            </h2>
            <p className="mt-4 text-text-body">
              No pressure. No long sales process. Just a quick conversation
              about what you need.
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
                      intent: options.find((o) => o.id === selected)?.title,
                    }),
                  });
                  if (!res.ok) throw new Error("Submission failed");
                  setSubmitted(true);
                } catch {
                  setError("Something went wrong. Please try again or email us directly.");
                } finally {
                  setLoading(false);
                }
              }}
              className="mt-10 space-y-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="meta-text mb-1.5 block">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="w-full rounded-lg border border-border-light px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="meta-text mb-1.5 block">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="w-full rounded-lg border border-border-light px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="meta-text mb-1.5 block">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-border-light px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="company" className="meta-text mb-1.5 block">
                  Company / Builder
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  className="w-full rounded-lg border border-border-light px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="message" className="meta-text mb-1.5 block">
                  Tell us about your homes
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="How many specs are you sitting on? What markets? What's your biggest marketing challenge right now?"
                  className="w-full rounded-lg border border-border-light px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="cta-button rounded-full bg-accent px-8 py-3.5 text-text-light transition-colors hover:bg-accent-hover disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            {/* What happens next */}
            <div className="mt-10 rounded-lg border border-border-light bg-bg-light p-6">
              <p className="text-sm font-semibold text-text-dark">What happens next</p>
              <ul className="mt-3 space-y-2 text-sm text-text-body">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  We review your submission within 24 hours
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  We reach out with a quick plan tailored to your homes
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  If it makes sense, we book a 15-minute walkthrough
                </li>
              </ul>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
}
