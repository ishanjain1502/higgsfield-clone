"use client";

import { Tag } from "lucide-react";
import { useEffect, useState } from "react";

const DISMISS_KEY = "hf-promo-dismissed";

export function HiggsfieldPromoBar() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setDismissed(localStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  if (dismissed) return null;

  return (
    <div className="sticky top-0 z-[60] bg-[var(--hf-accent)] text-[var(--hf-accent-fg)]">
      <button
        type="button"
        className="mx-auto flex w-full max-w-6xl items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium sm:text-sm"
        onClick={() => {
          localStorage.setItem(DISMISS_KEY, "1");
          setDismissed(true);
        }}
      >
        <Tag className="size-3.5 shrink-0" aria-hidden />
        <span>
          Get an additional discount on premium plans after signing up
        </span>
      </button>
    </div>
  );
}
