import Link from "next/link";

import { cn } from "@/lib/utils";

export function DisplayHeading({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "font-display text-[28px] leading-8 font-bold tracking-[-0.04em] uppercase",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function SectionHeader({
  title,
  description,
  accent,
  action,
}: {
  title: string;
  description?: string;
  accent?: boolean;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div className="flex flex-col gap-1">
        <DisplayHeading className={accent ? "text-[var(--hf-accent)]" : undefined}>
          {title}
        </DisplayHeading>
        {description ? (
          <p className="text-sm text-[var(--hf-muted)]">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

const ctaStyles = {
  lime: "bg-[var(--hf-accent)] text-[var(--hf-accent-fg)] shadow-[inset_0_-3px_0_rgb(0_0_0/0.18)] hover:bg-[color-mix(in_srgb,var(--hf-accent)_88%,white)]",
  glass: "bg-white/10 text-foreground backdrop-blur-md hover:bg-white/15",
  gold: "bg-gradient-to-b from-[#e3c88c] to-[#b8975a] text-[#1a1408] shadow-[inset_0_-3px_0_rgb(0_0_0/0.2)] hover:brightness-105",
} as const;

export function LandingCta({
  href = "/login",
  variant = "lime",
  className,
  children,
}: {
  href?: string;
  variant?: keyof typeof ctaStyles;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold whitespace-nowrap transition-colors",
        ctaStyles[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Badge({
  tone = "hot",
  children,
}: {
  tone?: "hot" | "lime";
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "rounded px-1.5 py-0.5 text-[10px] leading-none font-bold uppercase italic",
        tone === "hot"
          ? "bg-[var(--hf-badge-hot)] text-white"
          : "bg-[color-mix(in_srgb,var(--hf-accent)_20%,transparent)] text-[var(--hf-accent)]",
      )}
    >
      {children}
    </span>
  );
}
