export type ReelConfig = {
  subject?: string;
  clips?: string[];
  music?: string;
  backgroundMusicId?: string;
  backgroundPresetId?: string;
  uploads?: { id: string; name: string }[];
};

export type RecipeViewModel = {
  subject: string;
  clips: string[];
  music: string;
  backgroundMusic: string;
  backgroundPreset: string;
  effects: string[];
};
