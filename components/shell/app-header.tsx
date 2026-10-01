import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          Studio
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/studio"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            Studio
          </Link>
          <Link
            href="/focus"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            Focus
          </Link>
          <Button variant="outline" size="sm" disabled className="ml-1">
            Account
          </Button>
        </nav>
      </div>
    </header>
  );
}
