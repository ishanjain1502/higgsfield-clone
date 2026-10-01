"use client";

import { Button } from "@/components/ui/button";
import { manifestData } from "@/lib/preset-manifest";
import type { ReelConfig } from "@/lib/reel-config";

type BgmStepProps = {
  config: ReelConfig;
  onUpdate: (patch: Partial<ReelConfig>) => void;
  onBack: () => void;
  onContinue: () => void;
};

export function BgmStep({
  config,
  onUpdate,
  onBack,
  onContinue,
}: BgmStepProps) {
  const selected = config.backgroundMusicId ?? "";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Background music</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick a catalog bed (separate from the YouTube song step).
        </p>
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {manifestData.bgmCatalog.map((item) => (
          <li key={item.id}>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-3 py-2.5 hover:bg-muted/40 has-checked:border-primary has-checked:bg-primary/5">
              <input
                type="radio"
                name="bgm"
                className="size-4"
                checked={selected === item.id}
                onChange={() => onUpdate({ backgroundMusicId: item.id })}
              />
              <span className="text-sm font-medium">{item.label}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          type="button"
          disabled={!selected}
          onClick={onContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
