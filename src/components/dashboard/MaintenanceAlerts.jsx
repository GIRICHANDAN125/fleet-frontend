import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function MaintenanceAlerts() {
  const [alerts, setAlerts] = useState([]);

  const fetchAlerts = async () => {
    try {
      const res = await axios.get("/alerts"); // ✅ FIXED
      const maintenance = res.data.filter(
        (a) => a.type === "Maintenance" && !a.resolved
      );
      setAlerts(maintenance);
    } catch (err) {
      console.error("Fetch maintenance alerts failed", err);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const resolveAlert = async (id) => {
    try {
      await axios.patch(`/alerts/${id}/resolve`); // ✅ FIXED
      fetchAlerts();
    } catch (err) {
      console.error("Resolve alert failed", err);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="font-semibold mb-3">Maintenance Alerts</h2>

      {alerts.map((a) => (
        <div
          key={a._id}
          className="flex justify-between items-center text-red-600 mb-2"
        >
          <span>{a.title}</span>
          <button
            onClick={() => resolveAlert(a._id)}
            className="text-xs text-gray-500"
          >
            Resolve
          </button>
        </div>
      ))}

      {alerts.length === 0 && (
        <p className="text-gray-400 text-sm">No maintenance alerts</p>
      )}
    </div>
  );
}
