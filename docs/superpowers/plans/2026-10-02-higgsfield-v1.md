# Higgsfield v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the v1 Next.js creative studio defined in `.docs/project-spec-v1.md` and `init.md` (Tightening Boundaries).

**Architecture:** Single Next.js App Router app with shadcn UI, NextAuth **Google** + Prisma on **Supabase PostgreSQL**, client-side `ReelConfig` wizard, preset manifest resolving to one demo MP4, Focus Mode ending at Coming Soon with Studio handoff.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, shadcn/ui (Radix), NextAuth (Google provider), Prisma + Supabase, Vitest for unit tests.

## Global Constraints

- v1 scope locked in `init.md` Tightening Boundaries; spec precedence in `.docs/project-spec-v1.md` §1
- NextAuth **Google** sign-in for v1; **magic link deferred** (see O4 in decisions template)
- One demo output video; selections do not change MP4 in v1
- Upload max **20 MB**; server does not store uploads
- Mock transparency: **short copy** after Studio generate; on Focus **Coming Soon**
- Unsupported studio features: **Coming Soon** globally
- No LLM; Focus is rule-based chips + keyword map from decisions
- `.agent-logs/` committed; public repo; walkthrough &lt; 5 min, camera on
- Do not implement until `.docs/decisions-v1.md` exists (Task 0)

---

## File structure (target)

```text
.docs/decisions-v1.md
demo-assets/                    # mp4 + thumbnails per decisions O8/O9/O17
public/demo-assets/             # served static copies if needed

app/
  layout.tsx
  page.tsx                      # landing
  login/page.tsx
  onboarding/page.tsx
  home/page.tsx
  studio/page.tsx
  focus/page.tsx
  create/highlight-reel/page.tsx
  result/demo/page.tsx          # or [jobId] per decisions O15
  api/auth/[...nextauth]/route.ts

components/
  shell/app-header.tsx
  studio/capability-grid.tsx
  studio/coming-soon-dialog.tsx
  highlight-reel/wizard-steps/*.tsx
  highlight-reel/upload-clips.tsx
  result/result-view.tsx
  focus/focus-flow.tsx
  ui/*                            # shadcn

lib/
  decisions.ts                  # read & validate decisions-v1.md JSON export OR typed constants file generated from decisions
  reel-config.ts
  preset-manifest.ts
  preset-resolver.ts
  upload-validation.ts
  mock-generation.ts
  focus-intent.ts
  auth.ts
  db.ts

prisma/ or drizzle/             # per decisions O1
tests/
  lib/preset-resolver.test.ts
  lib/upload-validation.test.ts
```

**Note:** Store decisions as `.docs/decisions-v1.json` (generated from markdown) or duplicate critical fields into `lib/decisions.ts` manually after Task 0 — implementer picks one approach and documents in README.

---

### Task 0: Decision gate

**Files:**
- Create: `.docs/decisions-v1.md` (from `.docs/decisions-v1.template.md`)
- Optional: `.docs/decisions-v1.json` (machine-readable copy)

**Interfaces:**
- Produces: frozen values for O1–O20 used by all following tasks

- [ ] **Step 1:** Copy template

```bash
cp .docs/decisions-v1.template.md .docs/decisions-v1.md
```

- [ ] **Step 2:** Fill every `REQUIRED` field; set O10 to `no` unless product explicitly expands scope; set O12 to `client-only` unless API persistence is required

- [ ] **Step 3:** Verify no placeholders remain

```bash
grep -n "REQUIRED" .docs/decisions-v1.md && exit 1 || echo "decisions complete"
```

Expected: `decisions complete`

- [ ] **Step 4:** Commit

```bash
git add .docs/decisions-v1.md
git commit -m "docs: lock v1 engineering decisions"
```

---

### Task 1: Next.js scaffold and design system

**Files:**
- Create: project root via `create-next-app`
- Create: `components.json`, shadcn components: `button`, `input`, `dialog`, `alert`, `tabs`, `card`, `progress`

**Interfaces:**
- Produces: runnable `npm run dev` on port 3000

- [ ] **Step 1:** Scaffold

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*" --use-npm --yes
```

- [ ] **Step 2:** Initialize shadcn

```bash
npx shadcn@latest init -y
npx shadcn@latest add button input dialog alert tabs card progress
```

- [ ] **Step 3:** Dark theme in `app/globals.css` and `app/layout.tsx` (`className="dark"` on html)

- [ ] **Step 4:** Add minimal `components/shell/app-header.tsx` with links to `/studio`, `/focus`, placeholder account

- [ ] **Step 5:** Commit

```bash
git add .
git commit -m "chore: next.js scaffold with shadcn dark shell"
```

---

### Task 2: ReelConfig, manifest, resolver

**Files:**
- Create: `lib/reel-config.ts`
- Create: `lib/preset-manifest.ts`
- Create: `lib/preset-resolver.ts`
- Test: `tests/lib/preset-resolver.test.ts`

**Interfaces:**
- Produces: `ReelConfig`, `resolveOutputVideo(config): { videoPath: string; recipe: RecipeViewModel }`

- [ ] **Step 1: Write the failing test**

```ts
// tests/lib/preset-resolver.test.ts
import { describe, it, expect } from "vitest";
import { resolveOutputVideo } from "@/lib/preset-resolver";

