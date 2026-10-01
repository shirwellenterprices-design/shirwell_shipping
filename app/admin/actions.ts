"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type AdminAuthState = {
  error?: string;
};

export async function adminLoginAction(
  _prevState: AdminAuthState,
  formData: FormData,
): Promise<AdminAuthState> {
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

  if (profile?.role !== "admin") {
    await supabase.auth.signOut();
    return { error: "Access denied. Admin account required." };
  }

  redirect("/admin/dashboard");
}

export async function createShipmentAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/admin");

  const trackingCode = String(formData.get("tracking_code") ?? "").trim().toUpperCase();
  const originName = String(formData.get("origin_name") ?? "").trim();
  const destinationName = String(formData.get("destination_name") ?? "").trim();
  const status = String(formData.get("status") ?? "Processing");

  const originLat = Number(formData.get("origin_lat"));
  const originLng = Number(formData.get("origin_lng"));
  const destinationLat = Number(formData.get("destination_lat"));
  const destinationLng = Number(formData.get("destination_lng"));
  const currentLat = Number(formData.get("current_lat") || formData.get("origin_lat"));
  const currentLng = Number(formData.get("current_lng") || formData.get("origin_lng"));
  const progress = Number(formData.get("progress") ?? 0);
  const speedKmh = Number(formData.get("speed_kmh") ?? 68);

  const { error } = await supabase.from("shipments").insert({
    tracking_code: trackingCode,
    status,
    origin_name: originName,
    origin_lat: originLat,
    origin_lng: originLng,
    destination_name: destinationName,
    destination_lat: destinationLat,
    destination_lng: destinationLng,
    current_lat: currentLat,
    current_lng: currentLng,
    progress,
    speed_kmh: speedKmh,
    route_id: "custom",
    waypoints: [
      { lat: originLat, lng: originLng },
      { lat: currentLat, lng: currentLng },
      { lat: destinationLat, lng: destinationLng },
    ],
  });

  if (error) {
    redirect(`/admin/dashboard?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/dashboard?created=1");
}

export async function updateShipmentLocationAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin");

  const id = String(formData.get("id"));
  const currentLat = Number(formData.get("current_lat"));
  const currentLng = Number(formData.get("current_lng"));
  const progress = Number(formData.get("progress"));
  const status = String(formData.get("status"));

  await supabase
    .from("shipments")
    .update({
      current_lat: currentLat,
      current_lng: currentLng,
      progress,
      status,
    })
    .eq("id", id);

  redirect("/admin/dashboard?updated=1");
}

export async function updatePricingPlanAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/admin");

  const slug = String(formData.get("slug"));
  const price = Number(formData.get("price"));

  const { error } = await supabase
    .from("pricing_plans")
    .update({ price })
    .eq("slug", slug);

  if (error) {
    redirect(`/admin/dashboard?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/dashboard?pricing=1");
}
