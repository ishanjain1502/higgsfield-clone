"use client";

import { Menu } from "@base-ui/react/menu";
import { ChevronDownIcon, LogOutIcon, UserIcon } from "lucide-react";
import { signOut } from "next-auth/react";

import { buttonVariants } from "@/components/ui/button";
import {
  profileMenuSubtitle,
  profileMenuTitle,
  profileTriggerLabel,
  type HeaderUser,
} from "@/lib/header-user";
import { cn } from "@/lib/utils";

const menuPopupClass =
  "z-50 min-w-[12rem] overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95";

const menuItemClass =
  "flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none data-highlighted:bg-muted data-highlighted:text-foreground";

export function HeaderProfileMenu({
  user,
}: {
  user: NonNullable<HeaderUser>;
}) {
  const subtitle = profileMenuSubtitle(user);

  return (
    <Menu.Root>
      <Menu.Trigger
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "max-w-[11rem] gap-1.5 border-white/15 bg-white/5",
        )}
        aria-label="Open profile menu"
      >
        <UserIcon className="size-4 shrink-0" aria-hidden />
        <span className="truncate">{profileTriggerLabel(user)}</span>
        <ChevronDownIcon className="size-3.5 shrink-0 opacity-70" aria-hidden />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={8} align="end">
          <Menu.Popup className={menuPopupClass}>
            <div className="border-b border-border px-3 py-2.5">
              <p className="text-sm font-medium leading-tight">
                {profileMenuTitle(user)}
              </p>
              {subtitle ? (
                <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
              ) : null}
            </div>
            <Menu.Item
              className={menuItemClass}
              onClick={() => {
                void signOut({ callbackUrl: "/login" });
              }}
            >
              <LogOutIcon className="size-4" aria-hidden />
              Log out
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
