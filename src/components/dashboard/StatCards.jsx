import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function StatCards() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    idle: 0,
    maintenance: 0,
  });

  useEffect(() => {
    axios.get("/vehicles").then((res) => {
      const vehicles = res.data;
      setStats({
        total: vehicles.length,
        active: vehicles.filter(v => v.status === "On Trip").length,
        idle: vehicles.filter(v => v.status === "Idle").length,
        maintenance: vehicles.filter(v => v.status === "Maintenance").length,
      });
    });
  }, []);

  const cards = [
    { label: "Total Vehicles", value: stats.total },
    { label: "Active Trips", value: stats.active },
    { label: "Idle Vehicles", value: stats.idle },
    { label: "Maintenance Due", value: stats.maintenance },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {cards.map(c => (
        <div key={c.label} className="bg-white p-5 rounded shadow">
          <p className="text-sm text-gray-500">{c.label}</p>
          <p className="text-2xl font-bold">{c.value}</p>
        </div>
      ))}
    </div>
  );
}
