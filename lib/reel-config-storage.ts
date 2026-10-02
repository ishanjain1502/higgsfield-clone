import type { ReelConfig } from "./reel-config";

/** Session key for O20 wizard persistence (read by `/result/demo` in Task 5). */
export const REEL_CONFIG_STORAGE_KEY = "higgsfield.reelConfig";

export function loadReelConfig(): ReelConfig {
  if (typeof sessionStorage === "undefined") {
    return {};
  }
  try {
    const raw = sessionStorage.getItem(REEL_CONFIG_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    return JSON.parse(raw) as ReelConfig;
  } catch {
    return {};
  }
}

export function saveReelConfig(config: ReelConfig): void {
  if (typeof sessionStorage === "undefined") {
    return;
  }
  sessionStorage.setItem(REEL_CONFIG_STORAGE_KEY, JSON.stringify(config));
}
