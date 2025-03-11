
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

// Sample data with forecast values
const forecastData = [
  { month: "Jan", actual: 4200, forecast: 4200 },
  { month: "Feb", actual: 4500, forecast: 4500 },
  { month: "Mar", actual: 5100, forecast: 5100 },
  { month: "Apr", actual: 4800, forecast: 4800 },
  { month: "May", actual: 5300, forecast: 5300 },
  { month: "Jun", actual: 5800, forecast: 5800 },
  // Future months (forecast only)
  { month: "Jul", actual: null, forecast: 6100 },
  { month: "Aug", actual: null, forecast: 6500 },
  { month: "Sep", actual: null, forecast: 7000 },
  { month: "Oct", actual: null, forecast: 7200 },
  { month: "Nov", actual: null, forecast: 7600 },
  { month: "Dec", actual: null, forecast: 8100 },
];

const chartConfig = {
  actual: {
    label: "Actual Sales",
    theme: {
      light: "#8B5CF6",
      dark: "#8B5CF6",
    },
  },
  forecast: {
    label: "Forecast",
    theme: {
      light: "#D946EF",
      dark: "#D946EF",
    },
  },
};

const SalesForecastChart = () => {
  return (
    <Card className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Sales Forecast</h3>
        <div className="p-2 bg-purple-100 rounded-full">
          <TrendingUp className="h-4 w-4 text-purple-600" />
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Projected revenue for the next 6 months
      </p>
      <div className="h-[300px] w-full">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D946EF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#D946EF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="month" />
              <YAxis 
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                width={80}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) =>
                      value ? `$${Number(value).toLocaleString()}` : "N/A"
                    }
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="#8B5CF6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#actualGradient)"
                activeDot={{ r: 6 }}
              />
              <Area
                type="monotone"
                dataKey="forecast"
                stroke="#D946EF"
                strokeDasharray="5 5"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#forecastGradient)"
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>
  );
};

export default SalesForecastChart;
