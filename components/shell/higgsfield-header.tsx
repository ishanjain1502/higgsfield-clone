"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Tag } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HiggsfieldHeader() {
  const { data: session, status } = useSession();
  const signedIn = status === "authenticated" && session?.user;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-11 max-w-6xl items-center justify-between gap-3 px-4 sm:h-12 sm:px-6">
        <Link
          href={signedIn ? "/studio" : "/"}
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground"
        >
          <span
            className="flex size-7 items-center justify-center rounded-lg bg-foreground text-background"
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
              <path
                d="M6 14c2-3 4-8 6-8s4 5 6 8c-1.5 1-3 2-5 2s-3.5-1-5-2z"
                opacity="0.9"
              />
            </svg>
          </span>
          Higgsfield
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href="https://www.instagram.com/higgsfield_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg p-2 text-foreground/80 transition-colors hover:bg-muted/50 hover:text-foreground sm:inline-flex"
            aria-label="Higgsfield on Instagram"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <Link
            href="/studio"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "hidden gap-1.5 text-foreground/90 sm:inline-flex",
            )}
          >
            <Tag className="size-3.5" />
            Pricing
          </Link>
          {signedIn ? (
            <Link
              href="/home"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "border-white/15 bg-white/5",
              )}
            >
              {session.user.role === "evaluator"
                ? "Evaluator"
                : (session.user.name?.split(" ")[0] ?? "Account")}
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "text-[var(--hf-accent)] hover:bg-[color-mix(in_srgb,var(--hf-accent)_8%,transparent)]",
                )}
              >
                Login
              </Link>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "rounded-[10px] bg-[var(--hf-accent)] text-[var(--hf-accent-fg)] hover:bg-[color-mix(in_srgb,var(--hf-accent)_85%,black)]",
                )}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
