export const ONBOARDING_CREATE_TYPES = [
  { value: "short-form-videos", label: "Short-form videos" },
  { value: "social-content", label: "Social content" },
  { value: "ads", label: "Ads" },
  { value: "images", label: "Images" },
  { value: "highlight-reels", label: "Highlight reels" },
] as const;

export const ONBOARDING_INTERESTS = [
  { value: "sports", label: "Sports" },
  { value: "entertainment", label: "Entertainment" },
  { value: "fashion", label: "Fashion" },
  { value: "gaming", label: "Gaming" },
  { value: "events", label: "Events" },
  { value: "brands", label: "Brands" },
] as const;

export const ONBOARDING_CONTENT_VIBES = [
  { value: "hype", label: "Hype" },
  { value: "cinematic", label: "Cinematic" },
  { value: "clean", label: "Clean" },
  { value: "emotional", label: "Emotional" },
  { value: "experimental", label: "Experimental" },
] as const;

export type OnboardingPreferences = {
  createTypes: string[];
  interests: string[];
  contentVibes: string[];
};

export function parseOnboardingPreferences(
  value: unknown,
): OnboardingPreferences | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  if (
    !Array.isArray(record.createTypes) ||
    !Array.isArray(record.interests) ||
    !Array.isArray(record.contentVibes)
  ) {
    return null;
  }
  return {
    createTypes: record.createTypes.filter((v) => typeof v === "string"),
    interests: record.interests.filter((v) => typeof v === "string"),
    contentVibes: record.contentVibes.filter((v) => typeof v === "string"),
  };
}

export function isValidOnboardingPreferences(
  prefs: OnboardingPreferences,
): boolean {
  const allowedCreate = new Set(
    ONBOARDING_CREATE_TYPES.map((o) => o.value),
  );
  const allowedInterests = new Set(ONBOARDING_INTERESTS.map((o) => o.value));
  const allowedVibes = new Set(ONBOARDING_CONTENT_VIBES.map((o) => o.value));

  return (
    prefs.createTypes.length > 0 &&
    prefs.interests.length > 0 &&
    prefs.contentVibes.length > 0 &&
    prefs.createTypes.every((v) => allowedCreate.has(v as never)) &&
    prefs.interests.every((v) => allowedInterests.has(v as never)) &&
    prefs.contentVibes.every((v) => allowedVibes.has(v as never))
  );
}

export function recommendsSportsHighlight(
  prefs: OnboardingPreferences | null,
): boolean {
  if (!prefs) return false;
  return (
    prefs.interests.includes("sports") &&
    prefs.createTypes.includes("highlight-reels")
  );
}
