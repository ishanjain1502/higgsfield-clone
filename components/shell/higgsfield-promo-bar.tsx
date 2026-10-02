"use client";

import { useEffect, useState } from "react";

function PromoTagIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M2 3.75C2 2.784 2.784 2 3.75 2h7.829c.464 0 .91.184 1.237.513l8.757 8.756a1.75 1.75 0 0 1 0 2.475l-7.829 7.83a1.75 1.75 0 0 1-2.475 0l-8.756-8.758A1.75 1.75 0 0 1 2 11.58zM7.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"
        clipRule="evenodd"
      />
    </svg>
  );
}

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
        <PromoTagIcon className="size-4 shrink-0" />
        <span>
          Get an additional discount on premium plans after signing up
        </span>
      </button>
    </div>
  );
}
