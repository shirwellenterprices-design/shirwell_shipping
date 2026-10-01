import type { Metadata } from "next";
import LegalPage from "@/app/components/LegalPage";
import { formatAddress, siteConfig } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${siteConfig.name} shipping, tracking, booking, and logistics services.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="July 21, 2026">
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use of{" "}
        {siteConfig.name} websites, apps, and logistics services (the &quot;Services&quot;). By
        using the Services, you agree to these Terms.
      </p>

      <h2>1. Services</h2>
      <p>
        {siteConfig.name} provides shipping-related tools including shipment tracking, booking
        requests, rate estimates, account management, and logistics information. Rate estimates
        are approximate and final pricing may vary based on actual weight, dimensions, customs,
        fuel surcharges, and carrier rules.
      </p>

      <h2>2. Accounts</h2>
      <p>
        You are responsible for maintaining the confidentiality of your login credentials and
        for all activity under your account. Provide accurate information and notify us promptly
        of unauthorized use.
      </p>

      <h2>3. Acceptable Use</h2>
      <ul>
        <li>Do not misuse tracking systems, scrape data, or attempt unauthorized access</li>
        <li>Do not ship prohibited, illegal, or hazardous goods without proper authorization</li>
        <li>Do not interfere with site security, ads, or other users</li>
        <li>Comply with all applicable customs, export, and transportation laws</li>
      </ul>

      <h2>4. Bookings &amp; Shipments</h2>
      <p>
        Booking requests submitted through the Services are subject to confirmation, capacity,
        and carrier acceptance. Tracking information is provided for convenience and may be
        delayed or incomplete. We are not liable for third-party carrier delays beyond our
        reasonable control.
      </p>

      <h2>5. Advertising</h2>
      <p>
        The Services may display advertisements via Google AdSense (web) and Google AdMob
        (mobile). Ads are provided by third parties and are subject to their terms and privacy
        practices. See our <Link href="/privacy">Privacy Policy</Link> for details.
      </p>

      <h2>6. Reader offers (Publisher Center / Reader Revenue Manager)</h2>
      <p>
        If we offer reader registration, contributions, or subscriptions through Google Reader
        Revenue Manager or similar Publisher Center tools, those offers are subject to these
        Terms, our <Link href="/privacy">Privacy Policy</Link>, Google&apos;s applicable terms,
        and any offer details shown at purchase or signup. Access to gated content depends on a
        valid entitlement. Refunds and cancellations follow the terms displayed at purchase and
        applicable law.
      </p>
      <p>
        Do not attempt to circumvent paywalls, share access credentials unlawfully, or misuse
        reader offers. Publication policy links are listed at{" "}
        <Link href="/policies">Publication Policies</Link>.
      </p>

      <h2>7. Intellectual Property</h2>
      <p>
        All content, branding, logos, and software associated with {siteConfig.name} are owned
        by us or our licensors. You may not copy, modify, or redistribute them without
        permission.
      </p>

      <h2>8. Disclaimers</h2>
      <p>
        The Services are provided &quot;as is&quot; and &quot;as available&quot; without
        warranties of any kind, express or implied, including merchantability, fitness for a
        particular purpose, and non-infringement, to the fullest extent permitted by law.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, {siteConfig.name} and its affiliates shall not
        be liable for indirect, incidental, special, consequential, or punitive damages, or any
        loss of profits, data, or goodwill arising from your use of the Services.
      </p>

      <h2>10. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless {siteConfig.name} from claims arising out of
        your misuse of the Services, violation of these Terms, or shipment of prohibited goods.
      </p>

      <h2>11. Changes</h2>
      <p>
        We may update these Terms from time to time. Continued use after changes become
        effective constitutes acceptance of the revised Terms.
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions about these Terms:{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
        {siteConfig.contactPhone ? <>, {siteConfig.contactPhone}</> : null}
        {formatAddress() ? <>, {formatAddress()}</> : null}.
      </p>
    </LegalPage>
  );
}
