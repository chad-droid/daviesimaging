@AGENTS.md

## Design System (Terminal Industries-inspired)

These rules apply to every component and page. Do not deviate.

1. **ScrollReveal on every section.** Use `<RevealOnScroll>` wrapper. Children stagger in: opacity 0 to 1, translateY 20px to 0, 0.5s ease-out, 120ms stagger between children.
2. **Eyebrow above every H2.** Small all-caps Noto Sans, tracking-[0.15em], text-zinc-400. Use `<Eyebrow>` component.
3. **Section heights.** Hero is `min-h-screen`. Major sections `min-h-[60vh]` to `min-h-[80vh]`. No cramped sections.
4. **Content constraint per section.** One H2, two sentences of body copy max, one inline CTA. No more.
5. **Inline CTAs only.** Text + arrow: `"Label →"`. No button boxes, no borders, no background fills on section CTAs. Exception: hero and LP hero keep filled CTA buttons.
6. **Bold payoff word only.** Use `<strong>` on the single most important word in each headline. Never bold entire phrases.
7. **HeroVideo scroll-scrub.** Uses Framer Motion `useScroll` to parallax the video grid and fade content on scroll. Not autoplay.
8. **Visual vs copy separation.** Image-dominant sections (gallery, Spec+, VirtualServices) have minimal text. Copy-only sections (AssetVsContent, BuiltForBuilders, MarketingEcosystem) have no competing imagery.

## Copy Adjustments (applied)

- **Hero headline:** "Builder assets that win **hearts** and earn **clicks**."
- **Spec+ section headline:** "Your inventory needs to move. Spec+ delivers **everything**."
- **Services dropdown labels:** "Premium" renamed to "Premium Photo", "Listing" renamed to "Listing Photo"
- **Regional filters:** West, Mountain, Central, East. Apply consistently across all gallery pages.

## Site Taxonomy (from dig_final_taxonomy.html)

### Work (`/work/*`) — What DIG shoots, gallery-driven
- Model Homes `/work/model-homes`
- Amenities `/work/amenities`
- Spec Homes `/work/spec-homes`
- Lifestyle `/work/lifestyle`

### Services (`/services/*`) — How DIG does the work, quality tiers
- Premium Photo `/services/premium`
- Listing Photo `/services/listing`
- Video Production `/services/video-production`
- Virtual Staging `/services/virtual-staging`
- Virtual Video `/services/virtual-video`
- Matterport `/services/matterport`

### Offerings (`/offerings/*`) — How buyers purchase, conversion pages
- FrameFlow `/offerings/frameflow`
- FrameFlow Premium `/offerings/frameflow-premium` (stealth pilot, not in nav, noindex)
- Spec+ `/offerings/spec-plus`
- Regional Partnerships `/offerings/regional-partnerships`

### Markets (`/markets/*`) — Who DIG serves, 3 buyer dimensions
- By Type `/markets/type` — Detached, Attached, Luxury, BTR, Multifamily
- By Role `/markets/role` — Coordinators, Directors, Executive, C-Suite
- By Region `/markets/region` — West, Mountain, Central, East

## Navigation Architecture

Four dropdown pillars plus standalone links:

- **Work:** Model Homes, Amenities, Spec Homes, Lifestyle
- **Services:** Premium Photo, Listing Photo, Video Production, Virtual Staging, Virtual Video, Matterport
- **Offerings:** FrameFlow (`/offerings/frameflow`), Spec+ (`/offerings/spec-plus`), Regional Partnerships (`/offerings/regional-partnerships`)
- **Markets:** By Type (`/markets/type`), By Role (`/markets/role`), By Region (`/markets/region`)

Standalone links: About, Blog, Contact

CTA button (right side): Start FrameFlow
