import Link from "next/link";

import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { authEnvHelpMessage, isAuthConfigured } from "@/lib/auth-env";

export default function LoginPage() {
  const configured = isAuthConfigured();
  const helpMessage = authEnvHelpMessage();

  return (
    <main className="mx-auto flex max-w-md flex-col gap-6 px-4 py-24 sm:px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="text-muted-foreground">
          Use Google to save your onboarding preferences and pick up where you
          left off.
        </p>
      </div>

      {!configured ? (
        <Alert>
          <AlertTitle>Setup required</AlertTitle>
          <AlertDescription>{helpMessage}</AlertDescription>
        </Alert>
      ) : null}

      <GoogleSignInButton disabled={!configured} />

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/" className="underline underline-offset-4 hover:text-foreground">
          Back to landing
        </Link>
      </p>
    </main>
  );
}
