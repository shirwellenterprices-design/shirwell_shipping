import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="grid lg:grid-cols-2">
      <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-[520px]">
        <Image
          src="/about-truck-branded.png"
          alt="Shirwell Shipping delivery truck with company logo on the side door"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center bg-brand-red px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-20">
        <span className="mb-4 block h-1 w-12 bg-white sm:mb-6 sm:w-14" aria-hidden="true" />
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white sm:text-sm">About Us</p>
        <h2 className="mt-4 max-w-xl text-xl font-bold leading-snug text-white sm:mt-5 sm:text-2xl lg:text-3xl">
          Shirwell Shipping helps businesses and individuals plan, book, and track freight
          online.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/95 sm:mt-6 sm:text-base lg:text-[1.05rem]">
          Use our tools for sea, air, and land shipping estimates, shipment booking requests,
          live tracking, and practical shipping guides. We focus on clear status updates and
          straightforward support when you need help with a delivery.
        </p>
        <Link
          href="/about"
          className="mt-6 inline-flex w-fit rounded-xl border border-white/40 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
        >
          Learn more about us
        </Link>
      </div>
    </section>
  );
}