describe("resolveOutputVideo", () => {
  it("returns the single demo video path for any valid config", () => {
    const result = resolveOutputVideo({
      subject: "Lionel Messi",
      clips: ["goal", "celebration"],
      backgroundMusicId: "hype",
      backgroundPresetId: "bg-1",
    });
    expect(result.videoPath).toMatch(/messi-highlight\.mp4$/);
    expect(result.recipe.subject).toBe("Lionel Messi");
  });
});
```

- [ ] **Step 2:** Add Vitest

```bash
npm i -D vitest
```

Add to `package.json`:

```json
"scripts": { "test": "vitest run" }
```

Run: `npm test` — Expected: FAIL (module missing)

- [ ] **Step 3: Implement**

```ts
// lib/reel-config.ts
export type ReelConfig = {
  subject?: string;
  clips?: string[];
  music?: string;
  backgroundMusicId?: string;
  backgroundPresetId?: string;
  uploads?: { id: string; name: string }[];
};

export type RecipeViewModel = {
  subject: string;
  clips: string[];
  music: string;
  backgroundMusic: string;
  backgroundPreset: string;
  effects: string[];
};

// lib/preset-manifest.ts
import manifest from "@/../demo-assets/manifest.json";

export const manifestData = manifest;

// lib/preset-resolver.ts
import type { ReelConfig, RecipeViewModel } from "./reel-config";
import { manifestData } from "./preset-manifest";

export function resolveOutputVideo(config: ReelConfig) {
  const videoPath = manifestData.outputVideoPath;
  const recipe: RecipeViewModel = {
    subject: config.subject ?? "Lionel Messi",
    clips: config.clips ?? [],
    music: config.music ?? "",
    backgroundMusic: config.backgroundMusicId ?? "",
    backgroundPreset: config.backgroundPresetId ?? "",
    effects: [],
  };
  return { videoPath, recipe };
}
```

Create `demo-assets/manifest.json` using paths/ids from `.docs/decisions-v1.md` (O8, O9, O16, O17).

- [ ] **Step 4:** `npm test` — Expected: PASS

- [ ] **Step 5:** Commit

---

### Task 3: Upload validation

**Files:**
- Create: `lib/upload-validation.ts`
- Test: `tests/lib/upload-validation.test.ts`

**Interfaces:**
- Consumes: maxBytes, allowedMimeTypes from decisions
- Produces: `validateUploadFile(file: File): { ok: true } | { ok: false; message: string }`

- [ ] **Step 1: Failing test** (use decisions values in test fixtures)

```ts
import { validateUploadFile } from "@/lib/upload-validation";

