import { describe, expect, it } from "vitest";

import {
  STUDIO_CAPABILITIES,
  partitionStudioCapabilities,
} from "@/lib/studio-capabilities";

describe("partitionStudioCapabilities", () => {
  it("splits capabilities at O7 visibleCapabilityCount", () => {
    const { visible, overflow, visibleCount, overflowLabel } =
      partitionStudioCapabilities();

    expect(visibleCount).toBe(8);
    expect(visible).toHaveLength(STUDIO_CAPABILITIES.length);
    expect(overflow).toHaveLength(0);
    expect(overflowLabel).toBe("Explore more (preview)");
  });

  it("places Highlight Reel in the visible set with wizard href", () => {
    const { visible } = partitionStudioCapabilities();
    const highlightReel = visible.find((c) => c.id === "highlight-reel");

    expect(highlightReel?.href).toBe("/create/highlight-reel");
  });
});
