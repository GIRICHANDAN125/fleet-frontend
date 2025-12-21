import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const route = [
  [19.12, 72.83],
  [19.15, 72.85],
  [19.18, 72.88],
];

export default function LiveMapCard() {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-semibold mb-2">Live Tracking</h3>
      <MapContainer center={route[0]} zoom={12} className="h-72 w-full rounded">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={route[0]} />
        <Polyline positions={route} color="blue" />
      </MapContainer>
      <p className="text-sm mt-2 text-gray-600">
        Lat: 19.1277 | Lon: 72.8344 | Speed: 60 km/h
      </p>
    </div>
  );
}
