import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import {
  EVALUATOR_ONBOARDING_PREFERENCES,
  EVALUATOR_USER_ID,
  isEvaluatorAccessEnabled,
  validateEvaluatorToken,
} from "@/lib/evaluator";
import type { OnboardingPreferences } from "@/lib/onboarding-preferences";

const googleProvider =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    : null;

const evaluatorProvider = isEvaluatorAccessEnabled()
  ? Credentials({
      id: "evaluator",
      name: "Evaluator access",
      credentials: {
        token: { label: "Access token", type: "password" },
      },
      async authorize(credentials) {
        const token =
          typeof credentials?.token === "string" ? credentials.token : "";
        if (!validateEvaluatorToken(token)) {
          return null;
        }
        return {
          id: EVALUATOR_USER_ID,
          name: "Evaluator",
          email: "evaluator@review.local",
          role: "evaluator",
        };
      },
    })
  : null;

const providers = [
  ...(googleProvider ? [googleProvider] : []),
  ...(evaluatorProvider ? [evaluatorProvider] : []),
];

export const authConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers,
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id;
      }
      if (user && "role" in user && user.role === "evaluator") {
        token.role = "evaluator";
        token.onboardingPreferences = EVALUATOR_ONBOARDING_PREFERENCES;
        token.hasSeenHomeOnboardingModal = true;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      if (token.role === "evaluator") {
        session.user.role = "evaluator";
        session.user.onboardingPreferences =
          token.onboardingPreferences as OnboardingPreferences;
        session.user.hasSeenHomeOnboardingModal = Boolean(
          token.hasSeenHomeOnboardingModal,
        );
      }
      return session;
    },
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isProtected =
        pathname.startsWith("/home") ||
        pathname.startsWith("/studio") ||
        pathname.startsWith("/focus") ||
        pathname.startsWith("/create/");

      if (!isProtected) {
        return true;
      }

      return !!auth?.user;
    },
  },
} satisfies NextAuthConfig;
