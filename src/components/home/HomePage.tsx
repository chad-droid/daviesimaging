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
          body="Before your communities are ever built, DIG gives you photorealistic photographs and video of every plan, modeled or not, so your prospects understand the neighborhood you are bringing into their lives."
          products={[
            { label: "PlanMatch", href: "/services/showcase#planmatch" },
            { label: "CineFlow", href: "/services/showcase#cineflow" },
            { label: "ActFlow", href: "/services/virtual-video#actflow" },
          ]}
        />
        <PlanMatchChapter />
      </div>

      <div id="launch" className="scroll-mt-28">
        <StageHeader
          n="02"
          stage="Launch"
          body="Our launch services are what DIG's reputation was built on: a national network of highly trained photographers for the best model home photography, video and Matterport available to the industry."
          products={[
            { label: "Premium Photography", href: "/services/premium" },
            { label: "Premium Video", href: "/services/video-production" },
            { label: "CineFlow", href: "/services/showcase#cineflow" },
            { label: "ActFlow", href: "/services/virtual-video#actflow" },
            { label: "Moments", href: "/services/showcase#moments" },
          ]}
        />
        <PremiumChapter />
        <FilmChapter />
      </div>

      <div id="list" className="scroll-mt-28">
        <StageHeader
          n="03"
          stage="List"
          body="Once you are ready to sell, DIG helps you list every spec home. Your listings look their absolute best while your team focuses on marketing, not coordination and retouching."
          products={[
            { label: "Spec+", href: "/programs/spec-plus" },
            { label: "Listing Photography", href: "/services/listing" },
            { label: "ModelMatch", href: "/services/virtual-staging" },
            { label: "FrameFlow", href: "/services/virtual-video" },
          ]}
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
