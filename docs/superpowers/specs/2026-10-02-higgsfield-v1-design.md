# Higgsfield v1 — design document

**Date:** 2026-10-02  
**Status:** Approved product lock in `init.md` (Tightening Boundaries); engineering details pending `.docs/decisions-v1.md`  
**Requirements source:** [`.docs/init.md`](../../.docs/init.md), [`.docs/project-spec-v1.md`](../../.docs/project-spec-v1.md)

---

## Summary

Build a **Next.js** creative-studio interpretation of Higgsfield: landing, magic-link auth, onboarding (DB-backed), home with one-time modal, Studio explore grid (Coming Soon pattern), **Studio Highlight Reel** as the only complete workflow (single demo output video), **Focus Mode** as guided UI ending in Coming Soon + Studio handoff, mock generation with post-generate transparency, result screen with Edit Recipe / Your Input, export and share UI.

---

## Architecture

- **Monolith Next.js** app (App Router chosen at implementation time in decisions file).
- **Client-heavy** creation flow: `ReelConfig` in React state (and optional sessionStorage for wizard continuity — see decisions).
- **Preset resolver v1** always returns one bundled demo MP4; selections drive recipe UI only.
- **Uploads** validated and previewed in-browser only; never sent to server.
- **Data:** **Supabase** (PostgreSQL). **Prisma** + `@auth/prisma-adapter` for NextAuth tables and user onboarding fields (`DATABASE_URL` pooler + `DIRECT_URL` for migrations). No SQLite.
- **Auth:** NextAuth **Google** sign-in (`Continue with Google`); magic link **deferred**. User row stores onboarding JSON + home modal flag.
- **No LLM**, no real generation, no social APIs.

---

## Subsystems

| Subsystem | Delivers |
|-----------|----------|
| **Decision gate** | `.docs/decisions-v1.md` resolves project-spec §12 |
| **Foundation** | Next.js, Tailwind, shadcn, theme, app shell |
| **Domain lib** | `ReelConfig`, manifest, resolver, upload validation, mock generation |
| **Studio wizard** | Golden path steps per Tightening |
| **Result** | 9:16 preview, recipe toggle, export, share sheet |
| **Auth & onboarding** | NextAuth + DB |
| **Focus** | Presets, intent chips, summary, Coming Soon, Studio link |
| **Studio explore** | Capped grid + Coming Soon dialogs |
| **Deploy & submission** | Live URL, checklist §30 Phase 7 |

---

## Spec self-review

| Check | Result |
|-------|--------|
| Placeholders in product behavior | None in init.md Tightening; §12 open items delegated to decisions file |
| Contradictions | Documented in project-spec §21; implementation follows Tightening |
| Scope | v1 golden path excludes §15–17 unless decisions O10 = yes |
| Testability | Lib modules unit-tested; flows verified via submission checklist |

---

## Next step

1. Complete [`.docs/decisions-v1.template.md`](../../.docs/decisions-v1.template.md) → save as `.docs/decisions-v1.md`
2. Execute [implementation plan](../plans/2026-10-02-higgsfield-v1.md) (Task 0 = decisions file must exist)

**User review:** Confirm `.docs/project-spec-v1.md` + this design before implementation Task 1+.
