import { getTrackingSnapshot, type TrackingSnapshot } from "@/lib/tracking";
import { createClient } from "@/lib/supabase/server";
import type { ShipmentRow } from "@/lib/supabase/types";

function rowToSnapshot(row: ShipmentRow): TrackingSnapshot {
  const waypoints =
    row.waypoints && row.waypoints.length > 0
      ? row.waypoints
      : [
          { lat: row.origin_lat, lng: row.origin_lng },
          { lat: row.current_lat, lng: row.current_lng },
          { lat: row.destination_lat, lng: row.destination_lng },
        ];

  return {
    code: row.tracking_code,
    status: row.status,
    route: {
      id: row.route_id ?? "custom",
      origin: { name: row.origin_name, lat: row.origin_lat, lng: row.origin_lng },
      destination: {
        name: row.destination_name,
        lat: row.destination_lat,
        lng: row.destination_lng,
      },
      waypoints,
    },
    current: { lat: row.current_lat, lng: row.current_lng },
    progress: row.progress,
    eta: row.eta
      ? new Date(row.eta).toLocaleString("en-AU", {
          weekday: "short",
          day: "numeric",
          month: "short",
          hour: "numeric",
          minute: "2-digit",
        })
      : "Pending",
    updatedAt: row.updated_at,
    speedKmh: row.speed_kmh,
  };
}

export async function getTrackingSnapshotFromDb(code: string): Promise<TrackingSnapshot | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("shipments")
      .select("*")
      .eq("tracking_code", code.trim().toUpperCase())
      .maybeSingle();

    if (error || !data) return null;
    return rowToSnapshot(data as ShipmentRow);
  } catch {
    return null;
  }
}

export async function resolveTrackingSnapshot(code: string): Promise<TrackingSnapshot> {
  const fromDb = await getTrackingSnapshotFromDb(code);
  if (fromDb) return fromDb;
  return getTrackingSnapshot(code);
}
