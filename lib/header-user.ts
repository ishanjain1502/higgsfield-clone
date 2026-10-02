import type { Session } from "next-auth";

export type HeaderUser = {
  name?: string | null;
  role?: "evaluator";
} | null;

/** Serializable snapshot for server-rendered header chrome. */
export function headerUserFromSession(session: Session | null): HeaderUser {
  if (!session?.user) return null;
  return {
    name: session.user.name,
    role: session.user.role,
  };
}
