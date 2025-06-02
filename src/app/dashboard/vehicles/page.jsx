import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VehiclesContent from "@/components/vehicles-content";
import { fetchAllVehicles, fetchUserVehicles } from "@/api/RequestMaker";
import { useFirebase } from "@/context/Firebase";
import Loading from "./loading";

export default function VehiclesPage() {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [allVehicles, setAllVehicles] = useState([]);
  const [userVehicles, setUserVehicles] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebase?.isLoggedIn) {
      navigate("/login");
    }
  }, [firebase, navigate]);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const all = await fetchAllVehicles();
        setAllVehicles(all);

        const details = firebase.profDetails();
        if (details) {
          console.log("details are: ", details);
          setProfile(details);

          const vehicles = await fetchUserVehicles(details.id);
          setUserVehicles(vehicles);
        }
      } catch (error) {
        console.error("Error in fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [firebase]);

  if (loading) return <Loading />;

  return (
    <VehiclesContent allVehicles={allVehicles} userVehicles={userVehicles} />
  );
}
