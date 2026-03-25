"use client";

import Link from "next/link";

const placeholderTiles = [
  { label: "Lifestyle", gradient: "from-zinc-800 to-zinc-600" },
  { label: "FrameFlow", gradient: "from-zinc-700 to-zinc-500" },
  { label: "Model Home", gradient: "from-zinc-900 to-zinc-700" },
  { label: "Community", gradient: "from-zinc-600 to-zinc-400" },
  { label: "Aerial", gradient: "from-zinc-800 to-zinc-500" },
  { label: "Staging", gradient: "from-zinc-700 to-zinc-600" },
];

export function HeroVideo() {
  return (
    <section className="relative overflow-hidden bg-zinc-900">
      {/* Video tile grid background */}
      <div className="absolute inset-0 grid grid-cols-2 gap-1 opacity-40 sm:grid-cols-3">
        {placeholderTiles.map((tile) => (
          <div
            key={tile.label}
            className={`bg-gradient-to-br ${tile.gradient} flex items-center justify-center`}
          >
            {/* Replace with <video> elements when footage is ready */}
            <span className="text-xs font-medium uppercase tracking-widest text-white/30">
              {tile.label}
            </span>
          </div>
        ))}
      </div>

      {/* Hero content overlay */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-32 text-center sm:py-44">
        <h1 className="text-white">
          Builder assets that win hearts and earn clicks.
        </h1>
        <p className="lead-text mt-6 max-w-2xl text-zinc-300" style={{ fontStyle: "italic" }}>
          DIG builds revenue-driving marketing assets designed for website
          conversion, sales center storytelling, paid media performance, and
          buyer connection. One shoot. Multiple outcomes.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/frameflow-sell-faster-challenge-0210"
            className="cta-button rounded-full bg-white px-8 py-3.5 text-zinc-900 transition-colors hover:bg-zinc-200"
          >
            Try the FrameFlow Challenge Risk Free
          </Link>
          <Link
            href="/contact-page"
            className="cta-button rounded-full border border-white/30 px-8 py-3.5 text-white transition-colors hover:border-white/60"
          >
            Book a Strategy Call
          </Link>
        </div>
      </div>
    </section>
  );
}
