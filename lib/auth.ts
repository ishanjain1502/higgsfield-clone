import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import { authConfig } from "@/lib/auth.config";
import { isAuthConfigured } from "@/lib/auth-env";
import { prisma } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: isAuthConfigured() ? PrismaAdapter(prisma) : undefined,
});
