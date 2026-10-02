"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { manifestData } from "@/lib/preset-manifest";
import type { ReelConfig } from "@/lib/reel-config";

type BackgroundStepProps = {
  config: ReelConfig;
  onUpdate: (patch: Partial<ReelConfig>) => void;
  onBack: () => void;
  onContinue: () => void;
};

export function BackgroundStep({
  config,
  onUpdate,
  onBack,
  onContinue,
}: BackgroundStepProps) {
  const selected =
    config.backgroundPresetId ?? manifestData.goldenPathDefaultBackgroundId;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Visual background</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose one of four preset looks.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {manifestData.backgroundPresets.map((preset) => {
          const isSelected = selected === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              className={`text-left transition ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isSelected ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => onUpdate({ backgroundPresetId: preset.id })}
            >
              <Card size="sm" className="h-full overflow-hidden py-0">
                <CardHeader className="px-0 pt-0">
                  <Image
                    src={preset.thumbnailAssetPath}
                    alt=""
                    width={120}
                    height={160}
                    className="aspect-[3/4] w-full object-cover"
                  />
                </CardHeader>
                <CardContent className="pb-3">
                  <CardTitle className="text-sm">{preset.label}</CardTitle>
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          type="button"
          onClick={() => {
            if (!config.backgroundPresetId) {
              onUpdate({
                backgroundPresetId: manifestData.goldenPathDefaultBackgroundId,
              });
            }
            onContinue();
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
