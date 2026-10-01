import type { ReactNode } from "react";

export default function AppShell({
  children,
  className = "",
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <main className={`min-h-[calc(100dvh-4rem)] bg-background px-4 py-6 sm:px-6 sm:py-10 ${className}`}>
      <div className={`mx-auto animate-fade-up ${narrow ? "max-w-lg" : "max-w-3xl"}`}>{children}</div>
    </main>
  );
}
