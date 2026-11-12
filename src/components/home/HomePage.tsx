import { BuilderLogoStrip } from "@/components/BuilderLogoStrip";
import { ShowcaseChapterNav } from "@/components/ShowcaseChapterNav";
import { FinalCta } from "@/components/sections/FinalCta";
import { HomeHero } from "./HomeHero";
import { Highlights } from "./Highlights";
import { SpecPlusPinned } from "./SpecPlusPinned";
import {
  StageHeader,
  ModelMatchChapter,
  FilmChapter,
  PlanMatchChapter,
  PremiumChapter,
  ServiceLinesChapter,
  DigDeskChapter,
  ProofChapter,
  CompareChapter,
} from "./chapters";

// The page is organised by when a builder needs assets: Lead (before it is
// built), Launch (model homes and amenities), List (spec homes for sale).
const CHAPTERS = [
  { id: "lead", label: "Lead" },
  { id: "launch", label: "Launch" },
  { id: "list", label: "List" },
  { id: "digdesk", label: "digDesk" },
];

export function HomePage() {
  return (
    <>
      <HomeHero />
      <BuilderLogoStrip />
      <ShowcaseChapterNav chapters={CHAPTERS} ctaHref="/modelmatch-datalibrary" ctaLabel="Start My Free Trial" />
      <Highlights />

      <div id="lead" className="scroll-mt-28">
        <StageHeader
          dark
          n="01"
          stage="Lead"
          body="Before your communities are ever built, you can have photorealistic photographs and video of every plan, modeled or not, so your prospects fully understand the neighborhood you're bringing into their lives."
        />
        <PlanMatchChapter />
      </div>

      <div id="launch" className="scroll-mt-28">
        <StageHeader
          n="02"
          stage="Launch"
          body="When your model homes open, you get a national network of highly trained photographers and the best model home photography, video and Matterport available to the industry."
        />
        <PremiumChapter />
        <FilmChapter />
      </div>

      <div id="list" className="scroll-mt-28">
        <StageHeader
          n="03"
          stage="List"
          body="Once you're ready to sell, you can list every spec home looking its absolute best, while your team focuses on essential marketing activities rather than coordination and retouching."
        />
        <SpecPlusPinned />
        <ModelMatchChapter />
      </div>

      <ServiceLinesChapter />
      <DigDeskChapter />
      <ProofChapter />
      <CompareChapter />
      <FinalCta />
    </>
  );
}
