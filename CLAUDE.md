# DIG 2026 — daviesimaging.com Rebuild
### Claude Code Project Brief

---

## Project Overview

Davies Imaging Group (DIG) is rebuilding `daviesimaging.com` from scratch as a Next.js site deployed on Vercel. This is a complete clean-slate build — nothing is carried over from the existing Webflow site structurally. All decisions, architecture, copy direction, and design patterns are documented in this file.

The live production site (`daviesimaging.com`) runs on Webflow DIG 2025 and stays untouched until the new site is ready. DNS moves to Vercel only when Chad explicitly approves.

**Platform:** Next.js 14+ (App Router) + Tailwind CSS + Framer Motion + Vercel
**Builder:** Claude Code — sole implementer, no other developer involved
**Design reference:** Terminal Industries (`https://terminal-industries.com`) — analyzed in detail below

---

## Current Build Status (as of April 2026)

### Done
- Full homepage: HeroVideo (parallax + placeholder tiles), StatsStrip (animated counters: 24 markets / 14 days DOM / 258 communities), all 8 sections with RevealOnScroll
- `EditableContent` inline editing system — slot-based, persists to Neon Postgres
- `DynamicImage` and `ParallaxBackground` — pull images from `site_assets` table
- Admin panel (`/admin`) — media library, gallery curation, digital assets, image slot assignment
- Contact form pipeline — Slack + Resend email + Mailchimp, all live and tested
- Email capture modal — 30-second timer, Mailchimp subscribe (correct endpoint: `us17.list-manage.com/subscribe/post`)
- Footer — Mailchimp subscribe form (same correct endpoint), social links
- Sanity blog — live at `/blog`
- All routes scaffolded (work, services, offerings, markets, campaigns)

### In Progress / Pending
- Hero video tiles — placeholder gradients, needs real MP4 footage from DIG shoots
- `RevealOnScroll` — currently uses IntersectionObserver; upgrade to Framer Motion `useInView` for smoother WAAPI animations
- StatsStrip circular progress rings — built but denominator ratios need review (currently 24/30, 14/30, 258/300)
- Image slots — most sections have `DynamicImage` / `ParallaxBackground` wired up but no images assigned yet
- Gallery curation — admin tool built, actual image ingestion from Dropbox pending
- About page, service pages, offering pages — scaffolded, copy needs full implementation per briefs below

### Do Not Touch
- Webflow DIG 2025 (`68596ef61365cb1c678a0e7f`) — live production at `daviesimaging.com`
- DNS — do not move domain until Chad explicitly approves

---

## Webflow Sites (reference only — do not touch)

| Site | ID | Status |
|---|---|---|
| DIG 2025 | `68596ef61365cb1c678a0e7f` | Live production at `daviesimaging.com` — do not modify |
| DIG 2026 (copy) | `69c2fb1c74ba5d998f92ab1c` | Abandoned — Next.js replaces this |

---

## Team Context

| Person | Role | Notes |
|---|---|---|
| Chad Davies | CEO / Owner | Decision maker, based in Texas |
| Nicole | Marketing Director | Content strategy lead (via House of Influence LLC) |
| Andrew Brouillard | Web Designer | Assigned on Asana tasks; currently slow to execute |
| Hoang | Zoho Analytics Dev | Mexico team — not involved in this project |
| Dani Martinelli | Director of Accounts | Not involved in this project |
| Thomas Brigantino | Director of Production Ops | Not involved in this project |

**No em dashes in any written content.** This is a standing preference from Chad.

---

## Typography System

**Source:** The Cormorant & Novo System (PDF framework, March 2026)
**Implemented** via inline site script `dig_2026_typography` (v2.0.0) in the DIG 2026 site header. Do not remove or duplicate this script.

> **Confirmed fonts:** Cormorant Garamond (Google Fonts) for major headings, Noto Sans (Google Fonts) for body and UI. Both are loaded via the site header script.

### Full type hierarchy

| Level | Element | Font | Size | Weight | Notes |
|---|---|---|---|---|---|
| H1 (Hero) | `h1` | Cormorant Garamond | 3rem / 48px | 600 SemiBold | line-height 1.1, letter-spacing -0.01em |
| H2 (Section) | `h2` | Cormorant Garamond | 2.25rem / 36px | 500 Medium | line-height 1.2 |
| H3 (Sub-heading) | `h3` | Cormorant Garamond | 1.75rem / 28px | 400 Regular | line-height 1.3 |
| Lead / Subheading | `.lead-text` | Cormorant Garamond | 1.25rem / 20px | 400 Italic | line-height 1.5 — short intro statements only, never full paragraphs |
| H4 (Minor heading) | `h4` | Noto Sans | 1.25rem / 20px | 700 Bold | UPPERCASE, letter-spacing 0.05em |
| H5 | `h5` | Noto Sans | 1.125rem / 18px | 700 Bold | UPPERCASE, letter-spacing 0.05em |
| H6 | `h6` | Noto Sans | 1rem / 16px | 500 Medium | UPPERCASE, letter-spacing 0.05em, color #555 |
| Body / Paragraph | `p` | Noto Sans | 1rem / 16px | 400 Regular | line-height 1.6 |
| Caption / Meta | `.meta-text` | Noto Sans | 0.875rem / 14px | 400 Regular | color #666 |
| Button / CTA | `.cta-button` | Noto Sans | 0.875rem / 14px | 700 Bold | UPPERCASE, letter-spacing 0.1em |

### Pairing rules (from framework)
1. Cormorant Garamond is for large-scale impact only (H1-H3 and `.lead-text`). Never use it below H3 size (28px).
2. Noto Sans handles all communication, interfaces, and reading (H4-H6, body, buttons, nav, captions).
3. Cormorant italic (`.lead-text`) is for short introductory phrases only — never full paragraphs.
4. Do not mix fonts within the same button or nav label.
5. Always use semantic HTML tags (`h1`, `h2`, etc.) on headings in Webflow components — not just size classes — so CSS overrides apply automatically.
6. Do not override `line-height: 1.6` on body or `color: #666` on `.meta-text` without checking contrast on dark backgrounds.

---

## Design Inspiration: Terminal Industries

Reference site: `https://terminal-industries.com`
Pages analyzed: Homepage, YOS product page, Executive Leadership persona page, Agentic AI page

Study every pattern below before making any design decisions. This is a deep framework, not a surface reference.

---

### Brand positioning comparison

| | Terminal Industries | DIG 2026 |
|---|---|---|
| Tone | Dark, technical, cinematic, inevitable | Editorial, premium, effortless, trustworthy |
| Core claim | AI-native yard operating system | Revenue-driving visual assets for homebuilders |
| Trust mechanism | Specificity (exact stats, named clients, Gartner badge) | Visual proof (gallery depth, builder logos, ROI data) |
| Primary emotion | Confidence through technology | Confidence through craft |

