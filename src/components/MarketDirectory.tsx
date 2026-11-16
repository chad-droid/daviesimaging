import Link from "next/link";
import { markets, comingSoonMarkets, REGION_LABELS, type RegionId } from "@/lib/markets";

const REGIONS: RegionId[] = ["west", "mountain", "central", "east"];

/** Every market, grouped by region, each linking to its market page. Coming-soon markets are listed last, unlinked. */
export function MarketDirectory({ current }: { current?: string }) {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      {REGIONS.map((r) => (
        <div key={r}>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent">{REGION_LABELS[r]}</p>
          <ul className="mt-3">
            {markets
              .filter((m) => m.region === r)
              .map((m) => (
                <li key={m.slug}>
                  {m.slug === current ? (
                    <span className="block py-1.5 text-sm font-semibold text-text-dark">{m.name}, {m.state}</span>
                  ) : (
                    <Link
                      href={`/markets/${m.slug}`}
                      className="block py-1.5 text-sm text-text-body transition-colors hover:text-accent"
                    >
                      {m.name}, {m.state}
                    </Link>
                  )}
                </li>
              ))}
            {comingSoonMarkets
              .filter((m) => m.region === r)
              .map((m) => (
                <li key={m.city} className="flex items-baseline gap-2 py-1.5 text-sm text-text-muted">
                  {m.city}, {m.state}
                  <span className="rounded-full border border-border-light px-2 py-px text-[0.6rem] font-bold uppercase tracking-[0.12em]">
                    Coming soon
                  </span>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
