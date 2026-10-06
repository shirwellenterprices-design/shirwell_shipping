import type { AccountProfile } from "@/lib/supabase/account";
import { DEMO_DRIVERS } from "./demo-data";

/** Maps signed-in driver to demo fleet row until Supabase drivers table exists. */
export function demoDriverIdForAccount(account: AccountProfile): string {
  const match = DEMO_DRIVERS.find(
    (d) => d.email.toLowerCase() === account.email.toLowerCase(),
  );
  return match?.id ?? DEMO_DRIVERS[0]?.id ?? "drv_1";
}

export function demoDriverForAccount(account: AccountProfile) {
  const id = demoDriverIdForAccount(account);
  return DEMO_DRIVERS.find((d) => d.id === id) ?? DEMO_DRIVERS[0];
}
