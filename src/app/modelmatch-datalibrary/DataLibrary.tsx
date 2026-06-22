"use client";

// /modelmatch-datalibrary clones the converting trial-info landing format
// (hero + tabs + footer CTA, one offer / one CTA), with the win case studies
// in the "The Proof" tab and the Win Library's own hero language. Kept as a
// thin client wrapper so the server page doesn't pass a component across the
// client boundary.

import MMLanding from "@/components/lp/MMLanding";
import MMWinsPane from "@/components/lp/MMWinsPane";

const WIN_COPY = {
  eyebrow: "For Homebuilders, Not Realtors",
  headline: (
    <>
      Stuck for months.
      <br />
      <span style={{ color: "#6A5ACD" }}>In contract after weeks.</span>
    </>
  ),
  subhead:
    "On-brand virtual staging that puts stuck inventory back in motion. See the proof below, then try it on your own listing. Your first 5 staged images are free.",
  ctaLabel: "Claim My 5 Free Images",
  reassurance:
    "Your first 5 staged images are free. Delivered in 24 hours. 60 seconds to submit, no obligation.",
};

export function DataLibrary() {
  return <MMLanding winsPane={MMWinsPane} screenLabel="ModelMatch Win Library" copy={WIN_COPY} />;
}
