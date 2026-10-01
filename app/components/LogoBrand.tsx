import Image from "next/image";
import Link from "next/link";

type LogoBrandProps = {
  className?: string;
  compact?: boolean;
};

export default function LogoBrand({ className = "", compact = false }: LogoBrandProps) {
  return (
    <Link
      href="/home"
      className={`inline-flex shrink-0 items-center gap-2.5 ${className}`}
      aria-label="Shirwell Shipping"
    >
      <span
        className={`relative block overflow-hidden rounded-xl bg-white shadow-md shadow-black/40 ring-1 ring-gold/30 ${
          compact
            ? "h-11 w-11 sm:h-12 sm:w-12 md:h-[3.25rem] md:w-[3.25rem]"
            : "h-14 w-14 sm:h-16 sm:w-16"
        }`}
      >
        <Image
          src="/ship.png"
          alt="Shirwell Shipping"
          fill
          className="object-contain p-0.5"
          sizes="(max-width: 640px) 44px, 64px"
          priority
        />
      </span>
      <span
        className={`hidden truncate font-bold leading-tight text-gold sm:block ${
          compact ? "text-sm" : "text-base"
        }`}
      >
        Shirwell Shipping
      </span>
    </Link>
  );
}
