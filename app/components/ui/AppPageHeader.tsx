"use client";

import { ArrowLeft, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type AppPageHeaderProps = {
  title: string;
  backHref?: string;
  showMenu?: boolean;
};

export default function AppPageHeader({
  title,
  backHref,
  showMenu = true,
}: AppPageHeaderProps) {
  const router = useRouter();

  return (
    <header className="mb-6 flex items-center justify-between gap-3">
      {backHref ? (
        <Link
          href={backHref}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-surface-elevated"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={1.75} />
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-surface-elevated"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={1.75} />
        </button>
      )}

      <h1 className="flex-1 text-center text-lg font-bold text-gold">{title}</h1>

      {showMenu ? (
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-surface-elevated"
          aria-label="More options"
        >
          <MoreVertical className="h-5 w-5" strokeWidth={1.75} />
        </button>
      ) : (
        <div className="h-10 w-10" aria-hidden="true" />
      )}
    </header>
  );
}
