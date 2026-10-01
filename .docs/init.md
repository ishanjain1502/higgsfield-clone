# ORIGNIAL HYPOTHESIS

## this document is for discussion on how to proceed for the build
## idea is not to clone the whole higgsfield website, but to provide a general flow of it
## we cant copy the whole frontend / backend and infrastrucuture of it within 24 hours
## so we need to think what we can do

# My idea
Lets go with initial logged out home page
signup flow
onboarding flow
seeing all the options on screen as is in higgsfield, maybe some changes with respect to what was selected in onboarding

From there show all the options as on the current home page, or with the personalization

initially give user flow of only what they selected, and ask them to get out of the flow to full fledged mode

on entering full fledged mode, show them everything as it current home page and all the feature, and each feature is in slightly disabled color, not enough to break UI look, but enough to signal that its disabled apart from just 1, which is 

only feature we are going to give is going to be in video section, where we will give option for edit maker, where you can make your favourite edits of celebs, sports players and so on and so forth, a kind of tiktok highlight reel

it will flow like
select your player that you want
it will find some cool, latest plays from them or some plays you can do custom upload
from that you can select some and stitch them together
you will be asked in the same flow to add a song to it, typical to how, you have that on instagrams reel flow
add some customization from frames and some styles like flames and everything, once decided, it will generate that highlight for you, ready to upload

you can actually use this same for generating highlights of some event that happened/some launch or for aura farming over the internet

even in this, we are not going to give the whole backend and ML abilities, we are going to give some premade presets, and mock flows, of how it will work, when user tries to add them or so, they will be given this message at the end in a popup, that this is how it will get implemented and right now it is just going to be mock flow, and then will show or present a highlight reel we have premade, and alongside its preview, we will show, what was selected by us, and will also give option to show like how user selected it

like a preview box, with 2:1 grid, or left side of it tiktok, and on rightside the preset used, above preset their will be option to show user input, which when cliked will show user input, but wont change the tiktok, and will give you option to export and upload, on clicking upload a popup will come to ask you where you want to upload, with options for tiktok, insta, twitter, facebook
and on export, this preset highlight will get downloaded on your system

---
Refined Discussion

# Higgsfield Rebuild — Product & Build Plan

## 1. Objective

The goal of this assignment is **not to clone the entire Higgsfield website**.

We want to understand the product, identify the important user flows, and build a focused interpretation of the experience within the 24-hour window.

We cannot realistically reproduce Higgsfield's:

- Complete frontend
- Complete backend
- AI/ML infrastructure
- Video generation pipeline
- Image generation pipeline
- Upscaling infrastructure
- Integrations
- Entire feature set

Instead, we will build:

> **A polished creative studio with a personalized onboarding experience, two ways of interacting with the product, and one complete end-to-end creation workflow.**

The core workflow will be **Edit Maker**.

---

# 2. Product Direction

The main observation driving our interpretation is:

> **Higgsfield exposes a large amount of creative capability, which can make the product feel overwhelming, especially for a new user.**

Our interpretation will deliberately reduce this complexity.

The user will have two primary ways of interacting with the product:

### Studio Mode

For users who know what they want.

> "Give me the tools. I'll figure it out."

Users can explore the different capabilities of the creative studio.

### Focus Mode

For users who know what they want to achieve but don't want to navigate a complex creative interface.

> "Tell me what you're trying to make, and I'll guide you."

Focus Mode will provide a **ChatGPT-like conversational interface** specifically focused on creation.

---

# 3. Overall User Journey

```text
                    Landing Page
                         │
                         ▼
                   Sign up / Login
                         │
                         ▼
                     Onboarding
                         │
                         ▼
                Personalized Home
                         │
                ┌────────┴────────┐
                │                 │
                ▼                 ▼
             Studio             Focus
                │                 │
                │                 │
                └────────┬────────┘
                         ▼
                    Create Flow
                         │
                         ▼
                     Edit Maker
                         │
                         ▼
                  Generate Preview
                         │
                         ▼
                   Final Highlight
                         │
                  ┌──────┴──────┐
                  ▼             ▼
                Export         Share
```

---

