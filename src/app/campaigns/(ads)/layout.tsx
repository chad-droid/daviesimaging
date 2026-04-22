// ──────────────────────────────────────────────────────────────
// Route group: src/app/campaigns/(ads)
// All ad landing pages in this group render WITHOUT the site
// Nav and Footer. They still inherit the root <html>, <head>,
// tracking scripts (GA, LinkedIn Insight, Meta Pixel), and
// global font loading.
// ──────────────────────────────────────────────────────────────
export default function AdsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
