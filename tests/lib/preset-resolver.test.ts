import { describe, it, expect } from "vitest";
import { resolveOutputVideo } from "@/lib/preset-resolver";

describe("resolveOutputVideo", () => {
  it("returns the single demo video path for any valid config", () => {
    const result = resolveOutputVideo({
      subject: "Lionel Messi",
      clips: ["goal", "celebration"],
      backgroundMusicId: "hype",
      backgroundPresetId: "bg-1",
    });
    expect(result.videoPath).toBe(
      "https://ik.imagekit.io/mkxhbldgi/Viva_la_vida_messi.mp4",
    );
    expect(result.recipe.subject).toBe("Lionel Messi");
  });
});
