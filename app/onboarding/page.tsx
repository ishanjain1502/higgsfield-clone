import { redirect } from "next/navigation";

import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { requireAuthenticatedUser } from "@/lib/require-user";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const user = await requireAuthenticatedUser();

  if (user.onboardingPreferences) {
    redirect("/home");
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <OnboardingForm />
    </main>
  );
}
