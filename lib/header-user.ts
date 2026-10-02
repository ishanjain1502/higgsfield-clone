import type { Session } from "next-auth";

export type HeaderUser = {
  name?: string | null;
  role?: "evaluator";
} | null;

type SignedInHeaderUser = NonNullable<HeaderUser>;

/** Serializable snapshot for server-rendered header chrome. */
export function headerUserFromSession(session: Session | null): HeaderUser {
  if (!session?.user) return null;
  return {
    name: session.user.name,
    role: session.user.role,
  };
}

export function profileTriggerLabel(user: SignedInHeaderUser): string {
  if (user.role === "evaluator") return "Evaluator";
  return user.name?.split(" ")[0] ?? "Profile";
}

export function profileMenuTitle(user: SignedInHeaderUser): string {
  if (user.role === "evaluator") return "Evaluator";
  return user.name ?? "Account";
}

export function profileMenuSubtitle(user: SignedInHeaderUser): string | null {
  if (user.role === "evaluator") return "Reviewer access";
  if (user.name) return "Signed in with Google";
  return null;
}
