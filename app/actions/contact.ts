"use server";

import { createClient } from "@/lib/supabase/server";

export type ContactState = {
  success?: boolean;
  error?: string;
};

export async function submitContactAction(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { error: "All fields are required." };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { error: "Contact form is not configured yet." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_inquiries").insert({ name, email, message });

  if (error) {
    return { error: "Failed to send message. Please try again." };
  }

  return { success: true };
}
