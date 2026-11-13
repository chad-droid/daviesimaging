import type { Metadata } from "next";
import { ProductPage, type ProductPageConfig } from "@/components/ProductPage";

export const metadata: Metadata = {
  alternates: { canonical: "/services/cineflow" },
  title: "CineFlow: Cinematic Model Home Video Without a Shoot",
  description: "CineFlow relights each of your spaces, adds new angles, and gives you lifelike cinematic sequences without a real photo shoot.",
};

const config: ProductPageConfig = {
  slug: "cineflow",
  name: "CineFlow",
  line: "Flow",
  stage: "Lead and Launch",
  serviceType: "Video Production",
  schemaDescription:
    "Cinematic video sequences made from still images. Each space is relit and given new angles, without a photo shoot.",
  hero: {
    headline: "Cinematic video, without <strong>another shoot</strong>.",
    subhead: "CineFlow relights each of your spaces, adds new angles, and gives you lifelike cinematic sequences.",
  },
  leadFilm: {
    src: "/showcase/cinematic.mp4",
    poster: "/showcase/cinematic.jpg",
    label: "CineFlow film of a model home",
    sound: true,
  },
  intro: {
    eyebrow: "Beyond FrameFlow",
    headline: "Create drama with your <strong>existing images</strong>.",
    body: "FrameFlow converts your static images into dynamic video. CineFlow takes this even further by relighting each space, adding new angles, and giving you lifelike cinematic sequences without a real photo shoot.",
  },
  points: [
    { title: "Relight", body: "Each of your spaces is relit for the sequence, so it does not look like a photo that moves." },
    { title: "Moments", body: "You get fresh perspectives without another shoot." },
    { title: "Vertical and stills", body: "You also get a vertical version for social and stills pulled from the same set." },
  ],
  films: [
    { src: "/client-showcase/cineflow-wildrose.mp4", poster: "/client-showcase/cineflow-wildrose-poster.webp", label: "CineFlow film of a model home interior" },
    { src: "/client-showcase/cineflow-crestmont.mp4", poster: "/client-showcase/cineflow-crestmont-poster.webp", label: "CineFlow film of a model home" },
  ],
  gallery: {
    eyebrow: "Stills",
    headline: "Stills pulled from the <strong>same set</strong>.",
    shape: "landscape",
    slots: [{ id: "still-1" }, { id: "still-2" }, { id: "still-3" }],
  },
  related: [
    { label: "FrameFlow", href: "/services/virtual-video", body: "Your static images converted into dynamic video, ordered on demand." },
    { label: "ActFlow", href: "/services/actflow", body: "Virtual talent in your spaces, so your buyers can see what life looks like there." },
    { label: "PlanMatch", href: "/services/planmatch", body: "Photorealistic images of your homes before they are built. CineFlow works from these too." },
  ],
  cta: {
    headline: "Want film of your model without a <strong>shoot day</strong>?",
    body: "Tell us the community and we will show you CineFlow on a home you are selling now.",
  },
};

export default function CineFlowPage() {
  return <ProductPage config={config} />;
}
