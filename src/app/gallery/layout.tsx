import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Our Work", template: "%s | Davies Imaging Group" },
  description: "Browse DIG's full portfolio across model homes, amenities, spec homes, and lifestyle photography.",
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
