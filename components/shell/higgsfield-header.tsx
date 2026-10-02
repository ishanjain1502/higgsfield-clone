import Link from "next/link";

import { HiggsfieldLogo } from "@/components/shell/higgsfield-logo";
import { buttonVariants } from "@/components/ui/button";
import type { HeaderUser } from "@/lib/header-user";
import { cn } from "@/lib/utils";

function HiggsfieldPricingIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8.5 7.75L6.25 10L8.5 12.25M12.7071 20.0429L22.049 10.701C22.4371 10.3129 22.4398 9.68443 22.0551 9.29295L16.901 4.04903C16.713 3.85774 16.4561 3.75 16.1879 3.75H7.81214C7.54393 3.75 7.28696 3.85774 7.09895 4.04903L1.94493 9.29295C1.56016 9.68443 1.56288 10.3129 1.95102 10.701L11.2929 20.0429C11.6834 20.4334 12.3166 20.4334 12.7071 20.0429Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function accountLabel(user: NonNullable<HeaderUser>): string {
  if (user.role === "evaluator") return "Evaluator";
  return user.name?.split(" ")[0] ?? "Account";
}

export function HiggsfieldHeader({ user }: { user: HeaderUser }) {
  const signedIn = Boolean(user);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-11 max-w-6xl items-center justify-between gap-3 px-4 sm:h-12 sm:px-6">
        <Link
          href={signedIn ? "/studio" : "/"}
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground"
        >
          <HiggsfieldLogo />
          <span className="md:hidden">Higgsfield</span>
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
            <HiggsfieldPricingIcon className="size-4" />
            Pricing
          </Link>
          {signedIn && user ? (
            <Link
              href="/home"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "border-white/15 bg-white/5",
              )}
            >
              {accountLabel(user)}
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
