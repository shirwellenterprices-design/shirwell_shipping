import { createClient } from "@/lib/supabase/server";
import type { ProfileRow } from "@/lib/supabase/types";

export type AccountProfile = {
  id: string;
  email: string;
  role: ProfileRow["role"];
  name: string;
  phone: string;
  initials: string;
};

function initialsFrom(name: string, email: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  if (parts.length === 1 && parts[0].length >= 2) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return email.slice(0, 2).toUpperCase() || "SW";
}

function displayNameFrom(
  profile: Partial<ProfileRow> | null,
  meta: Record<string, unknown> | undefined,
  email: string,
): string {
  const fromProfile =
    (typeof profile?.full_name === "string" && profile.full_name.trim()) ||
    (typeof profile?.name === "string" && profile.name.trim()) ||
    "";
  if (fromProfile) return fromProfile;

  const fromMeta =
    (typeof meta?.full_name === "string" && meta.full_name.trim()) ||
    (typeof meta?.name === "string" && meta.name.trim()) ||
    "";
  if (fromMeta) return fromMeta;

  const local = email.split("@")[0] ?? "Customer";
  return local
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Current signed-in account from Supabase Auth + profiles (shirwelldb). */
export async function getCurrentAccount(): Promise<AccountProfile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error("profiles fetch:", profileError.message);
  }

  const email = profile?.email || user.email || "";
  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const name = displayNameFrom(profile, meta, email);
  const phone =
    (typeof profile?.phone === "string" && profile.phone) ||
    (typeof meta?.phone === "string" && meta.phone) ||
    user.phone ||
    "";

  return {
    id: user.id,
    email,
    role: (profile?.role as ProfileRow["role"]) ?? "customer",
    name,
    phone,
    initials: initialsFrom(name, email),
  };
}
