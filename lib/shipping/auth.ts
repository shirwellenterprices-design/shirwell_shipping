import { getCurrentAccount, type AccountProfile } from "@/lib/supabase/account";
import { redirect } from "next/navigation";

export async function requireAccount(): Promise<AccountProfile> {
  const account = await getCurrentAccount();
  if (!account) redirect("/login");
  return account;
}

export async function requireAdmin(): Promise<AccountProfile> {
  const account = await requireAccount();
  if (account.role !== "admin") redirect("/admin");
  return account;
}

export async function requireDriver(): Promise<AccountProfile> {
  const account = await requireAccount();
  if (account.role !== "driver") redirect("/driver/login");
  return account;
}
