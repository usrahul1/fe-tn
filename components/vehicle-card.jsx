import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Fuel, Battery, Car, Gauge } from "lucide-react";
import { addUserVehicle, removeUserVehicle } from "@/api/RequestMaker";
import { useFirebase } from "@/context/Firebase";
import toast from "react-hot-toast";

export default function VehicleCard({ vehicle, showDetails = true, isOwner }) {
  const navigate = useNavigate();
  const firebase = useFirebase();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const details = firebase.profDetails();
    if (details) {
      setProfile(details);
    }
  }, [firebase]);

  const handleViewDetails = () => {
    navigate(`/vehicle-details/${vehicle.id}`);
  };

  const add = async () => {
    const res = await addUserVehicle(profile.id, vehicle.id);
    if (res) {
      toast.success("Vehicle added!");
      window.location.reload();
    }
  };

  const remove = async () => {
    const res = await removeUserVehicle(profile.id, vehicle.id);
    if (res) {
      toast.success("Vehicle removed!");
      window.location.reload();
    }
  };

  return (
    <Card className="card bg-base-100 text-base-content border border-base-300 rounded-box shadow-md hover:shadow-lg transition-all duration-300">
      <figure className="relative h-48 w-full overflow-hidden rounded-t-box">
        <img
          src={vehicle.imageUrl || "/images/default-car.jpg"}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body p-4">
        {/* Vehicle Title */}
        <div className="flex items-center gap-2 mb-2">
          <Car className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-lg truncate">
            {vehicle.year} {vehicle.brand} {vehicle.model}
          </h3>
        </div>

        {/* Mileage */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 text-sm">
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            <span>{vehicle.mileage.toLocaleString()} mi</span>
          </div>
        </div>

        {/* Fuel or Battery */}
        {vehicle.fuelLevel !== undefined && (
          <div className="mt-4 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="flex items-center gap-1">
                {vehicle.batteryHealth !== undefined ? (
                  <>
                    <Battery className="h-3 w-3" />
                    Battery
                  </>
                ) : (
                  <>
                    <Fuel className="h-3 w-3" />
                    Fuel
                  </>
                )}
              </span>
              <span>
                {vehicle.batteryHealth !== undefined
                  ? `${vehicle.batteryHealth}%`
                  : `${vehicle.fuelLevel}%`}
              </span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="card-actions mt-4">
          {!isOwner ? (
            <button
              onClick={add}
              className="btn btn-secondary w-full text-white"
            >
              Add Vehicle
            </button>
          ) : (
            <button
              onClick={remove}
              className="btn btn-secondary w-full text-white"
            >
              Remove Vehicle
            </button>
          )}
        </div>

        {/* View Details Button */}
        {showDetails && (
          <div className="card-actions mt-2">
            <Button
              onClick={handleViewDetails}
              className="btn btn-primary w-full"
            >
              View Details
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