# 4. Logged-Out Experience

We will start with a simplified version of the Higgsfield landing experience.

The goal is not to reproduce every section of their landing page.

The landing page should communicate:

- What the product does
- What users can create
- The visual quality of the output
- Why the product is useful
- A clear path into the product

Primary CTA:

> **Start Creating**

Possible secondary CTA:

> **Explore**

---

# 5. Authentication

We will provide a standard signup/login experience.

Preferred flow:

> **Continue with Google**

However, authentication should not consume a disproportionate amount of the 24-hour development window.

If production OAuth introduces unnecessary setup or deployment complexity, we should prioritize a frictionless evaluator experience over building a complex authentication system.

The important requirement is:

> Someone who is not signed in as the developer should be able to access and use the deployed application.

---

# 6. Onboarding

Onboarding should not simply collect arbitrary profile information.

Its purpose is to understand:

> **What does this user want to create?**

Possible questions:

### What do you create?

- Short-form videos
- Social content
- Ads
- Images
- Highlight reels

### What are you interested in?

- Sports
- Entertainment
- Fashion
- Gaming
- Events
- Brands

### What kind of content do you like?

- Hype
- Cinematic
- Clean
- Emotional
- Experimental

The selections should influence the experience after onboarding.

For example:

```text
User selects:

Sports
Highlight reels
Hype
```

The home screen can prioritize:

> **Create a sports highlight**

instead of presenting every capability equally.

---

# 7. Personalized Home

After onboarding, the user lands on a simplified creative workspace.

The goal is to avoid immediately overwhelming the user with every available capability.

The user's selected interests and goals should influence what is shown first.

Example:

```text
Good evening, Ishan.

What would you like to create?

┌───────────────────┐
│                   │
│  Create Highlight │
│                   │
└───────────────────┘

Recommended for you

[ Edit Maker ]

──────────────────────────────────

Explore Studio

[ Video ] [ Image ] [ Upscale ] [ ... ]
```

The user initially enters the workflow most relevant to their onboarding choices.

---

# 8. Studio Mode

The user can choose:

> **Explore Studio**

This takes them into the broader creative workspace.

The interface exposes the broader Higgsfield-inspired capability set:

- Video
- Image
- Upscale
- Characters
- Effects
- Templates
- Other creative capabilities

However:

> **Only Edit Maker is fully implemented.**

Other capabilities should remain visible but clearly communicate that they are not currently available.

They should not look broken.

For example:

> **Video Generation**  
> Coming soon

rather than making the entire interface look disabled.

---

# 9. Focus Mode

Focus Mode is one of the primary product decisions of this rebuild.

The goal is to reduce cognitive load.

A prominent entry point should communicate:

> **Focus Mode**  
> Tell us what you want to create. We'll guide you through it.

Focus Mode intentionally removes most of the interface.

Instead of exposing:

```text
Subject
Clips
Music
Style
Effects
Transitions
Duration
Aspect Ratio
...
```

the user interacts conversationally.

Example:

```text
Focus Mode

What do you want to create?

┌─────────────────────────────────┐
│ I want to make a hype reel      │
│ from Messi's best moments       │
│                                 │
└─────────────────────────────────┘

                         [ Send ]
```

The system then progressively asks for only the information it needs.

---

# 10. Focus Mode Is Not a Separate Product

Studio Mode and Focus Mode should ultimately produce the **same creation configuration**.

For example:

```ts
type ReelConfig = {
  subject?: string;
  clips?: string[];
  music?: string;
  style?: string;
  effects?: string[];
  duration?: number;
  aspectRatio?: "9:16" | "16:9";
};
```

Studio Mode modifies this configuration directly through controls.

Focus Mode builds the same configuration conversationally.

```text
                User
                 │
       ┌─────────┴─────────┐
       │                   │
    Studio               Focus
       │                   │
       └─────────┬─────────┘
                 ▼
             ReelConfig
                 │
                 ▼
          Generation Flow
```

This keeps the implementation simple while allowing two fundamentally different UX approaches.

---

# 11. Progressive Disclosure

Focus Mode should not ask the user for every possible setting upfront.

Instead, it should reveal complexity only when necessary.

