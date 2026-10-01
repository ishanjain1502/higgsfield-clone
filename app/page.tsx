import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Creative AI studio
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Create highlights without the overwhelm
        </h1>
        <p className="text-lg text-muted-foreground">
          A focused take on the Higgsfield experience — one complete workflow,
          Studio control, and guided Focus mode.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/login"
            className={cn(buttonVariants({ size: "lg" }))}
          >
            Start Creating
          </Link>
          <Link
            href="/studio"
            className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
          >
            Explore
          </Link>
        </div>
      </div>
    </main>
  );
}
