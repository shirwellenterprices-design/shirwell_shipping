"use client";

import type { TrackingSnapshot } from "@/lib/tracking";
import {
  APIProvider,
  Map,
  Marker,
  useMap,
} from "@vis.gl/react-google-maps";
import { useEffect, useMemo, useRef, useState } from "react";

type TrackingMapProps = {
  code: string;
};

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

const darkMapStyles: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#1d1d1d" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1d1d1d" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2c2c2c" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e0e0e" }] },
];

function RouteOverlay({
  snapshot,
  userLocation,
}: {
  snapshot: TrackingSnapshot;
  userLocation: UserLocation | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const path = snapshot.route.waypoints.map(
      (point) => ({ lat: point.lat, lng: point.lng }),
    );

    const routeLine = new google.maps.Polyline({
      path,
      strokeColor: "#ffd700",
      strokeOpacity: 0.9,
      strokeWeight: 4,
      map,
    });

    const bounds = new google.maps.LatLngBounds();
    path.forEach((point) => bounds.extend(point));
    if (userLocation) {
      bounds.extend({ lat: userLocation.lat, lng: userLocation.lng });
    }
    map.fitBounds(bounds, 60);

    return () => {
      routeLine.setMap(null);
    };
  }, [map, snapshot.code, snapshot.route.waypoints, userLocation]);

  return null;
}

type UserLocation = {
  lat: number;
  lng: number;
  accuracy?: number;
};

function UserLocationOverlay({ location }: { location: UserLocation }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !location.accuracy) return;

    const circle = new google.maps.Circle({
      map,
      center: { lat: location.lat, lng: location.lng },
      radius: location.accuracy,
      strokeColor: "#3b82f6",
      strokeOpacity: 0.35,
      strokeWeight: 1,
      fillColor: "#3b82f6",
      fillOpacity: 0.12,
    });

    return () => {
      circle.setMap(null);
    };
  }, [map, location.lat, location.lng, location.accuracy]);

  return null;
}

function useUserLocation() {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported on this device.");
      setLoading(false);
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setError(null);
        setLoading(false);
      },
      (positionError) => {
        setError(
          positionError.code === positionError.PERMISSION_DENIED
            ? "Location permission denied. Allow location access to see your position on the map."
            : "Unable to detect your current location.",
        );
        setLoading(false);
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { location, error, loading };
}

function MapRefSetter({ mapRef }: { mapRef: React.MutableRefObject<google.maps.Map | null> }) {
  const map = useMap();

  useEffect(() => {
    mapRef.current = map ?? null;
  }, [map, mapRef]);

  return null;
}

function MapContent({
  snapshot,
  userLocation,
}: {
  snapshot: TrackingSnapshot;
  userLocation: UserLocation | null;
}) {
  const center = useMemo(
    () => ({ lat: snapshot.current.lat, lng: snapshot.current.lng }),
    [snapshot.current.lat, snapshot.current.lng],
  );

  return (
    <>
      <RouteOverlay snapshot={snapshot} userLocation={userLocation} />

      <Marker
        position={{ lat: snapshot.route.origin.lat, lng: snapshot.route.origin.lng }}
        title={snapshot.route.origin.name}
        label={{ text: "A", color: "#ffffff", fontWeight: "bold" }}
      />

      <Marker
        position={{
          lat: snapshot.route.destination.lat,
          lng: snapshot.route.destination.lng,
        }}
        title={snapshot.route.destination.name}
        label={{ text: "B", color: "#ffffff", fontWeight: "bold" }}
      />

      <Marker position={center} title="Live shipment location" label="📦" />

      {userLocation && (
        <>
          <UserLocationOverlay location={userLocation} />
          <Marker
            position={{ lat: userLocation.lat, lng: userLocation.lng }}
            title="Your current location"
            label={{ text: "You", color: "#ffffff", fontWeight: "bold" }}
          />
        </>
      )}
    </>
  );
}

