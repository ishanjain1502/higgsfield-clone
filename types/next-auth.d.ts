import type { OnboardingPreferences } from "@/lib/onboarding-preferences";

import "next-auth";

declare module "next-auth" {
  interface User {
    role?: "evaluator";
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: "evaluator";
      onboardingPreferences?: OnboardingPreferences;
      hasSeenHomeOnboardingModal?: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub?: string;
    role?: "evaluator";
    onboardingPreferences?: OnboardingPreferences;
    hasSeenHomeOnboardingModal?: boolean;
  }
}

export {};
