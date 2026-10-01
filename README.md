# 8x Assignment — Higgsfield v1

Next.js creative studio with Google auth, Supabase PostgreSQL, and a highlight-reel golden path.

## Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com/) project (PostgreSQL)
- A Google Cloud OAuth **Web application** client

## Environment

1. Copy the example env file:

   ```bash
   cp .env.example .env.local
   ```

2. Fill in every variable in `.env.local` (see sections below).

3. **After** env is set, apply the Prisma schema to your database (uses `DIRECT_URL`):

   ```bash
   npx prisma migrate dev --name init
   ```

   Do not run migrations until `DATABASE_URL`, `DIRECT_URL`, and related vars are configured.

## Supabase project

1. Create a project at [supabase.com/dashboard](https://supabase.com/dashboard).
2. Open **Project Settings → Database**.
3. Copy the **Connection pooler** URI (Transaction or Session mode per Supabase guidance for serverless) into `DATABASE_URL`.
4. Copy the **Direct connection** URI into `DIRECT_URL` (required for Prisma migrations).
5. From **Project Settings → API**, copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL` and **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

Prisma talks to Postgres via `DATABASE_URL` / `DIRECT_URL`. Supabase JS env vars are listed for future client use; v1 persistence goes through Prisma.

## Google OAuth

1. Open [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials).
2. Create an OAuth client ID of type **Web application**.
3. Add **Authorized redirect URI**:

   ```text
   {AUTH_URL}/api/auth/callback/google
   ```

   Example for local dev: `http://localhost:3000/api/auth/callback/google`

4. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env.local`.
5. Set `AUTH_URL` to your site origin (e.g. `http://localhost:3000` in development).
6. Generate `AUTH_SECRET` (e.g. `openssl rand -base64 32`).

Sign-in is **Google only** in v1 (no magic link).

## Scripts

```bash
npm run dev      # development server
npm test         # Vitest unit tests
npm run build    # prisma generate + production build
npm start        # run production build
```

## Auth flow

- `/login` — **Continue with Google**
- `/onboarding` — preference chips (stored as JSON on `User.onboardingPreferences`)
- `/home` — personalized home; one-time modal (`hasSeenHomeOnboardingModal`)
- Middleware requires a session for `/home`, `/studio`, `/focus`, and `/create/*`

If auth env vars are missing, `/login` shows setup instructions instead of crashing.

## Decisions

Engineering choices are locked in `.docs/decisions-v1.md`.
