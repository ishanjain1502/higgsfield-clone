"use client";

import { useEffect, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import decisions from "../../../.docs/decisions-v1.json";
import { resolveOutputVideo } from "@/lib/preset-resolver";
import type { ReelConfig } from "@/lib/reel-config";
import {
  loadReelConfig,
  REEL_CONFIG_STORAGE_KEY,
} from "@/lib/reel-config-storage";

export default function ResultDemoPage() {
  const [config, setConfig] = useState<ReelConfig | null>(null);

  useEffect(() => {
    setConfig(loadReelConfig());
  }, []);

  const resolved = config ? resolveOutputVideo(config) : null;

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Your highlight</h1>
      <Alert className="mt-6">
        <AlertTitle>Demo mode</AlertTitle>
        <AlertDescription>{decisions.O18.studioBannerText}</AlertDescription>
      </Alert>
      {resolved ? (
        <div className="mt-6 space-y-2 text-sm text-muted-foreground">
          <p>
            Full result UI (video, recipe tabs, export) ships in Task 5. Config
            loaded from sessionStorage key{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-foreground">
              {REEL_CONFIG_STORAGE_KEY}
            </code>
            .
          </p>
          <p>Output path: {resolved.videoPath}</p>
          <p>Subject: {resolved.recipe.subject}</p>
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted-foreground">
          No reel config in sessionStorage — complete the wizard first.
        </p>
      )}
    </main>
  );
}
