import type { Metadata } from "next";
import ContactForm from "@/app/components/ContactForm";
import { formatAddress, hasPhysicalAddress, siteConfig } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us — Shipping Support & Quotes",
  description: `Contact ${siteConfig.name} for tracking help, freight quotes, documentation questions, and logistics support. Email us or use the contact form.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const address = formatAddress();
  const phone = siteConfig.contactPhone;

  return (
    <main className="min-h-[calc(100dvh-4rem)] bg-background px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-5xl animate-fade-up">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">Contact</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Get in Touch
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Have a question about shipping, need a custom quote, or need help with a tracking
          code? Send us a message and our team will respond as soon as possible.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
          <ContactForm />

          <div className="space-y-8 rounded-2xl border border-border bg-surface-elevated p-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted">Email</h2>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="mt-2 block break-all text-lg text-foreground hover:text-gold"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
            {phone ? (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted">Phone</h2>
                <a
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="mt-2 block text-lg text-foreground hover:text-gold"
                >
                  {phone}
                </a>
              </div>
            ) : null}
            {hasPhysicalAddress() && address ? (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted">Address</h2>
                <p className="mt-2 text-lg leading-relaxed text-foreground">{address}</p>
              </div>
            ) : null}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted">
                Business Hours
              </h2>
              <p className="mt-2 text-lg text-foreground">
                Monday – Friday: 8:00 AM – 6:00 PM
                <br />
                Saturday: 9:00 AM – 1:00 PM
              </p>
            </div>
            <p className="text-sm text-muted">
              See our{" "}
              <Link href="/privacy" className="text-gold hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-gold hover:underline">
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Editorial help content */}
      <div className="mx-auto mt-16 max-w-4xl space-y-10 border-t border-border pt-12 text-base leading-relaxed text-muted">
        <h2 className="text-xl font-semibold text-foreground">What to include in your message</h2>
        <p>
          The faster you can give us context, the faster we can help. For tracking enquiries, include
          your tracking number and the last status you can see. For booking questions, mention the
          origin and destination, approximate weight and dimensions, and whether the goods need any
          special handling. For documentation or customs queries, attach or describe the commercial
          invoice and the product category. The more detail you provide upfront, the fewer back-and-forth
          emails we need before giving you a useful answer.
        </p>

        <h2 className="text-xl font-semibold text-foreground">Common questions we can help with</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>Tracking a shipment:</strong> If your tracking has not updated in longer than expected, email your tracking number. We can check the carrier&apos;s internal system and tell you whether the silence is routine (common on long sea legs) or needs escalation.</li>
          <li><strong>Customs holds:</strong> If your shipment is held at customs, we need a copy of the commercial invoice and, where relevant, any permits or certificates for the goods. Contact us as soon as you see the hold status — delays compound quickly in customs.</li>
          <li><strong>Rate quotes:</strong> For a freight quote, use the rate calculator first for an estimate. For complex cargo — overweight, oversize, hazardous, or perishable goods — contact us directly with full cargo details and we can look at specific carrier options.</li>
          <li><strong>Booking modifications:</strong> Address corrections, date changes, or cargo amendments after booking should be raised immediately. Changes are easier to make before the cargo is in transit.</li>
          <li><strong>Missing or damaged deliveries:</strong> Report missing deliveries within 24 hours of the expected delivery date. For damaged goods, photograph the outer packaging and contents before unpacking further and email those photos with your tracking number.</li>
          <li><strong>Returns and refusals:</strong> If a shipment has been refused at destination or is being returned to sender, contact us promptly. We can advise on options for redirecting or disposing of the cargo before it re-enters the origin country.</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground">Self-service resources</h2>
        <p>
          Many questions are answered in our help resources. Before you write, check the{" "}
          <Link href="/faq" className="font-semibold text-gold hover:underline">Shipping FAQ</Link>,{" "}
          the{" "}
          <Link href="/shipping-guide" className="font-semibold text-gold hover:underline">Shipping Guide overview</Link>,{" "}
          or our{" "}
          <Link href="/guides" className="font-semibold text-gold hover:underline">full guides library</Link>{" "}
          which covers packing, customs basics, dimensional weight, tracking status, and freight mode comparison in detail. The rate calculator is available without an account if you need a quick estimate.
        </p>

        <h2 className="text-xl font-semibold text-foreground">Response times</h2>
        <p>
          We aim to reply to all email enquiries within one business day during Monday–Friday 8:00 AM to 6:00 PM. Messages sent on weekends or public holidays are handled the next business day. For urgent shipping issues — customs holds, imminent delivery failures — include &quot;URGENT&quot; in the subject line so the message is prioritised.
        </p>
      </div>
    </main>
  );
}
