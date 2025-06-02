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
    maintenance: 75,
    fuel: 120,
    insurance: 150,
  },
  {
    month: "Feb",
    maintenance: 350,
    fuel: 130,
    insurance: 150,
  },
  {
    month: "Mar",
    maintenance: 0,
    fuel: 110,
    insurance: 150,
  },
  {
    month: "Apr",
    maintenance: 150,
    fuel: 140,
    insurance: 150,
  },
  {
    month: "May",
    maintenance: 200,
    fuel: 125,
    insurance: 150,
  },
  {
    month: "Jun",
    maintenance: 120,
    fuel: 135,
    insurance: 150,
  },
  {
    month: "Jul",
    maintenance: 0,
    fuel: 145,
    insurance: 150,
  },
  {
    month: "Aug",
    maintenance: 650,
    fuel: 130,
    insurance: 150,
  },
  {
    month: "Sep",
    maintenance: 0,
    fuel: 120,
    insurance: 150,
  },
  {
    month: "Oct",
    maintenance: 200,
    fuel: 110,
    insurance: 150,
  },
  {
    month: "Nov",
    maintenance: 0,
    fuel: 105,
    insurance: 150,
  },
  {
    month: "Dec",
    maintenance: 0,
    fuel: 115,
    insurance: 150,
  },
]

export default function CostTrendChart() {
  return (
    <Chart>
      <ChartLegend className="mb-4">
        <ChartLegendItem className="text-blue-500" name="Maintenance" />
        <ChartLegendItem className="text-green-500" name="Fuel" />
        <ChartLegendItem className="text-purple-500" name="Insurance" />
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
            <YAxis />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <ChartTooltip>
                      <ChartTooltipContent
                        content={
                          <div className="flex flex-col gap-2">
                            <p className="text-sm font-medium">{payload[0].payload.month}</p>
                            {payload.map((entry, index) => (
                              <div key={`tooltip-${index}`} className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                <p className="text-sm">
                                  {entry.name}: ${entry.value}
                                </p>
                              </div>
                            ))}
                          </div>
                        }
                      />
                    </ChartTooltip>
                  )
                }
                return null
              }}
            />
            <Line type="monotone" dataKey="maintenance" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="fuel" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="insurance" stroke="#a855f7" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Chart>
  )
}
