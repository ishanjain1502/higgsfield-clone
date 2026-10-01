"use client";

import { UploadClips } from "@/components/highlight-reel/upload-clips";
import { Button } from "@/components/ui/button";
import { manifestData } from "@/lib/preset-manifest";
import type { ReelConfig } from "@/lib/reel-config";

type ClipsStepProps = {
  config: ReelConfig;
  onUpdate: (patch: Partial<ReelConfig>) => void;
  onBack: () => void;
  onContinue: () => void;
};

export function ClipsStep({
  config,
  onUpdate,
  onBack,
  onContinue,
}: ClipsStepProps) {
  const selected = new Set(config.clips ?? []);

  function toggleClip(id: string) {
    const next = new Set(selected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    onUpdate({ clips: [...next] });
  }

  const canContinue = (config.clips?.length ?? 0) > 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Preset clips</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose Messi moments for the reel.
        </p>
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {manifestData.presetClips.map((clip) => {
          const checked = selected.has(clip.id);
          return (
            <li key={clip.id}>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-3 py-2.5 hover:bg-muted/40">
                <input
                  type="checkbox"
                  className="size-4 rounded border-input"
                  checked={checked}
                  onChange={() => toggleClip(clip.id)}
                />
                <span className="text-sm font-medium">{clip.label}</span>
              </label>
            </li>
          );
        })}
      </ul>
      <UploadClips
        uploads={config.uploads ?? []}
        onChange={(uploads) => onUpdate({ uploads })}
      />
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="button" disabled={!canContinue} onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}
