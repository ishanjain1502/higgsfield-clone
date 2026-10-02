import { isEvaluatorAccessEnabled } from "@/lib/evaluator";

const AUTH_ENV_KEYS = [
  "DATABASE_URL",
  "AUTH_SECRET",
  "AUTH_URL",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
] as const;

export type AuthEnvKey = (typeof AUTH_ENV_KEYS)[number];

export function getMissingAuthEnvKeys(): AuthEnvKey[] {
  return AUTH_ENV_KEYS.filter((key) => !process.env[key]?.trim());
}

export function isAuthConfigured(): boolean {
  return getMissingAuthEnvKeys().length === 0;
}

/** Flip to true when Google OAuth should be offered on the login page. */
export function isGoogleSignInEnabled(): boolean {
  return false;
}

export function isSignInAvailable(): boolean {
  return isAuthConfigured() || isEvaluatorAccessEnabled();
}

export function authEnvHelpMessage(): string {
  const missing = getMissingAuthEnvKeys();
  if (missing.length === 0) return "";
  return `Copy .env.example to .env.local and set: ${missing.join(", ")}. Then run npx prisma migrate dev against your Supabase DIRECT_URL.`;
}
