import type { OnboardingPreferences } from "@/lib/onboarding-preferences";

/** Stable session id for JWT / server checks (no DB row). */
export const EVALUATOR_USER_ID = "evaluator";

/** Golden-walkthrough defaults from init.md Tightening. */
export const EVALUATOR_ONBOARDING_PREFERENCES: OnboardingPreferences = {
  createTypes: ["highlight-reels"],
  interests: ["sports"],
  contentVibes: ["hype"],
};

export function isEvaluatorAccessEnabled(): boolean {
  return (
    process.env.EVALUATOR_ACCESS_ENABLED === "true" &&
    Boolean(process.env.EVALUATOR_ACCESS_TOKEN?.trim()) &&
    Boolean(process.env.AUTH_SECRET?.trim())
  );
}

export function validateEvaluatorToken(token: string | undefined | null): boolean {
  if (!isEvaluatorAccessEnabled() || !token) return false;
  const expected = process.env.EVALUATOR_ACCESS_TOKEN!.trim();
  return token.trim() === expected;
}

export function isEvaluatorUserId(userId: string): boolean {
  return userId === EVALUATOR_USER_ID;
}
