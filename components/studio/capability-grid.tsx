"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ComingSoonDialog } from "@/components/studio/coming-soon-dialog";
import { cn } from "@/lib/utils";
import type { StudioCapability } from "@/lib/studio-capabilities";

const cardClassName =
  "group relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-border/50 bg-card text-left ring-1 ring-foreground/5 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function CapabilityCard({
  capability,
  onComingSoon,
}: {
  capability: StudioCapability;
  onComingSoon: (title: string) => void;
}) {
  const isAvailable = Boolean(capability.href);

  const inner = (
    <>
      <Image
        src={capability.thumbnail}
        alt=""
        fill
        className="object-cover transition-opacity group-hover:opacity-95"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3 pt-12">
        <p
          className={cn(
            "text-[10px] font-medium uppercase tracking-wider",
            isAvailable ? "text-foreground/80" : "text-muted-foreground",
          )}
        >
          {isAvailable ? "Available" : "Coming soon"}
        </p>
        <p className="mt-1 text-sm font-medium text-foreground">
          {capability.title}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {capability.subtitle}
        </p>
      </div>
    </>
  );

  if (capability.href) {
    return (
      <Link href={capability.href} className={cardClassName}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={cardClassName}
      onClick={() => onComingSoon(capability.title)}
    >
      {inner}
    </button>
  );
}

type CapabilityGridProps = {
  visible: StudioCapability[];
  overflow: StudioCapability[];
  overflowLabel: string;
};

export function CapabilityGrid({
  visible,
  overflow,
  overflowLabel,
}: CapabilityGridProps) {
  const [showOverflow, setShowOverflow] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState<string | null>(
    null,
  );

  function openComingSoon(title: string) {
    setComingSoonFeature(title);
  }

  const overflowExpanded = showOverflow && overflow.length > 0;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((capability) => (
          <CapabilityCard
            key={capability.id}
            capability={capability}
            onComingSoon={openComingSoon}
          />
        ))}

        {overflow.length > 0 ? (
          <button
            type="button"
            className={cn(
              cardClassName,
              "flex flex-col items-center justify-center border-dashed bg-muted/20 p-4 hover:bg-muted/30",
            )}
            onClick={() => setShowOverflow((prev) => !prev)}
            aria-expanded={overflowExpanded}
          >
            <span className="text-sm font-medium text-foreground">
              {overflowLabel}
            </span>
            <span className="mt-2 text-xs text-muted-foreground">
              {overflowExpanded
                ? "Hide preview capabilities"
                : `${overflow.length} more workflows`}
            </span>
          </button>
        ) : null}
      </div>

      {overflowExpanded ? (
        <div className="mt-6 grid gap-4 border-t border-border/60 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {overflow.map((capability) => (
            <CapabilityCard
              key={capability.id}
              capability={capability}
              onComingSoon={openComingSoon}
            />
          ))}
        </div>
      ) : null}

      <ComingSoonDialog
        open={comingSoonFeature !== null}
        onOpenChange={(open) => {
          if (!open) {
            setComingSoonFeature(null);
          }
        }}
        featureName={comingSoonFeature ?? "Coming soon"}
      />
    </>
  );
}