Example:

```text
"I want a hype Messi reel."

        ↓

Who should the reel focus on?

        ↓

Which moments?

        ↓

What vibe?

        ↓

What music?

        ↓

Ready to create?
```

If the user says:

> "I want this for Instagram."

The system can automatically suggest:

> **9:16 vertical format**

rather than asking the user to understand aspect ratios.

The principle is:

> **Complexity should be available, not imposed.**

---

# 12. Core Feature — Edit Maker

Edit Maker is the **only fully implemented creative workflow**.

The concept:

> Create short-form highlight videos from existing clips.

Potential use cases include:

- Sports highlights
- Celebrity edits
- Event highlights
- Product launches
- Social media moments
- Creator edits
- "Aura farming"
- Short-form promotional content

The product should not be restricted to sports, although sports provides a strong demonstration use case.

---

# 13. Edit Maker Flow

## Step 1 — Select Subject

Example:

```text
Who are you creating for?

[ Search ]

Popular

Messi
LeBron James
Max Verstappen
Taylor Swift
...
```

For the assignment, we can provide a curated set of subjects.

We do not need real-time internet discovery.

---

## Step 2 — Select Clips

The system presents available clips for the selected subject.

```text
Messi

Select moments

☑ Goal
☑ Assist
☐ Dribble
☑ Celebration
☐ Free kick

3 / 5 selected

[ Continue ]
```

The demo can use prepared local video assets.

---

# 14. Local Upload

The user can also select:

> **Upload your own clips**

The upload pipeline will be **completely local**.

No complicated cloud video ingestion infrastructure is required.

The application can:

- Select local files
- Preview them
- Maintain them locally
- Allow users to select/order them
- Include them in the simulated editing flow

This makes Edit Maker feel like an actual creative tool rather than simply a preset gallery.

---

# 15. Music

The user can choose a soundtrack.

Example:

```text
Choose your soundtrack

🔥 Hype
🎬 Cinematic
⚡ Electronic
🎧 Hip-hop
```

Only a small set of demo tracks is required.

We do not need to build a large music library.

---

# 16. Style

The user can choose a visual direction.

```text
Choose your vibe

[ Hype ]
[ Cinematic ]
[ Clean ]
[ Retro ]
[ Aura ]
```

---

# 17. Customization

Provide a small set of meaningful creative controls.

Example:

```text
Effects

☐ Glow
☐ Motion Blur
☐ Flames
☐ Speed Ramp

Transitions

○ Clean
● Beat Cut
○ Flash

Text

[ MESSI ]

Duration

[ 15 sec ]
```

We should **not** attempt to build a full video editor.

The goal is to demonstrate the intended creative workflow.

---

# 18. Generation

Once the user confirms their configuration:

> **Generate Highlight**

Show an actual generation state.

```text
Creating your highlight

✓ Selected moments
✓ Arranged clips
✓ Added soundtrack
✓ Applied visual style
● Rendering final video

Almost there...
```

The generation experience should be visually polished even though the underlying generation is mocked.

---

# 19. Generation Backend

We do not need actual AI video generation.

Instead, implement a lightweight generation/job abstraction.

Conceptually:

```text
Create Request
      │
      ▼
Generation Job
      │
      ▼
Processing
      │
      ▼
Completed
      │
      ▼
Preset / Demo Asset
```

The user should experience a realistic generation lifecycle.

The actual result will come from prepared assets/presets.

---

# 20. Preset-Based Demo Generation

We can prepare several finished highlight videos.

For example:

```text
demo-assets/

messi-hype.mp4
messi-cinematic.mp4
basketball-hype.mp4
event-launch.mp4
fashion-edit.mp4
```

The user's selections can determine which preset/result is presented.

This gives the appearance of a functioning creation system without requiring:

- ML inference
- GPU servers
- Video generation APIs
- Video rendering infrastructure

---

# 21. Result Screen

The result screen should be one of the most polished screens in the application.

Concept:

