"use client";

// Builder logo strip — auto-scrolling marquee, two rows, opposite directions
// Actual logo files live in /public/DIG Website 2026 Client Logos/
// Folder and file names with spaces must be fully percent-encoded.

const LOGOS = "/DIG%20Website%202026%20Client%20Logos";

const row1 = [
  { name: "Toll Brothers", file: "toll brothers.png" },
  { name: "Beazer Homes", file: "beazer_logo-copy-1024x271.png" },
  { name: "K. Hovnanian", file: "khov-logo-og.webp" },
  { name: "Grand Homes", file: "grand homes.jpeg" },
  { name: "Pahlisch Homes", file: "pahlisch-homes-logo.webp" },
  { name: "Woodside Homes", file: "woodside.png" },
  { name: "Mungo Homes", file: "mungo homes.svg" },
  { name: "Bloomfield Homes", file: "bloomfield.png" },
  { name: "Ladera Living", file: "ladera.png" },
  { name: "Thrive Cos.", file: "thrive_sitelogo.png" },
];

const row2 = [
  { name: "Risewell Homes", file: "risewell-logo.webp" },
  { name: "SHAWOOD", file: "shawood.png" },
  { name: "Tricon Communities", file: "tricon_wordmark_RGB_orange.png" },
  { name: "Lewis Communities", file: "lewis commnities.png" },
  { name: "Cresleigh Homes", file: "cresleigh homes.png" },
  { name: "CBC Homes", file: "cbc-home-social.png" },
  { name: "Visionary Homes", file: "visionary homes logo.png" },
  { name: "Tresidio Homes", file: "tresidio homes.png" },
  { name: "Van Daele Homes", file: "vandaele-logo.png" },
  { name: "Rurka Homes", file: "rurka-homes-logo.avif" },
];

type LogoEntry = { name: string; file: string };

function LogoItem({ name, file }: LogoEntry) {
  // encode each path segment so spaces and special chars are handled
  const src = `${LOGOS}/${encodeURIComponent(file)}`;
  return (
    <div className="flex flex-shrink-0 items-center justify-center px-8 py-1">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        className="h-9 w-auto max-w-[140px] object-contain grayscale opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-90"
        loading="lazy"
      />
    </div>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  speed = 45,
}: {
  items: LogoEntry[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-2">
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg-surface to-transparent" />

      <div
        className="flex w-max items-center"
        style={{ animation: `marquee-${direction} ${speed}s linear infinite` }}
      >
        {doubled.map((logo, i) => (
          <LogoItem key={`${logo.name}-${i}`} {...logo} />
        ))}
      </div>
    </div>
  );
}

export function BuilderLogoStrip() {
  return (
    <section className="overflow-hidden bg-bg-surface py-14">
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="marquee"] { animation: none !important; }
        }
      `}</style>

      <p className="mb-10 text-center text-sm font-semibold uppercase tracking-[0.15em] text-text-muted">
        Trusted by homebuilders across 28 markets
      </p>

      <MarqueeRow items={row1} direction="left" speed={50} />
      <div className="mt-4">
        <MarqueeRow items={row2} direction="right" speed={44} />
      </div>
    </section>
  );
}
