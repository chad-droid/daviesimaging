import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDeck, recordDeckView } from "@/lib/clientShowcase";
import { ShowcaseDeck, type ShowcaseClient } from "./ShowcaseDeck";

// /for/[id] — a client's personalized product showcase. Decks are created in
// /admin/showcase; the id is unguessable and the route is noindex, out of the
// sitemap and nav. /for/sample renders an unbranded version (no DB needed).

export const dynamic = "force-dynamic";

const SAMPLE: ShowcaseClient = {
  builderName: "Product Showcase",
  logoUrl: null,
  logoBg: "light",
  attendees: [],
  meetingDate: null,
  openingLine: "A look at the assets DIG builds for homebuilder marketing teams.",
  preparedBy: null,
};

type Params = { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string | undefined>> };

async function load(id: string): Promise<ShowcaseClient | null> {
  if (id === "sample") return SAMPLE;
  try {
    const d = await getDeck(id);
    if (!d) return null;
    return {
      builderName: d.builder_name,
      logoUrl: d.logo_url,
      logoBg: d.logo_bg,
      attendees: d.attendees,
      meetingDate: d.meeting_date,
      openingLine: d.opening_line,
      preparedBy: d.prepared_by,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const client = await load(id);
  const title = client && id !== "sample" ? `DIG for ${client.builderName}` : "DIG Product Showcase";
  return {
    title: { absolute: `${title} | Davies Imaging Group` },
    description: "CineFlow, ActFlow, Listing, Spec+, and PlanMatch from Davies Imaging Group.",
    robots: { index: false, follow: false },
    openGraph: { title, images: ["/client-showcase/cineflow-wildrose-poster.webp"] },
  };
}

export default async function ClientShowcasePage({ params, searchParams }: Params) {
  const { id } = await params;
  const { preview } = await searchParams;
  const client = await load(id);
  if (!client) notFound();
  // Count real opens only; the admin's preview links add ?preview=1.
  if (id !== "sample" && !preview) await recordDeckView(id).catch(() => {});
  return <ShowcaseDeck client={client} />;
}
