import type { Metadata } from "next";
import { BuilderLogoStrip } from "@/components/BuilderLogoStrip";
import { ShowcaseChapterNav } from "@/components/ShowcaseChapterNav";
import { FinalCta } from "@/components/sections/FinalCta";
import { HomeHero } from "@/components/home/HomeHero";
import { Highlights } from "@/components/home/Highlights";
import { SpecPlusPinned } from "@/components/home/SpecPlusPinned";
import {
  ModelMatchChapter,
  FilmChapter,
  PlanMatchChapter,
  PremiumChapter,
  DigDeskChapter,
  ProofChapter,
  CompareChapter,
} from "@/components/home/chapters";

// Mockup of the rebuilt homepage. Lives beside the real one so it can be
// reviewed without touching "/". Not linked, not indexed.
export const metadata: Metadata = {
  title: "Homepage preview",
  robots: { index: false, follow: false },
};

const CHAPTERS = [
  { id: "highlights", label: "Highlights" },
  { id: "spec-plus", label: "Spec+" },
  { id: "modelmatch", label: "ModelMatch" },
  { id: "film", label: "Film" },
  { id: "premium", label: "Premium" },
  { id: "digdesk", label: "digDesk" },
];

export default function HomePreview() {
  return (
    <>
      <HomeHero />
      <BuilderLogoStrip />
      <ShowcaseChapterNav chapters={CHAPTERS} ctaHref="/modelmatch-datalibrary" ctaLabel="Start My Free Trial" />
      <Highlights />
      <SpecPlusPinned />
      <ModelMatchChapter />
      <FilmChapter />
      <PlanMatchChapter />
      <PremiumChapter />
      <DigDeskChapter />
      <ProofChapter />
      <CompareChapter />
      <FinalCta />
    </>
  );
}
