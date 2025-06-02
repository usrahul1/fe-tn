"use client"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts"

const data = [
  {
    month: "Jan",
    tesla: 0,
    toyota: 30.5,
    bmw: 21.2,
  },
  {
    month: "Feb",
    tesla: 0,
    toyota: 31.2,
    bmw: 20.8,
  },
  {
    month: "Mar",
    tesla: 0,
    toyota: 32.1,
    bmw: 21.5,
  },
  {
    month: "Apr",
    tesla: 0,
    toyota: 31.8,
    bmw: 22.0,
  },
  {
    month: "May",
    tesla: 0,
    toyota: 32.5,
    bmw: 21.8,
  },
  {
    month: "Jun",
    tesla: 0,
    toyota: 33.2,
    bmw: 22.3,
  },
  {
    month: "Jul",
    tesla: 0,
    toyota: 32.8,
    bmw: 22.1,
  },
  {
    month: "Aug",
    tesla: 0,
    toyota: 32.0,
    bmw: 21.5,
  },
  {
    month: "Sep",
    tesla: 0,
    toyota: 31.5,
    bmw: 21.0,
  },
  {
    month: "Oct",
    tesla: 0,
    toyota: 30.8,
    bmw: 20.5,
  },
  {
    month: "Nov",
    tesla: 0,
    toyota: 31.2,
    bmw: 20.8,
  },
  {
    month: "Dec",
    tesla: 0,
    toyota: 31.0,
    bmw: 20.6,
  },
]

export default function FuelEfficiencyChart() {
  return (
    <Chart>
      <ChartLegend className="mb-4">
        <ChartLegendItem className="text-blue-500" name="Tesla Model 3 (Electric)" />
        <ChartLegendItem className="text-green-500" name="Toyota Camry" />
        <ChartLegendItem className="text-purple-500" name="BMW X5" />
      </ChartLegend>
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
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
            <YAxis label={{ value: "MPG", angle: -90, position: "insideLeft" }} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <ChartTooltip>
                      <ChartTooltipContent
                        content={
                          <div className="flex flex-col gap-2">
                            <p className="text-sm font-medium">{payload[0].payload.month}</p>
                            {payload.map(
                              (entry, index) =>
                                entry.value > 0 && (
                                  <div key={`tooltip-${index}`} className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                    <p className="text-sm">
                                      {entry.name}: {entry.value} mpg
                                    </p>
                                  </div>
                                ),
                            )}
                          </div>
                        }
                      />
                    </ChartTooltip>
                  )
                }
                return null
              }}
            />
            <Line type="monotone" dataKey="toyota" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="bmw" stroke="#a855f7" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Chart>
  )
}
