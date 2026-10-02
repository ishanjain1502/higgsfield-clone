# Engineering decisions v1

Frozen engineering decisions for Higgsfield v1 (Task 0). Source template: `decisions-v1.template.md`.

---

## O1 — Database (locked: Supabase + Next.js)

Do **not** use SQLite. Use **Supabase** (managed PostgreSQL) with Next.js.

- **provider:** `supabase`
- **database:** `postgresql` (Supabase-hosted)
- **orm:** `prisma` with `@auth/prisma-adapter` for NextAuth `User` / `Session` / `Account` / `VerificationToken` tables
- **supabaseClient:** `@supabase/supabase-js` + `@supabase/ssr` when server/client needs Supabase APIs beyond Prisma (optional for v1 if all data goes through Prisma)
- **connectionEnvVars:**
  - `DATABASE_URL` — Supabase **connection pooler** URI (use mode recommended in Supabase dashboard for serverless/Next.js)
  - `DIRECT_URL` — Supabase **direct** Postgres URI (Prisma migrations only)
- **supabaseProjectEnvVars:**
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **serviceRole:** `skip` — no server code uses service role in v1

**Reference:** [Supabase + Next.js](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs), [Prisma with Supabase](https://supabase.com/docs/guides/database/prisma)

## O2 — Onboarding preferences schema

- **storage:** `user.onboardingPreferences` JSON column (recommended shape below)
- **jsonShape:**

```json
{
  "createTypes": ["highlight-reels"],
  "interests": ["sports"],
  "contentVibes": ["hype"]
}
```

- **allowedValues:** use labels from init.md §6 (document any subset you implement)

## O3 — Home modal seen flag

- **fieldName:** `hasSeenHomeOnboardingModal`

## O4 — Authentication (locked: Google first; magic link deferred)

- **framework:** `next-auth` (Auth.js) with `PrismaAdapter`
- **primaryProvider:** `google` — NextAuth `GoogleProvider`; login CTA copy: **Continue with Google** (init.md §5)
- **magicLink:** `deferred` — do **not** implement Email magic link in v1
- **envVars:**
  - `AUTH_SECRET`
  - `AUTH_URL` — full site URL in production (callback base)
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
- **googleCloudConsole:** OAuth client type **Web application**; authorized redirect URI must include `{AUTH_URL}/api/auth/callback/google`

## O5 — Upload validation

- **maxBytes:** `20971520` (20 MB — fixed by spec)
- **allowedMimeTypes:** `["video/mp4", "video/webm"]`
- **allowedCodecs:** `["h264", "vp9"]`
- **clientCodecCheck:** `no`

## O6 — Clip reorder

- **presetClipsReorderable:** `no`
- **uploadsReorderable:** `no`

## O7 — Studio grid cap

- **visibleCapabilityCount:** `8`
- **overflowLabel:** `Explore more (preview)` (from Tightening)

## O8 — Background visual presets (4)

Fill exactly four entries:

| id | label (Higgsfield-aligned) | thumbnailAssetPath |
|----|----------------------------|--------------------|
| `bg-genjutsu` | Genjutsu | `/demo-assets/thumbs/bg-genjutsu.svg` |
| `bg-neon` | Neon | `/demo-assets/thumbs/bg-neon.svg` |
| `bg-cinematic` | Cinematic | `/demo-assets/thumbs/bg-cinematic.svg` |
| `bg-studio` | Studio | `/demo-assets/thumbs/bg-studio.svg` |

- **goldenPathDefaultBackgroundId:** `bg-genjutsu`

## O9 — Messi preset clips

| id | label |
|----|-------|
| `goal` | Goal |
| `assist` | Assist |
| `dribble` | Dribble |
| `celebration` | Celebration |
| `free-kick` | Free kick |

- **clipPreviewAssetPaths:** `/demo-assets/thumbs/clip-placeholder.svg` (shared placeholder for all clip ids)

## O10 — Extra wizard steps (§15–17 style/customization)

- **includeStyleCustomizationSteps:** `no`  
  - Tightening golden path: **`no`** unless you explicitly expand scope

## O11 — Subjects beyond Messi

- **allowOtherSubjects:** `no`  
  - Golden path always includes Messi preset substitution

## O12 — Generation job API

- **strategy:** `client-only`  
  - Tightening allows `client-only` (timer + steps in browser)

If `api-routes`:

- **createRoute:** `/api/generations`
- **statusRoute:** `/api/generations/[id]`
- **persistJobs:** `yes` | `no`

## O13 — Focus → Studio handoff query params

List prefilled fields (use empty array if none):

- **prefillFields:** `["interests", "createTypes"]`

## O14 — Focus rule-based intent

- **presetChips:** `["Highlight reel", "Sports", "Hype edit"]`
- **intentKeywordMap:**

```json
{
  "sports highlight": { "createTypes": ["highlight-reels"], "interests": ["sports"] },
  "highlight reel": { "subject": "Lionel Messi", "clips": ["goal", "celebration"] }
}
```

## O15 — Routes

- **highlightReelPath:** `/create/highlight-reel`
- **stepQueryParam:** `step` with values `subject|clips|song|bgm|background|generate`
- **resultPathPattern:** `/result/demo`

## O16 — BGM catalog

| id | label |
|----|-------|
| `hype` | Hype |
| `cinematic` | Cinematic |

- **scriptedYoutubeTrackId:** `remember-the-name` (maps to label **Remember the Name** after YT URL step)

## O17 — Demo output video (single file)

- **outputVideoPath:** `https://ik.imagekit.io/mkxhbldgi/Viva_la_vida_messi.mp4` (ImageKit CDN; Export appends `?ik-attachment=true` to force a download)

## O18 — Mock transparency copy (Studio)

- **studioBannerText:** Demo mode: one prepared highlight video plays for every generate run; your clip, song, and background choices appear in the recipe and input summary only.

## O19 — Mock transparency copy (Focus)

- **focusBannerText:** Coming soon — Focus generation is mocked; use chips or type an intent to jump into Studio with prefilled settings.

## O20 — Wizard state persistence

- **reelConfigStorage:** `sessionStorage`