---

### Interactive video patterns

**01 — Hero video tile grid**
Terminal uses 6 short looping MP4 clips in a masonry/grid layout in the hero. Each tile is a different operational context. All autoplay, muted, loop. Creates a "living" hero without a single dominant video.

DIG implementation: 6 tiles showing — lifestyle shoot BTS, virtual staging before/after, FrameFlow sequence, model home reveal, aerial exterior, community street. Mix portrait and landscape orientations. Source clips from existing shoot footage. Use `<video autoplay muted loop playsinline>` per tile. No play button.

**02 — Benefit section paired videos**
Each numbered benefit section (01, 02, 03) has two video versions: wide for desktop, vertical for mobile. Plays inline as the user scrolls to it. No controls, no play button. Ambient evidence, not a demo.

DIG implementation: Spec+ benefit uses a before/after virtual staging video. FrameFlow benefit shows a photo sequence scrolling through a community. Premium benefit uses a lifestyle shoot highlight reel. Two versions each (wide + vertical). Swap via CSS `display` on breakpoint.

**03 — Ambient background video on dark sections**
Full-bleed video plays behind text in high-contrast dark sections at very low opacity or desaturated. Text is always white and legible. Video never competes with copy.

DIG implementation: Final CTA section ("Let's Build Assets That Move Homes.") uses a slow aerial community video as a darkened full-bleed background. Dark overlay at 60-70% opacity on top. White Cormorant Garamond headline. One button CTA.

---

### White space philosophy

**01 — Viewport-height section breaks**
Multiple Terminal sections use 100vh or near-100vh height. One idea per screen. The visitor cannot miss the message because it fills the entire viewport.

DIG rule: Hero is full viewport (100vh). The Spec+ lead section is 80vh minimum. The "One shoot. Multiple outcomes." line deserves its own screen. No section under 60vh on desktop.

**02 — Minimal copy per section**
Terminal rarely has more than 3-4 lines of body copy per section. The headline carries the message. Details live on product subpages. The homepage is a trailer, not a brochure.

DIG rule: Every homepage section has exactly one H2 (Cormorant Garamond), one 2-sentence body paragraph (Noto Sans), and one CTA. No bulleted lists on the homepage. Lists live on service pages only.

**03 — Content isolation**
Sections are either visual-dominant (video/image with minimal text) or text-dominant (large typography on white/light background). Never both equally weighted at the same time.

DIG rule: Gallery sections are image-dominant with minimal text overlay. Copy sections (persona callout, asset vs content narrative) are text-dominant with no competing imagery. Keep them clearly separated.

---

### Parallax elements

**01 — Staggered headline reveal**
The Terminal hero has 4-5 headline lines that scroll at slightly different speeds. Achieved via CSS `transform: translateY` at different rates on each layer. Creates depth without real 3D.

DIG implementation (Webflow): Two-layer hero headline. "We help homebuilder marketing teams" on layer 1, "sell faster." on layer 2 with 0.8x scroll speed. Use Webflow Interactions with scroll-based movement. Cormorant Garamond at 3rem makes this dramatic.

**02 — Scroll-pinned text over moving imagery**
A text block stays fixed (CSS `position: sticky`) while imagery scrolls behind it. Used in "How it Works" — the label stays centered while the visual behind it moves.

DIG implementation: Premium gallery teaser section. "Built for builders who demand the best." pinned center-left while a horizontal strip of photography scrolls behind. Webflow: sticky container + overflow:hidden parent + scroll interaction on the image track.

**03 — Full-bleed photo at parallax depth**
Photography sections where the image scrolls at 60-70% of page speed, creating a "looking through a window" sensation as you pass the section.

DIG implementation: Builder testimonial/pull quote section. Quote text over a full-bleed lifestyle shoot photo. Photo scrolls slower than page. Webflow: `background-attachment: fixed` on the section, or a Webflow scroll interaction with reduced movement speed on the image element.

---

### Interactivity patterns

**01 — Rolling number counters**
Digits 0-9 animate like a slot machine on scroll-enter. Implemented as a column of stacked digit divs that translate upward via CSS. Each stat has its own column.

DIG implementation: Stats strip in or near hero. "24 markets" / "420+ projects" / "48hr turnaround on Spec+". Trigger on scroll-enter. Noto Sans Bold, large (2.5-3rem). Place as a horizontal strip between the hero and the first content section. Use a lightweight custom script or Webflow IX2 with scroll trigger.

**02 — Scroll-triggered section reveals**
Every section fades/slides up on scroll-enter. 0.4-0.6s ease-out. Staggered within sections: H2 appears first (0s delay), body copy second (0.1s), CTA third (0.2s). Nothing animates on load except the hero.

DIG implementation: Webflow native Interactions. "Scroll into view" trigger on each section wrapper div. Initial state: opacity 0, translateY 20px. Final state: opacity 1, translateY 0. Duration 0.5s ease. Apply to all 7 homepage sections and all service pages.

**03 — Tabbed platform explorer**
"AT THE GATE / IN THE YARD / AT THE DOCK / ACROSS OPERATIONS" horizontal pill tabs. Click to swap the image and copy below. Tabs persist as you scroll within the section. Webflow Tabs component.

DIG implementation: Service explorer on homepage. Pills: "Spec+" / "Virtual Staging" / "Virtual Video" / "Premium" / "FrameFlow." Each tab shows: short 2-sentence description + one sample image + one CTA ("Order via FrameFlow" or "Explore gallery"). This is a teaser only — tabs link to full service pages.

**04 — Pain point / builder type switcher**
Terminal's technology hurdles section uses horizontal pill buttons to swap body copy. Instant swap, no animation. One pain point visible at a time.

DIG implementation: "What's holding your marketing back?" section. Builder type pills: "National Builder" / "Regional Builder" / "BTR Division" / "Spec Builder." Each surfaces the most relevant DIG service (Spec+, Premium, FrameFlow) with tailored copy. Webflow Tabs or conditional visibility with Interactions.

**05 — Multi-step contact form**
Terminal contact section opens with a numbered intent chooser (5 options). User selects their intent, then the form appears below. Reduces friction, qualifies leads before they fill out the form.

DIG implementation: "What brings you here?" — options: Book a strategy call / Order via FrameFlow / Explore Spec+ / Request a quote / Something else. After selection, form fields appear. Primary form placement: bottom of homepage. Full contact page at /contact. Webflow: conditional visibility toggled by radio/tab selection.

**06 — Inline CTA repetition**
Every Terminal section ends with a small text link or minimal button CTA. Not always a large button — sometimes just "Learn More →" or "Take a closer look." The page never goes more than one viewport scroll without an action available.

DIG implementation: Each of the 7 homepage sections ends with a small CTA. Alternate between "Order via FrameFlow →" / "Explore the gallery →" / "Book a strategy call →" based on section context. Style: Noto Sans Bold, 14px, no button box, just text + arrow. Underline on hover.