```text
┌─────────────────────────┬──────────────────────┐
│                         │                      │
│                         │     EDIT RECIPE      │
│                         │                      │
│        VIDEO            │ Subject              │
│                         │ Messi                │
│                         │                      │
│                         │ Clips                │
│                         │ 4 selected           │
│                         │                      │
│                         │ Music                │
│                         │ Hype                 │
│                         │                      │
│                         │ Style                 │
│                         │ Cinematic             │
│                         │                      │
│                         │ Effects              │
│                         │ Glow + Motion Blur   │
│                         │                      │
└─────────────────────────┴──────────────────────┘
```

The exact layout can be refined during implementation.

---

# 22. Edit Recipe

Instead of exposing internal implementation details, the result should explain **how the highlight was created**.

Example:

```text
Edit Recipe

Subject
Messi

Clips
4 selected

Music
Hype

Style
Cinematic

Effects
Glow
Motion Blur
```

This provides a useful relationship between:

> **User input → configuration → generated result**

---

# 23. Show User Input

The result screen should allow the user to switch between:

### Edit Recipe

What the system used to create the result.

### Your Input

What the user selected.

Example:

```text
Your Input

Subject:
Messi

Clips:
✓ Goal
✓ Celebration
✓ Assist

Style:
Hype

Music:
Track 03

Effects:
Glow
Motion Blur
```

For this assignment, changing these values does **not** need to regenerate the video.

The purpose is to demonstrate the intended product relationship.

---

# 24. Export

Export should be a real operation.

When the user clicks:

> **Export**

the prepared result video should be downloaded to the user's device.

---

# 25. Share

When the user clicks:

> **Share**

show:

```text
Where would you like to share?

[ TikTok ]
[ Instagram ]
[ X ]
[ Facebook ]
```

We should not pretend that complete social-platform integrations have been implemented.

Instead, this demonstrates the intended final product flow.

Where appropriate, the user can be given:

> **Download to share**

---

# 26. Unsupported Features

Other Higgsfield-style capabilities remain visible.

Examples:

- AI video generation
- AI image generation
- Upscaling
- Character tools
- Advanced effects
- Other creative models

Only Edit Maker is fully implemented.

Other features should be presented as:

> **Coming soon**

or:

> **Preview**

Clicking an unavailable feature can open a small explanation.

Example:

```text
Video Generation

This workflow is part of the broader
creative studio we're building.

For this version, we're focusing on
Edit Maker.

[ Back to Studio ]
```

This keeps the scope intentional rather than making the application appear unfinished.

---

# 27. What We Are Actually Building

## Fully Functional

- Landing page
- Authentication
- Onboarding
- Personalization
- Studio navigation
- Focus Mode
- Edit Maker
- Clip selection
- Local video upload
- Music selection
- Style selection
- Basic customization
- Generation state
- Result screen
- Edit Recipe
- Export/download
- Share UI

## Simulated

- AI video generation
- AI image generation
- Advanced video editing
- Clip discovery
- AI effects
- Upscaling
- Character generation
- Social integrations
- Other Higgsfield capabilities

## Explicitly Out of Scope

- Production ML infrastructure
- GPU inference
- Real-time video rendering
- Cloud video processing pipeline
- Scraping latest celebrity/sports footage
- Full social platform integrations
- Full video editor
- Replicating every Higgsfield feature

---

# 28. Product Principles

### 1. Complexity should be available, not imposed

Studio Mode gives experienced users control.

Focus Mode gives new users guidance.

---

### 2. Personalization should affect the product

Onboarding selections should influence what the user sees and what is recommended.

---

### 3. Progressive disclosure

Don't expose every setting immediately.

Reveal complexity when it becomes relevant.

---

### 4. One complete workflow beats many incomplete features

Edit Maker is the primary vertical slice.

The goal is to make one workflow feel complete.

---

### 5. Simulate expensive infrastructure, not the user experience

AI generation, ML inference and complex video processing can be mocked.

The actual user experience should still feel coherent and realistic.

---

### 6. Be transparent about scope

Unsupported functionality should be clearly presented as preview/coming soon rather than pretending to be implemented.

---

# 29. Technical Direction

The implementation should remain intentionally lightweight.

Possible structure:

