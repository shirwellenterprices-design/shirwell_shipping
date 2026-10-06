import type { DeliveryStatus, OrderStatus } from "./statuses";

export type DemoOrder = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  itemsSummary: string;
  totalAud: number;
  shippingMethod: string;
  status: OrderStatus;
  createdAt: string;
};

export type DemoDelivery = {
  id: string;
  trackingCode: string;
  orderNumber: string;
  status: DeliveryStatus;
  driverId: string | null;
  driverName: string | null;
  originName: string;
  destinationName: string;
  destinationAddress: string;
  customerPhone: string;
  eta: string | null;
  failReason?: string;
};

export type DemoDriver = {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  activeDeliveries: number;
  rating: number;
  onDuty: boolean;
};

export const DEMO_ORDERS: DemoOrder[] = [
  {
    id: "ord_1",
    orderNumber: "SW-10482",
    customerName: "Alex Nguyen",
    customerEmail: "alex@example.com",
    itemsSummary: "2× Organic cotton tee, 1× Canvas tote",
    totalAud: 128.5,
    shippingMethod: "Shirwell Same-Day",
    status: "ready_for_shipping",
    createdAt: "2026-10-06T08:12:00Z",
  },
  {
    id: "ord_2",
    orderNumber: "SW-10471",
    customerName: "Jordan Lee",
    customerEmail: "jordan@example.com",
    itemsSummary: "1× Desk lamp",
    totalAud: 89.0,
    shippingMethod: "Standard courier",
    status: "processing",
    createdAt: "2026-10-05T14:30:00Z",
  },
  {
    id: "ord_3",
    orderNumber: "SW-10455",
    customerName: "Sam Patel",
    customerEmail: "sam@example.com",
    itemsSummary: "3× Skincare set",
    totalAud: 210.0,
    shippingMethod: "Express",
    status: "completed",
    createdAt: "2026-10-04T09:00:00Z",
  },
];

export const DEMO_DRIVERS: DemoDriver[] = [
  {
    id: "drv_1",
    name: "Morgan Reid",
    email: "morgan.driver@shirwell.local",
    phone: "+61 400 111 222",
    vehicle: "Van · NSW ABC123",
    activeDeliveries: 1,
    rating: 4.9,
    onDuty: true,
  },
  {
    id: "drv_2",
    name: "Casey Brooks",
    email: "casey.driver@shirwell.local",
    phone: "+61 400 333 444",
    vehicle: "Ute · NSW XYZ789",
    activeDeliveries: 0,
    rating: 4.7,
    onDuty: true,
  },
];

export const DEMO_DELIVERIES: DemoDelivery[] = [
  {
    id: "del_1",
    trackingCode: "SZ5YDN",
    orderNumber: "SW-10482",
    status: "in_transit",
    driverId: "drv_1",
    driverName: "Morgan Reid",
    originName: "Shirwell Warehouse, Sydney",
    destinationName: "Parramatta, NSW",
    destinationAddress: "42 George St, Parramatta NSW 2150",
    customerPhone: "+61 412 555 010",
    eta: "2026-10-06T12:30:00Z",
  },
  {
    id: "del_2",
    trackingCode: "SW9K2P",
    orderNumber: "SW-10490",
    status: "pending_assignment",
    driverId: null,
    driverName: null,
    originName: "Shirwell Warehouse, Sydney",
    destinationName: "Bondi, NSW",
    destinationAddress: "18 Campbell Pde, Bondi NSW 2026",
    customerPhone: "+61 422 555 020",
    eta: null,
  },
  {
    id: "del_3",
    trackingCode: "SW3FAIL",
    orderNumber: "SW-10444",
    status: "failed",
    driverId: "drv_2",
    driverName: "Casey Brooks",
    originName: "Shirwell Warehouse, Sydney",
    destinationName: "North Sydney, NSW",
    destinationAddress: "5 Blue St, North Sydney NSW 2060",
    customerPhone: "+61 433 555 030",
    eta: null,
    failReason: "Recipient unavailable after 2 attempts",
  },
];

export function deliveriesForDriver(driverId: string): DemoDelivery[] {
  return DEMO_DELIVERIES.filter((d) => d.driverId === driverId);
}

export function availableDeliveries(): DemoDelivery[] {
  return DEMO_DELIVERIES.filter((d) => d.status === "pending_assignment");
}

export function activeDeliveryForDriver(driverId: string): DemoDelivery | undefined {
  return DEMO_DELIVERIES.find(
    (d) =>
      d.driverId === driverId &&
      !["delivered", "failed", "returned", "pending_assignment"].includes(d.status),
  );
}
