import type { ReelConfig, RecipeViewModel } from "./reel-config";
import { manifestData } from "./preset-manifest";

export function resolveOutputVideo(config: ReelConfig) {
  const videoPath = manifestData.outputVideoPath;
  const recipe: RecipeViewModel = {
    subject: config.subject ?? "Lionel Messi",
    clips: config.clips ?? [],
    music: config.music ?? "",
    backgroundMusic: config.backgroundMusicId ?? "",
    backgroundPreset: config.backgroundPresetId ?? "",
    effects: [],
  };
  return { videoPath, recipe };
}
