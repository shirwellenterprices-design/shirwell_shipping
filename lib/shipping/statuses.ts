import type { FlowStepId } from "./flow";

export type OrderStatus =
  | "draft"
  | "payment_pending"
  | "paid"
  | "processing"
  | "packed"
  | "ready_for_shipping"
  | "completed"
  | "cancelled";

export type DeliveryStatus =
  | "pending_assignment"
  | "assigned"
  | "accepted"
  | "en_route_pickup"
  | "picked_up"
  | "in_transit"
  | "out_for_delivery"
  | "arrived"
  | "otp_pending"
  | "pod_pending"
  | "delivered"
  | "failed"
  | "returned";

export const DELIVERY_STATUS_LABEL: Record<DeliveryStatus, string> = {
  pending_assignment: "Awaiting driver",
  assigned: "Assigned",
  accepted: "Driver accepted",
  en_route_pickup: "En route to warehouse",
  picked_up: "Picked up",
  in_transit: "In transit",
  out_for_delivery: "Out for delivery",
  arrived: "At destination",
  otp_pending: "OTP verification",
  pod_pending: "Proof of delivery",
  delivered: "Delivered",
  failed: "Failed",
  returned: "Returned",
};

/** Maps operational delivery status to the public flow step for timelines. */
export const DELIVERY_TO_FLOW: Record<DeliveryStatus, FlowStepId> = {
  pending_assignment: "driver_assignment",
  assigned: "driver_assignment",
  accepted: "driver_accepts",
  en_route_pickup: "go_to_warehouse",
  picked_up: "pickup",
  in_transit: "in_transit",
  out_for_delivery: "out_for_delivery",
  arrived: "driver_arrives",
  otp_pending: "customer_otp",
  pod_pending: "proof",
  delivered: "delivered",
  failed: "create_delivery",
  returned: "create_delivery",
};
