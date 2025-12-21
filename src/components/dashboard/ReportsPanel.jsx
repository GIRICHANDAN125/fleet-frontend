import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function ReportsPanel() {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const res = await axios.get("/alerts"); // ✅ FIXED
      const delayReports = res.data.filter(
        (a) => a.type === "Report" && !a.resolved
      );
      setReports(delayReports);
    } catch (err) {
      console.error("Fetch reports failed", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const resolveAlert = async (id) => {
    try {
      await axios.patch(`/alerts/${id}/resolve`); // ✅ FIXED
      fetchReports();
    } catch (err) {
      console.error("Resolve report failed", err);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="font-semibold mb-3">Reports & Alerts</h2>

      {reports.map((a) => (
        <div
          key={a._id}
          className="flex justify-between items-center bg-red-100 text-red-700 p-2 rounded mb-2"
        >
          <span>{a.title}</span>
          <button
            onClick={() => resolveAlert(a._id)}
            className="text-xs text-gray-600"
          >
            Resolve
          </button>
        </div>
      ))}

      {reports.length === 0 && (
        <p className="text-gray-400 text-sm">No delay alerts</p>
      )}
    </div>
  );
}