---

### Design element system

**01 — Eyebrow labels**
Small all-caps labels appear above H2 section headlines: "BUILT BY THE INDUSTRY" / "HOW IT WORKS." Sets context before the headline lands. 11-12px, letter-spacing 0.1em, muted color.

DIG equivalent: "SPEC+ BY DIG" / "VIRTUAL STAGING + VIDEO" / "PREMIUM PHOTOGRAPHY" / "BUILT FOR BUILDERS." Noto Sans, uppercase, 0.1em tracking, `--color-text-tertiary`. Pairs with Cormorant Garamond H2 below.

**02 — Selective bold within headlines**
Terminal bolds specific words inside body-weight headlines: "A single **solution** for maximum, automated throughput." The bold word is the payoff. Creates scannable hierarchy within a single line.

DIG equivalent: "Your spec homes need to move. **Spec+** delivers **everything.**" / "One shoot. **Multiple outcomes.**" Works especially well in Cormorant Garamond where weight contrast is dramatic.

**03 — Dual-tier logo strip**
"Built by" (founders/investors) AND "Trusted by" (clients/operators) — two separate greyscale logo rows placed mid-page, not just in the footer. No labels under logos. Logos at full width, evenly spaced.

DIG equivalent: Single tier "Trusted by builders across 24 markets." — greyscale logos of Toll Brothers, Kolter Homes, Beazer, Perry Homes, M/I Homes. Place after persona callout section. Auto-scrolling marquee on mobile.

**04 — Full-bleed testimonial with photo**
One section uses a full-bleed photograph as the background for a single pull quote. White text, large Cormorant Garamond quote text, Noto Sans attribution. Dark overlay on photo. No card, no box.

DIG equivalent: Quote from a builder marketing director over a full-bleed lifestyle shoot photo. "DIG doesn't just take photos. They build assets." Attribution: Name, Title, Builder. Photo should be from a DIG shoot. Dark overlay at 55-65% opacity.

**05 — Credential badge**
Gartner badge in the footer — understated but credible. Not in the hero where it could feel like bragging. In the footer where serious buyers look.

DIG equivalent: Small badge or credential callout above the footer: "Serving 24 markets nationwide" with a stat from the M/I Homes Zillow analysis, or a press mention if available.

**06 — Numbered benefit sequencing**
Benefits labeled "Benefit 01 / 02 / 03" with the number in small muted type. Tells the visitor how many benefits there are. Creates a reading contract — they know when they're done.

DIG equivalent: In the Spec+ section: "01 Photography / 02 Virtual Staging / 03 Virtual Video" as small muted eyebrow labels above each benefit block. Or in the service overview: "01 Spec+ / 02 FrameFlow / 03 Premium." Noto Sans, 11px, muted.

---

### Homepage section framework (Terminal pattern → DIG equivalent)

| Section | Terminal pattern | DIG 2026 implementation |
|---|---|---|
| Hero | Rotating parallax headlines + video grid + stat counters + one CTA | Staggered Cormorant headline + 6 video tiles + stats strip + "Try FrameFlow Challenge" |
| Positioning | Bold claim + 6 proof bullets | "Stop creating content. Start building assets." + 5 deployment channels |
| Primary product | Named product hero + inline video + numbered benefits | Spec+ section + staging/video demo + 3 numbered outputs |
| Secondary product | Modular/use case toggle | "Already have photos?" standalone staging+video tab |
| Persona callout | Markets dropdown → persona pages | Builder type switcher → persona landing pages |
| Social proof | Dual logo strip + full-bleed testimonial | Builder logo marquee + builder quote over lifestyle photo |
| Service explorer | Tabbed platform (Gate/Yard/Dock/Ops) | Service tabs (Spec+/Staging/Video/Premium/FrameFlow) |
| Gallery teaser | "Take a closer look" single CTA | Premium gallery masonry strip + "Explore the gallery →" |
| Product CTA | ROI calculator link | FrameFlow Challenge block — "Before you overhaul everything, test it." |
| Contact section | Intent chooser (5 options) → form | "What brings you here?" (5 options) → form |
| Final CTA | Full-width dark section, one H2, one button | "Let's Build Assets That Move Homes." — dark video background, one button |

---

### Persona page framework (Terminal's market pages translated)

Each persona page follows this exact structure. Use this as the template for all DIG per-persona landing pages.

1. **Eyebrow label** — small caps, persona name (e.g. "FOR MARKETING DIRECTORS")
2. **Hero H1** — addresses their specific pain (e.g. "Your content budget is working harder than your content.")
3. **Pain points section** — 3 named problems specific to this persona. H4 label + 2-sentence description each.
4. **Why now section** — 3 reasons to act now. Not product features — business reasons. Urgency without pressure.
5. **Solution section** — 3-4 DIG outputs that solve their specific problem. Each with a small image, H4, and 2-sentence description.
6. **Service explorer tabs** — same tabbed component from homepage, but pre-filtered to most relevant service for this persona.
7. **Contact form** — same multi-step intent chooser, pre-selected to most relevant option for this persona.
8. **Footer CTA** — same final CTA as homepage.

---

## Asana Task Backlog (DIG Website Project)

**Project ID:** `1202851468499364`
**Asana workspace:** `daviesimaging.com`

### Ready (priority queue — build these)

#### 1. Asset vs Content Narrative Section
**Task GID:** `1213402375906138`
**Tag:** Content
**Priority:** Medium
**Location:** Directly under the hero on the homepage

Copy to implement:
```
Stop Creating Content. Start Building Assets.

Most builder marketing teams invest in photography that lives in one place.
DIG builds assets designed for:

• Website conversion
• Paid ad performance
• Sales center storytelling
• Email engagement
• Listing refresh velocity

This reframes DIG as downstream-thinking.
```

---

#### 2. Clear Builder Persona Callout
**Task GID:** `1213402375906145`
**Tag:** Update, Content
**Location:** Homepage section — after the asset/content narrative

Copy to implement:
```
Built for:
• Marketing Directors at regional & national builders
• Builders doing 300+ homes annually
• Teams that need consistency across communities
• Sales leaders who want assets that help close
```

Purpose: Repels tire-kickers, elevates positioning.

---

#### 3. Fully Structured Homepage Draft
**Task GID:** `1213402375906147`
**Tag:** Structure, Update, Content
**This is the full homepage blueprint — implement all sections in order:**

**HERO**
- Headline: `We help homebuilder marketing teams sell faster.`
- Subheadline: `DIG builds revenue-driving marketing assets designed for website conversion, sales center storytelling, paid media performance, and buyer connection. One shoot. Multiple outcomes.`
- Primary CTA: `Try the FrameFlow Challenge Risk Free`
- Secondary CTA: `Book a Strategy Call`

