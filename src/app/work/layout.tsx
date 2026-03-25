import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Browse DIG's full portfolio across model homes, amenities, spec homes, and lifestyle photography.",
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