```text
Next.js
│
├── Authentication
├── Onboarding
├── Home / Studio
├── Focus Mode
├── Edit Maker
│
├── API routes
│   ├── onboarding
│   ├── generations
│   └── generation status
│
├── Database
│
└── Local / static demo assets
```

We should avoid unnecessary infrastructure such as:

- Microservices
- Kafka
- Redis
- Worker clusters
- GPU infrastructure
- Cloud video processing
- Complex distributed systems

The assignment is primarily evaluating:

- Speed
- Product judgment
- UX
- UI
- Ability to ship

not infrastructure complexity.

---

# 30. Proposed Build Order

## Phase 1 — Product Research

Before writing code:

1. Use Higgsfield end-to-end.
2. Complete signup/onboarding.
3. Explore the current home experience.
4. Explore all major feature categories.
5. Go through the video workflow.
6. Capture screenshots.
7. Identify confusing/overwhelming areas.
8. Document useful interaction patterns.

---

## Phase 2 — Define MVP

Lock:

- Routes
- Screens
- User journey
- Edit Maker flow
- Focus Mode flow
- Data model
- Demo assets
- Mock generation behavior

Explicitly define what we will **not** build.

---

## Phase 3 — Build Foundation

Implement:

- App shell
- Authentication
- Onboarding
- User preferences
- Home
- Studio navigation

---

## Phase 4 — Build Edit Maker

Implement:

1. Subject selection
2. Clip selection
3. Local upload
4. Music
5. Style
6. Customization
7. Generation
8. Result
9. Edit Recipe
10. Export
11. Share

---

## Phase 5 — Build Focus Mode

Implement:

- Conversational UI
- Guided questions
- Progressive disclosure
- Configuration generation
- Transition into Edit Maker generation

Focus Mode and Studio Mode should ultimately produce the same `ReelConfig`.

---

## Phase 6 — Polish

Prioritize:

- Typography
- Spacing
- Animations
- Loading states
- Empty states
- Error states
- Video previews
- Transitions
- Responsive behavior
- Overall visual consistency

---

## Phase 7 — Deployment & Walkthrough

Before submission:

- Verify live URL works while logged out
- Verify signup/login works
- Verify onboarding works
- Verify Edit Maker works
- Verify local upload works
- Verify generated result works
- Verify export works
- Verify repository is public
- Verify `.agent-logs/` is committed
- Record walkthrough under 5 minutes
- Camera on during walkthrough

---

# 31. Final Product Story

The final product should communicate a simple idea:

> **A creative AI studio doesn't have to overwhelm the user.**

We take the breadth of an AI creative platform and provide two ways to use it:

**Studio**

> Explore and control everything yourself.

**Focus**

> Tell us what you're trying to make and we'll guide you.

Then we demonstrate that philosophy through one complete workflow:

> **Edit Maker**

```text
Idea
 ↓
Subject
 ↓
Clips
 ↓
Music
 ↓
Style
 ↓
Customization
 ↓
Generation
 ↓
Highlight
 ↓
Export / Share
```

The goal is not to prove that we can recreate Higgsfield.

The goal is to demonstrate that we can:

1. Understand an existing product.
2. Identify its core user experience.
3. Recognize where complexity can be reduced.
4. Make deliberate product tradeoffs.
5. Build a complete vertical slice quickly.
6. Ship a polished experience within the constraint.

---

# Tightening Boundaries Discussion

This section locks **v1** scope and behavior. It supersedes earlier open-ended wording in this document where the two conflict. Implementation and the walkthrough should follow this section first.

## v1 status

**Locked.** No further scope expansion without explicitly revising this section.

---

## Modes and responsibilities

| Mode | v1 responsibility | Walkthrough |
|------|-------------------|-------------|
| **Studio** | Only **complete** end-to-end path: Highlight Reel → mock generate → mock transparency → result → export | **Primary** (~3 minutes) |
| **Focus** | Guided intent, presets, option suggestions, upload UI (same utility as Studio), read-only config summary → **Coming Soon** → handoff to Studio | **Secondary** (~1 minute) |
| **Studio grid (Explore)** | Higgsfield-inspired breadth, **capped**; overflow behind “Explore more (preview)”; unavailable items use **Coming Soon** globally | Brief beat |

