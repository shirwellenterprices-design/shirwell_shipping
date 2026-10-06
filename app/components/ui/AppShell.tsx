import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
  narrow?: boolean;
};

export default function AppShell({ children, narrow }: AppShellProps) {
  return (
    <main
      className={`mx-auto w-full px-4 py-6 pt-24 lg:pt-28 ${
        narrow ? "max-w-lg" : "max-w-5xl"
      }`}
    >
      {children}
    </main>
  );
}
