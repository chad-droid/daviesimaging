import type { Metadata } from "next";
import { CapabilitiesDeck } from "./CapabilitiesDeck";

export const metadata: Metadata = {
  alternates: { canonical: "/capabilities" },
  title: "Capabilities",
  description:
    "Marketing assets that move homes. A capabilities walkthrough of DIG photography, video, virtual staging, and the digDesk platform.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function CapabilitiesPage() {
  return <CapabilitiesDeck />;
}
