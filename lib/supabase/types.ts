export type ShipmentStatus = "Processing" | "In Transit" | "Out for Delivery" | "Delivered";

export type ShipmentRow = {
  id: string;
  tracking_code: string;
  status: ShipmentStatus;
  origin_name: string;
  origin_lat: number;
  origin_lng: number;
  destination_name: string;
  destination_lat: number;
  destination_lng: number;
  current_lat: number;
  current_lng: number;
  progress: number;
  route_id: string | null;
  waypoints: { lat: number; lng: number }[] | null;
  speed_kmh: number;
  eta: string | null;
  updated_at: string;
  created_at: string;
};

export type ProfileRow = {
  id: string;
  email: string;
  role: "customer" | "admin";
  full_name?: string | null;
  name?: string | null;
  phone?: string | null;
  created_at: string;
};

export type ContactInquiryRow = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};
