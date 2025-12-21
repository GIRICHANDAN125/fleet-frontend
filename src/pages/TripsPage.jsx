import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const STATUS_OPTIONS = [
  "Upcoming",
  "Started",
  "Moving",
  "Completed",
];

export default function TripsPage() {
  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const [form, setForm] = useState({
    vehicle: "",
    startLocation: "",
    endLocation: "",
    tripDate: "",
    tripTime: "",
  });

  /* ---------------------------------
     LOAD DATA
  ----------------------------------*/
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const vRes = await axios.get("/vehicles");
    const tRes = await axios.get("/trips");

    setVehicles(vRes.data);
    setTrips(tRes.data);
  };

  /* ---------------------------------
     FORM HANDLERS
  ----------------------------------*/
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/trips", {
        ...form,
        status: "Upcoming",
      });

      setTrips((prev) => [res.data, ...prev]);

      setForm({
        vehicle: "",
        startLocation: "",
        endLocation: "",
        tripDate: "",
        tripTime: "",
      });
    } catch (err) {
      alert("Trip creation failed");
    }
  };

  /* ---------------------------------
     STATUS UPDATE (IMPORTANT FIX)
  ----------------------------------*/
  const updateStatus = async (tripId, status) => {
    try {
      const res = await axios.post(`/trips/${tripId}/status`, {
        status,
      });

      setTrips((prev) =>
        prev.map((t) => (t._id === tripId ? res.data : t))
      );
    } catch (err) {
      alert("Status update failed");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Trips</h1>

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow grid grid-cols-6 gap-4"
      >
        <select
          name="vehicle"
          value={form.vehicle}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Vehicle</option>
          {vehicles.map((v) => (
            <option key={v._id} value={v._id}>
              {v.type} — {v.vehicleNumber}
            </option>
          ))}
        </select>

        <input
          name="startLocation"
          placeholder="From"
          value={form.startLocation}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="endLocation"
          placeholder="To"
          value={form.endLocation}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="date"
          name="tripDate"
          value={form.tripDate}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="time"
          name="tripTime"
          value={form.tripTime}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <button className="bg-blue-600 text-white rounded">
          Create Trip
        </button>
      </form>

      {/* ================= TABLE ================= */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Route</th>
              <th className="border p-2">Date & Time</th>
              <th className="border p-2">Vehicle</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {trips.map((t, i) => (
              <tr key={t._id} className="text-center">
                <td className="border p-2">{i + 1}</td>

                <td className="border p-2">
                  {t.startLocation} → {t.endLocation}
                </td>

                <td className="border p-2">
                  <div>{t.tripDate || "-"}</div>
                  <div className="text-xs text-gray-500">
                    {t.tripTime || ""}
                  </div>
                </td>

                <td className="border p-2">
                  {t.vehicle
                    ? `${t.vehicle.type} — ${t.vehicle.vehicleNumber}`
                    : "-"}
                </td>

                <td className="border p-2">
                  <select
                    value={t.status}
                    onChange={(e) =>
                      updateStatus(t._id, e.target.value)
                    }
                    className="border rounded px-2 py-1 text-xs"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="border p-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                    onClick={() =>
                      navigate("/tracking", {
                        state: {
                          startLocation: t.startLocation,
                          endLocation: t.endLocation,
                          vehicleNumber: t.vehicle?.vehicleNumber,
                        },
                      })
                    }
                  >
                    Map View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
