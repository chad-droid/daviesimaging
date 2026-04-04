import { HeroVideo } from "@/components/HeroVideo";
import { BuilderLogoStrip } from "@/components/BuilderLogoStrip";
import { StatsStrip } from "@/components/StatsStrip";
import { AssetVsContent } from "@/components/sections/AssetVsContent";
import { ServiceExplorer } from "@/components/sections/ServiceExplorer";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ModelMatchCallout } from "@/components/sections/ModelMatchCallout";
import { DigDeskPlatform } from "@/components/sections/DigDeskPlatform";
import { BuiltForBuilders } from "@/components/sections/BuiltForBuilders";
import { MarketingEcosystem } from "@/components/sections/MarketingEcosystem";
import { PremiumGallery } from "@/components/sections/PremiumGallery";
import { TryFrameFlow } from "@/components/sections/TryFrameFlow";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <HeroVideo />
      <BuilderLogoStrip />
      <StatsStrip />
      <AssetVsContent />
      <ServiceExplorer />
      <HowItWorks />
      <ModelMatchCallout />
      <DigDeskPlatform />
      <BuiltForBuilders />
      <MarketingEcosystem />
      <PremiumGallery />
      <TryFrameFlow />
      <FinalCta />
    </>
  );
}