**SECTION 1 — Asset vs Content**
*(See task 1 above for full copy)*

**SECTION 2 — Spec+ : The Complete Spec Home Asset Package**
This section should be a prominent, high-visual feature block. Spec+ is the primary product to push on the homepage.

Positioning: Spec+ is the most streamlined way for a builder to receive a complete set of marketing assets for spec homes and standing inventory. One order, complete output.

Copy direction:
```
Your spec homes need to move. Spec+ delivers everything.

Virtual staging. Virtual video. Photography. All in one package, built for standing inventory.

Stop managing multiple vendors. Start moving homes faster.

CTA: Order via FrameFlow
```

Key callout: Both Spec+ AND standalone virtual staging/video can be ordered through the FrameFlow application. Make this clear in the UI — FrameFlow is the ordering platform, not just a photography product.

**SECTION 3 — Virtual Staging + Virtual Video (Standalone)**
Some builders don't need photography. They need staging and video only. DIG can serve them.

Copy direction:
```
Already have photos? We can work with that.

DIG's virtual staging and virtual video services are available without photography.
Order staging, video, or both through the FrameFlow app.

No shoot required. Fast turnaround. Assets ready to deploy.

CTA: Get Started in FrameFlow
```

This section should make it visually clear that FrameFlow is the gateway to ordering these services, with a direct link to the FrameFlow app/form.

**SECTION 4 — Built for Builders Who Want Results**
```
We partner with marketing directors and sales leaders at growing homebuilders.

DIG was Built for:
• Marketing Directors at regional & national builders
• Builders doing 300+ homes annually
• Teams that need consistency across communities
• Sales leaders who want assets that help close

We understand:
Launch pressure / Spec inventory timelines / Brand consistency challenges / Sales team alignment

Our job is simple: Make your marketing work harder.
```

**SECTION 5 — Designed for the Full Marketing Ecosystem**
```
Every DIG shoot is built for downstream use:
• Website conversion
• Email campaigns
• Paid media
• Sales center storytelling
• Listing refreshes

Because modern builder marketing requires velocity, not just visuals.
```

**SECTION 6 — Premium Photography (Gallery Teaser)**
Premium services should NOT be a feature list — they should be a gallery experience. This section is a visual teaser that invites visitors to explore DIG's photography across different regions and community types. Use a masonry or horizontal scroll gallery format.

Copy:
```
Built for builders who demand the best.

DIG Premium delivers full-service lifestyle and model home photography across markets nationwide.

[Explore the gallery →]
```

The gallery should be filterable or browsable by region (West, Mountain, Central, East — matching the Markets > By Region structure). This links to a dedicated Premium gallery page, not a service spec page.

**SECTION 7 — Try FrameFlow**
```
Before you overhaul everything, test it.
The FrameFlow Challenge lets you see how strategic visual sequencing can increase engagement and drive faster buyer decisions.
Risk-free. Built for builders. Focused on outcomes.

CTA: Start the FrameFlow Challenge
```

**FINAL CTA**
```
Let's Build Assets That Move Homes.

If your content isn't driving momentum, it's time to rethink the strategy.

Primary CTA: Book a Strategy Call
Secondary CTA: Explore FrameFlow
```

---

#### 4. About Us Page Refresh
**Task GID:** `1213402375906149`
**Tag:** Update, Content
**Page:** `/about`

**Header:**
```
We Don't Just Capture Homes. We Help Builders Win.

Davies Imaging Group was built inside the homebuilding industry — not outside of it.
```

**Origin Story:**
```
Chad Davies founded DIG with a clear conviction: homebuilder marketing deserves better.
Better storytelling. Better strategy. Better alignment between creative and conversion.

Under his leadership, DIG has grown from a production-focused company into a strategic partner helping builders maximize every shoot and every marketing opportunity.
```

**We Understand Section:**
```
We understand:
Launch timelines. Spec pressure. Marketing budgets. Sales alignment. Community rollouts.

We've worked alongside some of the most respected builders in the country.
But what sets DIG apart isn't just production quality. It's perspective.

We think like marketers.
We think like sales leaders.
We think about what happens after the shoot.
Because beautiful work means nothing if it doesn't move homes.
```

**Experience the Difference Section:**
```
Our proven five-step asset strategy reduces the time it takes to plan, produce, and deploy marketing visuals that actually perform.

From pre-shoot alignment to post-production delivery, every step is built to support your marketing team and sales goals.

Discover why homebuilders are choosing DIG not just for photography, but for strategic partnership.
```

**Ending CTA:**
```
Let's Build Assets That Move Homes.

If you're looking for a vendor, there are plenty.
If you're looking for a partner who understands how builder marketing actually works — let's talk.

CTA: Book a Strategy Call
Secondary CTA: Explore FrameFlow
```

---

### In Review (nearly done — check with Andrew/Nicole before touching)

#### 5. Email Capture Modal — DONE
**Task GID:** `1213427029547065`
Implemented as `EmailCaptureModal.tsx`. 30-second timer, session-dismissed. Mailchimp endpoint: `https://daviesimaging.us17.list-manage.com/subscribe/post?u=de0da4eedef3becab5eb4e4ab&id=418d6a179b`

#### 6. Footer Mailchimp Form — DONE
**Task GID:** `1213427029547059`
Implemented in `Footer.tsx`. Same Mailchimp endpoint as modal above.

#### 7. Homepage Tagline Update
**Task GID:** `1213422658455181`
**Tag:** Content
**Priority:** Medium

Current tagline: `"We make content for the world's best homebuilders."`
Problem: Positions DIG as a content creator, not a growth lever.

Recommended replacement (confirm with Nicole before implementing):
`We help homebuilder marketing teams sell faster.`

Alternatives on the table:
- `Marketing assets that move homes.`
- `Stop creating content. Start creating assets.`
- `Built for builders who want results, not just visuals.`

---

## Landing Page System

### Goal
Build a reusable Webflow template that can be cloned for any campaign, service, or client pitch without rebuilding from scratch. Think of it like a cookie cutter — one master mold, infinite cookies.

### Page types needed:
1. **Campaign pages** — e.g., FrameFlow Sell Faster Challenge, QMI Close Kit
2. **Service pages** — FrameFlow, Premium, Spec+
3. **Client-specific pages** — Kolter Homes, Beazer, SouthSix, Robert Thomas Homes
4. **Persona pages** — Marketing Directors, Sales Leaders, Regional Builders

### Template structure (each landing page should include):
- Hero with headline, subhead, and primary CTA
- Social proof / logo strip (builder client logos)
- Pain point section (what problem this solves)
- Solution section (what DIG delivers)
- Proof section (results, case study, or stat)
- CTA section (book a call or start a challenge)

