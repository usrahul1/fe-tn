"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
	CalendarIcon,
	Download,
	BarChart3,
	PieChart,
	LineChart,
	Car,
	Fuel,
	Wrench,
	DollarSign,
} from "lucide-react";

import VehicleComparisonChart from "./vehicle-comparison-chart";

export default function AnalyticsContent({
	userVehiclesCount,
	userElectricVehiclesCount,
	totalVehiclePrice,
	userVehicles,
}) {
	const colors = [
		"bg-blue-500",
		"bg-green-500",
		"bg-purple-500",
		"bg-yellow-500",
		"bg-red-500",
	];

	return (
		<div className="container mx-auto p-4 space-y-6">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<h1 className="text-2xl font-bold">Analytics Dashboard</h1>

				<div className="flex flex-wrap gap-2">
					<Button variant="outline" onClick={() => window.print()}>
						<Download className="mr-2 h-4 w-4" />
						Export Data
					</Button>
				</div>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card className=" border">
					<CardContent className="p-6">
						<div className="flex justify-between items-start">
							<div>
								<p className="text-sm font-medium text-blue-500">
									Your Vehicles
								</p>
								<h3 className="text-3xl font-bold mt-2">{userVehiclesCount}</h3>
							</div>
							<div className=" p-3 rounded-full">
								<Car className="h-6 w-6 " />
							</div>
						</div>
					</CardContent>
				</Card>

				{userVehiclesCount - userElectricVehiclesCount > 0 ? (
					<Card className="">
						<CardContent className="p-6">
							<div className="flex justify-between items-start">
								<div>
									<p className="text-sm font-medium text-green-500">
										Fuel Efficiency
									</p>
									<h3 className="text-3xl font-bold mt-2">
										24.8 <span className="text-lg">mpg</span>
									</h3>
								</div>
								<div className="bg-green-500/20 p-3 rounded-full">
									<Fuel className="h-6 w-6 text-green-500" />
								</div>
							</div>
						</CardContent>
					</Card>
				) : (
					""
				)}

				{userElectricVehiclesCount > 0 ? (
					<Card className="">
						<CardContent className="p-6">
							<div className="flex justify-between items-start">
								<div>
									<p className="text-sm font-medium text-green-500">
										Battery Efficiency
									</p>
									<h3 className="text-3xl font-bold mt-2">
										4 <span className="text-lg">mi/kWh</span>
									</h3>
								</div>
								<div className="bg-green-500/20 p-3 rounded-full">
									<Fuel className="h-6 w-6 text-green-500" />
								</div>
							</div>
						</CardContent>
					</Card>
				) : (
					""
				)}

				<Card className="">
					<CardContent className="p-6">
						<div className="flex justify-between items-start">
							<div>
								<p className="text-sm font-medium text-orange-500">
									Total Expenses
								</p>
								<h3 className="text-3xl font-bold mt-2">
									${totalVehiclePrice.toLocaleString()}
								</h3>
							</div>
							<div className="bg-orange-500/20 p-3 rounded-full">
								<DollarSign className="h-6 w-6 text-orange-500" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<Tabs defaultValue="Overview" className="">
				<TabsList className="grid h-fit w-fit max-w-[600px] grid-cols-1">
					{/* <TabsTrigger value="overview" className="flex items-center gap-2">
						<BarChart3 className="h-4 w-4" />
						<span className="hidden sm:inline">Overview</span>
					</TabsTrigger> */}

					<TabsTrigger value="Overview" className="flex items-center gap-2">
						<PieChart className="h-4" />
						<span className="hidden sm:inline text-xl">Overview</span>
					</TabsTrigger>
				</TabsList>

				<TabsContent value="Overview" className="space-y-4 mt-6 w-full">
					<Card>
						<CardHeader>
							<CardTitle>Vehicle Comparison</CardTitle>
							<CardDescription>
								Compare performance metrics across your vehicles
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-fit">
								<VehicleComparisonChart />
							</div>
						</CardContent>
					</Card>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-lg">Safety</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{userVehicles.map(({ vehicle }, idx) => {
										const safety = Number(vehicle.safety) || 0;
										const widthPercent = Math.min(
											Math.max((vehicle.safety / 10) * 100, 0),
											100
										);

										return (
											<div key={`${vehicle.brand}-${vehicle.model}-${idx}`}>
												<div className="flex justify-between mb-1">
													<span className="text-sm">{`${vehicle.brand} ${vehicle.model}`}</span>
													<span className="text-sm font-medium">
														{widthPercent}/100
													</span>
												</div>
												<div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
													<div
														className={`${
															colors[idx % colors.length]
														} h-full rounded-full`}
														style={{ width: `${widthPercent}%` }}
													/>
												</div>
											</div>
										);
									})}
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-lg">Price</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{(() => {
										const prices = userVehicles.map(({ vehicle }) => {
											const rawPrice = vehicle.price;
											if (!rawPrice) return 0;
											const cleanedPrice =
												typeof rawPrice === "string"
													? rawPrice.replace(/,/g, "")
													: rawPrice;
											const numPrice = Number(cleanedPrice);
											return isNaN(numPrice) ? 0 : numPrice;
										});

										const maxPrice = Math.max(...prices);
										const minPrice = 10000;

										return userVehicles.map(({ vehicle }, idx) => {
											const price = prices[idx] || 0;

											const widthPercent =
												price <= minPrice
													? 0
													: maxPrice === minPrice
													? 100
													: ((price - minPrice) / (maxPrice - minPrice)) * 100;

											return (
												<div key={`${vehicle.brand}-${vehicle.model}-${idx}`}>
													<div className="flex justify-between mb-1">
														<span className="text-sm">{`${vehicle.brand} ${vehicle.model}`}</span>
														<span className="text-sm font-medium">
															${price.toLocaleString()}
														</span>
													</div>
													<div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
														<div
															className={`${
																colors[idx % colors.length]
															} h-full rounded-full`}
															style={{ width: `${widthPercent}%` }}
														/>
													</div>
												</div>
											);
										});
									})()}
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-lg">Insurance</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{(() => {
										const insuranceValues = userVehicles.map(({ vehicle }) => {
											const rawInsurance = vehicle.insurance;
											if (!rawInsurance) return 0;
											const cleaned =
												typeof rawInsurance === "string"
													? rawInsurance.replace(/,/g, "")
													: rawInsurance;
											const num = Number(cleaned);
											return isNaN(num) ? 0 : num;
										});

										const maxInsurance = Math.max(...insuranceValues);
										const minInsurance = 500; // Fixed minimum

										return userVehicles.map(({ vehicle }, idx) => {
											const insurance = insuranceValues[idx] || 0;

											const widthPercent =
												insurance <= minInsurance
													? 0
													: maxInsurance === minInsurance
													? 100
													: ((insurance - minInsurance) /
															(maxInsurance - minInsurance)) *
													  100;

											return (
												<div key={`${vehicle.brand}-${vehicle.model}-${idx}`}>
													<div className="flex justify-between mb-1">
														<span className="text-sm">{`${vehicle.brand} ${vehicle.model}`}</span>
														<span className="text-sm font-medium">
															${insurance.toLocaleString()}
														</span>
													</div>
													<div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
														<div
															className={`${
																colors[idx % colors.length]
															} h-full rounded-full`}
															style={{ width: `${widthPercent}%` }}
														/>
													</div>
												</div>
											);
										});
									})()}
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
