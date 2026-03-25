"use client";

import { useState } from "react";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

const options = [
  {
    id: "strategy",
    title: "Book a Strategy Call",
    description: "Talk through your marketing goals and see how DIG fits.",
  },
  {
    id: "demo",
    title: "Request a FrameFlow Demo",
    description: "See the platform in action before you commit.",
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

  if (submitted) {
    return (
      <section className="flex min-h-screen items-center bg-white py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Thank You</Eyebrow>
            <h1>
              We&rsquo;ll be in <strong>touch</strong>.
            </h1>
            <p className="mt-5 text-zinc-600">
              Someone from the DIG team will reach out within one business day.
            </p>
          </RevealOnScroll>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white py-24">
      <div className="mx-auto max-w-2xl px-6">
        {/* Step 1: Choose */}
        {!selected && (
          <RevealOnScroll>
            <div className="text-center">
              <Eyebrow>Get in Touch</Eyebrow>
              <h1>
                How can we <strong>help</strong>?
              </h1>
              <p className="mt-5 text-zinc-600">
                Choose the option that best describes what you need.
              </p>
            </div>

            <div className="mt-14 space-y-4">
              {options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelected(opt.id)}
                  className="w-full rounded-lg border border-zinc-200 p-6 text-left transition-colors hover:border-accent-secondary"
                >
                  <h3>{opt.title}</h3>
                  <p className="mt-1 text-sm text-zinc-500">
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
              className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-accent"
            >
              <span aria-hidden="true">&larr;</span> Back
            </button>

            <Eyebrow>
              {options.find((o) => o.id === selected)?.title}
            </Eyebrow>
            <h2>
              Tell us about your <strong>project</strong>.
            </h2>
            <p className="mt-4 text-zinc-600">
              Fill out the details below and we&rsquo;ll get back to you within
              one business day.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
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
                    className="w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
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
                    className="w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
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
                  className="w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="company" className="meta-text mb-1.5 block">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  className="w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                />
              </div>

              <div>
                <label htmlFor="message" className="meta-text mb-1.5 block">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                />
              </div>

              <button
                type="submit"
                className="cta-button rounded-full bg-accent px-8 py-3.5 text-white transition-colors hover:bg-accent-hover"
              >
                Send Message
              </button>
            </form>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
}
