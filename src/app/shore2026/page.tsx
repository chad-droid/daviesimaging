import type { Metadata } from "next";
import { Shore2026 } from "./Shore2026";

export const metadata: Metadata = {
  alternates: { canonical: "/shore2026" },
  // Root layout applies the "%s | Davies Imaging Group" template, so no suffix here.
  title: "ModelMatch for Shore Summit Attendees",
  description:
    "For Shore Sales and Marketing Leadership Summit attendees: stage your vacant spec homes with furniture from your own model homes. Your first eight images are free, delivered in 1 business day.",
  // Attendee page shared by link and QR at the show, not for search indexing.
  robots: { index: false, follow: false },
};

export default function Shore2026Page() {
  return <Shore2026 />;
}