- **Studio** ships the vertical slice.
- **Focus** demonstrates how guided creation would feel; it does **not** run a full generation in v1.
- Real **LLM** is **out of scope** for Focus (rule-based intent, chips, and scripted prompts only).

---

## Onboarding and personalization

- Onboarding answers are stored on the user record (**database field**, tied to **NextAuth** identity).
- The logged-in **home** does **not** need an obvious visual redesign based on onboarding alone.
- On **first visit to home after onboarding**, show a **small modal** explaining that upcoming options (especially in Focus) reflect onboarding choices. Do not show this modal on every subsequent visit unless the user has not seen it (one-time per user).
- **Personalization ordering applies to Focus Mode only** in v1: e.g. if the user chose sports / highlight intent, **Sports highlight** (or equivalent) appears **at the top** of Focus entry options.
- No special evaluator shortcuts (no demo mode, no skip-onboarding deep links).

---

## Authentication

- **NextAuth** with **Google** (`Continue with Google`) as the primary auth path for v1.
- **Magic link** email auth is **deferred** (not required for v1; may be added later).
- First-time users complete onboarding after auth; preferences persist in the DB (Supabase PostgreSQL via Prisma).
- Requirement unchanged: someone who is not the developer must be able to use the deployed app.

---

## Studio golden path (walkthrough script)

Scripted demo for camera / submission:

```text
Onboarding (sports / highlight-oriented choices)
  → Home (one-time modal: choices informed Focus)
  → Enter Highlight Reel / Edit Maker (Studio)
  → Celebrity step: user may type a name → resolves to Lionel Messi
        with inline warning that this is a preset substitution for the demo
  → Select preset Messi clips
  → Optional local uploads (see Local upload); shown in UI only
  → Song step: user may paste a YouTube URL → auto-selects track
        "Remember the Name" with same preset-substitution pattern as celebrity
  → Background music selection (catalog; separate from visual backgrounds)
  → Background visual presets (4 options, Higgsfield-aligned naming / feel)
  → Generate (mock progress)
  → Post-generate mock transparency (short copy)
  → Result: single prepared 9:16 TikTok-style video + Edit Recipe | Your Input
  → Export (real download) + Share UI (platform picker only)
```

- **Default background preset** for the golden path: **TBD** (choose during asset prep; document in preset manifest when set).
- Original-hypothesis effects (flames, frames, etc.) remain **optional / later**; not required on the golden path until presets are decided.

---

## Output and preset resolver (v1)

- v1 ships **one prepared final video file** for the Messi highlight demo. **All** Studio selections (clips, BGM, background preset, uploads) are **mock** with respect to rendering: they update UI, progress copy, and **Edit Recipe / Your Input**, not the output file.
- Still maintain a **preset manifest** and **`ReelConfig`** shape so mapping rules and future assets are clear:

```ts
type ReelConfig = {
  subject?: string;
  clips?: string[];
  music?: string;
  backgroundMusicId?: string;
  backgroundPresetId?: string;
  uploads?: { id: string; name: string }[];
  // extend as needed for recipe display
};
```

- **BGM** means **background music** only.
- **Background visual presets** (4, Higgsfield-aligned) are separate from BGM.
- When background or BGM changes, the **video file stays the same** in v1.
- Preset resolver v1: resolve config → **single demo asset** + populated recipe; define fallbacks in manifest so no step errors on valid input.

---

## Local upload

| Rule | v1 |
|------|-----|
| Role in demo | Golden path uses **preset Messi clips**; upload is **optional** |
| Effect on output | **None** (UI only); final mp4 unchanged |
| Display | Show uploaded files in the clip list / previews |
| Max size | **20 MB** per file |
| Invalid type / codec | **Error** with message listing **supported** types and codecs |
| Persistence | **None** — browser-local only; refresh clears uploads |
| vs background preset | **Intentional** — uploads may appear in UI while visual background is a template; output remains the single preset video |
| Focus Mode | **Same upload utility** as Studio; same no-op on output; demonstrates parity of UX |
| Deploy | No special mobile / HTTPS requirements beyond normal file input behavior |

