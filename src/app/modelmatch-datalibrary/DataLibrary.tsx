"use client";

// /modelmatch-datalibrary — the ModelMatch Win Library landing page, reformatted
// on Alex Hormozi's cold-traffic architecture: hook -> problem -> solution ->
// proof -> mechanism -> offer stack -> the offer itself. The offer is the free
// trial, embedded inline (MMTrialEmbed) so ad traffic never leaves the page.
// Every CTA scrolls to the wizard at #start instead of exiting to digDesk.
//
// Claim rules honored throughout (see caseStudies.ts + memory): sequence not
// causation ("found a buyer after ModelMatch", never "sold it"), no prices
// (most wins are non-disclosure TX), no banned words (stunning / transform /
// proven / guaranteed), no comp claims, and no em dashes anywhere.

import { useEffect, useState, type ReactNode } from "react";
import { Reveal, IMG } from "@/components/lp/MMPrimitives";
import MMSlider from "@/components/lp/MMSlider";
import MMWinsPane from "@/components/lp/MMWinsPane";
import MMTrialEmbed from "@/components/lp/MMTrialEmbed";
import { CASE_STUDIES } from "./caseStudies";

const ACCENT = "#6A5ACD";
const INK = "#1C1C1C";
const CREAM = "#F8F6F3";

// Real builders behind the verified wins — identity proof, in the buyer's world.
const BUILDERS = Array.from(new Set(CASE_STUDIES.map((c) => c.builder)));

// Scoped responsive rules (mirrors the shared MMLanding CSS the reused panes
// expect: .mm-steps-grid, plus smooth-scroll to #start and mobile padding).
const pageCSS = `
.mm-lib { scroll-behavior: smooth; overflow-x: hidden; }
.mm-lib .mm-steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
}
.mm-lib .mm-two {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}
@media (max-width: 900px) {
  .mm-lib .mm-steps-grid { grid-template-columns: 1fr; gap: 32px; }
  .mm-lib .mm-two { grid-template-columns: 1fr; gap: 32px; }
}
@media (max-width: 600px) {
  .mm-lib section { padding-left: 20px !important; padding-right: 20px !important; }
  .mm-lib header { padding: 14px 20px !important; }
  .mm-lib footer {
    padding: 28px 20px 36px !important;
    flex-direction: column;
    align-items: flex-start !important;
    text-align: left;
  }
  .mm-lib .mm-header-tagline { display: none; }
  /* Keep the message-matched CTA on one line inside a phone viewport. */
  .mm-lib .mm-cta {
    font-size: 12px !important;
    letter-spacing: 0.06em !important;
    padding: 18px 24px !important;
  }
  .mm-lib .mm-cta-hdr {
    font-size: 11px !important;
    letter-spacing: 0.04em !important;
    padding: 11px 16px !important;
  }
  /* Pull the big hero headline down a notch so it never clips on small type. */
  .mm-lib h1 { font-size: clamp(34px, 9vw, 52px) !important; }
}
`;

// ── Shared button ────────────────────────────────────────────────
function CtaButton({
  children,
  size = "lg",
  onDark = false,
  className = "",
}: {
  children: ReactNode;
  size?: "lg" | "sm";
  onDark?: boolean;
  className?: string;
}) {
  const pad = size === "lg" ? "22px 40px" : "12px 22px";
  const fs = size === "lg" ? 14 : 12;
  return (
    <a
      href="#start"
      className={`mm-cta ${className}`.trim()}
      style={{
        background: ACCENT,
        color: "#fff",
        textDecoration: "none",
        padding: pad,
        borderRadius: 999,
        fontFamily: "var(--font-body)",
        fontSize: fs,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        cursor: "pointer",
        boxShadow: onDark
          ? "0 14px 40px rgba(106,90,205,0.45)"
          : "0 12px 34px rgba(106,90,205,0.32)",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        whiteSpace: "nowrap",
      }}
    >
      {children}
      <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
        <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-body)",
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: onDark ? "#857AE0" : ACCENT,
        margin: "0 0 24px",
      }}
    >
      {children}
    </p>
  );
}

