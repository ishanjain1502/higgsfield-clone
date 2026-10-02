import { redirect } from "next/navigation";
import type { Session } from "next-auth";

import { auth } from "@/lib/auth";
import { isAuthConfigured, isSignInAvailable } from "@/lib/auth-env";
import { prisma } from "@/lib/db";
import {
  EVALUATOR_ONBOARDING_PREFERENCES,
  EVALUATOR_USER_ID,
  isEvaluatorUserId,
} from "@/lib/evaluator";
import {
  parseOnboardingPreferences,
  type OnboardingPreferences,
} from "@/lib/onboarding-preferences";

export type AuthenticatedUser = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  onboardingPreferences: OnboardingPreferences | null;
  hasSeenHomeOnboardingModal: boolean;
  role?: "evaluator";
};

function evaluatorUserFromSession(session: Session): AuthenticatedUser {
  return {
    id: EVALUATOR_USER_ID,
    name: session.user?.name ?? "Evaluator",
    email: session.user?.email ?? null,
    image: null,
    onboardingPreferences:
      session.user?.onboardingPreferences ?? EVALUATOR_ONBOARDING_PREFERENCES,
    hasSeenHomeOnboardingModal:
      session.user?.hasSeenHomeOnboardingModal ?? true,
    role: "evaluator",
  };
}

export async function requireAuthenticatedUser(): Promise<AuthenticatedUser> {
  if (!isSignInAvailable()) {
    redirect("/login");
  }

  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  if (
    session.user.role === "evaluator" ||
    isEvaluatorUserId(session.user.id)
  ) {
    return evaluatorUserFromSession(session);
  }

  if (!isAuthConfigured()) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      onboardingPreferences: true,
      hasSeenHomeOnboardingModal: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  return {
    ...user,
    onboardingPreferences: parseOnboardingPreferences(
      user.onboardingPreferences,
    ),
  };
}

export async function requireOnboardedUser(): Promise<AuthenticatedUser> {
  const user = await requireAuthenticatedUser();
  if (!user.onboardingPreferences) {
    redirect("/onboarding");
  }
  return user;
}
