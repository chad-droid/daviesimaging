"use client";

// /modelmatch-datalibrary clones the converting trial-info landing format
// (hero + tabs + footer CTA, one offer / one CTA), with the win case studies
// living in the "The Proof" tab. Kept as a thin client wrapper so the page
// (a server component) doesn't pass a component across the client boundary.

import MMLanding from "@/components/lp/MMLanding";
import MMWinsPane from "@/components/lp/MMWinsPane";

export function DataLibrary() {
  return <MMLanding winsPane={MMWinsPane} screenLabel="ModelMatch Win Library" />;
}
