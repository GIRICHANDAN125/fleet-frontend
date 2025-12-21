import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get("/vehicles").then((res) => {
      setVehicles(res.data.slice(0, 3)); // show only 3 in dashboard
    });
  }, []);

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-semibold mb-3">Vehicle List</h3>
      <table className="w-full text-sm">
        <tbody>
          {vehicles.map((v) => (
            <tr key={v._id} className="border-b last:border-0">
              <td>{v.vehicleNumber}</td>
              <td>{v.type}</td>
              <td className="text-right">{v.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
