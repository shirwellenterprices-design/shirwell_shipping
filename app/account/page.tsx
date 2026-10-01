import AppPageHeader from "@/app/components/ui/AppPageHeader";
import AppShell from "@/app/components/ui/AppShell";
import { signOutAction } from "@/app/login/actions";
import { getCurrentAccount } from "@/lib/supabase/account";
import {
  Bell,
  ChevronRight,
  HelpCircle,
  LogOut,
  MapPin,
  Package,
  Ship,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const MENU_ITEMS = [
  { href: "/account", label: "Personal Information", icon: User, hint: "Name, email, phone" },
  { href: "/shipments", label: "My Shipments", icon: Package, hint: "Active and past freight" },
  { href: "/track", label: "Track Package", icon: MapPin, hint: "Live shipment status" },
  { href: "/book", label: "Book Freight", icon: Ship, hint: "Sea, air, or land" },
  { href: "/notifications", label: "Notifications", icon: Bell, hint: "Delivery updates" },
  { href: "/contact", label: "Help & Support", icon: HelpCircle, hint: "Talk to our team" },
  { href: "/privacy", label: "Privacy Policy", icon: Shield, hint: "How we use your data" },
];

export const metadata = {
  title: "My Account",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const account = await getCurrentAccount();

  if (!account) {
    redirect("/login?next=/account");
  }

  return (
    <AppShell narrow>
      <AppPageHeader title="My Account" backHref="/home" />

      <div className="animate-fade-up space-y-6">
        <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface-elevated p-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gold text-xl font-bold text-black">
            {account.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-semibold text-foreground">{account.name}</p>
            <p className="mt-1 truncate text-sm text-muted">{account.email}</p>
            {account.phone ? (
              <p className="mt-0.5 text-sm text-muted">{account.phone}</p>
            ) : (
              <p className="mt-0.5 text-sm text-muted/70">No phone on file</p>
            )}
            <p className="mt-2 inline-flex rounded-md bg-gold/15 px-2 py-0.5 text-xs font-semibold capitalize text-gold">
              {account.role} account
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/shipments"
            className="rounded-2xl border border-border bg-surface-elevated p-4 transition-colors hover:border-gold/40"
          >
            <Package className="h-5 w-5 text-gold" strokeWidth={1.75} />
            <p className="mt-3 text-sm font-semibold text-foreground">Shipments</p>
            <p className="mt-1 text-xs text-muted">View history</p>
          </Link>
          <Link
            href="/book"
            className="rounded-2xl border border-border bg-surface-elevated p-4 transition-colors hover:border-gold/40"
          >
            <Ship className="h-5 w-5 text-gold" strokeWidth={1.75} />
            <p className="mt-3 text-sm font-semibold text-foreground">Book now</p>
            <p className="mt-1 text-xs text-muted">New freight</p>
          </Link>
        </div>

        <ul className="overflow-hidden rounded-2xl border border-border bg-surface-elevated">
          {MENU_ITEMS.map(({ href, label, icon: Icon, hint }, index) => (
            <li key={label}>
              <Link
                href={href}
                className={`flex items-center gap-3 px-4 py-4 transition-colors hover:bg-[#242424] ${
                  index < MENU_ITEMS.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <Icon className="h-5 w-5 text-gold" strokeWidth={1.75} />
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-foreground">{label}</span>
                  <span className="block text-xs text-muted">{hint}</span>
                </span>
                <ChevronRight className="h-5 w-5 text-muted" strokeWidth={1.75} />
              </Link>
            </li>
          ))}
        </ul>

        <form action={signOutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-2xl border border-brand-red/30 bg-brand-red/10 px-4 py-4 text-brand-red transition-colors hover:bg-brand-red/15"
          >
            <LogOut className="h-5 w-5" strokeWidth={1.75} />
            <span className="font-semibold">Sign out</span>
          </button>
        </form>
      </div>
    </AppShell>
  );
}
