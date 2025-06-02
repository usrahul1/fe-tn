import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnalyticsContent from "@/components/analytics-content";
import {
  fetchUserVehicleCount,
  fetchUserElectricCount,
  fetchUserVehiclePrices,
  fetchUserVehicleDetailsWithSpecs,
} from "@/api/RequestMaker";
import { useFirebase } from "@/context/Firebase";
import Loading from "./loading";

export default function AnalyticsPage() {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [userVehiclesCount, setUserVehiclesCount] = useState(0);
  const [userElectricVehiclesCount, setElectricUserVehiclesCount] = useState(0);
  const [profile, setProfile] = useState(null);
  const [totalVehiclePrice, setTotalVehiclePrice] = useState(0);
  const [userVehicles, setUserVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!firebase?.isLoggedIn) {
      navigate("/login");
    }
  }, [firebase, navigate]);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const details = firebase.profDetails();
        if (details) {
          setProfile(details);

          // Fetch vehicles with specs
          const vehiclesData = await fetchUserVehicleDetailsWithSpecs(
            details.id
          );
          setUserVehicles(vehiclesData);

          // Count of all vehicles
          const count = await fetchUserVehicleCount(details.id);
          setUserVehiclesCount(count);

          // Count of electric vehicles
          const electricCount = await fetchUserElectricCount(details.id);
          setElectricUserVehiclesCount(electricCount);

          // Total price of all vehicles
          const vehiclesPrices = await fetchUserVehiclePrices(details.id);
          const total = vehiclesPrices.reduce(
            (sum, v) => sum + (v.vehicle.price || 0),
            0
          );
          setTotalVehiclePrice(total);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [firebase]);

  if (loading) return <Loading />;

  return (
    <AnalyticsContent
      userVehiclesCount={userVehiclesCount}
      userElectricVehiclesCount={userElectricVehiclesCount}
      profile={profile}
      totalVehiclePrice={totalVehiclePrice}
      userVehicles={userVehicles}
    />
  );
}
