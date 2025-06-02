"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Car, Gauge, FileText, Download } from "lucide-react";
import MaintenanceChart from "./maintenance-chart";
import CostTrendChart from "./cost-trend-chart";
import { fetchVehicleById } from "@/api/RequestMaker";

export default function VehicleDetails({ vehicleId }) {
	const [vehicle, setVehicle] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const data = await fetchVehicleById(vehicleId);
				setVehicle(data);
			} catch (err) {
				setError("Failed to fetch vehicle data.");
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [vehicleId]);

	if (loading) {
		return <div>Loading vehicle data...</div>;
	}

	if (error) {
		return <div className="text-red-500">{error}</div>;
	}

	if (!vehicle) {
		return <div>No vehicle data found.</div>;
	}

	return (
		<div className="container mx-auto p-4 space-y-6">
			<div className="flex flex-col md:flex-row gap-6">
				{/* Vehicle Image */}
				<div className="w-full md:w-1/2 rounded-xl shadow-lg overflow-hidden">
					<div className="relative h-64 md:h-80">
						<img
							src={
								vehicle.imageUrl ||
								(vehicle.images && vehicle.images[0]) ||
								"/placeholder.svg"
							}
							alt={`${vehicle.brand} ${vehicle.model}`}
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="p-6">
						<h2 className="text-2xl font-bold  flex items-center gap-2">
							<Car className="h-6 w-6" />
							{vehicle.year}
						</h2>
						<h2 className="text-2xl font-bold  flex items-center gap-2">
							{vehicle.brand} {vehicle.model}
						</h2>
					</div>
				</div>

				{/* Vehicle Stats */}
				<div className="w-full md:w-1/2 space-y-4">
					<Card className="border-none ">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Gauge className="h-5 w-5" />
								Vehicle Details
							</CardTitle>
						</CardHeader>

						<CardContent className="space-y-4">
							{/* Basic Info */}
							<div className="grid grid-cols-2 gap-4 text-sm">
								<div className="flex flex-col">
									<span className="text-slate-400">ID</span>
									<span className="font-medium">{vehicle.id}</span>
								</div>
								<div className="flex flex-col">
									<span className="text-slate-400">Brand</span>
									<span className="font-medium">{vehicle.brand}</span>
								</div>
								<div className="flex flex-col">
									<span className="text-slate-400">Model</span>
									<span className="font-medium">{vehicle.model}</span>
								</div>
								<div className="flex flex-col">
									<span className="text-slate-400">Year</span>
									<span className="font-medium">{vehicle.year}</span>
								</div>
								<div className="flex flex-col">
									<span className="text-slate-400">Electric</span>
									<span className="font-medium">
										{vehicle.isElectric ? "Yes" : "No"}
									</span>
								</div>
								<div className="flex flex-col">
									<span className="text-slate-400">Mileage</span>
									<span className="font-medium">
										{vehicle.mileage.toLocaleString()} miles
										{vehicle.isElectric ? " on full charge" : " km/l"}
									</span>
								</div>
							</div>

							{/* Battery Range if available */}
							{vehicle.batteryRange && (
								<div className="space-y-2">
									<div className="flex justify-between">
										<span>Battery Range</span>
										<span>{vehicle.batteryRange} miles</span>
									</div>
									<Progress
										value={(vehicle.batteryRange / 350) * 100}
										className="h-2"
									/>
								</div>
							)}

							{/* Service, Parts, Insurance, Safety */}
							<div className="grid grid-cols-2 gap-4 text-sm pt-2">
								<div className="flex flex-col">
									<span className="text-slate-400">Service</span>
									<span className="font-medium">${vehicle.service}</span>
								</div>
								<div className="flex flex-col">
									<span className="text-slate-400">Parts</span>
									<span className="font-medium">${vehicle.parts}</span>
								</div>
								<div className="flex flex-col">
									<span className="text-slate-400">Insurance</span>
									<span className="font-medium">{vehicle.insurance}</span>
								</div>
								<div className="flex flex-col">
									<span className="text-slate-400">Safety</span>
									<span className="font-medium">{vehicle.safety}</span>
								</div>
							</div>

							{/* Capacities */}
							<div className="grid grid-cols-2 gap-4 text-sm">
								<div className="flex flex-col">
									<span className="text-slate-400">Fuel Tank Capacity</span>
									<span className="font-medium">
										{vehicle.fuelTankCapacity} L
									</span>
								</div>
								<div className="flex flex-col">
									<span className="text-slate-400">Battery Capacity</span>
									<span className="font-medium">
										{vehicle.batteryCapacity} kWh
									</span>
								</div>
							</div>

							{/* Price & Color */}
							<div className="grid grid-cols-2 gap-4 text-sm">
								<div className="flex flex-col">
									<span className="text-slate-400">Price</span>
									<span className="font-medium">
										${vehicle.price.toLocaleString()}
									</span>
								</div>
								<div className="flex flex-col">
									<span className="text-slate-400">Color</span>
									<span className="font-medium">White, Black</span>
								</div>
							</div>

							{/* Image */}
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Tabs for Analytics and Documents */}
			<Tabs defaultValue="analytics" className="w-full">
				<TabsList className="grid w-fit grid-cols-1 mb-6">
					<TabsTrigger value="analytics">Analytics</TabsTrigger>
				</TabsList>

				<TabsContent value="analytics" className="space-y-4">
					<div>
						<Card>
							<CardHeader>
								<CardTitle>Efficiency Metrics</CardTitle>
								<CardDescription>
									Track your vehicle's efficiency.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex justify-between">
									<span>Energy Efficiency</span>
									<span>
										{vehicle.isElectric ? "3 - 5 mi/kWh" : "25 - 35 mpg"}
									</span>
								</div>
								<div className="flex justify-between">
									<span>Cost per Mile</span>
									<span>{vehicle.isElectric ? "$0.06" : "$0.20"}</span>
								</div>
								<div className="flex justify-between">
									<span>Carbon Footprint</span>
									<span>{vehicle.isElectric ? "Low" : "High"}</span>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
