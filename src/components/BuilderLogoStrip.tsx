"use client";

// Builder logo strip — auto-scrolling marquee, two rows, opposite directions
// Logos are text-based now; swap to <Image> when you have SVG/PNG files

const row1 = [
  "Toll Brothers",
  "Beazer Homes",
  "K. Hovnanian",
  "Grand Homes",
  "Pahlisch Homes",
  "Woodside Homes",
  "Mungo Homes",
  "Bloomfield Homes",
  "Ladera Living",
  "Thrive Cos.",
];

const row2 = [
  "Risewell Homes",
  "SHAWOOD",
  "Tricon Communities",
  "Lewis Communities",
  "Cresleigh Homes",
  "CBC Homes",
  "Visionary Homes",
  "Tresidio Homes",
  "Van Daele Homes",
  "Rurka Homes",
];

function MarqueeRow({
  items,
  direction = "left",
  speed = 40,
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
}) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-2">
      {/* Fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-bg-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-bg-surface to-transparent" />

      <div
        className="flex w-max gap-10"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex flex-shrink-0 items-center gap-2 rounded-full border border-border-light bg-bg-light px-5 py-2 transition-all hover:border-accent/30 hover:bg-accent/5"
          >
            {/* Builder monogram */}
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-[9px] font-bold uppercase tracking-wider text-accent">
              {name.charAt(0)}
            </span>
            <span className="whitespace-nowrap text-xs font-medium text-text-muted">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BuilderLogoStrip() {
  return (
    <section className="overflow-hidden bg-bg-surface py-12">
      {/* Inline keyframes */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="marquee"] { animation: none !important; }
        }
      `}</style>

      <p className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
        Trusted by homebuilders across 24 markets
      </p>

      <MarqueeRow items={row1} direction="left" speed={50} />
      <div className="mt-2">
        <MarqueeRow items={row2} direction="right" speed={45} />
      </div>
    </section>
  );
}
