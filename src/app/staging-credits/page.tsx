import type { Metadata } from "next";
import Link from "next/link";
import { LPHero } from "@/components/lp/LPHero";
import { LogoStrip } from "@/components/lp/LogoStrip";
import { PainPoints } from "@/components/lp/PainPoints";
import { Proof } from "@/components/lp/Proof";
import { LPCta } from "@/components/lp/LPCta";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "ModelMatch Virtual Staging | $125 Free Credits | Davies Imaging Group",
  description:
    "Virtual staging built for home builders. Your model home furniture, recreated in 3D, placed in your spec listings. $25/image, 48-hour turnaround. $125 in free credits loaded.",
};

export default function StagingCreditsPage() {
  return (
    <>
      <LPHero
        eyebrow="ModelMatch Virtual Staging"
        headline={
          <>
            Virtual staging was built for agents.{" "}
            <strong>ModelMatch</strong> was built for builders.
          </>
        }
        subheadline="Your model home furniture. Your brand. Every spec listing. Staged in 48 hours for $25 per image. $125 in free credits loaded in your account."
        primaryCta={{ label: "Sign In to digDesk", href: "https://desk.daviesimaging.com" }}
        secondaryCta={{ label: "See How It Works", href: "#how-it-works" }}
      />

      <LogoStrip
        heading="Trusted by builders nationwide"
        logos={["Toll Brothers", "Beazer Homes", "K. Hovnanian", "Graham Hart", "Grand Homes"]}
      />

      {/* Before / After Section */}
      <section className="min-h-[60vh] bg-bg-light py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="text-center">
              <h2>See the Difference</h2>
              <p className="mt-4 text-text-body">
                Same photo. Same room. ModelMatch stages it with your model home furniture. Not generic stock.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll stagger={150}>
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              <div className="overflow-hidden rounded-lg border border-border-light">
                <div className="flex aspect-[16/10] items-center justify-center bg-bg-surface text-sm text-text-muted">
                  BEFORE: Empty spec home photo
                </div>
                <div className="px-4 py-3 text-sm text-text-muted">Before: Buyer scrolls past this</div>
              </div>
              <div className="overflow-hidden rounded-lg border border-border-light">
                <div className="flex aspect-[16/10] items-center justify-center bg-bg-surface text-sm text-text-muted">
                  AFTER: ModelMatch staged
                </div>
                <div className="px-4 py-3 text-sm font-medium text-accent">After: ModelMatch, 48 hours, $25</div>
              </div>
            </div>
          </RevealOnScroll>

          <div className="mt-10 text-center">
            <Link
              href="https://desk.daviesimaging.com"
              className="cta-button inline-block rounded-full bg-accent px-8 py-3.5 text-text-light transition-colors hover:bg-accent-hover"
            >
              Try It Free: $125 in Credits
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <PainPoints
        eyebrow="How It Works"
        headline={
          <>
            Three steps. No calls. No <strong>contracts</strong>.
          </>
        }
        points={[
          {
            title: "1. Upload Photos",
            description:
              "Drag empty-room photos into digDesk. Any format. Phone photos work.",
          },
          {
            title: "2. We Match Your Brand",
            description:
              "Our team stages using your model home design palette. Same furniture style, same scale, same feel.",
          },
          {
            title: "3. Download in 48 Hours",
            description:
              "Staged images ready for MLS, your website, social media, and paid ads.",
          },
        ]}
      />

      {/* Testimonials */}
      <Proof
        eyebrow="What Builders Are Saying"
        headline={
          <>
            Real results from real <strong>builders</strong>.
          </>
        }
        stats={[
          { value: "$25", label: "Per image. No subscription." },
          { value: "48hrs", label: "Turnaround time." },
          { value: "$125", label: "Free credits loaded in your account." },
        ]}
        testimonial={{
          quote: "The last two weeks of sales have been the best we have had in over a year.",
          attribution: "Graham Hart Homebuilder",
        }}
      />

      {/* More testimonials */}
      <section className="bg-bg-surface py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll stagger={150}>
            <div className="grid gap-6 sm:grid-cols-2">
              <blockquote className="rounded-lg border border-border-light bg-bg-surface p-6">
                <p className="text-sm italic text-text-body">
                  &ldquo;We sold one of the 5 inventory homes over the weekend!&rdquo;
                </p>
                <footer className="meta-text mt-3 text-accent">Classic Homes</footer>
              </blockquote>
              <blockquote className="rounded-lg border border-border-light bg-bg-surface p-6">
                <p className="text-sm italic text-text-body">
                  &ldquo;I LOVE these so much.&rdquo;
                </p>
                <footer className="meta-text mt-3 text-accent">Beazer Homes</footer>
              </blockquote>
              <blockquote className="rounded-lg border border-border-light bg-bg-surface p-6">
                <p className="text-sm italic text-text-body">
                  &ldquo;They. Are. So. Cool!!!!! We are going to do some more today.&rdquo;
                </p>
                <footer className="meta-text mt-3 text-accent">Grand Homes</footer>
              </blockquote>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-bg-light py-24" id="how-it-works">
        <div className="mx-auto max-w-xl px-6 text-center">
          <RevealOnScroll>
            <h2>Simple Pricing</h2>
            <p className="mt-4 text-text-body">No subscriptions. No minimums. No contracts.</p>

            <div className="mt-10 rounded-2xl border-2 border-accent bg-bg-surface p-10">
              <p className="font-heading text-6xl font-bold text-text-dark" style={{ fontFamily: "var(--font-heading)" }}>$25</p>
              <p className="mt-1 text-sm text-text-muted">per image</p>

              <ul className="mt-8 space-y-3 text-left text-sm text-text-body">
                {[
                  "Model home design matching (ModelMatch)",
                  "48-hour turnaround",
                  "Self-serve portal (digDesk)",
                  "Track, manage, edit, or cancel orders anytime",
                  "Full billing and user administration built in",
                  "$125 in free credits loaded in your account",
                  "Use on MLS, website, social, ads",
                  "No calls required to order",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-2 border-b border-border-light pb-3">
                    <span className="font-bold text-accent">&#10003;</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="https://desk.daviesimaging.com"
                className="cta-button mt-8 block rounded-full bg-accent px-8 py-3.5 text-center text-text-light transition-colors hover:bg-accent-hover"
              >
                Sign In and Upload Your First Photos
              </Link>

              <p className="mt-4 rounded-lg bg-bg-light p-3 text-xs text-text-muted">
                Don&apos;t love the results? We redo them free. No questions.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Final CTA */}
      <LPCta
        headline={
          <>
            Your $125 in credits are <strong>waiting</strong>.
          </>
        }
        description="Upload a few spec photos. See what ModelMatch can do. Takes about 5 minutes."
        primaryCta={{ label: "Sign In to digDesk", href: "https://desk.daviesimaging.com" }}
      />
    </>
  );
}
