import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useLocation } from "react-router-dom";
import { geocodePlace } from "../utils/geocode";

/* =========================
   Leaflet icon fix
   ========================= */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* =========================
   Static bus icon (NO rotation)
   ========================= */
const busIcon = new L.DivIcon({
  html: `<div style="font-size:28px;">🚌</div>`,
  className: "",
  iconSize: [30, 30],
});

/* =========================
   Helpers
   ========================= */
function toRad(v) {
  return (v * Math.PI) / 180;
}

function haversineKm(a, b) {
  const R = 6371;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);

  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

/* =========================
   Road-following route + cache
   ========================= */
async function generatePath(start, end, key) {
  const cached = localStorage.getItem(key);
  if (cached) return JSON.parse(cached);

  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson&steps=true`;
    const res = await fetch(url);
    const data = await res.json();

    const route = data.routes[0].geometry.coordinates.map(
      ([lng, lat]) => [lat, lng]
    );

    localStorage.setItem(key, JSON.stringify(route));
    return route;
  } catch {
    const pts = [];
    for (let i = 0; i <= 3000; i++) {
      pts.push([
        start[0] + (end[0] - start[0]) * (i / 3000),
        start[1] + (end[1] - start[1]) * (i / 3000),
      ]);
    }
    return pts;
  }
}

/* =========================
   Colors
   ========================= */
const GOOGLE_BLUE = "#1a73e8";
const GOOGLE_BLUE_LIGHT = "#8ab4f8";

/* =========================
   Tracking Page
   ========================= */
export default function TrackingPage() {
  const { state } = useLocation();

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [path, setPath] = useState([]);
  const [markerIndex, setMarkerIndex] = useState(0);

  const [totalDistance, setTotalDistance] = useState(0);
  const [traveled, setTraveled] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const traveledRef = useRef(0);
  const intervalRef = useRef(null);

  /* =========================
     Load route
     ========================= */
  useEffect(() => {
    async function load() {
      const s = await geocodePlace(state.startLocation);
      const e = await geocodePlace(state.endLocation);

      const key = `route:${state.startLocation}-${state.endLocation}`;
      const route = await generatePath(s, e, key);
      const total = haversineKm(s, e);

      setStart(s);
      setEnd(e);
      setPath(route);
      setTotalDistance(total);
      setRemaining(total);
      setTraveled(0);
      traveledRef.current = 0;
      setMarkerIndex(0);
    }
    load();
  }, [state]);

  /* =========================
     Move vehicle (POSITION ONLY)
     ========================= */
  useEffect(() => {
    if (!path.length || !totalDistance) return;

    const KM_PER_TICK = 0.1;
    const TICK_MS = 4000;

    intervalRef.current = setInterval(() => {
      traveledRef.current += KM_PER_TICK;

      if (traveledRef.current >= totalDistance) {
        traveledRef.current = totalDistance;
        clearInterval(intervalRef.current);
      }

      const progress = traveledRef.current / totalDistance;
      const idx = Math.min(
        path.length - 1,
        Math.floor(progress * path.length)
      );

      setMarkerIndex(idx);
      setTraveled(traveledRef.current);
      setRemaining(Math.max(0, totalDistance - traveledRef.current));
    }, TICK_MS);

    return () => clearInterval(intervalRef.current);
  }, [path, totalDistance]);

  /* =========================
     ETA
     ========================= */
  const SPEED_KM_PER_HR = 70;
  const etaHrs = remaining / SPEED_KM_PER_HR;
  const etaH = Math.floor(etaHrs);
  const etaM = Math.floor((etaHrs - etaH) * 60);

  if (!start || !end) return <div className="p-6">Loading map…</div>;

  const completedPath = path.slice(0, markerIndex);
  const remainingPath = path.slice(markerIndex);

  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <MapContainer center={start} zoom={6} style={{ height: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={start} />
          <Marker position={end} />

          {/* Completed route */}
          <Polyline
            positions={completedPath}
            pathOptions={{ color: GOOGLE_BLUE, weight: 6 }}
          />

          {/* Remaining route */}
          <Polyline
            positions={remainingPath}
            pathOptions={{
              color: GOOGLE_BLUE_LIGHT,
              weight: 6,
              opacity: 0.5,
            }}
          />

          {/* Bus follows road only */}
          <Marker
            position={path[markerIndex]}
            icon={busIcon}
          />
        </MapContainer>
      </div>

      {/* INFO PANEL */}
      <div className="w-80 bg-white p-5 border-l">
        <h2 className="text-lg font-semibold">
          {state.startLocation} → {state.endLocation}
        </h2>

        <p><b>Vehicle:</b> {state.vehicleNumber}</p>

        <hr className="my-3" />

        <p><b>Total Distance:</b> {totalDistance.toFixed(2)} km</p>
        <p><b>Traveled:</b> {traveled.toFixed(2)} km</p>
        <p><b>Remaining:</b> {remaining.toFixed(2)} km</p>

        <hr className="my-3" />

        <p className="text-blue-600 font-semibold">
          ⏱ ETA: {etaH} hr {etaM} min
        </p>
      </div>
    </div>
  );
}
