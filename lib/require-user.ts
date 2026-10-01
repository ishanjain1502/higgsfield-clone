import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { isAuthConfigured } from "@/lib/auth-env";
import { prisma } from "@/lib/db";
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
};

export async function requireAuthenticatedUser(): Promise<AuthenticatedUser> {
  if (!isAuthConfigured()) {
    redirect("/login");
  }

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
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
