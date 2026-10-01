"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RESULT_PATH } from "@/lib/highlight-reel-steps";
import { runMockGeneration } from "@/lib/mock-generation";
import type { ReelConfig } from "@/lib/reel-config";
import { saveReelConfig } from "@/lib/reel-config-storage";

const LABELS = [
  "Selected moments",
  "Arranged clips",
  "Added soundtrack",
  "Applied visual style",
  "Rendering final video",
];

type GenerateStepProps = {
  config: ReelConfig;
  onBack: () => void;
};

export function GenerateStep({ config, onBack }: GenerateStepProps) {
  const router = useRouter();
  const [running, setRunning] = useState(false);
  const [stepLabel, setStepLabel] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setRunning(true);
      await runMockGeneration((label) => {
        if (!cancelled) {
          setStepLabel(label);
        }
      }, LABELS);
      if (cancelled) {
        return;
      }
      saveReelConfig(config);
      setDone(true);
      setRunning(false);
      router.push(RESULT_PATH);
    }

    void run();

    return () => {
      cancelled = true;
    };
    // Run mock generation once when entering this step.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const progressIndex = stepLabel ? LABELS.indexOf(stepLabel) + 1 : 0;
  const progressValue =
    LABELS.length > 0 ? Math.round((progressIndex / LABELS.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Generate</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Mock progress — output video is always the same demo file.
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">{stepLabel ?? "Starting…"}</p>
        <Progress value={done ? 100 : progressValue} />
        <p className="text-right text-sm tabular-nums text-muted-foreground">
          {done ? 100 : progressValue}%
        </p>
      </div>
      {!running && !done ? (
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
      ) : null}
    </div>
  );
}
