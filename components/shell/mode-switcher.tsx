"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  isFocusModePath,
  isStudioModePath,
} from "@/lib/app-routes";
import { cn } from "@/lib/utils";

const tabClass =
  "flex flex-1 items-center justify-center rounded-[10px] py-3.5 text-sm font-semibold uppercase tracking-[0.12em] transition-colors";

export function ModeSwitcher() {
  const pathname = usePathname() ?? "";
  const studioActive = isStudioModePath(pathname);
  const focusActive = isFocusModePath(pathname);

  return (
    <div className="border-b border-border/40 bg-background px-4 py-2.5 sm:px-6">
      <div className="mx-auto flex max-w-6xl gap-2">
        <Link
          href="/studio"
          className={cn(
            tabClass,
            studioActive
              ? "bg-[var(--hf-accent)] text-[var(--hf-accent-fg)]"
              : "bg-muted/40 text-muted-foreground hover:bg-muted/60 hover:text-foreground",
          )}
          aria-current={studioActive ? "page" : undefined}
        >
          Studio
        </Link>
        <Link
          href="/focus"
          className={cn(
            tabClass,
            focusActive
              ? "bg-[var(--hf-accent)] text-[var(--hf-accent-fg)]"
              : "bg-muted/40 text-muted-foreground hover:bg-muted/60 hover:text-foreground",
          )}
          aria-current={focusActive ? "page" : undefined}
        >
          Focus
        </Link>
      </div>
    </div>
  );
}
