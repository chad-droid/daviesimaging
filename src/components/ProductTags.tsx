/**
 * The two labels every product page carries: which service line makes it
 * (Production, Flow, Match) and which stage it serves (Lead, Launch, List).
 * Sits in the dark hero, under the subhead.
 */
export function ProductTags({ line, stage }: { line: string; stage: string }) {
  return (
    <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-[0.15em]">
      <span className="text-accent-dark-hover">{line}</span>
      <span className="text-white/25" aria-hidden>
        /
      </span>
      <span className="text-white/60">{stage}</span>
    </p>
  );
}
