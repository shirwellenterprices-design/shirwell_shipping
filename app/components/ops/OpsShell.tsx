"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import LogoBrand from "../LogoBrand";

export type OpsNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type OpsShellProps = {
  title: string;
  subtitle?: string;
  nav: OpsNavItem[];
  homeHref: string;
  roleLabel: string;
  children: React.ReactNode;
};

export default function OpsShell({
  title,
  subtitle,
  nav,
  homeHref,
  roleLabel,
  children,
}: OpsShellProps) {
  const pathname = usePathname() ?? "";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-surface px-4 py-6 lg:flex">
          <Link href={homeHref} className="mb-8 block">
            <LogoBrand />
          </Link>
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-gold">{roleLabel}</p>
          <nav className="flex flex-1 flex-col gap-1" aria-label={roleLabel}>
            {nav.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-gold/15 text-gold"
                      : "text-muted hover:bg-surface-elevated hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" strokeWidth={active ? 2 : 1.75} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-border bg-surface px-4 py-4 lg:px-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gold lg:hidden">
                  {roleLabel}
                </p>
                <h1 className="font-serif text-xl font-bold sm:text-2xl">{title}</h1>
                {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
              </div>
              <Link
                href="/home"
                className="shrink-0 text-sm font-medium text-gold hover:text-gold-bright"
              >
                Public site
              </Link>
            </div>
            <nav
              className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label={`${roleLabel} mobile`}
            >
              {nav.map(({ href, label }) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                      active ? "bg-gold text-black" : "bg-surface-elevated text-muted"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </header>
          <main className="flex-1 px-4 py-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
