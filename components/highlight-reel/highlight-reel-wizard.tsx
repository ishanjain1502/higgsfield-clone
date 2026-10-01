"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { BackgroundStep } from "@/components/highlight-reel/wizard-steps/background-step";
import { BgmStep } from "@/components/highlight-reel/wizard-steps/bgm-step";
import { ClipsStep } from "@/components/highlight-reel/wizard-steps/clips-step";
import { GenerateStep } from "@/components/highlight-reel/wizard-steps/generate-step";
import { SongStep } from "@/components/highlight-reel/wizard-steps/song-step";
import { SubjectStep } from "@/components/highlight-reel/wizard-steps/subject-step";
import {
  isWizardStep,
  stepHref,
  WIZARD_STEPS,
  type WizardStep,
} from "@/lib/highlight-reel-steps";
import type { ReelConfig } from "@/lib/reel-config";
import {
  loadReelConfig,
  saveReelConfig,
} from "@/lib/reel-config-storage";

export function HighlightReelWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepParam = searchParams.get("step");
  const step: WizardStep = isWizardStep(stepParam) ? stepParam : "subject";

  const [hydrated, setHydrated] = useState(false);
  const [config, setConfig] = useState<ReelConfig>({});

  useEffect(() => {
    setConfig(loadReelConfig());
    setHydrated(true);
  }, []);

  const updateConfig = useCallback((patch: Partial<ReelConfig>) => {
    setConfig((prev) => {
      const next = { ...prev, ...patch };
      saveReelConfig(next);
      return next;
    });
  }, []);

  const goToStep = useCallback(
    (target: WizardStep) => {
      router.push(stepHref(target));
    },
    [router],
  );

  const stepNumber = useMemo(() => WIZARD_STEPS.indexOf(step) + 1, [step]);

  if (!hydrated) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-10 text-muted-foreground">
        Loading wizard…
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Highlight reel · Step {stepNumber} of {WIZARD_STEPS.length}
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        Create highlight reel
      </h1>
      <div className="mt-8">
        {step === "subject" ? (
          <SubjectStep
            config={config}
            onUpdate={updateConfig}
            onContinue={() => goToStep("clips")}
          />
        ) : null}
        {step === "clips" ? (
          <ClipsStep
            config={config}
            onUpdate={updateConfig}
            onBack={() => goToStep("subject")}
            onContinue={() => goToStep("song")}
          />
        ) : null}
        {step === "song" ? (
          <SongStep
            config={config}
            onUpdate={updateConfig}
            onBack={() => goToStep("clips")}
            onContinue={() => goToStep("bgm")}
          />
        ) : null}
        {step === "bgm" ? (
          <BgmStep
            config={config}
            onUpdate={updateConfig}
            onBack={() => goToStep("song")}
            onContinue={() => goToStep("background")}
          />
        ) : null}
        {step === "background" ? (
          <BackgroundStep
            config={config}
            onUpdate={updateConfig}
            onBack={() => goToStep("bgm")}
            onContinue={() => goToStep("generate")}
          />
        ) : null}
        {step === "generate" ? (
          <GenerateStep config={config} onBack={() => goToStep("background")} />
        ) : null}
      </div>
    </main>
  );
}
