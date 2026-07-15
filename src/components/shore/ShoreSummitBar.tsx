// Shore Summit branded bar for the /shoresummitphotos2026 event gallery. Sits at
// the top of the page content (the DIG nav/footer stay in place, to drive traffic
// to the main site). White Summit logo on a Summit-blue band.
//
// SHORE_BLUE is a placeholder Summit blue; adjust to the exact brand hex anytime.

const SHORE_BLUE = "#123E63";

export function ShoreSummitBar({ label = "Event Photos" }: { label?: string }) {
  return (
    <div style={{ background: SHORE_BLUE, width: "100%" }}>
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "18px 24px",
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
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