---

## Mock transparency

- **Studio:** After generation **completes**, show **short copy** (inline / banner — **not** a blocking modal): demo uses a prepared video; selections are reflected in recipe and input, not rendered in this build.
- **Focus:** Same honesty via **short copy** on the **Coming Soon** step (and if a disabled or stub “Generate” is shown, copy should appear there too). Focus does not complete a real generate in v1.

---

## Focus Mode (Tier 2, v1)

```text
Focus entry (sports highlight first when onboarding matches)
  → Presets and/or typed intent (no real LLM)
  → Highlight reel preset always available
  → Suggested options list (subject, clips, music, backgrounds, upload, …)
  → Read-only summary of intended ReelConfig
  → Coming Soon + short mock transparency copy
  → CTA: Try Highlight Reel in Studio (handoff; prefill where cheap)
```

- **No** full generation in Focus in v1.
- Upload and option UI should **look** like the real product; behavior matches Studio upload rules (UI only).

---

## Result screen (non-negotiable)

- Left: **9:16** phone-frame style preview (looping).
- Right: **Edit Recipe** panel.
- **Segmented control:** **Edit Recipe** | **Your Input** (toggle does not change the video).
- **Export** must download the prepared result file.

---

## Unsupported studio capabilities

- Global pattern: **Coming Soon** (not gray-disabled “broken” UI).
- Clicking unavailable capabilities: small explanation + return path (per §26 intent).

---

## UI direction

Target the feel of [Higgsfield](https://higgsfield.ai/) (dark, video-forward, preset grids similar to Visual Effects / Genjutsu cards). Not a pixel-perfect clone.

v1 defaults unless revised during build:

1. **Shell:** Minimal app chrome — logo, Studio / Focus, account — rather than full marketing nav clone.
2. **Theme:** Dark-first, high-contrast, video card emphasis.
3. **Background preset picker:** Grid of loop thumbnails / cards with short labels (Higgsfield-inspired).
4. **Components:** Tailwind + **shadcn/Radix** styled toward Higgsfield.
5. **Preset substitution warnings** (Messi name, Remember the Name track): **inline alert** on the step.

Ask explicitly before diverging from these defaults on high-visibility screens.

---

## Engineering surface (v1)

**Routes (indicative):**

- `/` — landing
- `/login` — Google sign-in (magic link deferred)
- `/onboarding`
- `/home`
- `/studio` — explore / capability grid (capped)
- `/focus`
- `/create/highlight-reel` (or stepped Edit Maker with query `?step=`)
- `/result/[jobId]` or equivalent

**Generation:**

- Lightweight job flow (client timer + status steps acceptable).
- No production ML, GPU, or cloud video pipeline.
- DB for user + onboarding field; uploads **not** stored server-side in v1.

**Assets:**

- `demo-assets/` — at minimum one Messi highlight mp4; manifest for clips, music, 4 backgrounds; golden-path default background **TBD**.

**Build priority:**

1. `ReelConfig` + manifest + single output asset
2. Studio Highlight Reel golden path + result + export
3. Auth (Google) + onboarding + DB field
4. Focus path ending in Coming Soon + Studio handoff
5. Polish on generation, result, and golden path only (not entire app shell)

---

## Walkthrough split (submission)

| Segment | ~Time | Content |
|---------|-------|---------|
| Intro | 30s | Interpretation, not clone; mock where labeled |
| Onboarding + home modal | 45s | Sports choices; modal explains Focus personalization |
| Studio golden path | 2.5–3m | Messi preset flow → YT → BGM → 4 backgrounds → generate → transparency → toggle → export |
| Focus | 45–60s | Presets / intent → options → summary → Coming Soon → open Studio |
| Studio breadth | 20s | One **Coming Soon** example |
| Close | 20s | What production would add |

---

## Explicitly not in v1

- Real LLM in Focus or Studio
- Multiple output videos per resolver key (single demo mp4)
- Upload affecting render or server-side clip storage
- Real social posting integrations
- Magic link email auth (deferred past v1)
- Additional OAuth providers beyond Google unless added without slipping the golden path
- Evaluator-only bypass flows