import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  href?: string;
  className?: string;
};

const baseClass =
  "inline-flex w-full items-center justify-center rounded-xl bg-gold px-5 py-3.5 text-sm font-bold text-black transition-colors hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-60";

export default function PrimaryButton({
  children,
  href,
  className = "",
  type = "button",
  ...props
}: PrimaryButtonProps) {
  const classes = `${baseClass} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
