import NextAuth from "next-auth";

import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  matcher: [
    "/home/:path*",
    "/studio/:path*",
    "/focus/:path*",
    "/create/:path*",
  ],
};
