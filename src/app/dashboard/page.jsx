import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardContent from "@/components/dashboard-content";
import { useFirebase } from "@/context/Firebase";
import {
  fetchUserVehicleCount,
  fetchUserVehicleDetails,
} from "@/api/RequestMaker";
import Loading from "./loading";

export default function DashboardPage() {
  const navigate = useNavigate();
  const firebase = useFirebase();

  const [userVehiclesCount, setUserVehiclesCount] = useState(0);
  const [userVehicles, setUserVehicles] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Redirect if user is not logged in
  useEffect(() => {
    if (!firebase?.isLoggedIn) {
      navigate("/login");
    }
  }, [firebase, navigate]);

  // Fetch profile and vehicle data
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);

      try {
        const details = firebase.profDetails();
        if (details) {
          setProfile(details);

          const [count, vehicles] = await Promise.all([
            fetchUserVehicleCount(details.id),
            fetchUserVehicleDetails(details.id),
          ]);

          setUserVehiclesCount(count);
          setUserVehicles(vehicles);
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (firebase?.isLoggedIn) {
      fetchAllData();
    }
  }, [firebase]);

  if (loading) return <Loading />;

  return (
    <DashboardContent
      profile={profile}
      userVehicles={userVehicles}
      userVehiclesCount={userVehiclesCount}
    />
  );
}
