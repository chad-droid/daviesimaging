import type { Metadata } from "next";
import { ProductPage, type ProductPageConfig } from "@/components/ProductPage";

export const metadata: Metadata = {
  alternates: { canonical: "/services/planmatch" },
  title: "PlanMatch: Photorealistic Renderings From Your Floor Plans",
  description: "PlanMatch gives you photorealistic images of your homes before they are built, made from your construction plans and finishes. Days, not months.",
};

const config: ProductPageConfig = {
  slug: "planmatch",
  name: "PlanMatch",
  line: "Match",
  stage: "Lead",
  serviceType: "Virtual Photography",
  schemaDescription:
    "Photorealistic interior and exterior images of unbuilt homes, made from construction plans and finish samples and merchandised through ModelMatch.",
  hero: {
    headline: "Don't call it <strong>rendering</strong>.",
    subhead:
      "Before your community is ever built, you can have photorealistic images of every floor plan, modeled or not, in place of traditional renderings. Better, faster, and less expensive than ever.",
  },
  leadFilm: {
    src: "/showcase/planmatch-01.mp4",
    poster: "/showcase/planmatch-01.jpg",
    label: "PlanMatch film of an unbuilt home",
  },
  intro: {
    eyebrow: "Not a rendering service",
    headline: "Great quality, at better prices, in <strong>less time</strong>.",
    body: "This is not like traditional rendering services. You upload your construction plans, upload samples of your finishes, and get photorealistic virtual images merchandised through our ModelMatch process. You get them in days, not months.",
  },
  points: [
    { title: "Upload your plans", body: "We start with your construction plans or CAD files, whatever is available, we can make work." },
    { title: "Upload your finishes", body: "Send samples of your finishes, so the homes you show are the homes you will build." },
    { title: "Get your images", body: "You get photorealistic interiors and exteriors, merchandised through ModelMatch, ready to pre-sell." },
  ],
  gallery: {
    eyebrow: "Made from plans",
    headline: "None of these homes <strong>were built yet</strong>.",
    shape: "landscape",
    slots: [
      { id: "exterior-twilight", defaultSrc: "/client-showcase/planmatch-coventry-ext-twilight.webp", alt: "PlanMatch exterior at twilight" },
      { id: "living", defaultSrc: "/client-showcase/planmatch-02-living-dining.webp", alt: "PlanMatch living and dining room" },
      { id: "kitchen", defaultSrc: "/client-showcase/planmatch-04-kitchen.webp", alt: "PlanMatch kitchen" },
      { id: "primary", defaultSrc: "/client-showcase/planmatch-05-master-bedroom.webp", alt: "PlanMatch primary bedroom" },
      { id: "bath", defaultSrc: "/client-showcase/planmatch-08-bathroom.webp", alt: "PlanMatch bathroom" },
      { id: "exterior-day", defaultSrc: "/client-showcase/planmatch-coventry-ext-day.webp", alt: "PlanMatch exterior in daylight" },
    ],
  },
  related: [
    { label: "CineFlow", href: "/services/cineflow", body: "Turn your PlanMatch images into cinematic sequences, without a real photo shoot." },
    { label: "ActFlow", href: "/services/actflow", body: "Add virtual talent, so your buyers can see what life looks like in a home that is not built yet." },
    { label: "ModelMatch", href: "/services/virtual-staging", body: "The same merchandising process, for the spec homes you have standing today." },
  ],
  cta: {
    headline: "Pre-selling a community that <strong>isn't built yet</strong>?",
    body: "Send us a plan you are selling now and we will show you what PlanMatch does with it.",
  },
};

export default function PlanMatchPage() {
  return <ProductPage config={config} />;
}
