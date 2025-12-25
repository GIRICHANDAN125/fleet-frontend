import { useEffect, useState } from "react";
import axios from "../api/axios";

/* =========================
   Constants
   ========================= */
const MAINTENANCE_ISSUES = [
  "Oil Change",
  "Service Due",
  "Brake Issue",
  "Engine Issue",
  "Tyre Change",
];

const DELAY_TIMES = ["15 mins", "30 mins", "1 hour", "2 hours"];

/* =========================
   Vehicles Page
   ========================= */
export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const [form, setForm] = useState({
    vehicleNumber: "",
    type: "",
    status: "Idle",
    driver: "",
  });

  const [maintenanceUI, setMaintenanceUI] = useState({
    vehicleId: null,
    issue: "",
  });

  const [delayUI, setDelayUI] = useState({
    vehicleId: null,
    time: "",
  });

  /* =========================
     Fetch Data
     ========================= */
  useEffect(() => {
    fetchVehicles();
    fetchDrivers();
  }, []);

  const fetchVehicles = async () => {
    const res = await axios.get("/vehicles");
    setVehicles(res.data);
  };

  const fetchDrivers = async () => {
    const res = await axios.get("/drivers");
    setDrivers(res.data);
  };

  /* =========================
     Form Handlers
     ========================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("/vehicles", {
      ...form,
      driver: form.driver || null,
    });

    setVehicles((prev) => [res.data, ...prev]);

    setForm({
      vehicleNumber: "",
      type: "",
      status: "Idle",
      driver: "",
    });
  };

  /* =========================
     Maintenance & Delay
     ========================= */
  const confirmMaintenance = async (v) => {
    if (!maintenanceUI.issue) {
      alert("Select maintenance issue");
      return;
    }

    await axios.patch(`/vehicles/${v._id}/maintenance`, {
      issue: maintenanceUI.issue,
    });

    setMaintenanceUI({ vehicleId: null, issue: "" });
    fetchVehicles();
  };

  const confirmDelay = async (v) => {
    if (!delayUI.time) {
      alert("Select delay time");
      return;
    }

    await axios.patch(`/vehicles/${v._id}/delay`, {
      delayTime: delayUI.time,
    });

    setDelayUI({ vehicleId: null, time: "" });
    fetchVehicles();
  };

  /* =========================
     UI
     ========================= */
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Vehicles</h1>

      {/* ADD VEHICLE FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-xl shadow grid grid-cols-1 md:grid-cols-5 gap-4"
      >
        <input
          name="vehicleNumber"
          value={form.vehicleNumber}
          onChange={handleChange}
          placeholder="Vehicle Number"
          className="border rounded px-3 py-2"
          required
        />

        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="Type (Bus, Truck)"
          className="border rounded px-3 py-2"
          required
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        >
          <option>Idle</option>
          <option>On Trip</option>
          <option>Maintenance</option>
        </select>

        <select
          name="driver"
          value={form.driver}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        >
          <option value="">Assign Driver</option>
          {drivers.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>

        <button className="bg-blue-600 text-white rounded px-4">
          Add Vehicle
        </button>
      </form>

      {/* VEHICLE TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left">Vehicle No</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Driver</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.map((v) => (
              <tr key={v._id} className="border-t hover:bg-slate-50">
                <td className="px-4 py-3">{v.vehicleNumber}</td>
                <td className="px-4 py-3">{v.type}</td>
                <td className="px-4 py-3">
                  {v.driver ? v.driver.name : "-"}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      v.status === "Maintenance"
                        ? "bg-yellow-100 text-yellow-700"
                        : v.status === "On Trip"
                        ? "bg-green-100 text-green-700"
                        : v.status === "Delayed"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {v.status}
                  </span>
                </td>

                <td className="px-4 py-3 space-y-2">
                  <button
                    onClick={() =>
                      setMaintenanceUI({ vehicleId: v._id, issue: "" })
                    }
                    className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded"
                  >
                    Maintenance
                  </button>

                  <button
                    onClick={() =>
                      setDelayUI({ vehicleId: v._id, time: "" })
                    }
                    className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded ml-2"
                  >
                    Delay
                  </button>

                  {maintenanceUI.vehicleId === v._id && (
                    <div className="mt-2 space-y-1">
                      <select
                        className="border p-1 text-xs rounded"
                        value={maintenanceUI.issue}
                        onChange={(e) =>
                          setMaintenanceUI({
                            ...maintenanceUI,
                            issue: e.target.value,
                          })
                        }
                      >
                        <option value="">Select Issue</option>
                        {MAINTENANCE_ISSUES.map((i) => (
                          <option key={i}>{i}</option>
                        ))}
                      </select>

                      <button
                        onClick={() => confirmMaintenance(v)}
                        className="block bg-green-600 text-white text-xs px-2 py-1 rounded"
                      >
                        Confirm
                      </button>
                    </div>
                  )}

                  {delayUI.vehicleId === v._id && (
                    <div className="mt-2 space-y-1">
                      <select
                        className="border p-1 text-xs rounded"
                        value={delayUI.time}
                        onChange={(e) =>
                          setDelayUI({
                            ...delayUI,
                            time: e.target.value,
                          })
                        }
                      >
                        <option value="">Select Delay</option>
                        {DELAY_TIMES.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>

                      <button
                        onClick={() => confirmDelay(v)}
                        className="block bg-green-600 text-white text-xs px-2 py-1 rounded"
                      >
                        Confirm
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {vehicles.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-400 py-6">
                  No vehicles found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
