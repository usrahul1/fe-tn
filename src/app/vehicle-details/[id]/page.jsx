import React from "react";
import { useParams } from "react-router-dom";
import VehicleDetails from "@/components/vehicle-details";

export default function VehicleDetailsPage() {
  const { id } = useParams();

  return <VehicleDetails vehicleId={id} />;
}
