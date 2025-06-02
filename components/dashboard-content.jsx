import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"; // React Router
import { Car } from "lucide-react";
import VehicleCard from "./vehicle-card";

export default function DashboardContent({
  profile,
  userVehicles,
  userVehiclesCount,
}) {
  const navigate = useNavigate(); // Replaces Next.js useRouter
  const [activeTab, setActiveTab] = useState("overview");

  const handleViewAllVehicles = () => {
    navigate("/dashboard/profile"); // Equivalent to router.push
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium ">Total Vehicles</p>
                <h3 className="text-3xl font-bold mt-2">{userVehiclesCount}</h3>
              </div>
              <div className="p-3 rounded-full">
                <Car className="h-6 w-6 " />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue="overview"
        className="w-full"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid max-w-[200px] border">
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Vehicles</CardTitle>
                <CardDescription>
                  Manage and monitor your vehicles
                </CardDescription>
              </div>
              <Button
                className="btn btn-accent"
                onClick={handleViewAllVehicles}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userVehicles?.map((item) => {
                  const vehicle = item.vehicle;
                  return (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      isOwner={true}
                    />
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
