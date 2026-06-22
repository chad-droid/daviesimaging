"use client";

// /modelmatch-datalibrary clones the converting trial-info landing format
// (hero + tabs + footer CTA, one offer / one CTA), with the win case studies
// in the "The Proof" tab and the Win Library's own hero language. Kept as a
// thin client wrapper so the server page doesn't pass a component across the
// client boundary.

import MMLanding from "@/components/lp/MMLanding";
import MMWinsPane from "@/components/lp/MMWinsPane";

// Trial-info hero formatting (headline left, CTA top-right, full-width slider,
// stat row) with the Win Library's language. Line break after "months."
const WIN_COPY = {
  eyebrow: "For Homebuilders, Not Realtors",
  // Sized to keep "In contract after weeks." on one line beside the CTA.
  headline: (
    <span style={{ fontSize: "clamp(40px, 4.6vw, 64px)" }}>
      Stuck for months.
      <br />
      <strong style={{ fontWeight: 700, color: "#6A5ACD" }}>In contract after weeks.</strong>
    </span>
  ),
  ctaLabel: "Claim My 5 Free Images",
};

export function DataLibrary() {
  return <MMLanding winsPane={MMWinsPane} screenLabel="ModelMatch Win Library" copy={WIN_COPY} />;
}
