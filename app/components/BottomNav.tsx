"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Home, Plus, Ship, User } from "lucide-react";

const tabs = [
  {
    href: "/home",
    label: "Home",
    icon: Home,
    match: (p: string) => p === "/home" || p === "/",
  },
  {
    href: "/shipments",
    label: "Shipments",
    icon: Ship,
    match: (p: string) => p.startsWith("/shipments") || p.startsWith("/track"),
  },
  {
    href: "/notifications",
    label: "Notifications",
    icon: Bell,
    match: (p: string) => p.startsWith("/notifications"),
  },
  {
    href: "/account",
    label: "Account",
    icon: User,
    match: (p: string) => p.startsWith("/account") || p.startsWith("/login"),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      aria-label="Primary"
    >
      {/* Curved notch behind the FAB */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[72px] overflow-hidden">
        <svg
          className="absolute bottom-0 left-1/2 h-[72px] w-[120%] max-w-none -translate-x-1/2 text-[#121212]"
          viewBox="0 0 400 72"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0 24 H150 C170 24 175 0 200 0 C225 0 230 24 250 24 H400 V72 H0 Z"
          />
        </svg>
      </div>

      <div className="relative mx-auto flex max-w-lg items-end justify-between px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {tabs.slice(0, 2).map(({ href, label, icon: Icon, match }) => {
          const active = match(pathname);
          return (
            <Link
              key={href}
              href={href}
              className={`flex min-w-[4.25rem] flex-1 flex-col items-center gap-1 px-1 pb-2 pt-3 text-[10px] font-medium transition-colors ${
                active ? "text-gold" : "text-white/70 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2 : 1.75} />
              {label}
            </Link>
          );
        })}

        <div className="relative z-10 flex w-[4.5rem] shrink-0 justify-center">
          <Link
            href="/book"
            className="-mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-black shadow-[0_4px_20px_rgba(255,193,7,0.35)] transition-transform hover:scale-105 hover:bg-gold-bright"
            aria-label="Book a shipment"
          >
            <Plus className="h-7 w-7" strokeWidth={2.5} />
          </Link>
        </div>

        {tabs.slice(2).map(({ href, label, icon: Icon, match }) => {
          const active = match(pathname);
          return (
            <Link
              key={href}
              href={href}
              className={`flex min-w-[4.25rem] flex-1 flex-col items-center gap-1 px-1 pb-2 pt-3 text-[10px] font-medium transition-colors ${
                active ? "text-gold" : "text-white/70 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2 : 1.75} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