### Implementation approach:
Create a Webflow page called `LP-TEMPLATE` with all sections built as Webflow Components so they can be swapped or reordered per campaign. Use CMS or symbols where content repeats across pages.

---

## Site Architecture (DIG 2026 — New Structure)

The site has been completely re-architected from the flat "Services" structure into four distinct navigation pillars, each answering a different buyer question.

| Nav pillar | Buyer question it answers | Old equivalent |
|---|---|---|
| Work | "What do you shoot?" | None — new |
| Services | "How do you do it?" | /services/ (restructured) |
| Offerings | "How do I buy it?" | None — scattered |
| Markets | "Is this for me?" | None — new |

---

### Work — gallery-driven, what DIG shoots

| Page | Path | Description |
|---|---|---|
| Model Homes | `/work/model-homes` | Furnished interiors, architectural detail, finished spaces. DIG's highest-craft output. |
| Amenities | `/work/amenities` | Pools, clubhouses, fitness, parks. Community infrastructure photography. |
| Spec Homes | `/work/spec-homes` | Move-in ready homes. Listing photography and virtual staging output. |
| Lifestyle | `/work/lifestyle` | Talent-driven photography and video. People, community, aspiration. Both lifestyle photo (Premium service) and lifestyle video (Video Production service) output live here. |

All Work pages are gallery-first. Minimal copy. Photography does the selling. Each page links to relevant Services and Offerings.

---

### Services — how DIG does the work (7 services across 4 types)

**Service tier symmetry — video mirrors photography:**

| | Photography | Video |
|---|---|---|
| High-craft, full-service (incl. lifestyle) | Premium | Video Production |
| Fast-turn, spec/listing | Listing | Virtual Video |
| Digital, no shoot | Virtual Staging | Virtual Video |
| 3D scan | — | Matterport |

Note: Virtual Video covers both the digital-only and the listing video use case. DIG does NOT offer listing video created with real cameras. Clients who need fast-turn video for spec or listing homes use Virtual Video via FrameFlow.

**Lifestyle photography and lifestyle video placement:** Lifestyle is a use case of Premium (photo) and Video Production (video), not a separate service. Both service pages must call out lifestyle explicitly as a primary use case. Work > Lifestyle is the gallery page showing combined lifestyle photo and video output.

#### Photography
| Service | Path | What it is | Status |
|---|---|---|---|
| Premium | `/services/premium` | Slow, methodical, full-setup photography for model homes and lifestyle shoots. DIG's signature service. Lifestyle photography is a primary use case — call it out explicitly on this page. Gallery-first with regional filterable portfolio. | Rebuild |
| Listing | `/services/listing` | HDR photography for spec homes and active inventory. Fast-turn, MLS-ready. Renamed from "Standard" — the term every builder coordinator already uses. | Renamed + new |

#### Video
| Service | Path | What it is | Status |
|---|---|---|---|
| Video Production | `/services/video-production` | On-site, crew-based video. Community walkthroughs, lifestyle video, amenity showcases, brand films. Lifestyle video is a primary use case — call it out explicitly. The video counterpart to Premium photography. For high-craft, full-service video only. | New page |

#### Digital
| Service | Path | What it is | Status |
|---|---|---|---|
| Virtual Staging | `/services/virtual-staging` | Reference-based virtual staging using approved model home images as design references. Not generic room swaps — produces branded, on-spec results. Works standalone or bundled in Spec+. The reference-based approach is a genuine differentiator — lead with it. | Evolving |
| Virtual Video | `/services/virtual-video` | Digital video from existing photos or staging outputs. No shoot, no crew. This is also the listing video solution — for clients who need video for spec or listing homes without a production crew. DIG does NOT create listing video with real cameras. Ordered standalone via FrameFlow or bundled in Spec+. | New standalone |

#### 3D / Virtual Tours
| Service | Path | What it is | Status |
|---|---|---|---|
| Matterport | `/services/matterport` | 3D virtual tour scanning. Some DIG clients use it, some don't — DIG offers it as an option alongside FrameFlow. Positioning: Matterport = immersive 3D walkthrough scan. FrameFlow = platform for ordering virtual staging and virtual video. Not competitors — different tools for different needs. | New page |

---

### Offerings — how buyers purchase (conversion landing pages)

| Offering | Path | What it is | Status |
|---|---|---|---|
| FrameFlow | `/offerings/frameflow` | The digital ordering platform. Entry point for virtual staging, virtual video, and Spec+ orders. Not a photography product — a platform. Home of the FrameFlow Challenge. | Rebuild as platform LP |
| FrameFlow Premium | `/offerings/frameflow-premium` | Higher-cost, more specific digital work. Pilot in progress. Build as draft now, password-protect until pilot concludes. | Stealth pilot — draft only |
| Spec+ | `/offerings/spec-plus` | All-in-one package: Listing photography + Virtual Staging + Virtual Video. One order, complete output. Ordered via FrameFlow. Primary product to promote on homepage. | Rebuild as package LP |
| Regional Partnerships | `/offerings/regional-partnerships` | Volume commitment program. Two large states live in 2026. Price discounts in exchange for volume guarantees. Target audience is VP and C-Suite level — lead with commercial benefit: predictable coverage, discounted rates, dedicated capacity. | Live program — needs page |

**Campaign pages (relocated from root to subfolder):**
| Page | Old path | New path |
|---|---|---|
| Beazer x FrameFlow | `/beazer-frameflow` | `/campaigns/beazer-frameflow` |
| FrameFlow Sell Faster Challenge | `/frameflow-sell-faster-challenge-0210` | `/campaigns/frameflow-sell-faster` |
| FrameFlow v2.0 Demo | `/frameflow-v2-0-demo` | `/campaigns/frameflow-demo` |

**FrameFlow slug conflict:** Currently `/services/frameflow` and `/frameflow` (the order form) both exist. The order form moves to `/offerings/frameflow/order` or stays at `/frameflow` and is linked from the FrameFlow Offering LP.

---

### Markets — who DIG serves (3 independent dimensions)

| Page | Path | What it is |
|---|---|---|
| By Type | `/markets/type` | Detached, Attached, Luxury, BTR, Multifamily. Small gallery of DIG work in each segment. Routes to relevant Work + Offerings. |
| By Role | `/markets/role` | Coordinators, Directors, Executive, C-Suite. Different pitch per buyer type. Mirrors Terminal Industries' Markets nav exactly. Each role gets its own persona page. |
| By Region | `/markets/region` | West, Mountain, Central, East. Interactive map with project location pins across DIG's 24 markets. M/I Homes DFW Zillow analysis feeds into this as a proof point. |

**Persona pages under By Role** (each follows the Terminal persona page template):
- Coordinators: `/markets/role/coordinators`
- Directors: `/markets/role/directors`
- Executive: `/markets/role/executive`
- C-Suite: `/markets/role/c-suite`

---

### Retained pages (unchanged structure)

