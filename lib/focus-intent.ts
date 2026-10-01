import decisions from "../.docs/decisions-v1.json";

import type { ReelConfig } from "./reel-config";

export type FocusHandoffFields = {
  interests?: string[];
  createTypes?: string[];
};

export type FocusIntentPatch = Partial<ReelConfig> & FocusHandoffFields;

const SPORTS_HIGHLIGHT_PRESET = {
  id: "sports-highlight",
  label: "Sports highlight",
  intentKey: "sports highlight",
} as const;

const CHIP_INTENT_KEYS: Record<string, string | null> = {
  "Highlight reel": "highlight reel",
  Sports: "sports highlight",
  "Hype edit": null,
};

export function getPresetChips(): string[] {
  return [...decisions.O14.presetChips];
}

export function getFocusBannerText(): string {
  return decisions.O19.focusBannerText;
}

export function getStudioPrefillFields(): string[] {
  return [...decisions.O13.prefillFields];
}

export function getOrderedFocusEntryOptions(
  prioritizeSportsHighlight: boolean,
): { id: string; label: string }[] {
  const chips = getPresetChips().map((label) => ({
    id: `chip-${label.toLowerCase().replace(/\s+/g, "-")}`,
    label,
  }));

  if (!prioritizeSportsHighlight) {
    return chips;
  }

  const withoutSportsChip = chips.filter((c) => c.label !== "Sports");
  return [
    { id: SPORTS_HIGHLIGHT_PRESET.id, label: SPORTS_HIGHLIGHT_PRESET.label },
    ...withoutSportsChip,
  ];
}

function patchFromKeywordMapKey(key: string): FocusIntentPatch {
  const map = decisions.O14.intentKeywordMap as Record<
    string,
    FocusIntentPatch
  >;
  return { ...(map[key] ?? {}) };
}

export function patchFromChipLabel(chipLabel: string): FocusIntentPatch {
  if (chipLabel === "Hype edit") {
    return { backgroundMusicId: "hype" };
  }
  const intentKey = CHIP_INTENT_KEYS[chipLabel];
  if (!intentKey) {
    return {};
  }
  return patchFromKeywordMapKey(intentKey);
}

export function patchFromIntentText(text: string): FocusIntentPatch {
  const normalized = text.trim().toLowerCase();
  if (!normalized) {
    return {};
  }

  const keys = Object.keys(decisions.O14.intentKeywordMap).sort(
    (a, b) => b.length - a.length,
  );

  for (const key of keys) {
    if (normalized.includes(key)) {
      return patchFromKeywordMapKey(key);
    }
  }

  if (normalized.includes("hype")) {
    return { backgroundMusicId: "hype" };
  }

  return {};
}

export function patchFromEntryOption(option: {
  id: string;
  label: string;
}): FocusIntentPatch {
  if (option.id === SPORTS_HIGHLIGHT_PRESET.id) {
    return patchFromKeywordMapKey(SPORTS_HIGHLIGHT_PRESET.intentKey);
  }
  return patchFromChipLabel(option.label);
}

export function mergeFocusPatches(
  ...patches: FocusIntentPatch[]
): FocusIntentPatch {
  const merged: FocusIntentPatch = {};
  for (const patch of patches) {
    Object.assign(merged, patch);
    if (patch.clips) {
      merged.clips = [...patch.clips];
    }
    if (patch.uploads) {
      merged.uploads = [...patch.uploads];
    }
    if (patch.interests) {
      merged.interests = [...patch.interests];
    }
    if (patch.createTypes) {
      merged.createTypes = [...patch.createTypes];
    }
  }
  return merged;
}

export function reelConfigFromFocus(
  patch: FocusIntentPatch,
  config: ReelConfig,
): ReelConfig {
  const { interests: _i, createTypes: _c, ...reelFields } = patch;
  return { ...config, ...reelFields };
}

export function buildStudioHandoffHref(
  handoff: FocusHandoffFields,
  onboarding?: FocusHandoffFields | null,
): string {
  const params = new URLSearchParams();
  const fields = getStudioPrefillFields();

  for (const field of fields) {
    if (field === "interests") {
      const values =
        handoff.interests ?? onboarding?.interests ?? [];
      if (values.length > 0) {
        params.set("interests", values.join(","));
      }
    }
    if (field === "createTypes") {
      const values =
        handoff.createTypes ?? onboarding?.createTypes ?? [];
      if (values.length > 0) {
        params.set("createTypes", values.join(","));
      }
    }
  }

  const query = params.toString();
  return query ? `/studio?${query}` : "/studio";
}

export function handoffFieldsFromPatch(
  patch: FocusIntentPatch,
  onboarding?: FocusHandoffFields | null,
): FocusHandoffFields {
  return {
    interests: patch.interests ?? onboarding?.interests,
    createTypes: patch.createTypes ?? onboarding?.createTypes,
  };
}
