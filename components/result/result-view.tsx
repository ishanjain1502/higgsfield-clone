"use client";

import { useMemo, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { manifestData } from "@/lib/preset-manifest";
import type { ReelConfig, RecipeViewModel } from "@/lib/reel-config";

const DEMO_EFFECTS = ["Glow", "Motion Blur"] as const;
const YOUTUBE_TRACK_LABEL = "Viva La Vida by Coldplay";
const DOWNLOAD_FILENAME = "messi-highlight.mp4";

const SHARE_PLATFORMS = [
  { id: "tiktok", label: "TikTok" },
  { id: "instagram", label: "Instagram" },
  { id: "x", label: "X" },
  { id: "facebook", label: "Facebook" },
] as const;

type ResultViewProps = {
  videoPath: string;
  recipe: RecipeViewModel;
  config: ReelConfig;
};

/** Browsers ignore `download` on cross-origin links, so ask ImageKit to send it as an attachment. */
function exportHref(videoPath: string): string {
  if (!/^https?:\/\//.test(videoPath)) {
    return videoPath;
  }
  const url = new URL(videoPath);
  if (url.hostname === "ik.imagekit.io") {
    url.searchParams.set("ik-attachment", "true");
  }
  return url.toString();
}

function clipLabel(id: string): string {
  return manifestData.presetClips.find((c) => c.id === id)?.label ?? id;
}

function bgmLabel(id: string): string {
  if (!id) {
    return "—";
  }
  return manifestData.bgmCatalog.find((b) => b.id === id)?.label ?? id;
}

function backgroundLabel(id: string): string {
  if (!id) {
    return "—";
  }
  return (
    manifestData.backgroundPresets.find((p) => p.id === id)?.label ?? id
  );
}

function songLabel(musicId: string): string {
  if (!musicId) {
    return "—";
  }
  if (musicId === manifestData.scriptedYoutubeTrackId) {
    return YOUTUBE_TRACK_LABEL;
  }
  return musicId;
}

function RecipeField({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="text-sm text-foreground">{value}</div>
    </div>
  );
}

export function ResultView({ videoPath, recipe, config }: ResultViewProps) {
  const [shareOpen, setShareOpen] = useState(false);

  const clipIds = config.clips ?? [];
  const selectedClipLabels = useMemo(
    () => clipIds.map((id) => clipLabel(id)),
    [clipIds],
  );

  const styleLabel = backgroundLabel(
    config.backgroundPresetId ?? recipe.backgroundPreset,
  );
  const catalogMusicLabel = bgmLabel(
    config.backgroundMusicId ?? recipe.backgroundMusic,
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-start">
      <div className="mx-auto w-full max-w-[340px] space-y-4">
        <div className="overflow-hidden rounded-xl border border-border bg-black shadow-lg">
          <video
            key={videoPath}
            className="aspect-[9/16] w-full object-cover"
            src={videoPath}
            controls
            playsInline
            preload="metadata"
            aria-label="Generated highlight preview"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={exportHref(videoPath)}
            download={DOWNLOAD_FILENAME}
            className={cn(
              buttonVariants(),
              "inline-flex flex-1 sm:flex-none",
            )}
          >
            Export
          </a>
          <Dialog open={shareOpen} onOpenChange={setShareOpen}>
            <DialogTrigger render={<Button variant="outline" className="flex-1 sm:flex-none" />}>
              Share
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share your highlight</DialogTitle>
                <DialogDescription>
                  Where would you like to share?
                </DialogDescription>
              </DialogHeader>
              <ul className="grid gap-2 py-2">
                {SHARE_PLATFORMS.map((platform) => (
                  <li key={platform.id}>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-center"
                      onClick={() => setShareOpen(false)}
                    >
                      {platform.label}
                    </Button>
                  </li>
                ))}
              </ul>
              <p className="text-center text-xs text-muted-foreground">
                Download to share — platform connections are not wired in this
                demo.
              </p>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="min-w-0 rounded-xl border border-border bg-card p-4 sm:p-6">
        <Tabs defaultValue="recipe">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="recipe">Edit Recipe</TabsTrigger>
            <TabsTrigger value="input">Your Input</TabsTrigger>
          </TabsList>
          <TabsContent value="recipe" className="mt-6 space-y-5">
            <RecipeField label="Subject" value={recipe.subject} />
            <RecipeField
              label="Clips"
              value={
                recipe.clips.length > 0
                  ? `${recipe.clips.length} selected`
                  : "None selected"
              }
            />
            <RecipeField label="Music" value={catalogMusicLabel} />
            <RecipeField label="Style" value={styleLabel} />
            <RecipeField
              label="Effects"
              value={DEMO_EFFECTS.join(" + ")}
            />
          </TabsContent>
          <TabsContent value="input" className="mt-6 space-y-5">
            <RecipeField
              label="Subject"
              value={config.subject ?? recipe.subject}
            />
            <RecipeField
              label="Clips"
              value={
                selectedClipLabels.length > 0 ? (
                  <ul className="space-y-1">
                    {selectedClipLabels.map((label) => (
                      <li key={label} className="flex items-center gap-2">
                        <span aria-hidden className="text-primary">
                          ✓
                        </span>
                        {label}
                      </li>
                    ))}
                  </ul>
                ) : (
                  "None selected"
                )
              }
            />
            <RecipeField label="Style" value={styleLabel} />
            <RecipeField
              label="Music"
              value={songLabel(config.music ?? recipe.music)}
            />
            <RecipeField
              label="Effects"
              value={
                <ul className="space-y-1">
                  {DEMO_EFFECTS.map((effect) => (
                    <li key={effect}>{effect}</li>
                  ))}
                </ul>
              }
            />
            {(config.uploads?.length ?? 0) > 0 ? (
              <RecipeField
                label="Uploads"
                value={
                  <ul className="space-y-1">
                    {config.uploads!.map((u) => (
                      <li key={u.id}>{u.name}</li>
                    ))}
                  </ul>
                }
              />
            ) : null}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
