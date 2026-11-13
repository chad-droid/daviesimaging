import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";

// Same page as "/". Kept so earlier links to the mockup still work.
export const metadata: Metadata = {
  title: "Homepage preview",
  robots: { index: false, follow: false },
};

export default function HomePreview() {
  return <HomePage />;
}
