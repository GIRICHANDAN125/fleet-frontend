import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function UpcomingTrips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios.get("/trips").then(res => {
      setTrips(res.data.filter(t => t.status === "Upcoming"));
    });
  }, []);

  return (
    <div className="bg-white p-4">
      <h3>Upcoming Trips</h3>
      {trips.map(t => (
        <p key={t._id}>
          {t.startLocation} → {t.endLocation} ({t.tripDate} {t.tripTime})
        </p>
      ))}
    </div>
  );
}
