import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

/* Fix marker icons */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* Auto-fit map to route */
function FitBounds({ start, end }) {
  const map = useMap();

  if (start && end) {
    const bounds = L.latLngBounds([start, end]);
    map.fitBounds(bounds, { padding: [50, 50] });
  }

  return null;
}

export default function TripMap({ start, end }) {
  if (!start || !end) return null;

  return (
    <MapContainer
      center={start}
      zoom={6}
      className="h-[400px] w-full rounded"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={start} />
      <Marker position={end} />

      <Polyline positions={[start, end]} color="blue" />

      <FitBounds start={start} end={end} />
    </MapContainer>
  );
}
