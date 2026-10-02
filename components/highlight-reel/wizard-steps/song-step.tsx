"use client";

import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { manifestData } from "@/lib/preset-manifest";
import type { ReelConfig } from "@/lib/reel-config";

const TRACK_LABEL = "Viva La Vida by Coldplay";

type SongStepProps = {
  config: ReelConfig;
  onUpdate: (patch: Partial<ReelConfig>) => void;
  onBack: () => void;
  onContinue: () => void;
};

export function SongStep({
  config,
  onUpdate,
  onBack,
  onContinue,
}: SongStepProps) {
  const [url, setUrl] = useState("");
  const [showPresetAlert, setShowPresetAlert] = useState(false);

  function applyYoutubePreset() {
    if (!url.trim()) {
      return;
    }
    setShowPresetAlert(true);
    onUpdate({
      music: manifestData.scriptedYoutubeTrackId,
    });
  }

  function handleContinue() {
    if (!config.music) {
      onUpdate({ music: manifestData.scriptedYoutubeTrackId });
      if (url.trim()) {
        setShowPresetAlert(true);
      }
    }
    onContinue();
  }

  const trackSelected =
    config.music === manifestData.scriptedYoutubeTrackId || showPresetAlert;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Song from YouTube</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Paste a link — the demo maps it to a preset track.
        </p>
      </div>
      <Input
        placeholder="https://www.youtube.com/watch?v=..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onBlur={() => {
          if (url.trim()) {
            applyYoutubePreset();
          }
        }}
      />
      {trackSelected ? (
        <Alert>
          <AlertTitle>Preset substitution</AlertTitle>
          <AlertDescription>
            Demo mode: your YouTube link selects &quot;{TRACK_LABEL}&quot; for
            this walkthrough.
          </AlertDescription>
        </Alert>
      ) : null}
      {config.music ? (
        <p className="text-sm text-muted-foreground">
          Selected track: {TRACK_LABEL}
        </p>
      ) : null}
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}
