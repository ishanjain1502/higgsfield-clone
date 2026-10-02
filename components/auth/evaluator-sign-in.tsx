"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type EvaluatorSignInProps = {
  enabled: boolean;
};

export function EvaluatorSignIn({ enabled }: EvaluatorSignInProps) {
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!enabled) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await signIn("evaluator", {
        token,
        redirect: false,
        callbackUrl: "/studio",
      });
      if (result?.error) {
        setError("Invalid evaluator token.");
        return;
      }
      window.location.href = "/studio";
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-4 ring-1 ring-foreground/5"
    >
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Evaluator access</p>
        <p className="text-xs text-muted-foreground">
          Review the app without Google OAuth. Use the token from your deployment
          env or the one-time link your team shared.
        </p>
      </div>
      <Input
        type="password"
        name="token"
        autoComplete="off"
        placeholder="Evaluator access token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        disabled={loading}
      />
      {error ? (
        <p className="text-xs text-destructive" role="alert">{error}</p>
      ) : null}
      <Button
        type="submit"
        variant="outline"
        className="w-full border-[color-mix(in_srgb,var(--hf-accent)_35%,transparent)] text-[var(--hf-accent)]"
        disabled={loading || !token.trim()}
      >
        Continue as evaluator
      </Button>
    </form>
  );
}
