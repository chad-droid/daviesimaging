import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketPage } from "@/components/MarketPage";
import { SITE_NAME } from "@/lib/seo";
import { markets, marketBySlug, inName } from "@/lib/markets";

// One static page per market in src/lib/markets.ts. Anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return markets.map((m) => ({ market: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ market: string }> }): Promise<Metadata> {
  const { market } = await params;
  const m = marketBySlug(market);
  if (!m) return {};
  const title = `Home Builder Photography in ${m.name}, ${m.state} | ${SITE_NAME}`;
  const description = `Model home photography, spec home listing photography, virtual staging and video for home builders in ${inName(m)}. DIG shoots in ${m.areas.slice(0, 4).join(", ")} and nearby communities.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/markets/${m.slug}` },
    openGraph: { title, description, url: `/markets/${m.slug}`, type: "website" },
  };
}

export default async function Page({ params }: { params: Promise<{ market: string }> }) {
  const { market } = await params;
  const m = marketBySlug(market);
  if (!m) notFound();
  return <MarketPage market={m} />;
}
