import Link from "next/link";

const links = [
  { href: "/home", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/book", label: "Book" },
  { href: "/calculator", label: "Rates" },
  { href: "/shipments", label: "Shipments" },
  { href: "/#contact", label: "Contact" },
];

export default function SectionNav() {
  return (
    <nav className="border-b border-border bg-surface">
      <ul className="flex items-center gap-6 overflow-x-auto px-4 py-3 sm:justify-center sm:gap-8 sm:py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {links.map((link) => (
          <li key={link.href} className="shrink-0">
            <Link
              href={link.href}
              className="text-xs font-semibold uppercase tracking-[0.15em] text-muted transition-colors hover:text-gold sm:text-sm sm:tracking-[0.2em]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
