import type { Metadata } from "next";
import { ProductPage, type ProductPageConfig } from "@/components/ProductPage";

export const metadata: Metadata = {
  alternates: { canonical: "/services/moments" },
  title: "Moments",
  description: "Moments gives you vertical close ups of the cabinetry, stone, fixtures and appliances built into your homes, made for social.",
};

const config: ProductPageConfig = {
  slug: "moments",
  name: "Moments",
  line: "Match",
  stage: "Launch",
  serviceType: "Social Media Content",
  schemaDescription:
    "Vertical close ups of the cabinetry, stone, fixtures and appliances in a builder's homes, made for social media.",
  hero: {
    headline: "Close ups of what is built into <strong>your homes</strong>.",
    subhead: "Vertical close ups of your cabinetry, stone, fixtures and appliances, made for social.",
  },
  intro: {
    eyebrow: "Made for social",
    headline: "Your finishes, <strong>up close</strong>.",
    body: "Your buyers scroll on their phones. Moments gives you vertical close ups of the details in your homes, sized for where they are looking.",
  },
  points: [
    { title: "Vertical", body: "Every Moment is vertical, so you can post it without cropping." },
    { title: "Close up", body: "Your cabinetry, your stone, your fixtures and your appliances, shown the way your buyer would look at them in person." },
    { title: "Yours", body: "These are the finishes built into your homes. Nothing here is stock." },
  ],
  gallery: {
    eyebrow: "Moments",
    headline: "Five details, <strong>five posts</strong>.",
    shape: "vertical",
    slots: [
      { id: "hood", defaultSrc: "/showcase/moments-hood-2.webp", alt: "Close up of a range hood" },
      { id: "faucet", defaultSrc: "/showcase/moments-faucet-1.webp", alt: "Close up of a kitchen faucet" },
      { id: "fireplace", defaultSrc: "/showcase/moments-fireplace-1.webp", alt: "Close up of a fireplace" },
      { id: "fridge", defaultSrc: "/showcase/moments-fridge-1.webp", alt: "Close up of a refrigerator" },
      { id: "bath", defaultSrc: "/showcase/moments-bath-1.webp", alt: "Close up of a bathroom" },
    ],
  },
  related: [
    { label: "Premium Photography", href: "/services/premium", body: "The model home photography your Moments sit beside." },
    { label: "CineFlow", href: "/services/cineflow", body: "Cinematic sequences of the same spaces, with a vertical version for social." },
    { label: "ModelMatch", href: "/services/virtual-staging", body: "Your model home identity, carried into your spec homes." },
  ],
  cta: {
    headline: "Need more to post from the <strong>same model home</strong>?",
    body: "Tell us the community and we will show you Moments from your own finishes.",
  },
};

export default function MomentsPage() {
  return <ProductPage config={config} />;
}
