import { describe, expect, it } from "vitest";

import {
  buildStudioHandoffHref,
  getOrderedFocusEntryOptions,
  mergeFocusPatches,
  patchFromChipLabel,
  patchFromIntentText,
} from "@/lib/focus-intent";

describe("focus intent", () => {
  it("orders sports highlight first when personalized", () => {
    const ordered = getOrderedFocusEntryOptions(true);
    expect(ordered[0]?.label).toBe("Sports highlight");
    expect(ordered.some((o) => o.label === "Sports")).toBe(false);
  });

  it("uses O14 chip order when not personalized", () => {
    const ordered = getOrderedFocusEntryOptions(false);
    expect(ordered.map((o) => o.label)).toEqual([
      "Highlight reel",
      "Sports",
      "Hype edit",
    ]);
  });

  it("maps highlight reel chip to Messi preset clips", () => {
    expect(patchFromChipLabel("Highlight reel")).toEqual({
      subject: "Lionel Messi",
      clips: ["goal", "celebration"],
    });
  });

  it("matches longest keyword in typed intent", () => {
    expect(
      patchFromIntentText("I want a sports highlight for my team"),
    ).toEqual({
      createTypes: ["highlight-reels"],
      interests: ["sports"],
    });
  });

  it("builds studio handoff query from O13 prefill fields", () => {
    const href = buildStudioHandoffHref(
      { interests: ["sports"], createTypes: ["highlight-reels"] },
      null,
    );
    expect(href).toBe(
      "/studio?interests=sports&createTypes=highlight-reels",
    );
  });

  it("merges patches without mutating clip arrays unexpectedly", () => {
    const merged = mergeFocusPatches(
      { subject: "Lionel Messi", clips: ["goal"] },
      { clips: ["celebration"], backgroundMusicId: "hype" },
    );
    expect(merged).toEqual({
      subject: "Lionel Messi",
      clips: ["celebration"],
      backgroundMusicId: "hype",
    });
  });
});
