"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export function GoogleSignInButton({ disabled }: { disabled?: boolean }) {
  return (
    <Button
      type="button"
      size="lg"
      className="w-full"
      disabled={disabled}
      onClick={() => signIn("google", { callbackUrl: "/onboarding" })}
    >
      Continue with Google
    </Button>
  );
}
