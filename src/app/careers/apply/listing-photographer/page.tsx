"use client";

import { useState } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export default function ListingPhotographerApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (submitted) {
    return (
      <section className="flex min-h-screen items-center bg-bg-surface py-24">
        <div className="mx-auto max-w-xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Application Received</Eyebrow>
            <h1>Thanks for reaching out.</h1>
            <p className="mt-5 text-text-body">
              We review every application and will be in touch if there&apos;s a fit for your market. Keep shooting great work.
            </p>
            <Link href="/careers" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-text-body hover:text-accent">
              &larr; Back to Careers
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-bg-surface py-24">
      <div className="mx-auto max-w-2xl px-6">
        <Link href="/careers" className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-text-dark">
          &larr; Back to Careers
        </Link>

        <RevealOnScroll>
          <Eyebrow>Freelance / Contract &middot; Any U.S. Market</Eyebrow>
          <h1 className="mt-3">
            Listing <strong>Photographer</strong>
          </h1>
          <p className="mt-4 text-text-body">
            DIG works with experienced listing photographers across all 28 markets and is actively growing. Tell us about your work and where you shoot.
          </p>
        </RevealOnScroll>

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
                  company: fd.get("markets"),
                  message: `Markets: ${fd.get("markets")}\nExperience: ${fd.get("experience")}\nPortfolio: ${fd.get("portfolio")}\n\n${fd.get("message")}`,
                  intent: "Career Application — Listing Photographer",
                }),
              });
              if (!res.ok) throw new Error();
              setSubmitted(true);
            } catch {
              setError("Something went wrong. Email us directly at info@daviesimaging.com.");
            } finally {
              setLoading(false);
            }
          }}
          className="mt-10 space-y-6"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="meta-text mb-1.5 block">First Name</label>
              <input id="firstName" name="firstName" type="text" required className="w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-dark outline-none transition-colors focus:border-accent" />
            </div>
            <div>
              <label htmlFor="lastName" className="meta-text mb-1.5 block">Last Name</label>
              <input id="lastName" name="lastName" type="text" required className="w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-dark outline-none transition-colors focus:border-accent" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="meta-text mb-1.5 block">Email</label>
            <input id="email" name="email" type="email" required className="w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-dark outline-none transition-colors focus:border-accent" />
          </div>

          <div>
            <label htmlFor="markets" className="meta-text mb-1.5 block">What markets do you cover?</label>
            <input id="markets" name="markets" type="text" required placeholder="e.g. Dallas, Houston, Austin" className="w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-dark placeholder:text-text-muted outline-none transition-colors focus:border-accent" />
          </div>

          <div>
            <label htmlFor="experience" className="meta-text mb-1.5 block">Years of experience in real estate / homebuilder photography</label>
            <input id="experience" name="experience" type="text" placeholder="e.g. 4 years" className="w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-dark placeholder:text-text-muted outline-none transition-colors focus:border-accent" />
          </div>

          <div>
            <label htmlFor="portfolio" className="meta-text mb-1.5 block">Portfolio link</label>
            <input id="portfolio" name="portfolio" type="url" placeholder="https://" className="w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-dark placeholder:text-text-muted outline-none transition-colors focus:border-accent" />
          </div>

          <div>
            <label htmlFor="message" className="meta-text mb-1.5 block">Anything else you want us to know?</label>
            <textarea id="message" name="message" rows={4} placeholder="Equipment, volume capacity, availability..." className="w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-dark placeholder:text-text-muted outline-none transition-colors focus:border-accent" />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={loading} className="cta-button w-full rounded-full bg-accent px-8 py-3.5 text-text-light transition-colors hover:bg-accent-hover disabled:opacity-50">
            {loading ? "Sending..." : "Submit Application"}
          </button>
        </form>
      </div>
    </section>
  );
}
