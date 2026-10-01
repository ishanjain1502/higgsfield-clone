# Project specification — v1 (Next.js)

**Status:** Derived from [init.md](./init.md) only.  
**Audience:** Engineers implementing the frontend (and minimal supporting API/data).  
**Framework:** Next.js (per assignment technical direction in init.md §29).

---

## 1. Document precedence

When requirements conflict, apply this order:

1. **Tightening Boundaries Discussion** (end of init.md) — **wins**
2. **Refined Discussion** (init.md §1–31)
3. **Original Hypothesis** (top of init.md)

This spec restates v1 requirements and flags places where init.md still disagrees with itself after precedence.

---

## 2. Product goal (from init.md)

- **Not** a full clone of [Higgsfield](https://higgsfield.ai/).
- Build a **focused interpretation**: personalized onboarding, Studio vs Focus, **one complete workflow** (Highlight Reel / Edit Maker in Studio), mock generation with honest disclosure, polished UX within the time constraint.
- Product story (§31): reduce overwhelm; Studio = self-serve tools; Focus = guided creation; prove judgment via one vertical slice.

---

## 3. Global constraints (verbatim themes from init.md)

| Constraint | Source |
|------------|--------|
| v1 scope **locked**; change only by revising Tightening Boundaries | Tightening |
| **Next.js** application structure | §29 |
| **NextAuth** + **magic link** as primary auth (Tightening supersedes §5 “Continue with Google” preferred) | Tightening, §5 |
| Non-developer can use **deployed** app while logged out / signed in as appropriate | §5, Tightening |
| **No** production ML, GPU, cloud video pipeline, scraping footage | §27, Tightening |
| **No** real LLM in Focus or Studio | Tightening |
| **No** real social posting integrations | §25, Tightening |
| **No** evaluator-only bypass (demo mode, skip onboarding links) | Tightening |
| Uploads **not** stored server-side in v1 | Tightening |
| Avoid unnecessary infra (microservices, Kafka, Redis, worker clusters, etc.) | §29 |
| UI: dark, video-forward, Higgsfield-inspired; **not** pixel-perfect clone | Tightening, § UI direction |
| UI stack defaults: **Tailwind** + **shadcn/Radix**; minimal shell (logo, Studio / Focus, account) | Tightening |
| Unavailable capabilities: global **Coming Soon** (not gray-disabled broken UI) | Tightening, §26 |
| Repository: **public**; **`.agent-logs/`** committed; walkthrough **&lt; 5 min**, **camera on** | §30 Phase 7 |

---

## 4. Modes and responsibilities (v1)

| Mode | Responsibility | Walkthrough weight |
|------|----------------|-------------------|
| **Studio** | Only **complete** path: Highlight Reel → mock generate → mock transparency → result → export | **Primary** (~2.5–3 min) |
| **Focus** | Presets / typed intent (no LLM) → option suggestions → upload UI (shared utility) → read-only `ReelConfig` summary → **Coming Soon** + mock transparency → CTA to Studio | **Secondary** (~45–60 s) |
| **Studio grid (Explore)** | Higgsfield-inspired capability cards, **capped**; overflow **“Explore more (preview)”**; non-shipped features **Coming Soon** | Brief (~20 s) |

- Focus **does not** complete generation in v1.
- Focus upload uses the **same** client utility as Studio; same rules (UI only, no output change).

---

## 5. User journeys

### 5.1 Logged-out

**Landing** (`/`):

- Simplified Higgsfield-like landing (not every marketing section).
- Must communicate: what the product does, what users can create, output quality, usefulness, path into product (§4).
- Primary CTA copy: **Start Creating** (§4).
- Optional secondary CTA: **Explore** (§4).

### 5.2 Authentication

- Route: `/login` (indicative; Tightening Engineering surface).
- **Magic link** via NextAuth.
- First-time users: auth → **onboarding** → app.
- Onboarding preferences stored on **user record** (**database field**; schema not specified in init.md — see §12 Open decisions).

**Note:** §5 still mentions Google OAuth as preferred in the refined doc; **Tightening** locks magic link. OAuth only if added later **without** slipping golden path (Tightening “Explicitly not in v1”).

### 5.3 Onboarding

**Purpose** (§6): understand **what the user wants to create** — not arbitrary profile fields.

**Candidate question groups** (§6 — wording “Possible questions”; exact v1 questionnaire not locked):

| Group | Options listed in init.md |
|-------|---------------------------|
| What do you create? | Short-form videos, Social content, Ads, Images, Highlight reels |
| What are you interested in? | Sports, Entertainment, Fashion, Gaming, Events, Brands |
| What kind of content do you like? | Hype, Cinematic, Clean, Emotional, Experimental |

**v1 personalization rules** (Tightening — supersedes §6–7 home prioritization examples):

- Home **does not** require an obvious visual redesign from onboarding alone.
- **First visit to home after onboarding:** one-time **small modal** — choices will inform options (especially in Focus). Not on every visit; once per user until seen.
- **Ordering personalization applies to Focus only** (e.g. sports + highlight intent → **Sports highlight** or equivalent at **top** of Focus entry).
- Golden walkthrough example: **sports / highlight-oriented** onboarding choices (Tightening).

### 5.4 Home

- Route: `/home`.
- Simplified creative workspace (§7); avoid overwhelming capability list.
- §7 example UI (e.g. “Create a sports highlight” hero) is **not** required for v1 home layout (Tightening).
- Entry to Highlight Reel / Edit Maker (Studio) from home — exact CTA label **not** specified in Tightening (§7 suggests “Create Highlight” as example only).

### 5.5 Studio Explore

- Route: `/studio`.
- Broader capability set inspired by Higgsfield (§8): Video, Image, Upscale, Characters, Effects, Templates, etc.
- **Only** Highlight Reel / Edit Maker workflow is fully implemented (§8, §27).
- Others: **Coming Soon** or **Preview** (§26); click → explanation dialog with **Back to Studio** pattern (§26 example).
- Grid **capped**; additional items behind **Explore more (preview)** (Tightening). **Numeric cap not specified** in init.md (§12).

---

## 6. Studio — Highlight Reel golden path (v1 walkthrough)

Route (indicative): `/create/highlight-reel` **or** stepped flow with `?step=` (Tightening — implementer chooses one pattern).

**Ordered steps** (Tightening — this is the v1 Studio wizard minimum for submission demo):

| Step | Behavior |
|------|----------|
| 1. Celebrity / subject | User may type a name → resolves to **Lionel Messi** with **inline alert**: preset substitution for demo |
| 2. Clips | Select **preset Messi clips** (§13-style moment checkboxes; asset list **not** defined in init.md) |
| 2b. Upload (optional) | Same step or adjacent: local upload utility (§7 Local upload) |
| 3. Song | User may paste **YouTube URL** → auto-select track **"Remember the Name"** with same preset-substitution pattern as celebrity |
| 4. Background music | Catalog selection; **BGM = background music only** (separate from visual backgrounds) |
| 5. Background visual presets | **4** options, **Higgsfield-aligned naming / feel** (exact names **not** listed in init.md) |
| 6. Generate | **Generate Highlight** (§18); mock progress UI (§18 example checklist) |
| 7. Mock transparency | **Short copy**, inline/banner — **not** blocking modal (Tightening) |
| 8. Result | See §8 |
| 9. Export / Share | See §9 |

**Not on golden path** (Tightening):

- Default background preset for demo: **TBD** (document in manifest when chosen).
- Original-hypothesis effects (flames, frames, etc.): **optional / later**; not required for golden path.

**Conflict with §27 / §30 Phase 4:** Refined doc lists **style selection**, **basic customization** (§15–17), and Phase 4 steps 5–6 as in-scope. Tightening golden path **does not** include separate Style (§16) or Customization (§17) steps. **init.md does not state** whether extra wizard steps beyond the golden path must ship in v1. **Open decision** (§12).

**Conflict with §13 Step 1:** Refined doc shows search + popular subjects (Messi, LeBron, etc.). Tightening golden path specifies **type name → Messi** theater. Whether other subjects are selectable outside the walkthrough is **not** specified.

---

## 7. `ReelConfig` and output (v1)

### 7.1 Type (Tightening)

```ts
type ReelConfig = {
  subject?: string;
  clips?: string[];
  music?: string;
  backgroundMusicId?: string;
  backgroundPresetId?: string;
  uploads?: { id: string; name: string }[];
  // init.md: "extend as needed for recipe display"
};
```

§10 also defines a richer `ReelConfig` (effects, duration, aspectRatio, etc.) for Studio/Focus convergence. **v1 minimum** is the Tightening shape; additional fields are allowed for recipe display if init.md is extended — **not required** by Tightening.

### 7.2 Output behavior

- **One** prepared final **9:16 TikTok-style** video file for the Messi highlight demo.
- Changing BGM, background preset, clips, or uploads **does not** change the output file in v1.
- Selections update: UI, generation progress copy, **Edit Recipe**, **Your Input**.
- **Preset resolver v1:** valid config → **single demo asset** + populated recipe; manifest must define **fallbacks** so valid inputs do not error (Tightening).

### 7.3 Assets

- Directory: `demo-assets/` (Tightening).
- Minimum: **one** Messi highlight **mp4**.
- Manifest: clips, music, **4** backgrounds; golden-path default background **TBD**.

---

## 8. Result screen (non-negotiable)

- **Left:** 9:16 phone-frame preview, **looping**.
- **Right:** **Edit Recipe** panel.
- **Segmented control:** **Edit Recipe** | **Your Input** — toggling **does not** change video (§23, Tightening).
- **Export:** real download of prepared result file (§24, Tightening).

Layout details beyond 2-column + segmented control: “exact layout can be refined during implementation” (§21).

---

## 9. Share

On **Share** (§25):

- Modal or sheet: **Where would you like to share?**
- Options listed in init.md: **TikTok**, **Instagram**, **X**, **Facebook**.
- No real platform integration (§25, Tightening).
- Optional copy pattern: **Download to share** (§25).

---

## 10. Mock transparency

| Context | When | Format |
|---------|------|--------|
| **Studio** | After generation **completes** | Short copy; inline/banner; **not** blocking modal |
| **Focus** | **Coming Soon** step; also if disabled/stub **Generate** is shown | Same honesty pattern |

Message intent (paraphrase from Tightening): demo uses a prepared video; selections appear in recipe/input, not in rendered output in this build.

**Original hypothesis** described a **popup** at end of mock flow; Tightening chooses **short copy** instead for Studio.

---

## 11. Local upload (client-only)

| Rule | Requirement |
|------|-------------|
| Demo | Golden path uses preset Messi clips; upload **optional** |
| Output | **No** effect on final mp4 |
| UI | Show uploads in clip list / previews (§14) |
| Max size | **20 MB** per file |
| Invalid type / codec | Show **error** listing **supported** types and codecs |
| Persistence | **None**; refresh clears |
| Focus | Same utility as Studio |
| Server | **No** server-side clip storage (Tightening) |

**init.md does not define:**

- Supported MIME types
- Supported codecs
- Whether **reordering** uploads/clips is required (§14 mentions “select/order”; Tightening table does not mention order)

**§12 Open decisions.**

---

## 12. Open decisions (not specified in init.md — do not assume)

Resolve in init.md or a short addendum before implementation:

| ID | Topic |
|----|--------|
| O1 | Database technology and ORM (init.md says “Database” only, §29) |
| O2 | Schema for onboarding preferences (`database field` — shape, JSON vs columns) |
| O3 | Persistence for “has seen home onboarding modal” (behavior specified; storage field not named) |
| O4 | Magic link **email provider** and env configuration |
| O5 | Supported upload **MIME types** and **codecs** for error messages |
| O6 | Clip **reorder** requirement for uploads/preset clips |
| O7 | Studio grid **cap count** (capped — number not given) |
| O8 | Exact **four** background visual preset **names** and assets (Higgsfield-aligned — not enumerated) |
| O9 | Preset Messi **clip** labels and count (§13 example only) |
| O10 | Whether §15–17 **style/customization** wizard steps ship in v1 beyond golden path |
| O11 | Whether users can select subjects other than Messi outside golden path |
| O12 | `POST /api/generations` and job persistence (§29 suggests API routes; Tightening allows client timer — exact API contract not defined) |
| O13 | Focus → Studio handoff: which `ReelConfig` fields are **prefilled** (“where cheap” — not enumerated) |
| O14 | Focus “rule-based intent” — exact rules/chips copy not specified |
| O15 | Route canonical choice: `/create/highlight-reel` vs `?step=` vs Edit Maker naming |
| O16 | BGM catalog entries (besides scripted **Remember the Name** path) |

---

## 13. Focus Mode (v1)

Route: `/focus`.

**Flow** (Tightening):

```text
Focus entry (sports highlight first when onboarding matches)
  → Presets and/or typed intent (no real LLM)
  → Highlight reel preset always available
  → Suggested options (subject, clips, music, backgrounds, upload, …)
  → Read-only ReelConfig summary
  → Coming Soon + short mock transparency
  → CTA: Try Highlight Reel in Studio (handoff; prefill where cheap)
```

- **No** full generation in Focus.
- §10: Studio and Focus should produce the **same** `ReelConfig` shape in principle; v1 Focus stops before generate.

**Conflict:** §30 Phase 5 says “Transition into Edit Maker **generation**”. **Tightening** supersedes: Coming Soon + Studio CTA, no Focus generation.

**Conflict:** §9 describes ChatGPT-like conversational UI. v1: **no LLM**; rule-based / chips / scripted prompts only (Tightening).

---

## 14. Generation (mock)

- User confirms → **Generate Highlight** (§18).
- Show polished progress (§18 example steps).
- Underlying: lightweight job abstraction (§19) — **client timer + status steps acceptable** (Tightening).
- No real inference; completed job yields **preset / demo asset** (§19–20).

§29 lists API routes: `generations`, `generation status`. Tightening does not require server jobs. **Implementer choice** must be documented once O12 is resolved.

---

## 15. Next.js — application structure (spec level)

### 15.1 Routes (from Tightening; names indicative)

| Route | Screen |
|-------|--------|
| `/` | Landing |
| `/login` | Magic link auth |
| `/onboarding` | Onboarding questionnaire |
| `/home` | Post-auth home + one-time modal |
| `/studio` | Explore / capability grid |
| `/focus` | Focus Mode flow |
| `/create/highlight-reel` (or equivalent) | Studio Highlight Reel wizard |
| `/result/[jobId]` (or equivalent) | Result + export/share |

Auth middleware behavior (which routes require session) **not** specified in init.md.

### 15.2 Suggested monolith layout (descriptive only — not prescriptive file names)

```text
app/                    # Next.js App Router (assumed; init.md says "Next.js" only)
  (routes as above)
components/             # UI, shadcn-based
lib/
  reel-config.ts        # ReelConfig types + helpers
  preset-manifest.ts    # demo-assets manifest + resolver v1
  upload-validation.ts  # 20MB + types/codecs once O5 defined
  auth.ts               # NextAuth config
public/ or demo-assets/ # static video + manifest data
```

Init.md does not mandate App Router vs Pages Router — **open** unless team locks App Router as Next.js default choice in a decision record.

### 15.3 UI components (from Tightening)

- Dark-first theme, video card emphasis.
- Background preset picker: grid of loop thumbnails/cards + short labels.
- Preset substitution: **inline alert** on celebrity and Remember the Name steps.
- Divergence from defaults on high-visibility screens: **ask explicitly** (Tightening).

### 15.4 Studio / Focus shell

- Minimal chrome: logo, **Studio**, **Focus**, account.
- Do not replicate full Higgsfield marketing nav (Tightening).

---

## 16. Data and persistence

| Data | Storage (per init.md) |
|------|------------------------|
| User identity | NextAuth |
| Onboarding answers | User **database field** |
| Uploads | Browser-local only; not server |
| `ReelConfig` in progress | **Not specified** (sessionStorage vs URL vs server) — **O12 / implementer decision after open items** |
| Generation jobs | Not required server-side in v1 (Tightening) |

---

## 17. Explicitly not in v1 (Tightening)

- Real LLM
- Multiple output videos per config
- Upload affecting render or server-side clip storage
- Real social integrations
- OAuth beyond magic link unless added without slipping golden path
- Evaluator bypass flows

From §27 / §911 (still valid where Tightening silent):

- Production ML, GPU inference, real-time rendering, cloud video processing, scraping footage, full video editor, replicating every Higgsfield feature.

---

## 18. Build priority (Tightening)

1. `ReelConfig` + manifest + single output asset  
2. Studio Highlight Reel golden path + result + export  
3. Auth (magic link) + onboarding + DB field  
4. Focus path → Coming Soon + Studio handoff  
5. Polish: generation, result, golden path (**not** entire shell)

§30 phases 1–7 remain as **process guidance**; where Phase 4–5 disagree with Tightening, follow Tightening.

---

## 19. Submission verification checklist (from §30 Phase 7)

- [ ] Live URL works while **logged out** (landing at minimum)
- [ ] Signup/login works
- [ ] Onboarding works
- [ ] Edit Maker / Highlight Reel works
- [ ] Local upload works (per §11)
- [ ] Generated result works
- [ ] Export works
- [ ] Repository **public**
- [ ] **`.agent-logs/`** committed
- [ ] Walkthrough **under 5 minutes**, **camera on**

---

## 20. Walkthrough script (Tightening timing)

| Segment | ~Time | Content |
|---------|-------|---------|
| Intro | 30s | Interpretation, not clone; mock where labeled |
| Onboarding + home modal | 45s | Sports-oriented choices; modal → Focus personalization |
| Studio golden path | 2.5–3m | Messi → clips → YT → BGM → 4 backgrounds → generate → transparency → toggle → export |
| Focus | 45–60s | Presets/intent → options → summary → Coming Soon → Studio |
| Studio breadth | 20s | One **Coming Soon** example |
| Close | 20s | What production would add |

---

## 21. Internal conflicts register (init.md)

| Topic | Refined doc | Tightening / v1 |
|-------|-------------|-----------------|
| Auth | Google preferred (§5) | Magic link |
| Home personalization | Prioritize CTAs (§6–7) | No obvious home redesign; Focus-only ordering; one-time modal |
| Focus end state | Generation (§30 Phase 5) | Coming Soon; no generate |
| Focus UI | ChatGPT-like (§9) | No LLM; rule-based |
| Mock disclosure | Popup (original hypothesis) | Short copy banner |
| Studio wizard scope | Style + customization (§15–17, §27) | Golden path steps only; extras optional/later |
| Unsupported UI | “Coming soon” **or** “Preview” (§26) | **Coming Soon** globally |
| Generation API | API routes + DB (§29) | Client timer acceptable; uploads not server-side |

---

## 22. Related repository artifacts

- **init.md** — product source + v1 lock  
- **CAPTURE-TEST.md** — `.agent-logs/` capture via Cursor hooks (submission)  
- **`.cursor/hooks/`** — agent session logging (do not break for assignment)

---

## 23. Superpowers artifacts

| Artifact | Path |
|----------|------|
| Design doc | `docs/superpowers/specs/2026-10-02-higgsfield-v1-design.md` |
| Decision template | `.docs/decisions-v1.template.md` → fill as `.docs/decisions-v1.md` |
| Implementation plan | `docs/superpowers/plans/2026-10-02-higgsfield-v1.md` |

**Task 0** of the implementation plan is complete only when `.docs/decisions-v1.md` has no `REQUIRED` placeholders (resolves §12).

*Spec version: 1.1 — aligned to init.md including Tightening Boundaries Discussion.*
