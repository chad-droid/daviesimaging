/**
 * DarkSection — convenience wrapper that combines <section> + <DarkSectionBg>.
 *
 * Replaces bare:
 *   <section className="bg-bg-dark py-24 text-text-light">
 *
 * With:
 *   <DarkSection className="py-24 text-text-light">
 *
 * Handles:
 *   • bg-bg-dark + relative + overflow-hidden on the outer section
 *   • DarkSectionBg injected as first child (animated glow, grid off by default)
 *   • A relative z-[1] wrapper around children so content stacks above the background
 *
 * All extra className values are forwarded to the <section> element alongside the base classes.
 */

import { DarkSectionBg } from "@/components/DarkSectionBg";

interface DarkSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  /** Rendered element — default "section". Use "div" when a section wrapper would be semantically wrong. */
  as?: "section" | "div";
}

export function DarkSection({
  children,
  className = "",
  as: Tag = "section",
  ...props
}: DarkSectionProps) {
  return (
    <Tag
      className={`relative overflow-hidden bg-bg-dark ${className}`}
      {...props}
    >
      <DarkSectionBg />
      {/* relative z-[1] ensures content stacks above the absolute background layer */}
      <div className="relative z-[1]">{children}</div>
    </Tag>
  );
}
