"use client";

import Link from "next/link";
import { useState } from "react";

import { ComingSoonDialog } from "@/components/studio/coming-soon-dialog";
import { HIGGSFIELD_PRODUCT_NAV } from "@/lib/higgsfield-nav";
export function HiggsfieldProductNav() {
  const [comingSoonFeature, setComingSoonFeature] = useState<string | null>(
    null,
  );

  return (
    <>
      <nav
        aria-label="Product"
        className="border-b border-border/40 bg-background"
      >
        <div className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6">
          <ul className="flex h-11 min-w-max items-center gap-1 py-1">
            {HIGGSFIELD_PRODUCT_NAV.map((item) => {
              const content = (
                <>
                  <span>{item.label}</span>
                  {item.badge === "New" ? (
                    <span
                      className="rounded-md bg-[color-mix(in_srgb,var(--hf-accent)_20%,transparent)] px-1.5 py-0.5 text-[10px] font-medium normal-case tracking-normal text-[var(--hf-accent)]"
                    >
                      New
                    </span>
                  ) : null}
                  {item.badge === "Top" ? (
                    <span
                      className="rounded bg-[var(--hf-badge-hot)] px-1.5 py-0.5 text-[10px] font-medium uppercase text-white"
                    >
                      Top
                    </span>
                  ) : null}
                </>
              );

              if (item.href && item.comingSoon !== true) {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-sm text-foreground/90 transition-colors hover:bg-muted/50 hover:text-foreground"
                    >
                      {content}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={item.label}>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                    onClick={() => setComingSoonFeature(item.label)}
                  >
                    {content}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <ComingSoonDialog
        open={comingSoonFeature !== null}
        onOpenChange={(open) => {
          if (!open) setComingSoonFeature(null);
        }}
        featureName={comingSoonFeature ?? "Feature"}
      />
    </>
  );
}
