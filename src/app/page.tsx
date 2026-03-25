import { HeroVideo } from "@/components/HeroVideo";
import { StatsStrip } from "@/components/StatsStrip";
import { AssetVsContent } from "@/components/sections/AssetVsContent";
import { SpecPlus } from "@/components/sections/SpecPlus";
import { VirtualServices } from "@/components/sections/VirtualServices";
import { BuiltForBuilders } from "@/components/sections/BuiltForBuilders";
import { MarketingEcosystem } from "@/components/sections/MarketingEcosystem";
import { PremiumGallery } from "@/components/sections/PremiumGallery";
import { TryFrameFlow } from "@/components/sections/TryFrameFlow";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <HeroVideo />
      <StatsStrip />
      <AssetVsContent />
      <SpecPlus />
      <VirtualServices />
      <BuiltForBuilders />
      <MarketingEcosystem />
      <PremiumGallery />
      <TryFrameFlow />
      <FinalCta />
    </>
  );
}
