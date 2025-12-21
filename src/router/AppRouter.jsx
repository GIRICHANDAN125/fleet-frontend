// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginPage from "../pages/LoginPage";
// import DashboardPage from "../pages/DashboardPage";
// import VehiclesPage from "../pages/VehiclesPage";
// import DriversPage from "../pages/DriversPage";
// import TripsPage from "../pages/TripsPage";
// import TrackingPage from "../pages/TrackingPage";
// import ProtectedRoute from "./ProtectedRoute";
// import Layout from "../components/Layout";

// const AppRouter = () => {
//   return (
    
//     <BrowserRouter>
//       <Routes>
//         {/* Public */}
//         <Route path="/login" element={<LoginPage />} />

//         {/* Protected + Layout wrapper */}
//         <Route
//           element={
//             <ProtectedRoute>
//               <Layout />
//             </ProtectedRoute>
//           }
          
//         >
//           <Route path="/" element={<DashboardPage />} />
//           <Route path="/vehicles" element={<VehiclesPage />} />
//           <Route path="/drivers" element={<DriversPage />} />
//           <Route path="/trips" element={<TripsPage />} />
//           <Route path="/tracking" element={<TrackingPage />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
    
//   );
// };

// export default AppRouter;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import VehiclesPage from "../pages/VehiclesPage";
import DriversPage from "../pages/DriversPage";
import TripsPage from "../pages/TripsPage";
import TrackingPage from "../pages/TrackingPage";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout";
import MyProfilePage from "../pages/MyProfilePage";
import ChangePasswordPage from "../pages/ChangePasswordPage";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/vehicles" element={<VehiclesPage />} />
            <Route path="/drivers" element={<DriversPage />} />
            <Route path="/trips" element={<TripsPage />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/profile" element={<MyProfilePage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
