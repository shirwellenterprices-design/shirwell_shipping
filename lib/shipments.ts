export type ShipmentStatus = "In Transit" | "Delivered" | "Canceled" | "Out for Delivery" | "Processing";

export type TimelineEvent = {
  status: string;
  date: string;
  time: string;
  location: string;
  completed: boolean;
};

export type Shipment = {
  id: string;
  trackingNumber: string;
  status: ShipmentStatus;
  from: string;
  to: string;
  fromDate: string;
  toDate: string;
  lastUpdated: string;
  weight: string;
  dimensions: string;
  serviceType: "Sea Freight" | "Air Freight" | "Land Freight";
  pieces: number;
  timeline: TimelineEvent[];
  date: string;
};

export const DEMO_SHIPMENTS: Shipment[] = [
  {
    id: "1",
    trackingNumber: "SWS123456789",
    status: "Delivered",
    from: "Los Angeles, USA",
    to: "Manila, Philippines",
    fromDate: "May 10, 2024 08:00 AM",
    toDate: "May 25, 2024 02:45 PM",
    lastUpdated: "May 25, 2024 02:45 PM",
    weight: "2.50 kg",
    dimensions: "30 x 20 x 15 cm",
    serviceType: "Sea Freight",
    pieces: 1,
    date: "May 25, 2024",
    timeline: [
      {
        status: "Delivered",
        date: "May 25, 2024",
        time: "02:45 PM",
        location: "Manila, Philippines",
        completed: true,
      },
      {
        status: "Out for Delivery",
        date: "May 25, 2024",
        time: "09:15 AM",
        location: "Manila, Philippines",
        completed: true,
      },
      {
        status: "In Transit",
        date: "May 20, 2024",
        time: "11:30 AM",
        location: "Pacific Ocean",
        completed: true,
      },
      {
        status: "Arrived at Destination Hub",
        date: "May 18, 2024",
        time: "04:20 PM",
        location: "Manila, Philippines",
        completed: true,
      },
      {
        status: "Departed Origin Hub",
        date: "May 12, 2024",
        time: "06:00 AM",
        location: "Los Angeles, USA",
        completed: true,
      },
    ],
  },
  {
    id: "2",
    trackingNumber: "SWS987654321",
    status: "In Transit",
    from: "Shanghai, China",
    to: "Cebu City, PH",
    fromDate: "Jun 01, 2024 10:00 AM",
    toDate: "Jun 15, 2024 — ETA",
    lastUpdated: "Jun 08, 2024 03:20 PM",
    weight: "5.00 kg",
    dimensions: "40 x 30 x 25 cm",
    serviceType: "Air Freight",
    pieces: 2,
    date: "Jun 08, 2024",
    timeline: [
      {
        status: "In Transit",
        date: "Jun 08, 2024",
        time: "03:20 PM",
        location: "Hong Kong Hub",
        completed: true,
      },
      {
        status: "Departed Origin Hub",
        date: "Jun 02, 2024",
        time: "08:45 AM",
        location: "Shanghai, China",
        completed: true,
      },
      {
        status: "Picked Up",
        date: "Jun 01, 2024",
        time: "10:00 AM",
        location: "Shanghai, China",
        completed: true,
      },
      {
        status: "Out for Delivery",
        date: "—",
        time: "",
        location: "Cebu City, PH",
        completed: false,
      },
      {
        status: "Delivered",
        date: "—",
        time: "",
        location: "Cebu City, PH",
        completed: false,
      },
    ],
  },
  {
    id: "3",
    trackingNumber: "SWS456789012",
    status: "Canceled",
    from: "Tokyo, Japan",
    to: "Davao, PH",
    fromDate: "May 01, 2024 09:00 AM",
    toDate: "—",
    lastUpdated: "May 03, 2024 01:00 PM",
    weight: "1.20 kg",
    dimensions: "25 x 15 x 10 cm",
    serviceType: "Land Freight",
    pieces: 1,
    date: "May 03, 2024",
    timeline: [
      {
        status: "Canceled",
        date: "May 03, 2024",
        time: "01:00 PM",
        location: "Tokyo, Japan",
        completed: true,
      },
      {
        status: "Processing",
        date: "May 01, 2024",
        time: "09:00 AM",
        location: "Tokyo, Japan",
        completed: true,
      },
    ],
  },
  {
    id: "4",
    trackingNumber: "SWS112233445",
    status: "In Transit",
    from: "Los Angeles, USA",
    to: "Manila, PH",
    fromDate: "Jun 10, 2024 07:30 AM",
    toDate: "Jun 28, 2024 — ETA",
    lastUpdated: "Jun 14, 2024 11:00 AM",
    weight: "8.75 kg",
    dimensions: "50 x 40 x 30 cm",
    serviceType: "Sea Freight",
    pieces: 3,
    date: "Jun 14, 2024",
    timeline: [
      {
        status: "In Transit",
        date: "Jun 14, 2024",
        time: "11:00 AM",
        location: "Pacific Ocean",
        completed: true,
      },
      {
        status: "Departed Origin Hub",
        date: "Jun 11, 2024",
        time: "02:00 PM",
        location: "Los Angeles, USA",
        completed: true,
      },
      {
        status: "Delivered",
        date: "—",
        time: "",
        location: "Manila, PH",
        completed: false,
      },
    ],
  },
];

export function getShipmentByCode(code: string): Shipment | null {
  const normalized = code.trim().toUpperCase();
  return (
    DEMO_SHIPMENTS.find((s) => s.trackingNumber === normalized) ??
    (normalized
      ? {
          ...DEMO_SHIPMENTS[0],
          trackingNumber: normalized,
          id: "demo",
        }
      : null)
  );
}

export function getShipmentById(id: string): Shipment | null {
  return DEMO_SHIPMENTS.find((s) => s.id === id) ?? null;
}

export type NotificationItem = {
  id: string;
  type: "delivered" | "transit" | "payment" | "alert";
  title: string;
  description: string;
  timeAgo: string;
  read: boolean;
};

export const DEMO_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    type: "delivered",
    title: "Shipment Delivered",
    description: "SWS123456789 has been delivered to Manila, Philippines.",
    timeAgo: "10m ago",
    read: false,
  },
  {
    id: "2",
    type: "transit",
    title: "In Transit Update",
    description: "SWS987654321 arrived at Hong Kong Hub.",
    timeAgo: "2h ago",
    read: false,
  },
  {
    id: "3",
    type: "payment",
    title: "Payment Received",
    description: "Your payment of $285.75 for booking #BK-2041 was confirmed.",
    timeAgo: "1d ago",
    read: true,
  },
  {
    id: "4",
    type: "alert",
    title: "Shipment Canceled",
    description: "SWS456789012 was canceled. Refund is being processed.",
    timeAgo: "3d ago",
    read: true,
  },
  {
    id: "5",
    type: "transit",
    title: "Out for Delivery",
    description: "SWS123456789 is out for delivery in Manila.",
    timeAgo: "5d ago",
    read: true,
  },
];

export const DEMO_USER = {
  name: "Juan Dela Cruz",
  initials: "JD",
  email: "juan.delacruz@email.com",
  phone: "+63 917 123 4567",
};
