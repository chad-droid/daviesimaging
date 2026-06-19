import type { Metadata } from "next";
import { ModelMatchCinematic } from "./ModelMatchCinematic";

export const metadata: Metadata = {
  title: "Cinematic FrameFlow — Luxury Spec Home Presentation | Davies Imaging Group",
  description:
    "Setting the new standard for spec home presentation for luxury properties: empty room to virtually staged stills, vignettes, and a cinematic FrameFlow film.",
  robots: { index: false, follow: false },
};

export default function ModelMatchCinematicPage() {
  return <ModelMatchCinematic />;
}
