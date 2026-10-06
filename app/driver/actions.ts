"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type DriverAuthState = {
  error?: string;
};

export async function driverLoginAction(
  _prevState: DriverAuthState,
  formData: FormData,
): Promise<DriverAuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (profile?.role !== "driver") {
    await supabase.auth.signOut();
    return { error: "Access denied. Driver account required." };
  }

  redirect("/driver/dashboard");
}
