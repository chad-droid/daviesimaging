import type { Metadata } from "next";

// /campaigns/sales-cycle-shrinkage — the report-delivery page for Campaign A's
// thank-you CTA and the nurture Day 0 link (brief v2.2 Section B). Visitors
// already gave their info on LinkedIn, so there is no second gate: the 32-page
// booklet is shown inline and downloadable, followed by the trial CTA.
//
// MONDAY (launch) version: the trial CTA is a single email line. We do NOT link
// desk.daviesimaging.com/trial yet, because only the legacy upload flow (with
// the unfixed session bug) is live there. Once the desk link-first (D1) build
// ships, swap the email line for the <MMTrialEmbed /> intake (WEEK-TWO version,
// marked below), headed "Want one of yours staged free?".
//
// The inline <iframe> PDF viewer is genuinely restricted on iOS Safari (the OS
// renders a single non-scrollable page), so on mobile we hide it and show a
// prominent "Open the full report" action that uses the native PDF viewer.

export const metadata: Metadata = {
  alternates: { canonical: "/campaigns/sales-cycle-shrinkage" },
  title: "Sales Cycle Shrinkage",
  description:
    "The Sales Cycle Shrinkage report from Davies Imaging Group: how homebuilders move standing inventory faster with ModelMatch.",
  robots: { index: false, follow: false },
};

const ACCENT = "#6A5ACD";
const INK = "#1C1C1C";
const CREAM = "#F8F6F3";
const PDF_PATH = "/reports/sales-cycle-shrinkage.pdf";
const LOGO_HREF = "https://www.daviesimaging.com/services/virtual-staging";

const pageCSS = `
.scs-break { display: inline; }
.scs-mobile-open { display: none; }
@media (max-width: 640px) {
  .scs-break { display: none; }
  .scs-embed { display: none !important; }
  .scs-mobile-open { display: block; }
  .scs h1 { font-size: 34px !important; }
  .scs-intro { font-size: 16px !important; }
  .scs-cta-h2 { font-size: 26px !important; }
  .scs-cta-p { font-size: 16px !important; }
  .scs main { padding-left: 20px !important; padding-right: 20px !important; }
  .scs header { padding-left: 20px !important; padding-right: 20px !important; }
}
`;

function PdfButton({ label, block = false }: { label: string; block?: boolean }) {
  return (
    <a
      href={PDF_PATH}
      target="_blank"
      rel="noopener noreferrer"
      download
      style={{
        background: ACCENT,
        color: "#fff",
        textDecoration: "none",
        padding: "16px 32px",
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        display: block ? "flex" : "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        boxShadow: "0 12px 30px rgba(106,90,205,0.3)",
      }}
    >
      {label}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1v9M3.5 7L7 10.5 10.5 7M2 12.5h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

export default function SalesCycleShrinkagePage() {
  return (
    <div className="scs" style={{ background: CREAM, minHeight: "100vh", fontFamily: "var(--font-body)" }}>
      <style dangerouslySetInnerHTML={{ __html: pageCSS }} />

      {/* Brand bar — links to the virtual staging service */}
      <header style={{ padding: "22px 40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <a href={LOGO_HREF} style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 600, color: INK, letterSpacing: "-0.01em" }}>
            Model<strong style={{ color: ACCENT, fontWeight: 700 }}>Match</strong>
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginLeft: 14,
            }}
          >
            BY DAVIES IMAGING GROUP
          </span>
        </a>
      </header>

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 96px" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <p style={{ margin: "0 0 18px", fontSize: 13, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: ACCENT }}>
            Your Report, Yours to Keep
          </p>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              color: INK,
              fontSize: "clamp(36px, 5vw, 60px)",
              lineHeight: 1.05,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              margin: "0 0 16px",
            }}
          >
            Sales Cycle Shrinkage
          </h1>
          <p className="scs-intro" style={{ margin: "0 auto", maxWidth: 540, fontSize: 18, lineHeight: 1.6, color: "var(--text-body)", textWrap: "balance" }}>
            The full report, no second form. Read it here or download it to share with your team.
          </p>
          <div style={{ marginTop: 26 }}>
            <PdfButton label="Download the PDF" />
          </div>
        </div>

        {/* Desktop: inline PDF viewer */}
        <div
          className="scs-embed"
          style={{
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 30px 60px rgba(0,0,0,0.08)",
          }}
        >
          <iframe
            src={`${PDF_PATH}#view=FitH`}
            title="Sales Cycle Shrinkage report"
            style={{ width: "100%", height: "82vh", border: 0, display: "block" }}
          />
        </div>

        {/* Mobile: the inline viewer is restricted by iOS, so open the full
            report in the native PDF viewer instead. */}
        <a
          className="scs-mobile-open"
          href={PDF_PATH}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 16,
            boxShadow: "0 20px 44px rgba(0,0,0,0.08)",
            padding: "40px 24px",
            textAlign: "center",
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: "0 auto 16px", display: "block" }}>
            <rect x="10" y="6" width="28" height="36" rx="3" stroke={ACCENT} strokeWidth="2" />
            <path d="M18 18h12M18 24h12M18 30h8" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p style={{ margin: "0 0 4px", fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 600, color: INK }}>
            Open the full report
          </p>
          <p style={{ margin: 0, fontSize: 15, color: "var(--text-muted)" }}>
            32 pages · opens the PDF
          </p>
        </a>

        {/* MONDAY VERSION — trial CTA as a single email line.
            WEEK-TWO VERSION: replace this block with the link-first intake embed
            (a client wrapper around <MMTrialEmbed />), headed "Want one of yours
            staged free?", once the desk D1 build ships. */}
        <div
          style={{
            marginTop: 40,
            background: "#121212",
            borderRadius: 16,
            padding: "36px 32px",
            textAlign: "center",
          }}
        >
          <h2
            className="scs-cta-h2"
            style={{
              fontFamily: "var(--font-heading)",
              color: "#F5F5F5",
              fontSize: "clamp(24px, 3.2vw, 34px)",
              lineHeight: 1.2,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              margin: "0 0 12px",
              textWrap: "balance",
            }}
          >
            Want one of your specs staged free?
          </h2>
          <p className="scs-cta-p" style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "rgba(245,245,245,0.82)", textWrap: "balance" }}>
            Email a listing link to{" "}
            <a href="mailto:trial@daviesimaging.com?subject=ModelMatch%20free%20trial" style={{ color: "#857AE0", fontWeight: 700, textDecoration: "none" }}>
              trial@daviesimaging.com
            </a>{" "}
            and we&apos;ll stage your
            <br className="scs-break" /> first eight photos, free, in 1 business day.
          </p>
        </div>
      </main>

      <footer style={{ background: "#0E0E0E", color: "rgba(245,245,245,0.5)", padding: "28px 40px 36px", textAlign: "center" }}>
        <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.05em" }}>
          © 2026 Davies Imaging Group · ModelMatch is a service of DIG for homebuilder marketing teams.
        </p>
      </footer>
    </div>
  );
}
