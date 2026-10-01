"use client";

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{featureName}</DialogTitle>
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
