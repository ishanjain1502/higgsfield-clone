"use client";

import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ReelConfig } from "@/lib/reel-config";

const MESSI_SUBJECT = "Lionel Messi";

type SubjectStepProps = {
  config: ReelConfig;
  onUpdate: (patch: Partial<ReelConfig>) => void;
  onContinue: () => void;
};

export function SubjectStep({ config, onUpdate, onContinue }: SubjectStepProps) {
  const [draft, setDraft] = useState(config.subject ?? "");
  const [showPresetAlert, setShowPresetAlert] = useState(false);

  function handleContinue() {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== MESSI_SUBJECT) {
      setShowPresetAlert(true);
    }
    onUpdate({ subject: MESSI_SUBJECT });
    onContinue();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Celebrity or subject</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Who is this highlight reel about?
        </p>
      </div>
      <Input
        placeholder="e.g. Lionel Messi"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleContinue();
          }
        }}
      />
      {showPresetAlert ? (
        <Alert>
          <AlertTitle>Preset substitution</AlertTitle>
          <AlertDescription>
            Demo mode: your entry was replaced with {MESSI_SUBJECT} for this
            walkthrough.
          </AlertDescription>
        </Alert>
      ) : null}
      {config.subject === MESSI_SUBJECT && !showPresetAlert ? (
        <p className="text-sm text-muted-foreground">
          Selected subject: {MESSI_SUBJECT}
        </p>
      ) : null}
      <Button type="button" onClick={handleContinue}>
        Continue
      </Button>
    </div>
  );
}
