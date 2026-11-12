import type { Metadata } from "next";
import { BuilderLogoStrip } from "@/components/BuilderLogoStrip";
import { ShowcaseChapterNav } from "@/components/ShowcaseChapterNav";
import { FinalCta } from "@/components/sections/FinalCta";
import { HomeHero } from "@/components/home/HomeHero";
import { Highlights } from "@/components/home/Highlights";
import { SpecPlusPinned } from "@/components/home/SpecPlusPinned";
import {
  StageHeader,
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

// The page is organised by when a builder needs assets: Lead (before it is
// built), Launch (model homes and amenities), List (spec homes for sale).
const CHAPTERS = [
  { id: "lead", label: "Lead" },
  { id: "launch", label: "Launch" },
  { id: "list", label: "List" },
  { id: "digdesk", label: "digDesk" },
];

export default function HomePreview() {
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
          ]}
        />
        <PlanMatchChapter />
        <FilmChapter />
      </div>

      <div id="launch" className="scroll-mt-28">
        <StageHeader
          n="02"
          stage="Launch"
          body="Our launch services are what DIG's reputation was built on: a national network of highly trained photographers for the best model home photography, video and Matterport available to the industry."
          products={[
            { label: "Premium Photography", href: "/services/premium" },
            { label: "Premium Video", href: "/services/video-production" },
          ]}
        />
        <PremiumChapter />
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
            { label: "Moments", href: "/services/showcase#moments" },
          ]}
        />
        <SpecPlusPinned />
        <ModelMatchChapter />
      </div>

      <DigDeskChapter />
      <ProofChapter />
      <CompareChapter />
      <FinalCta />
    </>
  );
}
