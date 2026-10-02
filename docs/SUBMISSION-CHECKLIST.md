# Submission verification checklist

Aligned with [`.docs/project-spec-v1.md`](../.docs/project-spec-v1.md) §19 and init.md Phase 7.  
**Task 10 run:** 2026-10-02 on branch `feat/higgsfield-v1` (base `2984c12`).

## Automated verification (this task)

| Check | Status | Notes |
|-------|--------|-------|
| `npm test` | **PASS** | 16 tests, 5 files — Vitest run 2026-10-02 |
| `npm run build` | **PASS** | `prisma generate` + Next.js 16 production build succeeded |

## §19 functional checklist

| Item | Status | Notes |
|------|--------|-------|
| Live URL works while **logged out** (landing at minimum) | **BLOCKED** | No production deploy in this task; add Vercel URL after deploy (see [README](../README.md#deploy-on-vercel)). |
| Signup/login works | **BLOCKED** | Google OAuth + `AUTH_*` / DB env are operator-specific; `/login` and NextAuth route exist; not E2E-tested without your `.env.local`. |
| Onboarding works | **PASS** | `/onboarding`, `POST /api/onboarding`, Prisma `User.onboardingPreferences`; gated by `requireOnboardedUser()` on app routes. E2E needs configured auth. |
| Edit Maker / Highlight Reel works | **PASS** | `/create/highlight-reel` wizard (golden path steps); `preset-resolver` + step tests in suite. |
| Local upload works (per §11) | **PASS** | `validateUploadFile` + O5 rules covered in `tests/lib/upload-validation.test.ts` (4 tests); client-side only per spec. |
| Generated result works | **PASS** | Mock job + `/result/demo` + `ResultView`; `resolveOutputVideo` tested in `preset-resolver.test.ts`. |
| Export works | **PASS** | `ResultView` export control downloads preset demo asset (`components/result/result-view.tsx`). |
| Repository **public** | **BLOCKED** | Visibility not verified here (no `gh` / remote check in Task 10). Confirm on your host before submission. |
| **`.agent-logs/`** committed | **BLOCKED** | Folder exists but has **no** log files yet. Hooks are in [`.cursor/hooks/`](../.cursor/hooks/); run live canaries per [CAPTURE-TEST.md](../CAPTURE-TEST.md), then commit real entries (do not fabricate logs). |
| Walkthrough **under 5 minutes**, **camera on** | **BLOCKED** | Out of scope for code task; use script in project-spec §20. |

## Agent capture (submission artifact)

1. Trust this workspace in Cursor so project hooks run.
2. Send canary prompts from [CAPTURE-TEST.md](../CAPTURE-TEST.md) §4b in one or two Composer sessions.
3. Confirm new files under `.agent-logs/YYYY-MM-DD_*.md` with prompt + final response only.
4. Commit those files; optional state file `.agent-logs/.capture-state.json` is documented as safe to commit.

## Post-deploy smoke (operator)

After Vercel deploy and env vars are set:

1. Open production URL logged out → landing (`/`) loads.
2. **Continue with Google** on `/login` → onboarding → home modal → Studio golden path → result → export.
3. Quick Focus → Coming Soon → Studio handoff (see spec §20 timing).

Update the **BLOCKED** rows above to **PASS** with URLs and dates once verified.
