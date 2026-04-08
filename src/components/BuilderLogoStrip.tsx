"use client";

// Builder logo strip — auto-scrolling marquee, two rows, opposite directions
// Per-logo heights normalize the visual size so all logos appear equally weighted.

import { useEditableSlot } from "@/lib/useEditableSlot";

const LOGOS = "/DIG%20Website%202026%20Client%20Logos";

// h = display height in px. Tuned per-logo to normalize visual weight.
// Logos with thin/small text get taller; bold wordmarks get shorter.
const row1 = [
  { name: "Toll Brothers",    file: "toll brothers.png",               h: 28, maxW: 160 },
  { name: "Beazer Homes",     file: "beazer_logo-copy-1024x271.png",   h: 30, maxW: 150 },
  { name: "K. Hovnanian",     file: "khov-logo-og.webp",               h: 36, maxW: 140 },
  { name: "Grand Homes",      file: "grand homes.jpeg",                h: 54, maxW: 140 },
  { name: "Pahlisch Homes",   file: "pahlisch-homes-logo.webp",        h: 28, maxW: 130 },
  { name: "Woodside Homes",   file: "woodside.png",                    h: 40, maxW: 130 },
  { name: "Mungo Homes",      file: "mungo homes.svg",                 h: 34, maxW: 130 },
  { name: "Bloomfield Homes", file: "bloomfield.png",                  h: 46, maxW: 130 },
  { name: "Ladera Living",    file: "ladera.png",                      h: 44, maxW: 130 },
  { name: "Thrive Cos.",      file: "thrive_sitelogo.png",             h: 42, maxW: 120 },
];

const row2 = [
  { name: "Risewell Homes",     file: "risewell-logo.webp",                        h: 30, maxW: 130 },
  { name: "SHAWOOD",            file: "shawood.png",                               h: 46, maxW: 130 },
  { name: "Tricon Communities", file: "tricon_wordmark_RGB_orange.png",            h: 24, maxW: 120 },
  { name: "Lewis Communities",  file: "lewis commnities.png",                      h: 36, maxW: 140 },
  { name: "Cresleigh Homes",    file: "cresleigh homes.png",                       h: 48, maxW: 140 },
  { name: "CBC Homes",          file: "cbc-home-social.png",                       h: 38, maxW: 110 },
  { name: "Visionary Homes",    file: "visionary homes logo.png",                  h: 32, maxW: 130 },
  { name: "Tresidio Homes",     file: "tresidio homes.png",                        h: 48, maxW: 140 },
  { name: "Van Daele Homes",    file: "vandaele-logo.png",                         h: 32, maxW: 130 },
  { name: "Rurka Homes",        file: "rurka-homes-logo.avif",                     h: 30, maxW: 130 },
];

const headlineFields = [
  { key: "headline", label: "Headline text", type: "text" as const, defaultValue: "Trusted by homebuilders across 28 markets" },
];

type LogoEntry = { name: string; file: string; h: number; maxW: number };

function LogoItem({ name, file, h, maxW }: LogoEntry) {
  const src = `${LOGOS}/${encodeURIComponent(file)}`;
  // Fixed cell width (logo maxW + horizontal padding) so the flex track
  // has a predictable total width BEFORE images load. Without this, the
  // w-max parent gets a wrong width at mount and translateX(-50%) lands
  // in the wrong place, leaving the track sparse or empty mid-loop.
  const cellW = maxW + 56; // 56px = px-7 (28px × 2)
  return (
    <div
      className="flex flex-shrink-0 items-center justify-center px-7 py-1"
      style={{ width: cellW, height: h + 16 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        style={{ height: h, maxWidth: maxW, width: "auto" }}
        className="object-contain grayscale opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-90"
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
    <div className="relative overflow-hidden py-3">
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
  const { v, editOverlay } = useEditableSlot("builder-logo-strip", headlineFields);

  return (
    <section className="relative overflow-hidden bg-bg-surface py-14">
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

      {editOverlay}

      <p className="mb-10 text-center text-sm font-semibold uppercase tracking-[0.15em] text-text-muted">
        {v.headline}
      </p>

      <MarqueeRow items={row1} direction="left" speed={50} />
      <div className="mt-4">
        <MarqueeRow items={row2} direction="right" speed={44} />
      </div>
    </section>
  );
}
