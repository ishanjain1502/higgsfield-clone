# Engineering decisions v1

Copy this file to **`decisions-v1.md`** in the same directory and fill every `REQUIRED` field.  
Implementation plan **Task 0** is complete only when `.docs/decisions-v1.md` exists with no `REQUIRED` tokens left.

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
- **serviceRole:** `SUPABASE_SERVICE_ROLE_KEY` — REQUIRED `use` | `skip` for v1 (if `skip`, no server code uses service role)

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

- **fieldName:** REQUIRED (e.g. `hasSeenHomeOnboardingModal` boolean on User)

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
- **allowedMimeTypes:** REQUIRED (array, e.g. `["video/mp4", "video/webm"]`)
- **allowedCodecs:** REQUIRED (array for user-facing error copy, e.g. `["h264", "vp9"]`)
- **clientCodecCheck:** REQUIRED `yes` | `no` (if `no`, validate MIME/size only)

## O6 — Clip reorder

- **presetClipsReorderable:** REQUIRED `yes` | `no`
- **uploadsReorderable:** REQUIRED `yes` | `no`

## O7 — Studio grid cap

- **visibleCapabilityCount:** REQUIRED (integer, e.g. `8`)
- **overflowLabel:** `Explore more (preview)` (from Tightening)

## O8 — Background visual presets (4)

Fill exactly four entries:

| id | label (Higgsfield-aligned) | thumbnailAssetPath |
|----|----------------------------|--------------------|
| REQUIRED | REQUIRED | REQUIRED |
| REQUIRED | REQUIRED | REQUIRED |
| REQUIRED | REQUIRED | REQUIRED |
| REQUIRED | REQUIRED | REQUIRED |

- **goldenPathDefaultBackgroundId:** REQUIRED (one of the four ids)

## O9 — Messi preset clips

| id | label |
|----|-------|
| REQUIRED | e.g. Goal |
| REQUIRED | e.g. Assist |
| REQUIRED | e.g. Dribble |
| REQUIRED | e.g. Celebration |
| REQUIRED | e.g. Free kick |

- **clipPreviewAssetPaths:** REQUIRED per id or single shared placeholder path

## O10 — Extra wizard steps (§15–17 style/customization)

- **includeStyleCustomizationSteps:** REQUIRED `yes` | `no`  
  - Tightening golden path: **`no`** unless you explicitly expand scope

## O11 — Subjects beyond Messi

- **allowOtherSubjects:** REQUIRED `yes` | `no`  
  - Golden path always includes Messi preset substitution

## O12 — Generation job API

- **strategy:** REQUIRED `client-only` | `api-routes`  
  - Tightening allows `client-only` (timer + steps in browser)

If `api-routes`:

- **createRoute:** `/api/generations`
- **statusRoute:** `/api/generations/[id]`
- **persistJobs:** `yes` | `no`

## O13 — Focus → Studio handoff query params

List prefilled fields (use empty array if none):

- **prefillFields:** REQUIRED (e.g. `["interests", "createTypes"]` or `[]`)

## O14 — Focus rule-based intent

- **presetChips:** REQUIRED (string array, must include `Highlight reel`)
- **intentKeywordMap:** REQUIRED JSON map shortcut → partial ReelConfig patch

Example:

```json
{
  "sports highlight": { "createTypes": ["highlight-reels"], "interests": ["sports"] }
}
```

## O15 — Routes

- **highlightReelPath:** REQUIRED (e.g. `/create/highlight-reel`)
- **stepQueryParam:** REQUIRED (e.g. `step` with values `subject|clips|song|bgm|background|generate`)
- **resultPathPattern:** REQUIRED (e.g. `/result/demo`)

## O16 — BGM catalog

| id | label |
|----|-------|
| REQUIRED | e.g. Hype |
| REQUIRED | e.g. Cinematic |

- **scriptedYoutubeTrackId:** `remember-the-name` (maps to label **Remember the Name** after YT URL step)

## O17 — Demo output video (single file)

- **outputVideoPath:** REQUIRED (e.g. `/demo-assets/messi-highlight.mp4`)

## O18 — Mock transparency copy (Studio)

- **studioBannerText:** REQUIRED (short copy, non-modal)

## O19 — Mock transparency copy (Focus)

- **focusBannerText:** REQUIRED (short copy on Coming Soon)

## O20 — Wizard state persistence

- **reelConfigStorage:** REQUIRED `react-state-only` | `sessionStorage`
