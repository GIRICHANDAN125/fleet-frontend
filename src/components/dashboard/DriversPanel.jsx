import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function DriversPanel() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDrivers = async () => {
    try {
      const res = await axios.get("/drivers");
      setDrivers(res.data);
    } catch (err) {
      console.error("Failed to load drivers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-semibold mb-3">Drivers</h3>

      {loading && (
        <p className="text-sm text-gray-400">Loading...</p>
      )}

      {!loading && drivers.length === 0 && (
        <p className="text-sm text-gray-400">No drivers found</p>
      )}

      {!loading &&
        drivers.map((d) => (
          <div
            key={d._id}
            className="flex justify-between items-center mb-2 text-sm"
          >
            <span className="text-slate-700">{d.name}</span>

            <span className="text-xs text-gray-500">
              {d.phone}
            </span>
          </div>
        ))}
    </div>
  );
}
