export type TrackingPoint = {
  lat: number;
  lng: number;
};

export type TrackingRoute = {
  id: string;
  origin: { name: string; lat: number; lng: number };
  destination: { name: string; lat: number; lng: number };
  waypoints: TrackingPoint[];
};

export type TrackingSnapshot = {
  code: string;
  status: "Processing" | "In Transit" | "Out for Delivery" | "Delivered";
  route: TrackingRoute;
  current: TrackingPoint;
  progress: number;
  eta: string;
  updatedAt: string;
  speedKmh: number;
};

const ROUTES: TrackingRoute[] = [
  {
    id: "syd-mel",
    origin: { name: "Sydney, NSW", lat: -33.8688, lng: 151.2093 },
    destination: { name: "Melbourne, VIC", lat: -37.8136, lng: 144.9631 },
    waypoints: [
      { lat: -33.8688, lng: 151.2093 },
      { lat: -34.4278, lng: 150.8931 },
      { lat: -35.2809, lng: 149.13 },
      { lat: -36.0737, lng: 146.9155 },
      { lat: -36.757, lng: 144.2794 },
      { lat: -37.8136, lng: 144.9631 },
    ],
  },
  {
    id: "bne-syd",
    origin: { name: "Brisbane, QLD", lat: -27.4698, lng: 153.0251 },
    destination: { name: "Sydney, NSW", lat: -33.8688, lng: 151.2093 },
    waypoints: [
      { lat: -27.4698, lng: 153.0251 },
      { lat: -28.6474, lng: 153.602 },
      { lat: -29.6911, lng: 152.933 },
      { lat: -31.4333, lng: 152.9089 },
      { lat: -32.9283, lng: 151.7817 },
      { lat: -33.8688, lng: 151.2093 },
    ],
  },
  {
    id: "per-adl",
    origin: { name: "Perth, WA", lat: -31.9505, lng: 115.8605 },
    destination: { name: "Adelaide, SA", lat: -34.9285, lng: 138.6007 },
    waypoints: [
      { lat: -31.9505, lng: 115.8605 },
      { lat: -32.4964, lng: 123.1488 },
      { lat: -32.7945, lng: 129.0117 },
      { lat: -33.1376, lng: 134.2244 },
      { lat: -33.9619, lng: 136.2092 },
      { lat: -34.9285, lng: 138.6007 },
    ],
  },
];

function hashCode(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function interpolateRoute(waypoints: TrackingPoint[], progress: number): TrackingPoint {
  if (waypoints.length === 0) return { lat: 0, lng: 0 };
  if (progress <= 0) return waypoints[0];
  if (progress >= 1) return waypoints[waypoints.length - 1];

  const scaled = progress * (waypoints.length - 1);
  const index = Math.floor(scaled);
  const fraction = scaled - index;
  const start = waypoints[index];
  const end = waypoints[Math.min(index + 1, waypoints.length - 1)];

  return {
    lat: start.lat + (end.lat - start.lat) * fraction,
    lng: start.lng + (end.lng - start.lng) * fraction,
  };
}

function getStatus(progress: number): TrackingSnapshot["status"] {
  if (progress >= 0.98) return "Delivered";
  if (progress >= 0.85) return "Out for Delivery";
  if (progress >= 0.08) return "In Transit";
  return "Processing";
}

function formatEta(progress: number): string {
  const hoursLeft = Math.max(1, Math.round((1 - progress) * 18));
  const eta = new Date(Date.now() + hoursLeft * 60 * 60 * 1000);
  return eta.toLocaleString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function getTrackingSnapshot(code: string): TrackingSnapshot {
  const normalized = code.trim().toUpperCase();
  const route = ROUTES[hashCode(normalized) % ROUTES.length];

  const baseProgress = (hashCode(normalized) % 700) / 1000;
  const liveProgress = (Date.now() % (20 * 60 * 1000)) / (20 * 60 * 1000) * 0.22;
  const progress = Math.min(0.99, baseProgress + liveProgress);

  const current = interpolateRoute(route.waypoints, progress);
  const status = getStatus(progress);

  return {
    code: normalized,
    status,
    route,
    current,
    progress: Math.round(progress * 100),
    eta: formatEta(progress),
    updatedAt: new Date().toISOString(),
    speedKmh: status === "Delivered" ? 0 : 68 + (hashCode(normalized) % 25),
  };
}
