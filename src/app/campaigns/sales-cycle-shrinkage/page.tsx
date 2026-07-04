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
// PDF: drop the final approved booklet at public/reports/sales-cycle-shrinkage.pdf
// (held pending Chad's confirmation of the correct file). The path below already
// points there, so the viewer and download light up the moment the file lands.

export const metadata: Metadata = {
  title: "Sales Cycle Shrinkage | Davies Imaging Group",
  description:
    "The Sales Cycle Shrinkage report from Davies Imaging Group: how homebuilders move standing inventory faster with ModelMatch.",
  robots: { index: false, follow: false },
};

const ACCENT = "#6A5ACD";
const INK = "#1C1C1C";
const CREAM = "#F8F6F3";
const PDF_PATH = "/reports/sales-cycle-shrinkage.pdf";

export default function SalesCycleShrinkagePage() {
  return (
    <div style={{ background: CREAM, minHeight: "100vh", fontFamily: "var(--font-body)" }}>
      {/* Minimal brand bar */}
      <header style={{ padding: "22px 40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 600, color: INK, letterSpacing: "-0.01em" }}>
          Model<strong style={{ color: ACCENT, fontWeight: 700 }}>Match</strong>
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
        </div>
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
          <p style={{ margin: "0 auto", maxWidth: 560, fontSize: 18, lineHeight: 1.6, color: "var(--text-body)" }}>
            The full report, no second form. Read it here or download it to share with your team.
          </p>
          <div style={{ marginTop: 26 }}>
            <a
              href={PDF_PATH}
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
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                boxShadow: "0 12px 30px rgba(106,90,205,0.3)",
              }}
            >
              Download the PDF
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v9M3.5 7L7 10.5 10.5 7M2 12.5h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Inline PDF viewer */}
        <div
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
            style={{
              fontFamily: "var(--font-heading)",
              color: "#F5F5F5",
              fontSize: "clamp(24px, 3.2vw, 34px)",
              lineHeight: 1.2,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              margin: "0 0 12px",
            }}
          >
            Want one of your specs staged free?
          </h2>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "rgba(245,245,245,0.82)" }}>
            Email a listing link to{" "}
            <a href="mailto:trial@daviesimaging.com?subject=ModelMatch%20free%20trial" style={{ color: "#857AE0", fontWeight: 700, textDecoration: "none" }}>
              trial@daviesimaging.com
            </a>{" "}
            and we&apos;ll stage your first eight photos, free, in 1 business day.
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