// ── Sticky header — CTA scrolls to the wizard, does not exit ──────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "16px 40px",
        background: scrolled ? "rgba(248,246,243,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
        transition: "all .3s var(--ease-soft)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 600, color: INK, letterSpacing: "-0.01em" }}>
        Model<strong style={{ color: ACCENT, fontWeight: 700 }}>Match</strong>
        <span
          className="mm-header-tagline"
          style={{
            fontSize: 11,
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginLeft: 14,
          }}
        >
          BY DAVIES IMAGING GROUP
        </span>
      </div>
      <div
        style={{
          opacity: scrolled ? 1 : 0,
          pointerEvents: scrolled ? "auto" : "none",
          transform: scrolled ? "translateY(0)" : "translateY(-4px)",
          transition: "all .3s var(--ease-soft)",
        }}
      >
        <CtaButton size="sm" className="mm-cta-hdr">Claim My 5 Free Images</CtaButton>
      </div>
    </header>
  );
}

// ── 1. Hero ──────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ position: "relative", padding: "140px 40px 80px", background: CREAM }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <Reveal>
          <Eyebrow>For high-performing homebuilder teams</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              color: INK,
              fontSize: "clamp(40px, 5.4vw, 74px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              fontWeight: 500,
              margin: 0,
              maxWidth: 1000,
              textWrap: "balance",
            }}
          >
            357 days on the market.
            <br />
            <strong style={{ fontWeight: 700, color: ACCENT }}>Under contract in 14.</strong>
          </h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p
            style={{
              margin: "26px 0 0",
              maxWidth: 660,
              fontFamily: "var(--font-body)",
              fontSize: 19,
              lineHeight: 1.6,
              color: "var(--text-body)",
            }}
          >
            ModelMatch stages your empty spec homes with furniture pulled from your own model homes.
            Your first five images are free, delivered in 24 hours.
          </p>
        </Reveal>
        <Reveal delay={0.26}>
          <div style={{ marginTop: 34 }}>
            <CtaButton>Claim My 5 Free Images</CtaButton>
            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                fontSize: 19,
                lineHeight: 1.45,
                color: "var(--text-body)",
                margin: "16px 0 0",
              }}
            >
              Takes 60 seconds to start. No card, no call.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.4} style={{ marginTop: 44 }}>
          <MMSlider before={IMG("shane-before.jpg")} after={IMG("shane-after.jpg")} />
        </Reveal>
        <Reveal delay={0.5}>
          <div style={{ marginTop: 36, display: "flex", alignItems: "baseline", gap: 40, flexWrap: "wrap", fontFamily: "var(--font-heading)" }}>
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: INK, lineHeight: 1, letterSpacing: "-0.02em", fontSize: 32 }}>24 hr</p>
              <p style={{ margin: "6px 0 0", fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-body)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 }}>
                Next-day turnaround
              </p>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 32, fontWeight: 600, color: INK, lineHeight: 1, letterSpacing: "-0.02em", display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontWeight: 400, color: "var(--text-muted)", textDecoration: "line-through", textDecorationColor: "rgba(0,0,0,0.45)", fontSize: 24 }}>$125</span>
                <span style={{ color: ACCENT }}>Free</span>
              </p>
              <p style={{ margin: "6px 0 0", fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-body)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 }}>
                First five images
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── 2. Trust bar — real builders behind the verified wins ────────
function TrustBar() {
  return (
    <section style={{ background: "#FFFFFF", padding: "40px 40px", borderTop: "1px solid rgba(0,0,0,0.05)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <Reveal>
          <p style={{ margin: "0 0 20px", textAlign: "center", fontFamily: "var(--font-body)", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)" }}>
            Verified wins on homes built by
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "18px 40px" }}>
            {BUILDERS.map((b) => (
              <span key={b} style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 600, color: "#8A8A8A", letterSpacing: "-0.01em" }}>
                {b}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── 3. Problem ───────────────────────────────────────────────────
function Problem() {
  const points = [
    {
      title: "An empty room hides the plan.",
      body: "Buyers walk into a bare spec and can't picture the space. The flow, the scale, and the lifestyle are all left to their imagination.",
    },
    {
      title: "Physical staging is slow and costly.",
      body: "Furnishing one home runs into the thousands per room and takes weeks to install. On standing inventory, that math rarely works.",
    },
    {
      title: "Generic AI looks nothing like you.",
      body: "Most virtual staging drops in stock furniture that clashes with your brand. It fills the room, but it doesn't sell your model.",
    },
  ];
  return (
    <section style={{ background: "#FFFFFF", padding: "100px 40px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <Reveal>
          <Eyebrow>Why Specs Sit</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              color: INK,
              fontSize: "clamp(32px, 4vw, 56px)",
              lineHeight: 1.08,
              fontWeight: 500,
              letterSpacing: "-0.015em",
              margin: "0 0 56px",
              maxWidth: 760,
              textWrap: "balance",
            }}
          >
            The home is finished. <strong style={{ fontWeight: 700 }}>The marketing isn&apos;t.</strong>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              fontSize: 20,
              lineHeight: 1.5,
              color: "var(--text-body)",
              margin: "-32px 0 56px",
              maxWidth: 640,
            }}
          >
            A price cut treats the symptom. The buyer didn&apos;t reject the price. They rejected the
            empty photos.
          </p>
        </Reveal>
        <div className="mm-steps-grid">
          {points.map((p, i) => (
            <Reveal key={i} delay={0.15 + i * 0.1}>
              <div>
                <div style={{ width: 44, height: 3, background: ACCENT, borderRadius: 2, marginBottom: 22 }} />
                <h3 style={{ margin: 0, fontFamily: "var(--font-heading)", fontSize: 24, lineHeight: 1.2, fontWeight: 600, letterSpacing: "-0.01em", color: INK }}>
                  {p.title}
                </h3>
                <p style={{ margin: "14px 0 0", fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.6, color: "var(--text-body)", maxWidth: 360 }}>
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 4. Solution — staged from your own model homes ──────────────
function Solution() {
  return (
    <section style={{ background: CREAM, padding: "100px 40px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div className="mm-two">
          <div>
            <Reveal>
              <Eyebrow>The ModelMatch Difference</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  color: INK,
                  fontSize: "clamp(32px, 3.6vw, 52px)",
                  lineHeight: 1.08,
                  fontWeight: 500,
                  letterSpacing: "-0.015em",
                  margin: 0,
                  textWrap: "balance",
                }}
              >
                Staged from your <strong style={{ fontWeight: 700 }}>own model homes.</strong>
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p style={{ margin: "22px 0 0", fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.65, color: "var(--text-body)", maxWidth: 480 }}>
                We pull the furniture, finishes, and styling from your finished model, then place them in
                your vacant spec. The staged home looks like your model, because it is your model. No new
                shoot. No generic stock furniture.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <div style={{ marginTop: 30 }}>
                <CtaButton>Claim My 5 Free Images</CtaButton>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <MMSlider before={IMG("vacant-great-room.jpg")} after={IMG("result-1-great-room.jpg")} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── 5. Proof — win timelines, promoted to a full section ─────────
function Proof() {
  return (
    <section style={{ background: "#FFFFFF", padding: "100px 40px", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <MMWinsPane />
        <Reveal delay={0.15}>
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              fontSize: 20,
              lineHeight: 1.55,
              color: "var(--text-body)",
              margin: "52px auto 0",
              maxWidth: 620,
              textAlign: "center",
            }}
          >
            That home sat 357 days before staging. Carry cost runs about $1 a day for every $4,000
            of home value. On a $400,000 home, that&apos;s more than $35,000 burned while it waited.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ marginTop: 44, display: "flex", justifyContent: "center" }}>
            <CtaButton>Claim My 5 Free Images</CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── 5b. Testimonial — Jordan Brown, iMessage style ───────────────
// Written permission on file (July 2026). Built in CSS, not a raster
// screenshot, so it stays crisp and editable.
function Testimonial() {
  return (
    <section style={{ background: CREAM, padding: "90px 40px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <Reveal>
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 24,
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 24px 50px rgba(0,0,0,0.07)",
              padding: "28px 28px 24px",
            }}
          >
            <p
              style={{
                margin: "0 0 14px",
                textAlign: "center",
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.02em",
                color: "rgba(0,0,0,0.35)",
              }}
            >
              Text Message
            </p>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <p
                style={{
                  margin: 0,
                  maxWidth: "85%",
                  background: "#E9E9EB",
                  color: "#111",
                  borderRadius: 20,
                  borderBottomLeftRadius: 6,
                  padding: "12px 16px",
                  fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', var(--font-body), sans-serif",
                  fontSize: 17,
                  lineHeight: 1.35,
                }}
              >
                Brother, the last two weeks of sales have been the best we have had in over a year.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <p
            style={{
              margin: "20px 0 0",
              textAlign: "center",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              lineHeight: 1.5,
              color: "var(--text-body)",
            }}
          >
            <strong style={{ fontWeight: 700, color: INK }}>Jordan Brown</strong>, Director of Sales
            and Marketing, Graham Hart Home Builder
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ── 5c. Founder note ─────────────────────────────────────────────
function FounderNote() {
  return (
    <section style={{ background: "#FFFFFF", padding: "90px 40px", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mm-library/chad-davies-founder.webp"
              alt="Chad Davies photographing a model home"
              style={{
                width: 132,
                height: 132,
                objectFit: "cover",
                borderRadius: 999,
                border: "3px solid rgba(106,90,205,0.25)",
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: 280 }}>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(20px, 2.4vw, 26px)",
                  lineHeight: 1.45,
                  color: INK,
                }}
              >
                &ldquo;I&apos;m Chad Davies. My team photographs model homes for builders like Perry,
                Beazer, and Kolter across 24 markets. ModelMatch stages your vacant specs with
                furniture from those same models.&rdquo;
              </p>
              <p
                style={{
                  margin: "16px 0 0",
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                Chad Davies · CEO &amp; Founder, Davies Imaging Group
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── 6. How it works ──────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { label: "Step One", title: "Show us your model home.", desc: "Send a full gallery of one finished model so we can match your furniture." },
    { label: "Step Two", title: "Upload your spec photos.", desc: "Drag in photos of the empty spec you want staged. Existing listing shots work." },
    { label: "Step Three", title: "Receive staged results.", desc: "Five high-res images, delivered in 24 hours, licensed for MLS, ads, email, and web." },
  ];
  return (
    <section style={{ background: CREAM, padding: "100px 40px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <Reveal>
          <Eyebrow>How It Works</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              color: INK,
              fontSize: "clamp(32px, 4vw, 56px)",
              lineHeight: 1.08,
              fontWeight: 500,
              letterSpacing: "-0.015em",
              margin: "0 0 56px",
              maxWidth: 720,
              textWrap: "balance",
            }}
          >
            Three steps. <strong style={{ fontWeight: 700 }}>Sixty seconds.</strong>
          </h2>
        </Reveal>
        <div className="mm-steps-grid">
          {steps.map((s, i) => (
            <Reveal key={i} delay={0.15 + i * 0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: 48, fontWeight: 600, color: "rgba(106,90,205,0.35)", lineHeight: 1, letterSpacing: "-0.02em" }}>
                  0{i + 1}
                </span>
                <p style={{ margin: "8px 0 0", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: ACCENT }}>
                  {s.label}
                </p>
                <h3 style={{ margin: 0, fontFamily: "var(--font-heading)", fontSize: 24, lineHeight: 1.2, fontWeight: 600, letterSpacing: "-0.01em", color: INK }}>
                  {s.title}
                </h3>
                <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.55, color: "var(--text-body)", maxWidth: 340 }}>
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 7. Offer stack — Grand Slam framing ──────────────────────────
function OfferStack() {
  const items = [
    "Five fully-staged photos of your spec home",
    "Furniture matched to your actual model home",
    "Delivered in 24 hours on business days",
    "Licensed for MLS, paid ads, email, and web",
    "No contract and no card to start",
    "Bonus: the Sales Cycle Shrinkage report, 18 verified wins across 5 states",
  ];
  return (
    <section style={{ background: "#121212", color: "#F5F5F5", padding: "110px 40px", position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: -200,
          left: "50%",
          width: 700,
          height: 700,
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(106,90,205,0.22), transparent 65%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <Eyebrow onDark>What You Get, Free</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              color: "#F5F5F5",
              fontSize: "clamp(38px, 5vw, 68px)",
              lineHeight: 1.04,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              margin: "0 0 12px",
              textWrap: "balance",
            }}
          >
            A $125 staging package.{" "}
            <strong style={{ fontWeight: 700, color: "#857AE0" }}>Yours free.</strong>
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: 20, lineHeight: 1.5, color: "rgba(245,245,245,0.75)", margin: "0 auto 40px", maxWidth: 560 }}>
            One model home and one vacant spec is all it takes to start.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 auto 44px", maxWidth: 520, textAlign: "left" }}>
            {items.map((it, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "13px 0", borderBottom: i === items.length - 1 ? "none" : "1px solid rgba(255,255,255,0.09)" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                  <circle cx="10" cy="10" r="9" stroke="#857AE0" strokeWidth="1.5" />
                  <path d="M6 10.5l2.5 2.5L14 7.5" stroke="#857AE0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 16.5, lineHeight: 1.5, color: "rgba(245,245,245,0.92)" }}>{it}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.32}>
          <CtaButton onDark>Claim My 5 Free Images</CtaButton>
          <p style={{ margin: "20px auto 0", fontSize: 12.5, color: "rgba(245,245,245,0.5)", letterSpacing: "0.04em", maxWidth: 460, lineHeight: 1.6 }}>
            After the trial, staging is $25 per image. Physical staging runs $1,000 or more per room
            and takes weeks to install. This takes 24 hours. Cancel any time.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ── 8. The embedded wizard — the offer itself, inline ────────────
function TrialSection() {
  return (
    <section id="start" style={{ background: "#FFFFFF", padding: "100px 40px 110px", scrollMarginTop: 76 }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <Eyebrow>Start Your Free Trial</Eyebrow>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                color: INK,
                fontSize: "clamp(34px, 4.4vw, 60px)",
                lineHeight: 1.05,
                fontWeight: 500,
                letterSpacing: "-0.02em",
                margin: "0 0 16px",
                textWrap: "balance",
              }}
            >
              Five staged photos. <strong style={{ fontWeight: 700 }}>Right here.</strong>
            </h2>
            <p style={{ margin: "0 auto", maxWidth: 520, fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.6, color: "var(--text-body)" }}>
              Send one model home and one vacant spec. Your first five staged images come back in 24 hours.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 20, overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,0.08)" }}>
            <MMTrialEmbed />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p
            style={{
              margin: "32px auto 0",
              maxWidth: 560,
              textAlign: "center",
              fontFamily: "var(--font-body)",
              fontSize: 15,
              lineHeight: 1.6,
              color: "var(--text-body)",
            }}
          >
            <strong style={{ fontWeight: 700, color: INK }}>
              If the staging doesn&apos;t look like it came from your model home, don&apos;t use it.
              You owe nothing either way.
            </strong>
          </p>
          <p
            style={{
              margin: "18px auto 0",
              maxWidth: 560,
              textAlign: "center",
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              fontSize: 18,
              lineHeight: 1.55,
              color: "var(--text-body)",
            }}
          >
            Why free? Because once you see your own spec staged with your own model&apos;s furniture,
            we don&apos;t have to sell you anything. That&apos;s the bet.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ── 9. FAQ ───────────────────────────────────────────────────────
function FAQs() {
  const [open, setOpen] = useState(0);
  const faqs = [
    { q: "What if I'm not a homebuilder?", a: "ModelMatch was designed for builders and developers that have existing model home images. Without that base to work from, ModelMatch can't work properly. If you aren't sure if you qualify, message us at support@daviesimaging.com." },
    { q: "What exactly do I send you?", a: "Photos of one of your model homes so we can match your furniture, plus photos of the empty spec home you want staged. Existing listing photos work. No new shoot required." },
    { q: "What's the turnaround?", a: "24 hours from upload on business days. Submit on Friday, you'll have the staged images Monday. The only thing holding up faster delivery is our designers reviewing every frame by hand." },
    { q: "What do I get back?", a: "Five fully-staged photos, delivered as high-resolution files licensed for MLS, paid ads, email, and web." },
    { q: "What happens after the trial?", a: "After the trial, staging is $25 per image. Physical staging runs $1,000 or more per room and takes weeks to install. This takes 24 hours. No contract, no monthly minimum, cancel any time." },
    { q: "What if the staging doesn't look right?", a: "If the staging doesn't look like it came from your model home, don't use it. You owe nothing either way." },
    { q: "Will the staging actually match my brand?", a: "That's the whole point. We pull furniture, finishes, and styling from your actual model home catalog, not a generic stock library. The staged spec home looks like the model, because it is the model." },
  ];
  return (
    <section style={{ background: CREAM, padding: "100px 40px" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <Reveal delay={0.1}>
          <h2 style={{ fontFamily: "var(--font-heading)", color: INK, fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1.08, fontWeight: 500, letterSpacing: "-0.015em", margin: "0 0 48px", textWrap: "balance" }}>
            Questions <strong style={{ fontWeight: 700 }}>worth asking.</strong>
          </h2>
        </Reveal>
        <div>
          {faqs.map((f, i) => (
            <Reveal key={i} delay={0.1 + i * 0.04}>
              <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", borderBottom: i === faqs.length - 1 ? "1px solid rgba(0,0,0,0.1)" : "none" }}>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  style={{ width: "100%", background: "none", border: "none", padding: "28px 8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", textAlign: "left", gap: 24 }}
                >
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 500, color: INK, lineHeight: 1.3, letterSpacing: "-0.005em" }}>{f.q}</span>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 32,
                      height: 32,
                      borderRadius: 999,
                      border: "1px solid rgba(0,0,0,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: open === i ? "rotate(45deg)" : "rotate(0)",
                      transition: "transform .25s var(--ease-soft)",
                      background: open === i ? INK : "transparent",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1v10M1 6h10" stroke={open === i ? "#fff" : INK} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div style={{ maxHeight: open === i ? 400 : 0, overflow: "hidden", transition: "max-height .35s var(--ease-soft)" }}>
                  <p style={{ margin: 0, padding: "0 64px 28px 8px", fontSize: 16, lineHeight: 1.6, color: "var(--text-body)", maxWidth: 720 }}>{f.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div style={{ marginTop: 52, display: "flex", justifyContent: "center" }}>
            <CtaButton>Claim My 5 Free Images</CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        background: "#0E0E0E",
        color: "rgba(245,245,245,0.5)",
        padding: "36px 40px 44px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMG("dig-logo-light.png")} alt="Davies Imaging Group" style={{ height: 22, opacity: 0.7 }} />
      <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.05em" }}>
        © 2026 Davies Imaging Group · Est. 2016 · ModelMatch is a service of DIG for homebuilder marketing teams.
      </p>
    </footer>
  );
}

export function DataLibrary() {
  return (
    <div className="mm-lib" data-screen-label="ModelMatch Win Library">
      <style dangerouslySetInnerHTML={{ __html: pageCSS }} />
      <Header />
      <Hero />
      <TrustBar />
      <Problem />
      <Solution />
      <Proof />
      <Testimonial />
      <FounderNote />
      <HowItWorks />
      <OfferStack />
      <TrialSection />
      <FAQs />
      <Footer />
    </div>
  );
}
