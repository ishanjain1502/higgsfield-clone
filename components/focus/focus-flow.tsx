"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { UploadClips } from "@/components/highlight-reel/upload-clips";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  buildStudioHandoffHref,
  getFocusBannerText,
  getOrderedFocusEntryOptions,
  handoffFieldsFromPatch,
  mergeFocusPatches,
  patchFromEntryOption,
  patchFromIntentText,
  reelConfigFromFocus,
  type FocusIntentPatch,
} from "@/lib/focus-intent";
import type { OnboardingPreferences } from "@/lib/onboarding-preferences";
import { manifestData } from "@/lib/preset-manifest";
import type { ReelConfig } from "@/lib/reel-config";
import { saveReelConfig } from "@/lib/reel-config-storage";

const MESSI_SUBJECT = "Lionel Messi";

type FocusPhase = "entry" | "build" | "summary" | "coming-soon";

type FocusFlowProps = {
  prioritizeSportsHighlight: boolean;
  onboardingPreferences: OnboardingPreferences;
};

function clipLabels(config: ReelConfig): string {
  const ids = new Set(config.clips ?? []);
  const labels = manifestData.presetClips
    .filter((c) => ids.has(c.id))
    .map((c) => c.label);
  return labels.length > 0 ? labels.join(", ") : "—";
}

function bgmLabel(id: string | undefined): string {
  if (!id) return "—";
  return manifestData.bgmCatalog.find((b) => b.id === id)?.label ?? id;
}

function backgroundLabel(id: string | undefined): string {
  const resolved =
    id ?? manifestData.goldenPathDefaultBackgroundId;
  return (
    manifestData.backgroundPresets.find((b) => b.id === resolved)?.label ??
    resolved
  );
}

