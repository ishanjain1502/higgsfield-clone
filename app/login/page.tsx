import Link from "next/link";

import { EvaluatorSignIn } from "@/components/auth/evaluator-sign-in";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  authEnvHelpMessage,
  isAuthConfigured,
  isGoogleSignInEnabled,
  isSignInAvailable,
} from "@/lib/auth-env";
import { isEvaluatorAccessEnabled } from "@/lib/evaluator";

export default function LoginPage() {
  const googleConfigured = isAuthConfigured();
  const googleSignInEnabled = isGoogleSignInEnabled();
  const evaluatorEnabled = isEvaluatorAccessEnabled();
  const helpMessage = authEnvHelpMessage();

  return (
    <main className="mx-auto flex max-w-md flex-col gap-6 px-4 py-24 sm:px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold uppercase tracking-tight">
          Sign in
        </h1>
        <p className="text-muted-foreground">
          Use Google to save onboarding preferences, or evaluator access for
          review without OAuth.
        </p>
      </div>

      {!isSignInAvailable() ? (
        <Alert>
          <AlertTitle>Setup required</AlertTitle>
          <AlertDescription>{helpMessage}</AlertDescription>
        </Alert>
      ) : null}

      {googleConfigured ? (
        <>
          <GoogleSignInButton
            disabled={!googleSignInEnabled}
          />
          {!googleSignInEnabled ? (
            <Alert>
              <AlertTitle>Google sign-in temporarily unavailable</AlertTitle>
              <AlertDescription>
                Use evaluator access below, or check back later for Google
                sign-in.
              </AlertDescription>
            </Alert>
          ) : null}
        </>
      ) : (
        <Alert>
          <AlertTitle>Google sign-in not configured</AlertTitle>
          <AlertDescription>
            Set Google OAuth env vars for production accounts. Evaluator access
            can still work with AUTH_SECRET and EVALUATOR_ACCESS_*.
          </AlertDescription>
        </Alert>
      )}

      <EvaluatorSignIn enabled={evaluatorEnabled} />

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/" className="underline underline-offset-4 hover:text-foreground">
          Back to landing
        </Link>
      </p>
    </main>
  );
}
