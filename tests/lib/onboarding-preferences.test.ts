import { describe, expect, it } from "vitest";

import {
  isValidOnboardingPreferences,
  parseOnboardingPreferences,
  recommendsSportsHighlight,
} from "@/lib/onboarding-preferences";

describe("onboarding preferences", () => {
  it("parses stored JSON shape", () => {
    const parsed = parseOnboardingPreferences({
      createTypes: ["highlight-reels"],
      interests: ["sports"],
      contentVibes: ["hype"],
    });
    expect(parsed).toEqual({
      createTypes: ["highlight-reels"],
      interests: ["sports"],
      contentVibes: ["hype"],
    });
  });

  it("validates allowed values and non-empty selections", () => {
    expect(
      isValidOnboardingPreferences({
        createTypes: ["highlight-reels"],
        interests: ["sports"],
        contentVibes: ["hype"],
      }),
    ).toBe(true);
    expect(
      isValidOnboardingPreferences({
        createTypes: [],
        interests: ["sports"],
        contentVibes: ["hype"],
      }),
    ).toBe(false);
  });

  it("detects sports highlight recommendation", () => {
    expect(
      recommendsSportsHighlight({
        createTypes: ["highlight-reels"],
        interests: ["sports"],
        contentVibes: ["cinematic"],
      }),
    ).toBe(true);
    expect(
      recommendsSportsHighlight({
        createTypes: ["images"],
        interests: ["sports"],
        contentVibes: ["hype"],
      }),
    ).toBe(false);
  });
});
