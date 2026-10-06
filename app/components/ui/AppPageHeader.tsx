import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type AppPageHeaderProps = {
  title: string;
  backHref?: string;
  subtitle?: string;
};

export default function AppPageHeader({ title, backHref, subtitle }: AppPageHeaderProps) {
  return (
    <header className="mb-6">
      {backHref ? (
        <Link
          href={backHref}
          className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-gold hover:text-gold-bright"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          Back
        </Link>
      ) : null}
      <h1 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">{title}</h1>
      {subtitle ? <p className="mt-2 text-sm text-muted">{subtitle}</p> : null}
    </header>
  );
}
