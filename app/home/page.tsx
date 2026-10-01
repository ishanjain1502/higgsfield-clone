import Link from "next/link";

import { HomeOnboardingModal } from "@/components/home/home-onboarding-modal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { recommendsSportsHighlight } from "@/lib/onboarding-preferences";
import { requireOnboardedUser } from "@/lib/require-user";

export const dynamic = "force-dynamic";

function greetingName(name: string | null, email: string | null): string {
  if (name?.trim()) {
    return name.split(" ")[0] ?? name;
  }
  if (email) {
    return email.split("@")[0] ?? "there";
  }
  return "there";
}

export default async function HomePage() {
  const user = await requireOnboardedUser();
  const prefs = user.onboardingPreferences;
  const sportsHighlight = recommendsSportsHighlight(prefs);
  const showModal = !user.hasSeenHomeOnboardingModal;

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-12 sm:px-6">
      <HomeOnboardingModal open={showModal} />

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Good evening</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Good evening, {greetingName(user.name, user.email)}.
        </h1>
        <p className="text-muted-foreground">
          What would you like to create today?
        </p>
      </div>

      <section className="flex flex-col gap-4">
        {sportsHighlight ? (
          <div className="rounded-xl border border-border/60 bg-card p-6 ring-1 ring-foreground/5">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Recommended for you
            </p>
            <h2 className="mt-2 text-xl font-medium">Create a sports highlight</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Based on your onboarding picks — sports and highlight reels.
            </p>
            <Link
              href="/create/highlight-reel"
              className={cn(buttonVariants({ size: "lg" }), "mt-4 inline-flex")}
            >
              Create Highlight
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border border-border/60 bg-card p-6 ring-1 ring-foreground/5">
            <h2 className="text-xl font-medium">Start with Highlight Reel</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The v1 golden path — guided steps through subject, clips, and
              polish.
            </p>
            <Link
              href="/create/highlight-reel"
              className={cn(buttonVariants({ size: "lg" }), "mt-4 inline-flex")}
            >
              Open wizard
            </Link>
          </div>
        )}
      </section>

      <section className="flex flex-col gap-3 border-t border-border/60 pt-8">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Explore Studio
        </h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/studio" className={cn(buttonVariants({ variant: "outline" }))}>
            Studio
          </Link>
          <Link href="/focus" className={cn(buttonVariants({ variant: "outline" }))}>
            Focus
          </Link>
        </div>
      </section>
    </main>
  );
}
