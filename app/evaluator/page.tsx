"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function EvaluatorBootstrap() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  useEffect(() => {
    if (!token) return;
    setStatus("loading");
    signIn("evaluator", { token, redirect: false, callbackUrl: "/studio" }).then(
      (result) => {
        if (result?.error) {
          setStatus("error");
          return;
        }
        window.location.href = "/studio";
      },
    );
  }, [token]);

  if (!token) {
    return (
      <Alert>
        <AlertTitle>Missing token</AlertTitle>
        <AlertDescription>
          Open the evaluator link shared with your review packet, or paste the
          token on the{" "}
          <Link href="/login" className="underline underline-offset-4">
            login page
          </Link>
          .
        </AlertDescription>
      </Alert>
    );
  }

  if (status === "error") {
    return (
      <Alert variant="destructive">
        <AlertTitle>Could not sign in</AlertTitle>
        <AlertDescription>
          The token was rejected. Check EVALUATOR_ACCESS_TOKEN on the deployment.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <p className="text-sm text-muted-foreground">
      {status === "loading" ? "Signing you in…" : "Preparing evaluator session…"}
    </p>
  );
}

export default function EvaluatorPage() {
  return (
    <main className="mx-auto flex max-w-md flex-col gap-6 px-4 py-24 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Evaluator access</h1>
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
        <EvaluatorBootstrap />
      </Suspense>
    </main>
  );
}
