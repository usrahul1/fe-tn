import { Routes, Route } from "react-router-dom";
import LandingPage from "./app/page";
import LoginPage from "./app/login/page";
import RegisterPage from "./app/register/page";
import DashboardPage from "./app/dashboard/page";
import Profile from "./app/dashboard/profile/page";
import AnalyticsPage from "./app/dashboard/analytics/page";
import SettingsPage from "./app/dashboard/settings/page";
import VehiclesPage from "./app/dashboard/vehicles/page";
import DashboardLayout from "./app/dashboard/layout";
import VehicleDetailsPage from "./app/vehicle-details/[id]/page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="vehicles" element={<VehiclesPage />} />
        </Route>
        <Route path="/vehicle-details/:id" element={<VehicleDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
