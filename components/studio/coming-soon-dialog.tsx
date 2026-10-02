"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ComingSoonDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  featureName: string;
};

export function ComingSoonDialog({
  open,
  onOpenChange,
  featureName,
}: ComingSoonDialogProps) {
  // Callers clear the feature on close; keep the last title so the exit animation doesn't flash a fallback.
  const [shownName, setShownName] = useState(featureName);
  if (open && featureName !== shownName) {
    setShownName(featureName);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{shownName}</DialogTitle>
          <DialogDescription className="text-pretty">
            This workflow is part of the broader creative studio we&apos;re
            building. For this version, we&apos;re focusing on Highlight Reel.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" onClick={() => onOpenChange(false)}>
            Back to Studio
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
