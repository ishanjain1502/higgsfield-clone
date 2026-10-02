import type { Session } from "next-auth";

import type { HeaderUser } from "./higgsfield-header";

/** Serializable snapshot for server-rendered header chrome. */
export function headerUserFromSession(session: Session | null): HeaderUser {
  if (!session?.user) return null;
  return {
    name: session.user.name,
    role: session.user.role,
  };
}
