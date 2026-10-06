import ContactForm from "./ContactForm";
import { formatAddress, hasPhysicalAddress, siteConfig } from "@/lib/site";

export default function Contact() {
  const address = formatAddress();
  const phone = siteConfig.contactPhone;

  return (
    <section id="contact" className="bg-surface px-4 py-12 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-gold">Contact Us</span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Have a question about shipping or need a custom quote? Send us a message and our
            team will get back to you.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-8 sm:mt-12 sm:gap-12 lg:grid-cols-2">
          <ContactForm />

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Email</h3>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="mt-2 block break-all text-base text-muted hover:text-gold sm:text-lg"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
            {phone ? (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
                  Phone
                </h3>
                <a
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="mt-2 block text-lg text-muted hover:text-gold"
                >
                  {phone}
                </a>
              </div>
            ) : null}
            {hasPhysicalAddress() && address ? (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
                  Address
                </h3>
                <p className="mt-2 text-lg leading-relaxed text-muted">{address}</p>
              </div>
            ) : null}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
                Business Hours
              </h3>
              <p className="mt-2 text-lg text-muted">
                Monday – Friday: 8:00 AM – 6:00 PM (local support hours)
                <br />
                Saturday: 9:00 AM – 1:00 PM
                <br />
                <span className="text-sm">Email anytime — we reply during business hours.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
