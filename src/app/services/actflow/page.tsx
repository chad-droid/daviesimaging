import type { Metadata } from "next";
import { ProductPage, type ProductPageConfig } from "@/components/ProductPage";

export const metadata: Metadata = {
  alternates: { canonical: "/services/actflow" },
  title: "ActFlow",
  description: "ActFlow introduces virtual talent to your spaces so your buyers can envision what life looks like in your homes and amenities.",
};

const config: ProductPageConfig = {
  slug: "actflow",
  name: "ActFlow",
  line: "Flow",
  stage: "Lead and Launch",
  serviceType: "Video Production",
  schemaDescription:
    "Lifestyle video with virtual talent placed in a builder's own homes and amenities, without a production crew.",
  hero: {
    headline: "What life looks like in <strong>your homes</strong>.",
    subhead:
      "ActFlow introduces virtual talent to your spaces so your buyers can envision what life looks like in your homes and amenities.",
  },
  leadFilm: {
    src: "/client-showcase/actflow-kolter.mp4",
    poster: "/client-showcase/actflow-kolter-poster.webp",
    label: "ActFlow film with virtual talent",
  },
  intro: {
    eyebrow: "Lifestyle without the production",
    headline: "Need lifestyle content without a <strong>full production</strong>?",
    body: "Need lifestyle content, but don't have the budget for a full-blown production? You get lifelike, diverse models in your homes and amenities without one.",
  },
  points: [
    { title: "Your spaces", body: "The talent is placed in your own homes and amenities, so what your buyers see is what you are selling." },
    { title: "No production", body: "You do not cast, book a crew, or schedule a shoot day." },
    { title: "Lead or Launch", body: "Use it on your PlanMatch images before you build, or on your finished models and amenities." },
  ],
  films: [
    { src: "/client-showcase/actflow-blueheron.mp4", poster: "/client-showcase/actflow-blueheron-poster.webp", label: "ActFlow film with virtual talent in an amenity" },
  ],
  gallery: {
    eyebrow: "Stills",
    headline: "Your homes, <strong>lived in</strong>.",
    shape: "landscape",
    slots: [{ id: "still-1" }, { id: "still-2" }, { id: "still-3" }],
  },
  related: [
    { label: "CineFlow", href: "/services/cineflow", body: "Cinematic sequences of your spaces, without a real photo shoot." },
    { label: "Premium Video", href: "/services/video-production", body: "When you do want a crew and real talent on site, this is the full production." },
    { label: "PlanMatch", href: "/services/planmatch", body: "Photorealistic images of your homes before they are built." },
  ],
  cta: {
    headline: "Want to show life in a home <strong>you're selling now</strong>?",
    body: "Tell us the community and we will show you ActFlow in one of your own spaces.",
  },
};

export default function ActFlowPage() {
  return <ProductPage config={config} />;
}
