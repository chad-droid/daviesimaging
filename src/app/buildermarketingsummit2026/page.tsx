import type { Metadata } from "next";
import { BuilderMarketingSummit2026 } from "./BuilderMarketingSummit2026";

export const metadata: Metadata = {
  alternates: { canonical: "/buildermarketingsummit2026" },
  // Root layout applies the "%s | Davies Imaging Group" template, so no suffix here.
  title: "ModelMatch for Builder Marketing Summit Attendees",
  description:
    "For Builder Marketing Summit attendees: stage your vacant spec homes with furniture from your own model homes. Your first eight images are free, delivered in 1 business day.",
  // Attendee page shared by link and QR at the show, not for search indexing.
  robots: { index: false, follow: false },
};

export default function BuilderMarketingSummit2026Page() {
  return <BuilderMarketingSummit2026 />;
}
