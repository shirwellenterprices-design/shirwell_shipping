import Image from "next/image";
import { ScanLine } from "lucide-react";
import QuickAccess from "./QuickAccess";

export default function Hero() {
  return (
    <div className="bg-background">
      {/* Screen 1 — Home: ship sunset hero + tracking overlay */}
      <section id="home" className="relative min-h-[100dvh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-ship.png"
            alt="Cargo ship carrying containers at sunset"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/90" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-lg flex-col px-4 pb-8 pt-24 sm:max-w-xl sm:px-6 sm:pt-28 lg:max-w-6xl lg:px-8 lg:pt-32">
          <div className="flex flex-1 flex-col justify-center gap-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-14">
            {/* Hero copy */}
            <div className="animate-fade-up">
              <span className="mb-4 block h-[3px] w-12 bg-gold sm:mb-5" aria-hidden="true" />
              <h1 className="text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
                Fast Delivery <span className="text-gold">Service</span>
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/90 sm:mt-5 sm:text-base">
                We are committed to provide cost effective Logistic Solutions for every
                business. With a timed delivery that offers complete flexibility, Shirwell
                ensures that you never have to wait.
              </p>
            </div>

            {/* Tracking card overlaid on hero */}
            <div
              id="track"
              className="animate-fade-up-delay w-full rounded-2xl bg-surface-elevated/95 p-5 shadow-2xl shadow-black/50 backdrop-blur-sm sm:p-6"
            >
              <p className="text-base font-semibold text-white">Enter Tracking Code</p>
              <form action="/track" method="get" className="mt-4">
                <label htmlFor="tracking-code" className="sr-only">
                  Tracking code
                </label>
                <div className="relative">
                  <input
                    id="tracking-code"
                    name="code"
                    type="text"
                    placeholder="Tracking Code"
                    required
                    className="w-full rounded-xl border border-border bg-[#121212] px-4 py-3.5 pr-12 text-white placeholder:text-muted focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gold">
                    <ScanLine className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full rounded-xl bg-gold py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-black transition-colors hover:bg-gold-bright"
                >
                  Track Shipment
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="px-4 pb-8 sm:px-6">
        <div className="mx-auto max-w-lg sm:max-w-xl lg:max-w-3xl">
          <QuickAccess />
        </div>
      </div>
    </div>
  );
}
