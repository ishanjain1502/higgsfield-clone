"use client";

import { useRouter } from "next/navigation";
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

export function HomeOnboardingModal({ open }: { open: boolean }) {
  const router = useRouter();
  const [dismissing, setDismissing] = useState(false);

  async function dismiss() {
    setDismissing(true);
    try {
      await fetch("/api/user/home-modal", { method: "POST" });
      router.refresh();
    } finally {
      setDismissing(false);
    }
  }

  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Your workspace is personalized</DialogTitle>
          <DialogDescription>
            What you picked in onboarding shapes what we show first — especially
            in Focus mode. Studio still has every capability when you want to
            explore.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={dismiss} disabled={dismissing}>
            {dismissing ? "Saving…" : "Got it"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
