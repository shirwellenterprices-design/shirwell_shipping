import { getCurrentAccount } from "@/lib/supabase/account";
import SiteChrome from "./SiteChrome";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const account = await getCurrentAccount();

  return <SiteChrome account={account}>{children}</SiteChrome>;
}
