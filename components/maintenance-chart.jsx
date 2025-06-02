"use client";
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

const data = [
	{
		month: "Jan",
		repairs: 0,
		maintenance: 75,
	},
	{
		month: "Feb",
		repairs: 350,
		maintenance: 0,
	},
	{
		month: "Mar",
		repairs: 0,
		maintenance: 0,
	},
	{
		month: "Apr",
		repairs: 0,
		maintenance: 150,
	},
	{
		month: "May",
		repairs: 200,
		maintenance: 0,
	},
	{
		month: "Jun",
		repairs: 0,
		maintenance: 120,
	},
	{
		month: "Jul",
		repairs: 0,
		maintenance: 0,
	},
	{
		month: "Aug",
		repairs: 500,
		maintenance: 150,
	},
	{
		month: "Sep",
		repairs: 0,
		maintenance: 0,
	},
	{
		month: "Oct",
		repairs: 0,
		maintenance: 200,
	},
	{
		month: "Nov",
		repairs: 0,
		maintenance: 0,
	},
	{
		month: "Dec",
		repairs: 0,
		maintenance: 0,
	},
];

export default function MaintenanceChart() {
	return (
		<Chart>
			<ChartLegend className="mb-4">
				<ChartLegendItem className="text-blue-500" name="Maintenance" />
				<ChartLegendItem className="text-red-500" name="Repairs" />
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
						<XAxis dataKey="month" />
						<YAxis />
						<Tooltip
							content={({ active, payload }) => {
								if (active && payload && payload.length) {
									return (
										<ChartTooltip>
											<ChartTooltipContent
												content={
													<div className="flex flex-col gap-2">
														<p className="text-sm font-medium">
															{payload[0].payload.month}
														</p>
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
																	{entry.name}: ${entry.value}
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
						<Bar dataKey="maintenance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
						<Bar dataKey="repairs" fill="#ef4444" radius={[4, 4, 0, 0]} />
					</BarChart>
				</ResponsiveContainer>
			</ChartContainer>
		</Chart>
	);
}