| Page | Path | Status |
|---|---|---|
| Home | `/` | Full refresh per homepage brief |
| About Us | `/about` | Copy rewrite per Asana task |
| Contact | `/contact` | Multi-step flow redesign |
| Blog | `/blog` | Keep, CMS-driven |
| Blog Posts Template | `/blog/[slug]` | Keep |
| M/I Homes DFW Zillow Analysis | `/mi-dfw-analysis` | Keep as research/proof page, link from Markets > By Region |
| Style Guide | `/style-guide` | Reference only — do not modify |

---

## Key Products (for context when writing copy)

| Product | Type | Description |
|---|---|---|
| **FrameFlow** | Offering (platform) | The digital ordering platform. Builders order Spec+, standalone virtual staging, and virtual video through FrameFlow. Also home of the FrameFlow Challenge. FrameFlow is a gateway, not a photography product. |
| **FrameFlow Premium** | Offering (stealth pilot) | Higher-cost, more specific digital work. Pilot in progress — do not promote publicly yet. Build the page as a password-protected draft. |
| **Spec+** | Offering (package) | All-in-one package: Listing photography + Virtual Staging + Virtual Video. Primary homepage product push. Ordered via FrameFlow. |
| **Regional Partnerships** | Offering (program) | Volume commitment program. Two states live in 2026. Price discounts for volume guarantees. Target: VP and C-Suite buyers. |
| **Premium** | Service (photography) | Slow, methodical, full-setup photography. Model homes and lifestyle. DIG's signature and brand anchor. Gallery-first presentation. |
| **Listing** | Service (photography) | HDR photography for spec homes. Fast-turn, MLS-ready. Formerly implied as "Standard" — renamed to the industry-standard term. |
| **Virtual Staging** | Service (digital) | Reference-based staging using approved model home images. Not generic room swaps. Evolving service. |
| **Virtual Video** | Service (digital) | Digital video from existing photos or staging outputs. No shoot required. Also the listing video solution — for clients who need fast-turn video for spec or listing homes without a production crew. DIG does NOT create listing video with real cameras. |
| **QMI Close Kit** | Campaign offering | 48-hour photography, staging, and video for move-in-ready homes. Targets carry cost reduction. |

---

## Tech Stack

This is a Next.js project deployed on Vercel. There is no Webflow, no external CMS, no visual editor, no Andrew. Claude Code is the sole builder.

| Layer | Tool | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | File-based routing, React Server Components |
| Styling | Tailwind CSS v4 | Utility-first, no CSS modules |
| Animation | Framer Motion | Scroll interactions, section reveals, counter animations, parallax |
| Database | Neon PostgreSQL | Stores site_content (editable copy), site_assets (image slots), media library, gallery curation |
| File storage | Vercel Blob | Stores uploaded images and media files |
| Blog CMS | Sanity | Powers `/blog` and blog post pages — do not remove |
| Inline editing | `EditableContent` component | Slot-based copy editor for admins; persists to Neon via `/api/site-content` |
| Dynamic images | `DynamicImage` / `ParallaxBackground` | Pull from `site_assets` table via `/api/site-assets`; admin-assignable per slot |
| Admin panel | `/admin` routes + `AdminSiteOverlay` | Password-protected; manages media, gallery curation, digital assets |
| Contact form | Custom API route + Resend + Slack + Mailchimp | `/api/contact` — all three integrations live and tested |
| Email capture | `EmailCaptureModal` | 30-second timer, session-dismissed, Mailchimp embed |
| Deployment | Vercel | Auto-deploy on push; `npx vercel --prod` for manual production deploy |
| Domain | `daviesimaging.com` | Currently on Webflow DIG 2025 — swap DNS to Vercel when ready |
| Analytics | Vercel Analytics + Speed Insights | Both installed in root layout |

### Key environment variables (all set in `.env.local` and Vercel dashboard)
- `DATABASE_URL` / `POSTGRES_*` — Neon PostgreSQL connection (pooled + unpooled)
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob for media uploads
- `SLACK_WEBHOOK_URL` — Contact form Slack notifications
- `RESEND_API_KEY` — Transactional email via Resend (domain: `daviesimaging.com`)
- `NOTIFICATION_EMAIL` — `info@daviesimaging.com`
- `MAILCHIMP_API_KEY` / `MAILCHIMP_LIST_ID` / `MAILCHIMP_SERVER` — Audience `418d6a179b`, server `us17`

---

## Project Setup

```bash
npx create-next-app@latest daviesimaging --typescript --tailwind --app --src-dir
cd daviesimaging
npm install framer-motion mapbox-gl react-hook-form resend @mailchimp/mailchimp_marketing
```

### Font setup (matches confirmed typography system)
Load Cormorant Garamond and Noto Sans via `next/font/google` in the root layout:

```tsx
import { Cormorant_Garamond, Noto_Sans } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const noto = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto',
})
```

Apply in `tailwind.config.ts`:
```ts
fontFamily: {
  serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
  sans: ['var(--font-noto)', 'sans-serif'],
}
```

### Typography classes (Tailwind)
```
h1: font-serif font-semibold text-5xl leading-tight tracking-tight   (Cormorant, 48px, 600)
h2: font-serif font-medium text-4xl leading-snug                      (Cormorant, 36px, 500)
h3: font-serif font-normal text-3xl leading-snug                      (Cormorant, 28px, 400)
.lead: font-serif italic text-xl leading-relaxed                      (Cormorant italic, 20px)
h4: font-sans font-bold text-xl uppercase tracking-wider              (Noto Sans, 20px, 700)
h5: font-sans font-bold text-lg uppercase tracking-wider              (Noto Sans, 18px, 700)
h6: font-sans font-medium text-base uppercase tracking-wider          (Noto Sans, 16px, 500)
p:  font-sans font-normal text-base leading-relaxed                   (Noto Sans, 16px, 400)
.meta: font-sans text-sm text-gray-500                                (Noto Sans, 14px, 400)
.cta: font-sans font-bold text-sm uppercase tracking-widest           (Noto Sans, 14px, 700)
```

---

## File Structure (actual — as built)

