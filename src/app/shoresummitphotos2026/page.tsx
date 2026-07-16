import type { Metadata } from "next";
import Link from "next/link";
import { ShoreSummitBar } from "@/components/shore/ShoreSummitBar";
import { SHORE_GALLERIES } from "./galleries";
import { getCovers, getFirstImage } from "./data";

const OG_TITLE = "Shore Summit Event Photos - by Davies Imaging Group";
const OG_DESCRIPTION =
  "Event photos from the Shore Sales and Marketing Summit 2026, captured by Davies Imaging Group.";

// Share preview (iMessage / social): custom title + the first Tiki Island Welcome
// Party photo as the image. Runs at request time, so it picks up the latest photo.
export async function generateMetadata(): Promise<Metadata> {
  const cover = await getFirstImage("welcome-celebration");
  const images = cover
    ? [{ url: cover.display_url, width: cover.width ?? 1600, height: cover.height ?? 1067, alt: OG_TITLE }]
    : undefined;
  return {
    title: "Shore Summit 2026 Photos",
    description: OG_DESCRIPTION,
    openGraph: {
      title: OG_TITLE,
      description: OG_DESCRIPTION,
      url: "https://www.daviesimaging.com/shoresummitphotos2026",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: OG_TITLE,
      description: OG_DESCRIPTION,
      images: cover ? [cover.display_url] : undefined,
    },
  };
}

// Queried at request time so new uploads appear without a rebuild.
export const dynamic = "force-dynamic";

const INK = "#1C1C1C";
const CREAM = "#F8F6F3";

export default async function ShoreSummitPhotosIndex() {
  const covers = await getCovers();

  return (
    <div style={{ background: CREAM }}>
      <ShoreSummitBar />

      <section style={{ padding: "56px 24px 72px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#123E63" }}>
            Shore Summit 2026
          </p>
          <h1 style={{ fontFamily: "var(--font-heading)", color: INK, fontSize: "clamp(34px, 5vw, 60px)", lineHeight: 1.05, fontWeight: 500, letterSpacing: "-0.02em", margin: "0 0 14px" }}>
            Event Photos
          </h1>
          <p style={{ margin: "0 0 44px", maxWidth: 620, fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.6, color: "var(--text-body)" }}>
            Photos from the Summit, captured by Davies Imaging Group. Pick a gallery to browse, then tap any photo to view it full screen or download it.
          </p>

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}
          >
            {SHORE_GALLERIES.map((g) => {
              const cover = covers[g.slug];
              return (
                <Link
                  key={g.slug}
                  href={`/shoresummitphotos2026/${g.slug}`}
                  style={{
                    position: "relative",
                    display: "block",
                    aspectRatio: "3 / 2",
                    borderRadius: 14,
                    overflow: "hidden",
                    textDecoration: "none",
                    background: cover ? "#d8d4cf" : "#123E63",
                    boxShadow: "0 18px 40px rgba(0,0,0,0.10)",
                  }}
                >
                  {cover && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={cover.thumb_url}
                      alt={g.title}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  )}
                  <span style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 55%, transparent 100%)" }} />
                  <span style={{ position: "absolute", left: 22, right: 22, bottom: 20, display: "block" }}>
                    <span style={{ display: "block", fontFamily: "var(--font-heading)", color: "#fff", fontSize: 26, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.15 }}>
                      {g.title}
                    </span>
                    <span style={{ display: "block", marginTop: 6, fontFamily: "var(--font-body)", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)" }}>
                      {cover ? `${cover.count} photo${cover.count === 1 ? "" : "s"}` : "Coming soon"}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
