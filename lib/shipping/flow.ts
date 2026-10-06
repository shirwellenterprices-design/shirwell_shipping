/** End-to-end Shirwell Shipping flow (customer → merchant → driver → delivery). */
export const CUSTOMER_FLOW_STEPS = [
  { id: "browse", label: "Browse Shirwell" },
  { id: "select_product", label: "Select Product" },
  { id: "cart", label: "Add Cart" },
  { id: "checkout", label: "Checkout" },
  { id: "address", label: "Enter Address" },
  { id: "calculate_shipping", label: "Calculate Shipping" },
  { id: "select_method", label: "Select Method" },
  { id: "payment", label: "Payment" },
  { id: "payment_confirmed", label: "Payment Confirmed" },
  { id: "create_order", label: "Create Order" },
  { id: "reserve_inventory", label: "Reserve Inventory" },
  { id: "merchant_processes", label: "Merchant Processes" },
  { id: "packing", label: "Packing" },
  { id: "ready_for_shipping", label: "Ready for Shipping" },
  { id: "create_delivery", label: "Create Delivery Record" },
  { id: "driver_assignment", label: "Driver Assignment" },
  { id: "shirwell_shipping", label: "Shirwell Shipping" },
  { id: "driver_accepts", label: "Driver Accepts" },
  { id: "go_to_warehouse", label: "Go to Warehouse" },
  { id: "scan_package", label: "Scan Package / QR" },
  { id: "pickup", label: "Pickup" },
  { id: "live_gps", label: "Live GPS Tracking" },
  { id: "in_transit", label: "In Transit" },
  { id: "out_for_delivery", label: "Out for Delivery" },
  { id: "driver_arrives", label: "Driver Arrives" },
  { id: "customer_otp", label: "Customer OTP" },
  { id: "proof", label: "Photo / Signature" },
  { id: "delivered", label: "Delivered" },
  { id: "order_completed", label: "Order Completed" },
  { id: "review", label: "Customer Reviews" },
] as const;

export type FlowStepId = (typeof CUSTOMER_FLOW_STEPS)[number]["id"];

export const DELIVERY_PIPELINE = [
  "ready_for_shipping",
  "create_delivery",
  "driver_assignment",
  "driver_accepts",
  "go_to_warehouse",
  "scan_package",
  "pickup",
  "live_gps",
  "in_transit",
  "out_for_delivery",
  "driver_arrives",
  "customer_otp",
  "proof",
  "delivered",
  "order_completed",
] as const satisfies readonly FlowStepId[];

export function flowStepLabel(id: FlowStepId): string {
  return CUSTOMER_FLOW_STEPS.find((s) => s.id === id)?.label ?? id;
}
