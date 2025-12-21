import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function TripHistory() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios.get("/trips").then(res => {
      setTrips(res.data.filter(t =>
        t.status === "Moving" || t.status === "Completed"
      ));
    });
  }, []);

  return (
    <div className="bg-white p-4">
      <h3>Trip History</h3>
      {trips.map(t => (
        <div key={t._id}>
          {t.startLocation} → {t.endLocation} ({t.status})
        </div>
      ))}
    </div>
  );
}
