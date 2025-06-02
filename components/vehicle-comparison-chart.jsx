"use client";
import { useState, useEffect } from "react";
import {
	Chart,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendItem,
} from "@/components/ui/chart";
import {
	Bar,
	BarChart,
	XAxis,
	YAxis,
	ResponsiveContainer,
	CartesianGrid,
	Tooltip,
} from "recharts";
import { useFirebase } from "@/context/Firebase";
import { fetchUserVehicleDetailsWithSpecs } from "@/api/RequestMaker";

const specMetrics = [
	{ label: "Price", key: "price" },
	{ label: "Insurance", key: "insurance" },
	{ label: "Parts Cost", key: "parts" },
	{ label: "Safety", key: "safety" },
];

export default function VehicleComparisonChart() {
	const firebase = useFirebase();
	const [profile, setProfile] = useState(null);
	const [userVehicles, setUserVehicles] = useState([]);
	const colors = [
		"#3b82f6",
		"#22c55e",
		"#a855f7",
		"#f59e0b",
		"#ef4444",
		"#10b981",
	];

	useEffect(() => {
		const details = firebase.profDetails();
		if (details) {
			setProfile(details);
		}
	}, [firebase]);

	useEffect(() => {
		const fetchVehicles = async () => {
			try {
				const data = await fetchUserVehicleDetailsWithSpecs(profile?.id);
				setUserVehicles(data);
			} catch (err) {
				console.error(err);
			}
		};

		fetchVehicles();
	}, [profile?.id]);

	// const data = specMetrics.map((metric) => {
	// 	const entry = { name: metric.label };

	// 	userVehicles?.forEach(({ vehicle }) => {
	// 		const brandModel = `${vehicle.brand} ${vehicle.model}`;
	// 		const rawValue = vehicle[metric.key];

	// 		const value = Number(
	// 			typeof rawValue === "string" ? rawValue.replace(/,/g, "") : rawValue
	// 		);

	// 		entry[brandModel] = isNaN(value) ? 0 : value;
	// 	});

	// 	return entry;
	// });
	const data = specMetrics.map((metric) => {
		const entry = { name: metric.label };
		const values = userVehicles.map(({ vehicle }) => {
			const raw = vehicle[metric.key];
			return Number(typeof raw === "string" ? raw.replace(/,/g, "") : raw) || 0;
		});

		const min = Math.min(...values);
		const max = Math.max(...values);

		userVehicles.forEach(({ vehicle }) => {
			const brandModel = `${vehicle.brand} ${vehicle.model}`;
			const rawValue = vehicle[metric.key];

			const value =
				Number(
					typeof rawValue === "string" ? rawValue.replace(/,/g, "") : rawValue
				) || 0;

			// Normalize to 0–100
			let normalized =
				max === min ? 100 : 50 + ((value - min) / (max - min)) * 50;

			entry[brandModel] = Math.round(normalized);
		});

		return entry;
	});

	return (
		<Chart>
			<ChartLegend className="mb-4">
				{userVehicles?.map(({ vehicle }, idx) => (
					<ChartLegendItem
						key={idx}
						style={{ color: colors[idx % colors.length] }}
						name={`${vehicle.brand} ${vehicle.model}`}
					/>
				))}
			</ChartLegend>
			<ChartContainer>
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						data={data}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" opacity={0.2} />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip
							content={({ active, payload, label }) => {
								if (active && payload && payload.length) {
									return (
										<ChartTooltip>
											<ChartTooltipContent
												content={
													<div className="flex flex-col gap-2">
														<p className="text-sm font-medium">{label}</p>
														{payload.map((entry, index) => (
															<div
																key={`tooltip-${index}`}
																className="flex items-center gap-2"
															>
																<div
																	className="h-2 w-2 rounded-full"
																	style={{ backgroundColor: entry.color }}
																/>
																<p className="text-sm">
																	{entry.name}: {entry.value}
																</p>
															</div>
														))}
													</div>
												}
											/>
										</ChartTooltip>
									);
								}
								return null;
							}}
						/>

						{userVehicles?.map(({ vehicle }, idx) => (
							<Bar
								key={idx}
								dataKey={`${vehicle.brand} ${vehicle.model}`}
								fill={colors[idx % colors.length]}
								radius={[4, 4, 0, 0]}
							/>
						))}
					</BarChart>
				</ResponsiveContainer>
			</ChartContainer>
		</Chart>
	);
}