function LiveShipmentMap({ snapshot }: { snapshot: TrackingSnapshot }) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const { location: userLocation, error: userLocationError, loading: userLocationLoading } =
    useUserLocation();

  const center = useMemo(
    () => ({ lat: snapshot.current.lat, lng: snapshot.current.lng }),
    [snapshot.current.lat, snapshot.current.lng],
  );

  const focusUserLocation = () => {
    if (!mapRef.current || !userLocation) return;
    mapRef.current.panTo({ lat: userLocation.lat, lng: userLocation.lng });
    mapRef.current.setZoom(12);
  };

  return (
    <div className="relative">
      <Map
        defaultCenter={center}
        defaultZoom={6}
        gestureHandling="greedy"
        disableDefaultUI={false}
        styles={darkMapStyles}
        mapTypeControl={false}
        streetViewControl={false}
        className="h-[420px] w-full sm:h-[480px]"
      >
        <MapRefSetter mapRef={mapRef} />
        <MapContent snapshot={snapshot} userLocation={userLocation} />
      </Map>

      <button
        type="button"
        onClick={focusUserLocation}
        disabled={!userLocation}
        className="absolute right-3 top-3 z-10 rounded-md border border-border bg-surface-elevated px-3 py-2 text-xs font-semibold text-foreground shadow disabled:cursor-not-allowed disabled:opacity-50"
      >
        My location
      </button>

      {(userLocationLoading || userLocationError) && (
        <div className="pointer-events-none absolute bottom-3 left-3 z-10 max-w-xs rounded-md bg-black/75 px-3 py-2 text-xs text-white">
          {userLocationLoading
            ? "Detecting your location…"
            : userLocationError}
        </div>
      )}

      {userLocation && (
        <div className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-md bg-black/75 px-3 py-2 text-xs text-white">
          You: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
        </div>
      )}
    </div>
  );
}

export default function TrackingMap({ code }: TrackingMapProps) {
  const [snapshot, setSnapshot] = useState<TrackingSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;

    let cancelled = false;

    async function fetchLocation() {
      try {
        const response = await fetch(`/api/tracking/${encodeURIComponent(code)}`);
        if (!response.ok) throw new Error("Unable to load tracking data");
        const data = (await response.json()) as TrackingSnapshot;
        if (!cancelled) {
          setSnapshot(data);
          setError(null);
        }
      } catch {
        if (!cancelled) setError("Failed to refresh live location.");
      }
    }

    fetchLocation();
    const interval = setInterval(fetchLocation, 5000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [code]);

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="mt-8 rounded-xl border border-border bg-surface-elevated p-6 text-sm text-muted">
        Google Maps API key missing. Add{" "}
        <code className="text-foreground">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to{" "}
        <code className="text-foreground">.env.local</code>
      </div>
    );
  }

  if (error && !snapshot) {
    return (
      <div className="mt-8 rounded-xl border border-border bg-surface-elevated p-6 text-sm text-muted">
        {error}
      </div>
    );
  }

  if (!snapshot) {
    return (
      <div className="mt-8 flex h-[420px] items-center justify-center rounded-xl border border-border bg-[#0a0a0a] text-gold-bright">
        Loading live map…
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="grid gap-4 rounded-xl border border-border bg-surface-elevated p-5 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted">Status</p>
          <p className="mt-1 text-lg font-bold text-gold">{snapshot.status}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted">Progress</p>
          <p className="mt-1 text-lg font-bold text-foreground">{snapshot.progress}%</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted">Speed</p>
          <p className="mt-1 text-lg font-bold text-foreground">{snapshot.speedKmh} km/h</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted">ETA</p>
          <p className="mt-1 text-lg font-bold text-foreground">{snapshot.eta}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border-2 border-gold-bright/40 shadow-lg">
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <LiveShipmentMap snapshot={snapshot} />
        </APIProvider>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
        <p>
          <span className="font-semibold text-foreground">{snapshot.route.origin.name}</span>
          {" → "}
          <span className="font-semibold text-foreground">{snapshot.route.destination.name}</span>
        </p>
        <p className="text-xs">
          Live location updates every 5s · Last update{" "}
          {new Date(snapshot.updatedAt).toLocaleTimeString("en-AU")}
        </p>
      </div>

      {error && <p className="text-sm text-brand-red">{error}</p>}
    </div>
  );
}
