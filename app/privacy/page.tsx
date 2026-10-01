import type { Metadata } from "next";
import LegalPage from "@/app/components/LegalPage";
import { formatAddress, siteConfig } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}. How we collect, use, and protect your information, including advertising cookies and Google AdSense.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 21, 2026">
      <p>
        {siteConfig.name} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates{" "}
        <a href={siteConfig.url}>{siteConfig.url}</a> and related mobile applications. This
        Privacy Policy explains how we collect, use, disclose, and safeguard information when
        you use our shipping, tracking, booking, and logistics services.
      </p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li>
          <strong>Account information:</strong> name, email address, phone number, and login
          credentials when you create or use an account.
        </li>
        <li>
          <strong>Shipment information:</strong> tracking codes, origin and destination
          details, cargo descriptions, and delivery preferences you submit.
        </li>
        <li>
          <strong>Contact inquiries:</strong> messages sent through our contact forms.
        </li>
        <li>
          <strong>Device and usage data:</strong> IP address, browser type, device identifiers,
          pages viewed, and approximate location derived from IP.
        </li>
        <li>
          <strong>Cookies and similar technologies:</strong> used for site functionality,
          analytics, and advertising (including Google AdSense and AdMob).
        </li>
      </ul>

      <h2>2. How We Use Information</h2>
      <ul>
        <li>Provide and improve shipment tracking, booking, and rate calculation services</li>
        <li>Respond to customer support requests</li>
        <li>Secure accounts and prevent fraud or abuse</li>
        <li>Analyze site performance and user experience</li>
        <li>Show relevant advertising through Google AdSense / AdMob where permitted</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>3. Advertising (Google AdSense &amp; AdMob)</h2>
      <p>
        We use Google AdSense on our website and may use Google AdMob in our mobile apps to
        display ads. Google and its partners may use cookies or device identifiers to serve ads
        based on your prior visits to this and other sites/apps. You can learn more and manage
        ad personalization at{" "}
        <a href="https://www.google.com/settings/ads" rel="noopener noreferrer" target="_blank">
          Google Ads Settings
        </a>{" "}
        and review Google&apos;s policies at{" "}
        <a
          href="https://policies.google.com/technologies/ads"
          rel="noopener noreferrer"
          target="_blank"
        >
          How Google uses information from sites or apps that use our services
        </a>
        .
      </p>
      <p>
        Visitors may see a cookie banner. Choosing Accept allows personalized ads; choosing
        Reject still allows non-personalized ads. You can clear site data in your browser to
        reset this choice.
      </p>

      <h2>4. Google Publisher Center &amp; Reader Revenue Manager</h2>
      <p>
        If we enable Google Publisher Center features such as Reader Revenue Manager (for
        example reader registration, contributions, or subscriptions), Google may process
        reader account, email, payment, and engagement data on our behalf according to Google&apos;s
        terms and our instructions. That data is used to provide access offers, process
        payments where applicable, prevent abuse, and improve reader experience.
      </p>
      <p>
        You can review related Google disclosures in your Google Account settings. For privacy
        requests about data we control directly, contact us using the details below. Our
        publication policies overview is available at{" "}
        <Link href="/policies">Publication Policies</Link>.
      </p>

      <h2>5. Cookies</h2>
      <p>
        We use essential cookies for security and authentication, preference cookies for
        settings, analytics cookies to understand traffic, and advertising cookies for AdSense.
        See our cookie banner and this policy for details. You may control cookies through your
        browser settings; disabling some cookies may affect site features.
      </p>

      <h2>6. Sharing of Information</h2>
      <p>
        We may share information with service providers who help operate our platform (for
        example hosting, authentication, maps, analytics, advertising partners such as Google,
        and payment processors used with reader offers). We do not sell your personal
        information as a primary business practice. We may disclose information if required by
        law or to protect our rights and users.
      </p>

      <h2>7. Data Retention &amp; Security</h2>
      <p>
        We retain information only as long as needed for the purposes described above, then
        delete or anonymize it when no longer required. We use reasonable administrative and
        technical safeguards, but no method of transmission over the Internet is 100% secure.
      </p>

      <h2>8. Your Rights</h2>
      <p>
        Depending on your location, you may have rights to access, correct, delete, or restrict
        processing of your personal data, and to object to certain processing or withdraw
        consent. Contact us using the details below to exercise these rights.
      </p>

      <h2>9. Children&apos;s Privacy</h2>
      <p>
        Our services are not directed to children under 13 (or the minimum age required in your
        jurisdiction). We do not knowingly collect personal information from children.
      </p>

      <h2>10. International Transfers</h2>
      <p>
        Your information may be processed in countries other than your own, including where our
        service providers operate. We take steps to ensure appropriate protections are in place.
      </p>

      <h2>11. Contact Us</h2>
      <p>
        For privacy questions or requests, contact {siteConfig.name} at{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
        {siteConfig.contactPhone ? <> or {siteConfig.contactPhone}</> : null}
        {formatAddress() ? <>. Postal address: {formatAddress()}</> : null}.
      </p>
      <p>
        Related pages: <Link href="/policies">Publication Policies</Link>,{" "}
        <Link href="/terms">Terms of Service</Link>, <Link href="/contact">Contact</Link>.
      </p>
    </LegalPage>
  );
}
