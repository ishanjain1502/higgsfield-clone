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
  {
    id: "video-generation",
    title: "Video Generation",
    subtitle: "Text & image to motion",
    thumbnail: "/demo-assets/thumbs/bg-neon.svg",
  },
  {
    id: "image-generation",
    title: "Image Generation",
    subtitle: "Concept frames & stills",
    thumbnail: "/demo-assets/thumbs/bg-genjutsu.svg",
  },
  {
    id: "upscale",
    title: "Upscale",
    subtitle: "Sharper exports",
    thumbnail: "/demo-assets/thumbs/bg-studio.svg",
  },
  {
    id: "characters",
    title: "Characters",
    subtitle: "Consistent talent looks",
    thumbnail: "/demo-assets/thumbs/bg-cinematic.svg",
  },
  {
    id: "visual-effects",
    title: "Visual Effects",
    subtitle: "Genjutsu-style presets",
    thumbnail: "/demo-assets/thumbs/bg-genjutsu.svg",
  },
  {
    id: "templates",
    title: "Templates",
    subtitle: "Start from a layout",
    thumbnail: "/demo-assets/thumbs/bg-neon.svg",
  },
  {
    id: "lip-sync",
    title: "Lip Sync",
    subtitle: "Match audio to face",
    thumbnail: "/demo-assets/thumbs/bg-studio.svg",
  },
  {
    id: "product-shots",
    title: "Product Shots",
    subtitle: "Catalog-ready loops",
    thumbnail: "/demo-assets/thumbs/bg-cinematic.svg",
  },
  {
    id: "style-transfer",
    title: "Style Transfer",
    subtitle: "Apply a visual mood",
    thumbnail: "/demo-assets/thumbs/bg-neon.svg",
  },
  {
    id: "audio-enhance",
    title: "Audio Enhance",
    subtitle: "Clean dialogue & SFX",
    thumbnail: "/demo-assets/thumbs/bg-genjutsu.svg",
  },
  {
    id: "batch-export",
    title: "Batch Export",
    subtitle: "Multi-format delivery",
    thumbnail: "/demo-assets/thumbs/bg-studio.svg",
  },
];

export function partitionStudioCapabilities(capabilities = STUDIO_CAPABILITIES) {
  const count = decisions.O7.visibleCapabilityCount;
  const overflowLabel = decisions.O7.overflowLabel;

  return {
    visible: capabilities.slice(0, count),
    overflow: capabilities.slice(count),
    overflowLabel,
    visibleCount: count,
  };
}
