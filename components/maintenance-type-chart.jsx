"use client"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Oil Changes", value: 28, color: "#3b82f6" },
  { name: "Tire Services", value: 22, color: "#22c55e" },
  { name: "Brake Services", value: 15, color: "#a855f7" },
  { name: "Battery Services", value: 12, color: "#f59e0b" },
  { name: "Filters", value: 10, color: "#ef4444" },
  { name: "Other", value: 13, color: "#64748b" },
]

export default function MaintenanceTypeChart() {
  return (
    <Chart>
      <ChartLegend className="mb-4">
        {data.map((entry, index) => (
          <ChartLegendItem key={`legend-${index}`} className={`text-[${entry.color}]`} name={entry.name} />
        ))}
      </ChartLegend>
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <ChartTooltip>
                      <ChartTooltipContent
                        content={
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: data.color }} />
                              <p className="text-sm font-medium">{data.name}</p>
                            </div>
                            <p className="text-sm">{data.value}% of all maintenance</p>
                          </div>
                        }
                      />
                    </ChartTooltip>
                  )
                }
                return null
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Chart>
  )
}
