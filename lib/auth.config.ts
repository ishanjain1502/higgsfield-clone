import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

const googleProvider =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    : null;

export const authConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: googleProvider ? [googleProvider] : [],
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
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
