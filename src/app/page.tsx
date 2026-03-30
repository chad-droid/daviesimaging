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
import { ImageShowcase } from "@/components/ImageShowcase";

export default function Home() {
  return (
    <>
      <HeroVideo />
      <StatsStrip />
      <AssetVsContent />

      {/* Showcase: trio of images */}
      <section className="bg-bg-surface px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <ImageShowcase slotPrefix="home-showcase-1" layout="trio" />
        </div>
      </section>

      <SpecPlus />
      <VirtualServices />

      {/* Full-width filmstrip */}
      <section className="bg-bg-light py-16">
        <ImageShowcase slotPrefix="home-filmstrip" layout="filmstrip" className="px-6" />
      </section>

      <BuiltForBuilders />
      <MarketingEcosystem />

      {/* Masonry grid */}
      <section className="bg-bg-surface px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <ImageShowcase slotPrefix="home-showcase-2" layout="masonry" />
        </div>
      </section>

      <PremiumGallery />
      <TryFrameFlow />
      <FinalCta />
    </>
  );
}
