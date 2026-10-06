"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  Calculator,
  HelpCircle,
  LogOut,
  MapPin,
  Menu,
  Package,
  Ship,
  Shield,
  User,
  X,
} from "lucide-react";
import type { AccountProfile } from "@/lib/supabase/account";
import { signOutAction } from "@/app/login/actions";
import LogoBrand from "./LogoBrand";
import UserMenu from "./UserMenu";

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/track", label: "Track" },
  { href: "/book", label: "Book" },
  { href: "/guides", label: "Guides" },
  { href: "/news", label: "News" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const mobileQuickLinks = [
  { href: "/book", label: "Book a Shipment", icon: Ship },
  { href: "/calculator", label: "Rate Calculator", icon: Calculator },
  { href: "/shipments", label: "My Shipments", icon: Package },
  { href: "/track", label: "Track Package", icon: MapPin },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/account", label: "My Profile", icon: User },
  { href: "/contact", label: "Help & Support", icon: HelpCircle },
  { href: "/privacy", label: "Privacy Policy", icon: Shield },
];

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/home"
      ? pathname === "/home" || pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
        isActive
          ? "bg-gold text-black"
          : "text-gold hover:bg-gold/10"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Header({ account }: { account: AccountProfile | null }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/home" || pathname === "/";

  return (
    <header
      className={`${
        isHome
          ? "fixed border-white/5 bg-black/80 backdrop-blur-md"
          : "sticky border-gold/20 bg-black/95 backdrop-blur-md"
      } top-0 left-0 right-0 z-50 border-b`}
    >
      <div className="mx-auto flex min-w-0 max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-6">
        <LogoBrand compact />

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/notifications"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gold/40 text-gold transition-colors hover:bg-gold/10"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" strokeWidth={1.75} />
          </Link>
          {account ? (
            <UserMenu account={account} />
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login?mode=signup"
                className="rounded-xl px-3 py-2 text-sm font-semibold text-gold transition-colors hover:bg-gold/10"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="rounded-xl border border-gold bg-transparent px-4 py-2 text-sm font-bold text-gold transition-colors hover:bg-gold/10"
              >
                Log In
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {account && (
            <Link
              href="/account"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-sm font-bold text-black"
              aria-label="My account"
            >
              {account.initials}
            </Link>
          )}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-gold bg-[#0a0a0a] text-gold transition-colors hover:bg-gold/10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="h-5 w-5" strokeWidth={2} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-white/10 bg-[#0a0a0a] px-3 py-4 lg:hidden">
          {account && (
            <div className="mb-4 flex items-center gap-3 rounded-2xl border border-border bg-surface-elevated px-3 py-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold text-sm font-bold text-black">
                {account.initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {account.name}
                </p>
                <p className="truncate text-xs text-muted">{account.email}</p>
              </div>
            </div>
          )}

          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  label={link.label}
                  onClick={() => setMenuOpen(false)}
                />
              </li>
            ))}
          </ul>

          <ul className="mt-4 space-y-1 border-t border-white/10 pt-4">
            {mobileQuickLinks.map(({ href, label, icon: Icon }) => (
              <li key={`${href}-${label}`}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-elevated"
                >
                  <Icon className="h-5 w-5 text-gold" strokeWidth={1.75} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-white/10 pt-4">
            {account ? (
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-red/30 bg-brand-red/10 py-3 text-sm font-bold text-brand-red"
                >
                  <LogOut className="h-4 w-4" strokeWidth={1.75} />
                  Sign out
                </button>
              </form>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login?mode=signup"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border border-gold py-3 text-center text-sm font-bold text-gold"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl bg-gold py-3 text-center text-sm font-bold text-black"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
