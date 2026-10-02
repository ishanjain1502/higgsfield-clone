import decisions from "../.docs/decisions-v1.json";

import { HIGHLIGHT_REEL_PATH } from "./highlight-reel-steps";

export type StudioCapability = {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  /** When set, card navigates to the golden-path wizard. */
  href?: string;
};

export const STUDIO_CAPABILITIES: StudioCapability[] = [
  {
    id: "highlight-reel",
    title: "Highlight Reel",
    subtitle: "Edit Maker — sports & hype reels",
    thumbnail: "/demo-assets/thumbs/bg-cinematic.svg",
    href: HIGHLIGHT_REEL_PATH,
  },
];

export function partitionStudioCapabilities(capabilities = STUDIO_CAPABILITIES) {
  const count = decisions.O7.visibleCapabilityCount;
  const overflowLabel = decisions.O7.overflowLabel;

  return {
    visible: capabilities.slice(0, 1),
    overflow: capabilities.slice(count),
    overflowLabel,
    visibleCount: count,
  };
}
