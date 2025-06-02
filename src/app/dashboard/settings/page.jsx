import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SettingsContent from "@/components/settings-content";
import { useFirebase } from "@/context/Firebase";

export default function SettingsPage() {
  const navigate = useNavigate();
  const firebase = useFirebase();

  useEffect(() => {
    if (!firebase?.isLoggedIn) {
      navigate("/login");
    }
  }, [firebase, navigate]);

  return <SettingsContent />;
}
