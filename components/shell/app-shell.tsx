"use client";

import { usePathname } from "next/navigation";

import { showsModeSwitcher } from "@/lib/app-routes";

import { HiggsfieldHeader } from "./higgsfield-header";
import { HiggsfieldProductNav } from "./higgsfield-product-nav";
import { HiggsfieldPromoBar } from "./higgsfield-promo-bar";
import { ModeSwitcher } from "./mode-switcher";

const MINIMAL_CHROME_PREFIXES = ["/login", "/onboarding", "/evaluator"];

function usesMinimalChrome(pathname: string): boolean {
  return MINIMAL_CHROME_PREFIXES.some((p) => pathname.startsWith(p));
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const minimal = usesMinimalChrome(pathname);
  const modeSwitcher = showsModeSwitcher(pathname);

  if (minimal) {
    return (
      <>
        <HiggsfieldPromoBar />
        <HiggsfieldHeader />
        {children}
      </>
    );
  }

  return (
    <>
      <HiggsfieldPromoBar />
      <HiggsfieldHeader />
      <HiggsfieldProductNav />
      {modeSwitcher ? <ModeSwitcher /> : null}
      {children}
    </>
  );
}
