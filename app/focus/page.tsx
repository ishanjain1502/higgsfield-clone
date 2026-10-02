import { FocusFlow } from "@/components/focus/focus-flow";
import { recommendsSportsHighlight } from "@/lib/onboarding-preferences";
import { requireOnboardedUser } from "@/lib/require-user";

export const dynamic = "force-dynamic";

export default async function FocusPage() {
  const user = await requireOnboardedUser();
  const prefs = user.onboardingPreferences;
  if (!prefs) {
    return null;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <FocusFlow
        prioritizeSportsHighlight={recommendsSportsHighlight(prefs)}
        onboardingPreferences={prefs}
      />
    </main>
  );
}
