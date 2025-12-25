import StatCards from "../components/dashboard/StatCards";
import VehicleList from "../components/dashboard/VehicleList";
import DriversPanel from "../components/dashboard/DriversPanel";
import UpcomingTrips from "../components/dashboard/UpcomingTrips";
import MaintenanceAlerts from "../components/dashboard/MaintenanceAlerts";
import TripHistory from "../components/dashboard/TripHistory";
import ReportsPanel from "../components/dashboard/ReportsPanel";

/* =========================
   Dashboard Page
   ========================= */
const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* PAGE HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Fleet Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Real-time overview of vehicles, trips and alerts
        </p>
      </div>

      {/* TOP SUMMARY */}
      <div className="mb-6">
        <StatCards />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT COLUMN */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <Card>
            <VehicleList />
          </Card>

          <Card>
            <DriversPanel />
          </Card>
        </div>

        {/* CENTER COLUMN */}
        <div className="col-span-12 lg:col-span-6 space-y-6">
          <Card>
            <UpcomingTrips />
          </Card>

          <Card>
            <TripHistory />
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <Card>
            <MaintenanceAlerts />
          </Card>

          <Card>
            <ReportsPanel />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

/* =========================
   Reusable Card Wrapper
   ========================= */
const Card = ({ children }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      {children}
    </div>
  );
};
