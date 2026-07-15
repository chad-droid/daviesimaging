import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShoreSummitBar } from "@/components/shore/ShoreSummitBar";
import { EventGalleryGrid } from "@/components/shore/EventGalleryGrid";
import { galleryTitle, isGallerySlug } from "../galleries";
import { getGalleryImages } from "../data";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ gallery: string }> }): Promise<Metadata> {
  const { gallery } = await params;
  const title = galleryTitle(gallery);
  return {
    title: title ? `${title} | Shore Summit 2026 Photos` : "Shore Summit 2026 Photos",
    description: title
      ? `${title} photos from the Shore Sales and Marketing Summit 2026, by Davies Imaging Group.`
      : undefined,
  };
}

const INK = "#1C1C1C";
const CREAM = "#F8F6F3";

export default async function ShoreGalleryPage({ params }: { params: Promise<{ gallery: string }> }) {
  const { gallery } = await params;
  if (!isGallerySlug(gallery)) notFound();

  const title = galleryTitle(gallery)!;
  const images = await getGalleryImages(gallery);

  return (
    <div style={{ background: CREAM, minHeight: "60vh" }}>
      <ShoreSummitBar />

      <section style={{ padding: "40px 24px 80px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Link
            href="/shoresummitphotos2026"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "var(--text-body)", textDecoration: "none", marginBottom: 18 }}
          >
            <span aria-hidden>&larr;</span> All galleries
          </Link>
          <h1 style={{ fontFamily: "var(--font-heading)", color: INK, fontSize: "clamp(30px, 4.4vw, 52px)", lineHeight: 1.05, fontWeight: 500, letterSpacing: "-0.02em", margin: "0 0 8px" }}>
            {title}
          </h1>
          <p style={{ margin: "0 0 34px", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)" }}>
            {images.length ? `${images.length} photo${images.length === 1 ? "" : "s"}` : "Coming soon"}
          </p>

          <EventGalleryGrid images={images} />
        </div>
      </section>
    </div>
  );
}
