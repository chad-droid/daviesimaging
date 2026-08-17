import type { Metadata } from "next";
import { ModelMatchDeck } from "./ModelMatchDeck";

export const metadata: Metadata = {
  alternates: { canonical: "/modelmatch-deck" },
  title: "ModelMatch — Virtual Staging for Homebuilders",
  description:
    "A walkthrough of ModelMatch: reference-based virtual staging that matches your model home photography. Before and after, builder by builder.",
  robots: { index: false, follow: false },
};

export default function ModelMatchDeckPage() {
  return <ModelMatchDeck />;
}