export function FocusFlow({
  prioritizeSportsHighlight,
  onboardingPreferences,
}: FocusFlowProps) {
  const entryOptions = useMemo(
    () => getOrderedFocusEntryOptions(prioritizeSportsHighlight),
    [prioritizeSportsHighlight],
  );

  const [phase, setPhase] = useState<FocusPhase>("entry");
  const [intentDraft, setIntentDraft] = useState("");
  const [intentPatch, setIntentPatch] = useState<FocusIntentPatch>({});
  const [config, setConfig] = useState<ReelConfig>({});

  const handoff = handoffFieldsFromPatch(intentPatch, onboardingPreferences);
  const studioHref = buildStudioHandoffHref(handoff, onboardingPreferences);

  function applyEntryPatch(patch: FocusIntentPatch) {
    const mergedPatch = mergeFocusPatches(intentPatch, patch);
    setIntentPatch(mergedPatch);
    setConfig((prev) => reelConfigFromFocus(mergedPatch, prev));
  }

  function handleEntryOption(option: { id: string; label: string }) {
    applyEntryPatch(patchFromEntryOption(option));
    setPhase("build");
  }

  function handleSendIntent() {
    applyEntryPatch(patchFromIntentText(intentDraft));
    setPhase("build");
  }

  function updateConfig(patch: Partial<ReelConfig>) {
    setConfig((prev) => ({ ...prev, ...patch }));
  }

  function goToSummary() {
    setPhase("summary");
  }

  function goToComingSoon() {
    saveReelConfig(config);
    setPhase("coming-soon");
  }

  function handleStudioHandoff() {
    saveReelConfig(config);
  }

  const selectedClips = new Set(config.clips ?? []);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <div>
        <p className="text-sm text-muted-foreground">Focus Mode</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          Tell us what you want to create
        </h1>
        <p className="mt-2 text-muted-foreground">
          We&apos;ll suggest options and summarize your reel before handing off
          to Studio.
        </p>
      </div>

      {phase === "entry" ? (
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-medium">Quick presets</p>
            <div className="flex flex-wrap gap-2">
              {entryOptions.map((option) => (
                <Button
                  key={option.id}
                  type="button"
                  variant="outline"
                  onClick={() => handleEntryOption(option)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium" htmlFor="focus-intent">
              Or describe your intent
            </label>
            <textarea
              id="focus-intent"
              rows={4}
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              placeholder="I want to make a hype reel from Messi's best moments"
              value={intentDraft}
              onChange={(e) => setIntentDraft(e.target.value)}
            />
            <Button
              type="button"
              disabled={!intentDraft.trim()}
              onClick={handleSendIntent}
            >
              Send
            </Button>
          </div>
        </div>
      ) : null}

      {phase === "build" ? (
        <div className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Subject</h2>
            <Input
              placeholder="e.g. Lionel Messi"
              value={config.subject ?? ""}
              onChange={(e) => updateConfig({ subject: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Demo uses {MESSI_SUBJECT} in the golden path if you continue in
              Studio.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Moments</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {manifestData.presetClips.map((clip) => {
                const checked = selectedClips.has(clip.id);
                return (
                  <li key={clip.id}>
                    <label
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-3 py-2.5 hover:bg-muted/40"
                    >
                      <input
                        type="checkbox"
                        className="size-4 rounded border-input"
                        checked={checked}
                        onChange={() => {
                          const next = new Set(selectedClips);
                          if (next.has(clip.id)) {
                            next.delete(clip.id);
                          } else {
                            next.add(clip.id);
                          }
                          updateConfig({ clips: [...next] });
                        }}
                      />
                      <span className="text-sm font-medium">{clip.label}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Background music</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {manifestData.bgmCatalog.map((item) => (
                <li key={item.id}>
                  <label
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-3 py-2.5 hover:bg-muted/40"
                  >
                    <input
                      type="radio"
                      name="focus-bgm"
                      className="size-4"
                      checked={config.backgroundMusicId === item.id}
                      onChange={() =>
                        updateConfig({ backgroundMusicId: item.id })
                      }
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Visual background</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {manifestData.backgroundPresets.map((preset) => {
                const isSelected =
                  (config.backgroundPresetId ??
                    manifestData.goldenPathDefaultBackgroundId) === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    className={cn(
                      "text-left ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isSelected ? "ring-2 ring-primary" : "",
                    )}
                    onClick={() =>
                      updateConfig({ backgroundPresetId: preset.id })
                    }
                  >
                    <Card size="sm" className="h-full overflow-hidden py-0">
                      <CardHeader className="px-0 pt-0">
                        <div
                          className="aspect-[3/4] w-full bg-muted"
                          style={{
                            backgroundImage: `url(${preset.thumbnailAssetPath})`,
                            backgroundSize: "cover",
                          }}
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
          </div>

          <UploadClips
            uploads={config.uploads ?? []}
            onChange={(uploads) => updateConfig({ uploads })}
          />

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={() => setPhase("entry")}>
              Back
            </Button>
            <Button
              type="button"
              disabled={(config.clips?.length ?? 0) === 0}
              onClick={goToSummary}
            >
              Review summary
            </Button>
          </div>
        </div>
      ) : null}

      {phase === "summary" ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your reel configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <span className="text-muted-foreground">Subject:</span>{" "}
                {config.subject?.trim() || MESSI_SUBJECT}
              </p>
              <p>
                <span className="text-muted-foreground">Clips:</span>{" "}
                {clipLabels(config)}
              </p>
              <p>
                <span className="text-muted-foreground">Music:</span>{" "}
                {bgmLabel(config.backgroundMusicId)}
              </p>
              <p>
                <span className="text-muted-foreground">Background:</span>{" "}
                {backgroundLabel(config.backgroundPresetId)}
              </p>
              <p>
                <span className="text-muted-foreground">Uploads:</span>{" "}
                {config.uploads?.length
                  ? config.uploads.map((u) => u.name).join(", ")
                  : "None"}
              </p>
            </CardContent>
          </Card>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={() => setPhase("build")}>
              Edit options
            </Button>
            <Button type="button" onClick={goToComingSoon}>
              Continue
            </Button>
          </div>
        </div>
      ) : null}

      {phase === "coming-soon" ? (
        <div className="space-y-6">
          <Alert>
            <AlertTitle>Coming soon</AlertTitle>
            <AlertDescription>{getFocusBannerText()}</AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Summary (read-only)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Subject: {config.subject?.trim() || MESSI_SUBJECT}</p>
              <p>Clips: {clipLabels(config)}</p>
              <p>Music: {bgmLabel(config.backgroundMusicId)}</p>
              <p>Background: {backgroundLabel(config.backgroundPresetId)}</p>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={studioHref}
              className={cn(buttonVariants({ size: "lg" }))}
              onClick={handleStudioHandoff}
            >
              Try Highlight Reel in Studio
            </Link>
            <Button
              type="button"
              variant="outline"
              onClick={() => setPhase("summary")}
            >
              Back to summary
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
