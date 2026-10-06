import Link from "next/link";
import LogoBrand from "./LogoBrand";
import { formatAddress, siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-primary-dark px-4 pb-8 pt-12 text-muted sm:px-6 sm:pt-16">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <LogoBrand />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Cost-effective logistic solutions for every business. Domestic, international,
              and e-commerce delivery with complete flexibility.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: "/shipping-guide", label: "Shipping Guide" },
                { href: "/guides", label: "Guides & Resources" },
                { href: "/faq", label: "Shipping FAQ" },
                { href: "/news", label: "News & Updates" },
                { href: "/book", label: "Book Freight" },
                { href: "/track", label: "Track Shipment" },
                { href: "/calculator", label: "Rate Calculator" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: "/home", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact" },
                { href: "/policies", label: "Publication Policies" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/login", label: "Login" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
              Reach Out to Us
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-gold">
                  {siteConfig.contactEmail}
                </a>
              </li>
              {siteConfig.contactPhone ? (
                <li>
                  <a
                    href={`tel:${siteConfig.contactPhone.replace(/\D/g, "")}`}
                    className="hover:text-gold"
                  >
                    {siteConfig.contactPhone}
                  </a>
                </li>
              ) : null}
              {formatAddress() ? <li>{formatAddress()}</li> : null}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:mt-12 sm:flex-row">
          <p className="text-center text-sm text-muted/70 sm:text-left">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:justify-end">
            <Link href="/policies" className="text-sm text-muted/70 transition-colors hover:text-gold">
              Policies
            </Link>
            <Link href="/privacy" className="text-sm text-muted/70 transition-colors hover:text-gold">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-muted/70 transition-colors hover:text-gold">
              Terms
            </Link>
            <Link href="/contact" className="text-sm text-muted/70 transition-colors hover:text-gold">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
