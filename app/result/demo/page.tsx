"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { ResultView } from "@/components/result/result-view";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import decisions from "../../../.docs/decisions-v1.json";
import { HIGHLIGHT_REEL_PATH } from "@/lib/highlight-reel-steps";
import { resolveOutputVideo } from "@/lib/preset-resolver";
import type { ReelConfig } from "@/lib/reel-config";
import { loadReelConfig } from "@/lib/reel-config-storage";

export default function ResultDemoPage() {
  const [config, setConfig] = useState<ReelConfig | null>(null);

  useEffect(() => {
    setConfig(loadReelConfig());
  }, []);

  const resolved = config ? resolveOutputVideo(config) : null;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Your highlight
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Preview, export, or review how this reel was built.
          </p>
        </div>
        <Link
          href={HIGHLIGHT_REEL_PATH}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "shrink-0",
          )}
        >
          Create another
        </Link>
      </div>
      <Alert className="mt-6">
        <AlertTitle>Demo mode</AlertTitle>
        <AlertDescription>{decisions.O18.studioBannerText}</AlertDescription>
      </Alert>
      {resolved && config ? (
        <div className="mt-8">
          <ResultView
            videoPath={resolved.videoPath}
            recipe={resolved.recipe}
            config={config}
          />
        </div>
      ) : (
        <div className="mt-8 space-y-4 rounded-xl border border-dashed border-border p-6 text-center">
          <p className="text-sm text-muted-foreground">
            No reel config in sessionStorage — complete the Highlight Reel wizard
            first.
          </p>
          <Link
            href={HIGHLIGHT_REEL_PATH}
            className={cn(buttonVariants())}
          >
            Start Highlight Reel
          </Link>
        </div>
      )}
    </main>
  );
}
