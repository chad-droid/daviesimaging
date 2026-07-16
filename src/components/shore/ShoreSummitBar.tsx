import Link from "next/link";

// Shore Summit branded bar for the /shoresummitphotos2026 event gallery. Sits at
// the top of the page content (the DIG nav/footer stay in place, to drive traffic
// to the main site). White Summit logo on a Summit-blue band, plus an attendee
// CTA to the exclusive Summit offer (/shore2026). Rendered on the index and every
// sub-gallery, so the button appears everywhere.
//
// SHORE_BLUE is a placeholder Summit blue; adjust to the exact brand hex anytime.

const SHORE_BLUE = "#123E63";

export function ShoreSummitBar() {
  return (
    <div style={{ background: SHORE_BLUE, width: "100%" }}>
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/shore/shore-summit-logo.webp"
          alt="Shore Sales and Marketing Summit"
          style={{ height: 40, width: "auto", display: "block" }}
        />
        <Link
          href="/shore2026"
          style={{
            background: "#fff",
            color: SHORE_BLUE,
            textDecoration: "none",
            padding: "12px 22px",
            borderRadius: 999,
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.04em",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
            whiteSpace: "nowrap",
          }}
        >
          Exclusive Offer for Summit Attendees
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
