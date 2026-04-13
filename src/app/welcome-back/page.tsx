import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { LPHero } from "@/components/lp/LPHero";
import { PainPoints } from "@/components/lp/PainPoints";
import { Proof } from "@/components/lp/Proof";
import { LPCta } from "@/components/lp/LPCta";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DarkSection } from "@/components/DarkSection";

export const metadata: Metadata = {
  title: "Welcome Back | We Rebuilt Everything | Davies Imaging Group",
  description:
    "New pricing. New portal. New quality. Same team, completely different experience. $125 in comeback credits loaded in your account.",
};

export default function WelcomeBackPage() {
  return (
    <>
      <DarkSection className="min-h-[60vh] py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <Eyebrow dark>Welcome Back</Eyebrow>
          <h1 className="text-text-light">
            We heard you.<br />
            We rebuilt <strong>everything</strong>.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-text-muted">
            No subscriptions. Self-serve portal. Model-home-matched staging. Same team, completely different experience.
          </p>
          <p className="mt-6 inline-block rounded-lg border border-text-light/30 bg-white/10 px-6 py-3 text-sm font-semibold">
            <span className="text-lg font-bold text-accent">$125</span>{" "}
            in comeback credits loaded in your account
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="https://desk.daviesimaging.com"
              className="cta-button rounded-full bg-accent px-8 py-3.5 text-text-light transition-colors hover:bg-accent-hover"
            >
              Sign In to digDesk
            </Link>
          </div>
        </div>
      </DarkSection>

      {/* What Changed */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="text-center">
              <h2>What Changed</h2>
              <p className="mt-4 text-text-body">
                Three things that drove you away — and exactly how we fixed them.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll stagger={150}>
            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              {[
                {
                  title: "No More Subscriptions",
                  old: "Locked into monthly plans even when you had nothing to stage",
                  now: "$25 per image. Order when you need it. Stop when you don\u2019t.",
                },
                {
                  title: "Self-Serve Portal",
                  old: "Had to call or email to place every order",
                  now: "Upload photos, pick your style, and manage everything from digDesk. No calls.",
                },
                {
                  title: "ModelMatch Quality",
                  old: "Generic furniture that looked nothing like your model homes",
                  now: "Your model home design palette, recreated in 3D, placed in every spec.",
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
                <Image
                  src="/email-assets/modelmatch-greatroom.gif"
                  alt="Great room before and after ModelMatch virtual staging"
                  width={800}
                  height={500}
                  className="w-full"
                  unoptimized
                />
                <div className="px-4 py-3 text-sm font-medium text-accent">Great Room &mdash; ModelMatch</div>
              </div>
              <div className="overflow-hidden rounded-lg border border-border-light">
                <Image
                  src="/email-assets/modelmatch-bedroom.gif"
                  alt="Bedroom before and after ModelMatch virtual staging"
                  width={800}
                  height={500}
                  className="w-full"
                  unoptimized
                />
                <div className="px-4 py-3 text-sm font-medium text-accent">Bedroom &mdash; ModelMatch</div>
              </div>
            </div>
          </RevealOnScroll>

          <div className="mt-10 text-center">
            <Link
              href="https://desk.daviesimaging.com"
              className="cta-button inline-block rounded-full bg-accent px-8 py-3.5 text-text-light transition-colors hover:bg-accent-hover"
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
              style={{ borderColor: "var(--accent)", background: "color-mix(in srgb, var(--accent) 6%, var(--bg-surface))" }}
            >
              <h3 className="font-heading text-2xl font-bold text-text-dark" style={{ fontFamily: "var(--font-heading)" }}>
                Don&apos;t love it? We redo it free.
              </h3>
              <p className="mt-3 text-sm text-text-body">
                No questions. No fine print. If the staging doesn&apos;t match your expectations, we redo it at no cost. We know we&apos;re asking for a second chance — this is us earning it.
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
