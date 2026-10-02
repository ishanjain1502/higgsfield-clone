import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Space_Grotesk } from "next/font/google";

import { Providers } from "@/components/providers";
import { AppShell } from "@/components/shell/app-shell";
import { HiggsfieldHeader } from "@/components/shell/higgsfield-header";
import { HiggsfieldPromoBar } from "@/components/shell/higgsfield-promo-bar";
import { auth } from "@/lib/auth";
import { headerUserFromSession } from "@/lib/header-user";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Creative Studio",
  description: "Higgsfield-inspired creative studio — v1",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const session = await auth();
  const headerUser = headerUserFromSession(session);

  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-full flex-col"
        suppressHydrationWarning
      >
        <Providers session={session}>
          <HiggsfieldPromoBar />
          <HiggsfieldHeader user={headerUser} />
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
