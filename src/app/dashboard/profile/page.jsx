import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePage from "@/components/profile-page";
import {
  fetchUserVehicleCount,
  fetchUserVehicleDetails,
} from "@/api/RequestMaker";
import { useFirebase } from "@/context/Firebase";
import avatar from "/images/profile-avatar.jpg"; // adjust path if needed
import Loading from "./loading";

export default function Profile() {
  const navigate = useNavigate();
  const firebase = useFirebase();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState(avatar);
  const [userVehicles, setUserVehicles] = useState([]);
  const [userVehiclesCount, setUserVehiclesCount] = useState(0);
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  // Redirect to login if not logged in
  useEffect(() => {
    if (!firebase?.isLoggedIn) {
      navigate("/login");
    }
  }, [firebase, navigate]);

  // Fetch profile and vehicle data
  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      const details = firebase.profDetails();

      if (details) {
        console.log("details are: ", details);
        setProfile(details);
        setName(details.name || "");
        if (details.photoURL) {
          setProfilePic(details.photoURL);
        }

        try {
          const [count, vehicles] = await Promise.all([
            fetchUserVehicleCount(details.id),
            fetchUserVehicleDetails(details.id),
          ]);
          setUserVehiclesCount(count);
          setUserVehicles(vehicles);
        } catch (error) {
          console.error("Error fetching vehicle data:", error);
        }

        try {
          const firestoreDetails = await firebase.fetchUserDetails();
          if (firestoreDetails) {
            if (firestoreDetails.gender) {
              setGender(firestoreDetails.gender);
            }
            if (firestoreDetails.phone || firestoreDetails.number) {
              setPhone(firestoreDetails.phone || firestoreDetails.number);
            }
          }
        } catch (error) {
          console.error("Error fetching Firestore user details:", error);
        }
      }
      setLoading(false);
    };

    fetchProfileData();
  }, [firebase]);

  if (loading) return <Loading />;

  return (
    <ProfilePage
      profile={profile}
      userVehicles={userVehicles}
      userVehiclesCount={userVehiclesCount}
      name={name}
      profilePic={profilePic}
      phone={phone}
      gender={gender}
    />
  );
}