```
src/
  app/
    page.tsx                          # Homepage
    layout.tsx                        # Root layout — fonts, Nav, Footer, EmailCaptureModal
    about/page.tsx
    contact/page.tsx
    admin/
      layout.tsx                      # Admin auth gate
      assets/page.tsx                 # Manage site image slots
      digital/page.tsx                # Digital asset management
      media/page.tsx                  # Media library browser
    api/
      contact/route.ts                # POST: Slack + Resend + Mailchimp pipeline (LIVE)
      site-content/route.ts           # GET/POST: editable copy slots (Neon)
      site-assets/route.ts            # GET/POST: image slot assignments (Neon)
      media/
        list/route.ts                 # List media from Vercel Blob
        upload/route.ts               # Upload to Vercel Blob
        import/route.ts               # Import from external URL
        describe/route.ts             # AI describe image
        metadata/route.ts             # Update media metadata
      gallery/
        route.ts                      # Curated gallery query
        curate/route.ts               # Admin: curate gallery selection
      deals/status|sync               # CRM deal tracking
      digital/status|sync             # Digital asset sync
      db/migrate|setup                # Database schema management
    blog/
      page.tsx                        # Sanity-powered blog index
      [slug]/page.tsx                 # Sanity-powered blog post
    campaigns/
      beazer-frameflow/page.tsx
      frameflow-sell-faster/page.tsx
      frameflow-demo/page.tsx
      page.tsx
    markets/
      page.tsx
      type/page.tsx
      region/page.tsx
      role/page.tsx + coordinators|directors|executive|c-suite/page.tsx
    offerings/
      page.tsx
      frameflow/page.tsx
      frameflow-premium/page.tsx
      spec-plus/page.tsx
      regional-partnerships/page.tsx
    services/
      page.tsx
      premium|listing|video-production|virtual-staging|virtual-video|matterport/page.tsx
    work/
      page.tsx + layout.tsx
      model-homes|amenities|spec-homes|lifestyle/page.tsx
    studio/[[...tool]]/page.tsx       # Sanity Studio (blog CMS)

  components/
    # Layout
    Nav.tsx                           # Top nav
    Footer.tsx                        # Footer + Mailchimp subscribe form
    EmailCaptureModal.tsx             # 30-second timed modal, Mailchimp embed

    # Animation / scroll
    RevealOnScroll.tsx                # IntersectionObserver scroll reveal wrapper
    PageTransition.tsx                # Page-to-page transition

    # Content system
    EditableContent.tsx               # Slot-based inline copy editor (admin-only edit mode)
    EditableSection.tsx               # Section-level editable wrapper
    DynamicImage.tsx                  # Image slot — pulls from site_assets, hover before/after
    ParallaxBackground.tsx            # Parallax section bg — pulls from site_assets
    DynamicGallery.tsx                # Curated gallery with lightbox
    GalleryGrid.tsx                   # Static gallery grid
    ImageShowcase.tsx                 # Feature image display
    ProjectLightbox.tsx               # Full-screen image lightbox

    # Admin
    AdminAuth.tsx                     # Admin session auth
    AdminSiteOverlay.tsx              # Site-wide admin overlay (click slots to assign images)
    AdminGalleryCurator.tsx           # Curate gallery selections
    AdminGalleryPicker.tsx            # Pick images for gallery
    AdminMediaPicker.tsx              # Pick from media library

    # Homepage sections
    HeroVideo.tsx                     # Parallax video tile hero (EditableContent-powered)
    StatsStrip.tsx                    # Animated counters: 24 markets, 14 days DOM, 258 communities
    sections/
      AssetVsContent.tsx              # "Stop creating content. Start building assets."
      SpecPlus.tsx                    # Spec+ feature block (DynamicImage + EditableContent)
      VirtualServices.tsx             # "Already have photos?"
      BuiltForBuilders.tsx            # Persona callout
      MarketingEcosystem.tsx          # "Designed for the full marketing ecosystem"
      PremiumGallery.tsx              # Premium gallery teaser
      TryFrameFlow.tsx                # FrameFlow challenge CTA
      FinalCta.tsx                    # Dark closing CTA (ParallaxBackground + EditableContent)

    # Shared UI
    Eyebrow.tsx                       # Small caps label above H2
    StatsStrip.tsx                    # Animated counters
    RegionMap.tsx                     # Interactive region map

    # LP system
    lp/LPHero|LPCta|LogoStrip|PainPoints|Proof|Solution.tsx

    # Sanity
    PortableTextComponents.tsx        # Blog content renderer
```
      TestimonialBand.tsx             # Full-bleed photo + quote
      RegionMap.tsx                   # Mapbox interactive map
      EyebrowLabel.tsx                # Small all-caps section labels
  content/
    blog/                             # MDX blog posts
  lib/
    fonts.ts
    mapbox.ts
    mailchimp.ts
  styles/
    globals.css