it("rejects files over 20MB", () => {
  const file = new File([new Uint8Array(20971521)], "big.mp4", { type: "video/mp4" });
  const result = validateUploadFile(file);
  expect(result.ok).toBe(false);
});
```

- [ ] **Step 2–4:** Implement size + MIME check; error message lists supported types/codecs from decisions O5

- [ ] **Step 5:** Commit

---

### Task 4: Highlight Reel wizard (Studio golden path)

**Files:**
- Create: `app/create/highlight-reel/page.tsx`
- Create: `components/highlight-reel/wizard-steps/*.tsx`
- Create: `components/highlight-reel/upload-clips.tsx`
- Create: `lib/mock-generation.ts`

**Interfaces:**
- Consumes: `ReelConfig`, `resolveOutputVideo`, `validateUploadFile`
- Produces: navigable steps per decisions O15; navigates to result with config in sessionStorage if O20 says so

Implement steps in order:

1. Subject: free text → force Messi + `Alert` preset warning  
2. Clips: preset checkboxes + `upload-clips`  
3. Song: YT URL input → select Remember the Name + alert  
4. BGM catalog (O16)  
5. Background grid 4 cards (O8)  
6. Generate: `runMockGeneration(onStep)` then redirect to result  
7. On result route load: show transparency banner (O18)

`mock-generation.ts`:

```ts
export async function runMockGeneration(
  onStep: (label: string) => void,
  labels = [
    "Selected moments",
    "Arranged clips",
    "Added soundtrack",
    "Applied visual style",
    "Rendering final video",
  ],
) {
  for (const label of labels) {
    onStep(label);
    await new Promise((r) => setTimeout(r, 600));
  }
}
```

- [ ] Implement each step component; wire `?step=` query  
- [ ] Manual test golden path end-to-end in browser  
- [ ] Commit

---

### Task 5: Result screen, export, share

**Files:**
- Create: `components/result/result-view.tsx`
- Create: `app/result/demo/page.tsx` (adjust to decisions O15)

**Interfaces:**
- Produces: 9:16 video, Tabs Edit Recipe | Your Input, download link to `videoPath`, Share dialog with TikTok, Instagram, X, Facebook

- [ ] Export: `<a download>` or blob fetch to `public` video path  
- [ ] Share: Dialog only, no OAuth  
- [ ] Commit

---

### Task 6: Landing and logged-out home

**Files:**
- Modify: `app/page.tsx`

- [ ] Copy CTAs **Start Creating** → `/login`, optional **Explore**  
- [ ] Higgsfield-inspired hero (video/card placeholders)  
- [ ] Commit

---

### Task 7: Supabase, Prisma, Auth, onboarding, home modal

**Files:**
- Create: `prisma/schema.prisma`, `lib/db.ts` (Prisma client singleton for Next.js)
- Create: `lib/supabase/server.ts`, `lib/supabase/client.ts` (if decisions O1 uses Supabase client helpers)
- Create: `lib/auth.ts`, `app/api/auth/[...nextauth]/route.ts`
- Create: `app/login/page.tsx`, `app/onboarding/page.tsx`, `app/home/page.tsx`
- Env: `.env.example` listing `DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `AUTH_SECRET`, `AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`

**Interfaces:**
- Produces: session required for `/home`, `/studio`, `/focus`, `/create/*`; onboarding writes JSON to User via Prisma; modal flag per O3

- [ ] Create Supabase project; copy pooler + direct URLs into env (no SQLite)
- [ ] `npx prisma init`; set `provider = "postgresql"` and both URLs in `schema.prisma`
- [ ] Extend `User` model: `onboardingPreferences Json?`, `hasSeenHomeOnboardingModal Boolean @default(false)` (field names per `.docs/decisions-v1.md` O2/O3)
- [ ] `npx prisma migrate dev` against Supabase `DIRECT_URL`
- [ ] NextAuth with `PrismaAdapter` + `GoogleProvider` only (no Email provider in v1)
- [ ] Login page: primary button **Continue with Google**; no magic link UI in v1
- [ ] Google Cloud OAuth redirect: `{AUTH_URL}/api/auth/callback/google`
- [ ] Middleware: protect routes (define list in `middleware.ts`)
- [ ] Onboarding forms from init.md §6 options (subset allowed in decisions)
- [ ] Home modal one-time per O3
- [ ] Commit

---

### Task 8: Studio explore grid

**Files:**
- Create: `app/studio/page.tsx`, `components/studio/capability-grid.tsx`, `coming-soon-dialog.tsx`

- [ ] Show `visibleCapabilityCount` cards; Highlight Reel links to wizard; others open §26-style dialog  
- [ ] Overflow **Explore more (preview)**  
- [ ] Commit

---

### Task 9: Focus Mode

**Files:**
- Create: `app/focus/page.tsx`, `components/focus/focus-flow.tsx`, `lib/focus-intent.ts`

- [ ] Order presets with sports highlight first when onboarding matches O2  
- [ ] Chips from O14; keyword map patches partial config  
- [ ] Reuse `upload-clips.tsx`  
- [ ] Summary → Coming Soon + O19 banner + CTA to Studio with O13 query params  
- [ ] Commit

---

### Task 10: Submission verification

- [ ] Run checklist `.docs/project-spec-v1.md` §19  
- [ ] Confirm `.agent-logs/` present  
- [ ] Deploy; verify logged-out landing + Google sign-in + golden path  
- [ ] Commit any deploy docs in README

---

## Plan self-review

| Spec section | Task |
|--------------|------|
| Modes Studio/Focus | 4, 8, 9 |
| Golden path | 4 |
| ReelConfig / single video | 2, 4, 5 |
| Upload rules | 3, 4, 9 |
| Mock transparency | 4, 5, 9 |
| Result screen | 5 |
| Auth Google (NextAuth) | 7 |
| Onboarding + modal | 7 |
| Coming Soon | 8 |
| Landing | 6 |
| Open decisions | 0 |

**Placeholder scan:** No `TBD` in tasks; values come from `.docs/decisions-v1.md`.

**Gaps:** Responsive polish and animations (spec §30 Phase 6) — fold into Task 4–5 as time allows after Task 10 critical path.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-10-02-higgsfield-v1.md`.

**Prerequisite:** Complete Task 0 (`.docs/decisions-v1.md`).

**Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks  
2. **Inline Execution** — this session with executing-plans checkpoints  

**Which approach?**
