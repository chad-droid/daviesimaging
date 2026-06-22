"use client";

// /modelmatch-datalibrary clones the converting trial-info landing format
// (hero + tabs + footer CTA, one offer / one CTA), with the win case studies
// in the "The Proof" tab and the Win Library's own hero language. Kept as a
// thin client wrapper so the server page doesn't pass a component across the
// client boundary.

import MMLanding from "@/components/lp/MMLanding";
import MMWinsPane from "@/components/lp/MMWinsPane";

// Single-column hero (one column, full-width slider + stat row) with the Win
// Library's language.
const WIN_COPY = {
  singleColumn: true,
  eyebrow: "For Homebuilders, Not Realtors",
  headline: (
    <>
      Stuck for months.{" "}
      <strong style={{ fontWeight: 700, color: "#6A5ACD" }}>In contract after weeks.</strong>
    </>
  ),
  ctaLabel: "Claim My 5 Free Images",
};

export function DataLibrary() {
  return <MMLanding winsPane={MMWinsPane} screenLabel="ModelMatch Win Library" copy={WIN_COPY} />;
}
