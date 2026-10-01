"use client";

import { signOutAction } from "@/app/login/actions";
import type { AccountProfile } from "@/lib/supabase/account";
import {
  Bell,
  ChevronDown,
  HelpCircle,
  MapPin,
  Package,
  Ship,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

const MENU_ITEMS = [
  { href: "/account", label: "My Profile", icon: User },
  { href: "/shipments", label: "My Shipments", icon: Package },
  { href: "/track", label: "Track Package", icon: MapPin },
  { href: "/book", label: "Book Freight", icon: Ship },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/contact", label: "Help & Support", icon: HelpCircle },
  { href: "/privacy", label: "Privacy Policy", icon: Shield },
] as const;

type UserMenuProps = {
  account: AccountProfile;
};

export default function UserMenu({ account }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const shortName =
    account.name.split(/\s+/).filter(Boolean)[0] ||
    account.email.split("@")[0] ||
    "User";

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        className="inline-flex max-w-[12rem] items-center gap-2 rounded-xl border border-gold/40 bg-surface-elevated py-1.5 pl-1.5 pr-2.5 text-left transition-colors hover:border-gold hover:bg-gold/10"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold text-sm font-bold text-black">
          {account.initials}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold text-foreground">
            {shortName}
          </span>
          <span className="block truncate text-[11px] capitalize text-muted">
            {account.role}
          </span>
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-gold transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 z-[70] mt-2 w-72 overflow-hidden rounded-2xl border border-border bg-[#121212] shadow-2xl shadow-black/50"
        >
          <div className="border-b border-border px-4 py-3">
            <p className="truncate text-sm font-semibold text-foreground">
              {account.name}
            </p>
            <p className="mt-0.5 truncate text-xs text-muted">{account.email}</p>
          </div>

          <ul className="py-1.5">
            {MENU_ITEMS.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-gold/10 hover:text-gold"
                >
                  <Icon className="h-4 w-4 text-gold" strokeWidth={1.75} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t border-border p-2">
            <form action={signOutAction}>
              <button
                type="submit"
                role="menuitem"
                className="w-full rounded-xl px-4 py-2.5 text-center text-sm font-semibold text-brand-red transition-colors hover:bg-brand-red/10"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
