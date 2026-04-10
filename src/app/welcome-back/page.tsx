import type { Metadata } from "next";
import Link from "next/link";
import { LPHero } from "@/components/lp/LPHero";
import { PainPoints } from "@/components/lp/PainPoints";
import { Proof } from "@/components/lp/Proof";
import { LPCta } from "@/components/lp/LPCta";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Welcome Back | We Rebuilt Everything | Davies Imaging Group",
  description:
    "New pricing. New portal. New quality. Same team, completely different experience. $125 in comeback credits loaded in your account.",
};

export default function WelcomeBackPage() {
  return (
    <>
      {/* Hero with gold gradient instead of purple */}
      <section
        className="flex -mt-16 min-h-screen items-center py-28 text-white"
        style={{
          background: "linear-gradient(135deg, var(--bg-dark) 0%, #2D2B55 60%, #B8860B 100%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-6">
          <Eyebrow dark>Welcome Back</Eyebrow>
          <h1 className="text-white">
            We heard you. We rebuilt <strong>everything</strong>.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70">
            New pricing. New portal. New quality. Same team, completely different experience.
          </p>
          <p
            className="mt-6 inline-block rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold"
          >
            <span className="text-lg font-bold" style={{ color: "#E8734A" }}>$125</span>{" "}
            in comeback credits loaded in your account
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="https://desk.daviesimaging.com"
              className="cta-button rounded-full px-8 py-3.5 text-white transition-colors"
              style={{ background: "#E8734A" }}
            >
              Sign In to digDesk
            </Link>
          </div>
        </div>
      </section>

      {/* What Changed */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="text-center">
              <h2>What Changed</h2>
              <p className="mt-4 text-text-body">
                Three things that were wrong, and exactly how we fixed them.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll stagger={150}>
            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              {[
                {
                  title: "No More Subscriptions",
                  old: "Monthly subscription required",
                  now: "$25 per image, order when you need it",
                },
                {
                  title: "Self-Serve Portal",
                  old: "Calls, emails, project managers",
                  now: "Upload photos, pick style, done. Manage orders, billing, and users from digDesk.",
                },
                {
                  title: "ModelMatch Quality",
                  old: "Generic stock furniture",
                  now: "Your model home design palette, recreated in 3D, placed in your specs.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-border-light bg-bg-surface p-7 text-center"
                >
                  <h4 className="text-text-dark">{card.title}</h4>
                  <p className="mt-3 text-sm text-red-400 line-through">{card.old}</p>
                  <p className="mt-1 text-sm font-semibold text-accent">{card.now}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Before / After */}
      <section className="bg-bg-surface py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="text-center">
              <h2>New ModelMatch Output</h2>
              <p className="mt-4 text-text-body">Your model home design, in every spec listing.</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              <div className="overflow-hidden rounded-lg border border-border-light">
                <div className="flex aspect-[16/10] items-center justify-center bg-bg-light text-sm text-text-muted">
                  BEFORE: Empty spec home
                </div>
                <div className="px-4 py-3 text-sm text-text-muted">Before</div>
              </div>
              <div className="overflow-hidden rounded-lg border border-border-light">
                <div className="flex aspect-[16/10] items-center justify-center bg-bg-light text-sm text-text-muted">
                  AFTER: ModelMatch, brand-matched staging
                </div>
                <div className="px-4 py-3 text-sm font-medium text-accent">After: ModelMatch, 48 hours</div>
              </div>
            </div>
          </RevealOnScroll>

          <div className="mt-10 text-center">
            <Link
              href="https://desk.daviesimaging.com"
              className="cta-button inline-block rounded-full px-8 py-3.5 text-white transition-colors"
              style={{ background: "#E8734A" }}
            >
              See It For Yourself: $125 Free
            </Link>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-xl px-6">
          <RevealOnScroll>
            <div
              className="rounded-2xl border-2 p-10 text-center"
              style={{ borderColor: "#B8860B", background: "#FFF8E1" }}
            >
              <h3 className="font-heading text-2xl font-bold text-text-dark" style={{ fontFamily: "var(--font-heading)" }}>
                Don&apos;t love it? We redo it free.
              </h3>
              <p className="mt-3 text-sm text-text-body">
                No questions. No fine print. If the staging doesn&apos;t meet your expectations, we redo it at no cost. We&apos;re asking for another chance, and we&apos;re putting our money behind it.
              </p>
              <p className="mt-6 border-t border-border-light pt-4 text-sm italic text-text-muted">
                &ldquo;I LOVE these so much.&rdquo; &ndash; Beazer Homes
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Social Proof */}
      <Proof
        eyebrow="Results"
        headline={
          <>
            Builders who came back are <strong>staying</strong>.
          </>
        }
        stats={[
          { value: "$25", label: "Per image. No subscription." },
          { value: "48hrs", label: "Turnaround time." },
          { value: "0", label: "Calls required to place an order." },
        ]}
        testimonial={{
          quote: "The last two weeks of sales have been the best we have had in over a year.",
          attribution: "Graham Hart Homebuilder",
        }}
      />

      {/* Final CTA */}
      <LPCta
        headline={
          <>
            Your $125 in comeback credits are <strong>waiting</strong>.
          </>
        }
        description="Upload a few spec photos. See if the experience is different this time. We think it will be."
        primaryCta={{ label: "Sign In to digDesk", href: "https://desk.daviesimaging.com" }}
      />
    </>
  );
}
