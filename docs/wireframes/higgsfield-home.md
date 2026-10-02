# Higgsfield home — wireframe

Reference: `https://higgsfield.ai/` captured Oct 2, 2026 at 1440px desktop width.
Content and media for every block live in `lib/higgsfield-home-constants.ts`; components live in `components/landing/`.

Measured page: ~13,000px tall, 16px side gutters, 16px card radius, background `#0f1113`.
Headings: Space Grotesk 700, uppercase, tight tracking (28px section titles, 36–48px banners). Body: Inter 14–16px, muted `#898a8b`.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ PROMO BAR (lime #d1fe17)   🏷 Get an additional discount…   [Get your discount]│  HF_PROMO_BAR
├──────────────────────────────────────────────────────────────────────────────┤
│ [logo] Explore Image Video Audio MCP API(New) … Canvas Originals  Pricing [Login][Sign up] │  HF_NAV_LINKS (existing AppShell)
╞══════════════════════════════════════════════════════════════════════════════╡
│ 1. HERO CAROUSEL  (horizontal scroll, 512×288 cards, 16:9, autoplay video)    │  HF_HERO_CARDS
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────────          │
│ │   video      │ │   video      │ │   video      │ │   image/video          │
│ └──────────────┘ └──────────────┘ └──────────────┘ └────────────          │
│  TITLE            TITLE            TITLE            TITLE                     │
│  description      description      description      description               │
├──────────────────────────────────────────────────────────────────────────────┤
│ 2. SIGN-UP PROMO + FEATURED TOOLS                                             │  HF_SIGNUP_PROMO
│ ┌────────────────────────────────┐ ┌──────────┐┌──────────┐┌──────────┐       │  HF_FEATURED_TOOLS
│ │ SIGN UP AND GET YOUR           │ │icon [Vid]││icon [Img]││icon      │       │
│ │ EXTRA DISCOUNT (lime)          │ │Seedance  ││Nano Ban. ││Genjutsu  │       │
│ │ ✓ perk  ✓ perk  ✓ perk         │ └──────────┘└──────────┘└──────────┘       │
│ │ [ Sign up and get discount ]   │ ┌──────────┐┌──────────┐┌──────────┐       │
│ │        (video background)      │ │MCP Claude││Cinema 4.0││Supercomp.│       │
│ └────────────────────────────────┘ └──────────┘└──────────┘└──────────┘       │
├──────────────────────────────────────────────────────────────────────────────┤
│ 3. MCP DOTS  (full-width dark card, floating mascot "dots" around title)      │  HF_MCP_DOTS
│   (Cinematic Director)     USE CHATGPT ◉ DOTS          (Motion Designer)       │
│        ●  ↖                WITH HIGGSFIELD MCP               ●                 │
│   (Character Creator)   Plan and make a creative…      (Content Lead)         │
│                          [ Connect Higgsfield ]                               │
├──────────────────────────────────────────────────────────────────────────────┤
│ 4. GLOBAL FILM FESTIVAL                                                       │  HF_FILM_FESTIVAL
│ ┌────────────────────────┐ ┌───────┐┌───────┐┌───────┐                        │
│ │ [festival logo]        │ │ thumb ││ thumb ││ thumb │   12 submissions,      │
│ │ ALL SUBMISSIONS ARE    │ │@author││@author││@author│   3 cols × 4 rows,     │
│ │ LIVE / SHORTLIST NEXT  │ ├───────┤├───────┤├───────┤   16:9 thumbs          │
│ │                        │ │  …    ││  …    ││  …    │                        │
│ │  (poster + video bg)   │ └───────┘└───────┘└───────┘                        │
│ └────────────────────────┘          [ Explore all projects ] (gold)           │
├──────────────────────────────────────────────────────────────────────────────┤
│ 5. VISUAL EFFECTS (title in lime)                       [Try for free]        │  HF_VISUAL_EFFECTS
│ ┌────┐┌────┐┌────┐┌────┐┌────┐   5-column masonry, 15 effects,                 │
│ │    ││    ││    ││    ││    │   mixed ratios (9:16, 3:4, 4:3, 16:9, 1:1)      │
│ │NAME││NAME│└────┘│NAME││    │   name + [Recreate] overlaid at bottom          │
│ └────┘└────┘┌────┐└────┘└────┘                                               │
│                     [ View all presets ]                                      │
├──────────────────────────────────────────────────────────────────────────────┤
│ 6. HIGGSFIELD GENJUTSU                                                        │  HF_GENJUTSU
│ ┌────────────────────────────────────────────────────────────────────┐        │
│ │ New model · HIGGSFIELD GENJUTSU · Reality Manipulation — …          │        │
│ │ [Start generating] [Learn more]                                     │        │
│ │ ┌───┐┌───┐┌───┐┌───┐┌───┐  5-col masonry of 20 preset thumbs        │        │
│ └────────────────────────────────────────────────────────────────────┘        │
├──────────────────────────────────────────────────────────────────────────────┤
│ 7. GALLERY: SEEDANCE 2.5 → [View all]   4-col masonry, video on hover         │  HF_GALLERIES[0]
├──────────────────────────────────────────────────────────────────────────────┤
│ 8. EXPLORE THE INSIDE OF EVERY PROJECT                                        │  HF_PROJECTS
│ ┌──────┐┌──────┐┌──────┐┌──────┐   4 × 2 grid, 16:9 covers,                   │
│ │cover ││cover ││cover ││cover │   title + "Higgsfield Studio" avatar row     │
│ └──────┘└──────┘└──────┘└──────┘            [ Explore community ]             │
├──────────────────────────────────────────────────────────────────────────────┤
│ 9. SUPERCOMPUTER BANNER  (bg image + 5 floating product shots + logo)         │  HF_SUPERCOMPUTER_BANNER
├──────────────────────────────────────────────────────────────────────────────┤
│ 10. GALLERY: GPT IMAGE 2                                                      │  HF_GALLERIES[1]
├──────────────────────────────────────────────────────────────────────────────┤
│ 11. CANVAS BANNER  "ONE CANVAS. EVERY WORKFLOW."  [Try Canvas]                │  HF_CANVAS_BANNER
├──────────────────────────────────────────────────────────────────────────────┤
│ 12. GALLERY: MARKETING STUDIO                                                 │  HF_GALLERIES[2]
│ 13. GALLERY: SEEDANCE 2.0                                                     │  HF_GALLERIES[3]
├──────────────────────────────────────────────────────────────────────────────┤
│ 14. PHOTODUMP BANNER  "DIFFERENT SCENES SAME STAR"  [Try Photodump]           │  HF_PHOTODUMP_BANNER
├──────────────────────────────────────────────────────────────────────────────┤
│ 15. GALLERY: HIGGSFIELD SOUL CINEMA                                           │  HF_GALLERIES[4]
│ 16. GALLERY: HIGGSFIELD SOUL 2.0                                              │  HF_GALLERIES[5]
├──────────────────────────────────────────────────────────────────────────────┤
│ 17. EXPLORE MORE AI FEATURES  (48px title, wrapped pill links ×36)            │  HF_MORE_FEATURES
╞══════════════════════════════════════════════════════════════════════════════╡
│ FOOTER  AI-NATIVE CREATIVE SUITE │ Create │ Video Models │ Studios │ Platform │  HF_FOOTER
│                                  │        │ Image Models │ Soul    │ Resources│
│ address · socials                │        │              │         │ Company… │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Gallery block (repeated 6×)

```
SEEDANCE 2.5                                          
The most advanced AI video model                      
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│ 9:16│ │16:9 │ │ 3:4 │ │16:9 │   Items carry a `column` index so the
│     │ └─────┘ │     │ ├─────┤   reference masonry is reproduced exactly
│     │ ┌─────┐ └─────┘ │ 9:16│   on desktop; mobile collapses to 2 cols.
└─────┘ │ 3:4 │ ┌─────┐ │     │   Bottom fade + [View all of …] button.
@author └─────┘ │16:9 │ └─────┘
          ░░░░░░░ fade ░░░░░░░
              [ View all of Seedance 2.5 ]
```

## Responsive notes

- **≥1024px:** layout above.
- **640–1023px:** promo and tool grid stack; masonry drops to 3 columns (galleries) / 3 columns (effects); projects 2 columns.
- **<640px:** hero carousel stays horizontal-scroll; every masonry is 2 columns; festival submissions 2 columns; footer columns stack 2-up.
