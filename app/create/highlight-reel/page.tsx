import { Suspense } from "react";

import { HighlightReelWizard } from "@/components/highlight-reel/highlight-reel-wizard";

export default function HighlightReelPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-2xl px-4 py-10 text-muted-foreground">
          Loading wizard…
        </main>
      }
    >
      <HighlightReelWizard />
    </Suspense>
  );
}