```

---

## Key Component Specs

### HeroVideo.tsx — scroll-scrubbed video
```tsx
// Single video, progress controlled by scroll position
// As user scrolls through the hero section, currentTime advances
// Divided into 6 "chapters" matching 6 content moments
// Implementation: useScroll from Framer Motion + useTransform to map
// scrollYProgress (0-1) to video.currentTime (0 to duration)
// Video: autoplay=false, muted, playsInline, preload="auto"
// No play button. No controls. Ambient and automatic.
```

### ScrollReveal.tsx — universal section reveal
```tsx
// Wraps any section. On scroll-enter: opacity 0→1, y 20→0, duration 0.5s ease-out
// Stagger children: headline 0s, body 0.1s, CTA 0.2s
// Use on every page section universally
```

### StatsStrip.tsx — animated counters
```tsx
// Three stats: "24 Markets" / "420+ Projects" / "48hr Spec+ Turnaround"
// On scroll-enter: count up from 0 to final value over 1.5s
// Font: Noto Sans Bold, 3rem. Label: Noto Sans Regular, 14px below
// Horizontal strip between hero and first content section
```

### GalleryGrid.tsx — filterable gallery
```tsx
// Props: images[], filters[] (e.g. ["West", "Mountain", "Central", "East"])
// Active filter highlights, inactive dims. Framer Motion layout animation on filter change.
// Masonry layout using CSS columns or a lightweight masonry lib
// Each image: hover overlay with project name + location
// Used on: Work pages, Services > Premium
```

### RegionMap.tsx — interactive Mapbox map
```tsx
// Mapbox GL JS embedded in React via react-map-gl
// Custom markers for each of DIG's 24 markets
// Click marker: popup with market name + number of projects + "View work →" link
// Regions: West (teal), Mountain (amber), Central (purple), East (coral)
// Style: light, minimal, monochrome base
// MAPBOX_PUBLIC_TOKEN in .env.local
```

### ContactForm.tsx — multi-step intent chooser
```tsx
// Step 1: "What brings you here?" — 5 radio options shown as large pill buttons
//   Book a strategy call / Order via FrameFlow / Explore Spec+ / Request a quote / Something else
// Step 2: Form fields appear below after selection (animated in with Framer Motion)
//   Name, Email, Company, Message (pre-populated based on intent selection)
// Submission: Resend API or Formspree fallback
// Used on: Homepage bottom section + /contact page
```

### ParallaxLayer.tsx
```tsx
// Props: speed (0.5 = half scroll speed, 1.2 = faster than scroll)
// Uses Framer Motion useScroll + useTransform on the parent container
// Used for: hero headline layers, full-bleed testimonial photo, Premium gallery teaser
```

---

## Build Phases

### Phase 1 — Foundation (start here)
1. Project init, fonts, Tailwind config, global styles
2. Nav component with all 4 dropdown pillars (Work / Services / Offerings / Markets)
3. Footer with logo, nav links, Mailchimp embed, social links
4. ScrollReveal wrapper component
5. Homepage shell with all 7 sections blocked out (no content yet)

### Phase 2 — Homepage
6. HeroVideo component with scroll-scrubbed video
7. StatsStrip with animated counters
8. Spec+ section with copy and virtual staging/video callout
9. Persona callout section with builder type switcher
10. Premium gallery teaser with pinned text + scrolling photo strip
11. FrameFlow Challenge CTA block
12. Final CTA with dark background video
13. EmailModal (timed, on load)

### Phase 3 — Work pages
14. Work index page (4 tiles linking to sub-pages)
15. Model Homes gallery page
16. Amenities gallery page
17. Spec Homes gallery page
18. Lifestyle gallery page (photo + video combined)
19. GalleryGrid component with regional filtering

### Phase 4 — Services pages
20. Services index page (7 services in grid)
21. Premium page (gallery-first, regional filter)
22. Listing page
23. Video Production page
24. Virtual Staging page
25. Virtual Video page
26. Matterport page

### Phase 5 — Offerings pages
27. Offerings index
28. FrameFlow LP (platform, ordering entry point, Challenge)
29. Spec+ LP (package, primary product push)
30. Regional Partnerships LP (VP/C-Suite audience)
31. FrameFlow Premium (password-protected draft)

### Phase 6 — Markets
32. Markets index (3 dimension tiles)
33. By Type page (5 segments with small galleries)
34. By Role index + 4 persona pages (Coordinators, Directors, Executive, C-Suite)
35. By Region page with Mapbox interactive map

### Phase 7 — Supporting pages
36. About Us (full rewrite per brief)
37. Contact page (multi-step form)
38. Blog index + MDX post template
39. Campaign pages (Beazer, Sell Faster Challenge, Demo)
40. 404 page

### Phase 8 — Polish
41. Mobile responsiveness pass on all pages
42. Scroll interactions + parallax tuning
43. Page transition animations
44. SEO metadata on all pages (title, description, OG tags)
45. Vercel Analytics + Google Analytics setup
46. Performance audit (Lighthouse target: 90+ on all metrics)

---

## Blog / CMS (Sanity)

**Platform:** Sanity CMS (headless)
**Project ID:** `5xi4v6mr`
**Dataset:** `production`
**Hosted Studio:** `dig-blog.sanity.studio`
**Embedded Studio:** `/studio` (inside the Next.js app)

### Architecture

| File/Dir | Purpose |
|---|---|
| `src/sanity/env.ts` | Project ID, dataset, API version |
| `src/sanity/client.ts` | Sanity client for server-side data fetching |
| `src/sanity/image.ts` | Image URL builder helper (`urlFor()`) |
| `src/sanity/queries.ts` | GROQ queries (`postsQuery`, `postBySlugQuery`, `postSlugsQuery`) |
| `src/sanity/schemas/post.ts` | Blog post document schema |
| `src/sanity/schemas/index.ts` | Schema registry |
| `sanity.config.ts` | Studio config (uses relative imports, not `@/` aliases, for Vite compatibility) |
| `sanity.cli.ts` | CLI config for `npx sanity deploy` |
| `src/app/studio/layout.tsx` | Studio layout (full-screen fixed overlay, no Nav/Footer) |
| `src/app/studio/[[...tool]]/page.tsx` | Studio catch-all route |
| `src/app/blog/page.tsx` | Blog index, fetches all posts from Sanity |
| `src/app/blog/[slug]/page.tsx` | Individual post page with Portable Text rendering |
| `src/components/PortableTextComponents.tsx` | Custom renderers for rich text (images, links, headings, blockquotes) |

### Blog post schema fields

| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `slug` | slug | Auto-generates from title |
| `excerpt` | text | Short summary for blog index cards |
| `coverImage` | image | With hotspot support |
| `author` | string | Defaults to "DIG Team" |
| `category` | string (enum) | Strategy, Case Study, Trends, Product Updates, Behind the Scenes |
| `publishedAt` | datetime | Required, used for sort order |
| `body` | Portable Text array | Supports H2-H4, bold, italic, links, inline images with alt/caption |

### How Nicole creates blog posts

1. Go to `dig-blog.sanity.studio` (or `/studio` on the live site)
2. Click "Blog Post" in the sidebar
3. Fill in title, click Generate on slug, add excerpt, cover image, category, author, body content
4. Hit Publish

### Migration from Webflow

All 24 blog posts were migrated from the Webflow DIG 2025 CMS (collection ID `6938ca3982ba4928bf350693`) using `scripts/migrate-webflow-to-sanity.mjs`. The script converted Webflow's HTML rich text to Sanity Portable Text and uploaded all cover/inline images to Sanity's asset CDN. Each post's original slug was preserved. The migration data source is saved at `webflow-blog-posts.json` (do not commit to production).

### Important notes

- `sanity.config.ts` must use relative imports (`./src/sanity/...`) not `@/` path aliases, because the Sanity CLI uses Vite (not Next.js) for builds.
- `basePath: "/studio"` is set in the Sanity config so the embedded studio routes correctly.
- `next.config.ts` includes `cdn.sanity.io` in `images.remotePatterns` for Next.js Image optimization.
- `styled-components` is installed as a peer dependency required by Sanity Studio.
- CORS origin `http://localhost:3000` must be added in the Sanity project dashboard (sanity.io/manage > API > CORS origins) for local dev.

---

## Notes and Constraints

- **No em dashes** anywhere in copy or UI text. Use commas, colons, or line breaks instead.
- **No SAG talent agencies** for any lifestyle shoot casting (cost constraint).
- Primary CTAs always point to: `Book a Strategy Call` or `Start the FrameFlow Challenge`.
- The live `daviesimaging.com` domain is on Webflow DIG 2025 — do not touch that site. DNS moves to Vercel only when Chad explicitly approves.
- FrameFlow Premium page (`/offerings/frameflow-premium`) is built but password-protected via Next.js middleware until the pilot concludes.
- Virtual Video is also the listing video solution. DIG does NOT create listing video with real cameras. Do not refer to a separate "listing video" service anywhere on the site.
- Blog content lives in Sanity CMS (see Blog/CMS section below). Nicole can create and edit posts at `/studio` or `dig-blog.sanity.studio` without touching code.
- All images served from a CDN (Sanity CDN for blog, Cloudinary or Vercel Blob for other assets). No large images committed to the repo.
- Environment variables needed: `MAPBOX_PUBLIC_TOKEN`, `RESEND_API_KEY`, `MAILCHIMP_API_KEY`, `FRAMEFLOW_PREMIUM_PASSWORD`
