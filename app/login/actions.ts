"use server";

import { createClient } from "@/lib/supabase/server";
import { absoluteUrl } from "@/lib/site";
import { redirect } from "next/navigation";

export type AuthState = {
  error?: string;
  success?: string;
};

function safeNext(raw: string): string {
  return raw.startsWith("/") ? raw : "/account";
}

export async function loginAction(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = safeNext(String(formData.get("next") ?? "/account"));

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  if (data.user) {
    const { error: profileError } = await supabase.from("profiles").upsert(
      {
        id: data.user.id,
        email: data.user.email ?? email,
        role: "customer",
      },
      { onConflict: "id", ignoreDuplicates: true },
    );

    if (profileError) {
      console.error("profiles upsert:", profileError.message);
    }
  }

  redirect(next);
}

export async function signUpAction(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm_password") ?? "");
  const next = safeNext(String(formData.get("next") ?? "/account"));

  if (!email || !password) {
    return { error: "Email and password are required." };
  }
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }
  if (password !== confirm) {
    return { error: "Passwords do not match." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: absoluteUrl(`/auth/callback?next=${encodeURIComponent(next)}`),
      data: {
        full_name: fullName || undefined,
        name: fullName || undefined,
        phone: phone || undefined,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user) {
    const { error: profileError } = await supabase.from("profiles").upsert(
      {
        id: data.user.id,
        email: data.user.email ?? email,
        role: "customer",
        full_name: fullName || null,
        phone: phone || null,
      },
      { onConflict: "id" },
    );

    if (profileError) {
      console.error("profiles upsert on signup:", profileError.message);
    }
  }

  // Email confirmation enabled → no session yet
  if (!data.session) {
    return {
      success:
        "Account created. Check your email to confirm, then sign in.",
    };
  }

  redirect(next);
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/home");
}
