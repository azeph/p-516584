
import { useEffect, useState } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card } from "@/components/ui/card";
import { TrendingUp, RefreshCcw } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { wooCommerceApi, ProductsByMonth } from "@/services/woocommerceApi";
import { useQuery } from "@tanstack/react-query";

const chartConfig = {
  topProduct: {
    label: "Primary Product",
    theme: {
      light: "#8B5CF6",
      dark: "#8B5CF6",
    },
  },
  secondProduct: {
    label: "Secondary Product",
    theme: {
      light: "#D946EF",
      dark: "#D946EF",
    },
  },
};

const SalesForecastChart = () => {
  const { data: seasonalProductData, isLoading, error, refetch } = useQuery({
    queryKey: ['seasonalProductForecast'],
    queryFn: () => wooCommerceApi.getSeasonalProductForecast(),
  });

  if (isLoading) {
    return (
      <Card className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Seasonal Product Forecast</h3>
          <div className="p-2 bg-purple-100 rounded-full animate-spin">
            <RefreshCcw className="h-4 w-4 text-purple-600" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Loading forecast data from WooCommerce API...
        </p>
        <div className="h-[400px] w-full flex items-center justify-center">
          <p>Loading chart data...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Seasonal Product Forecast</h3>
          <button 
            onClick={() => refetch()}
            className="p-2 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors"
          >
            <RefreshCcw className="h-4 w-4 text-purple-600" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Error loading data from WooCommerce API
        </p>
        <div className="p-4 bg-red-50 rounded-lg text-red-600">
          Failed to fetch seasonal product forecast. Please check your API configuration and try again.
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Seasonal Product Forecast</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => refetch()} 
            className="p-2 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors"
            title="Refresh data"
          >
            <RefreshCcw className="h-4 w-4 text-purple-600" />
          </button>
          <div className="p-2 bg-purple-100 rounded-full">
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Recommended products to stock based on seasonal trends from WooCommerce
      </p>
      
      <div className="h-[400px] w-full">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={seasonalProductData} margin={{ top: 10, right: 10, left: 0, bottom: 100 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tick={{ fontSize: 12 }}
                height={70}
              />
              <YAxis 
                tickFormatter={(value) => `${value}%`}
                width={50}
                axisLine={false}
                tick={{ fontSize: 12 }}
                label={{ value: 'Sales Potential', position: 'insideLeft', style: { textAnchor: 'middle' } }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name, props) => {
                      const dataPoint = props.payload;
                      const productName = name === "salesPotential" 
                        ? dataPoint.topProduct 
                        : dataPoint.secondProduct;
                      return [`${value}% potential - ${productName}`];
                    }}
                  />
                }
              />
              <Legend verticalAlign="bottom" height={50} />
              <Bar 
                dataKey="salesPotential" 
                name="topProduct"
                fill="#8B5CF6" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="secondSalesPotential" 
                name="secondProduct"
                fill="#D946EF" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
          <div className="text-sm font-medium">Current Month Focus</div>
          <div className="mt-1 text-lg font-bold text-purple-600">
            {seasonalProductData && seasonalProductData[new Date().getMonth()]?.topProduct}
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
          <div className="text-sm font-medium">Next Month Preparation</div>
          <div className="mt-1 text-lg font-bold text-purple-600">
            {seasonalProductData && seasonalProductData[(new Date().getMonth() + 1) % 12]?.topProduct}
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg md:col-span-2 lg:col-span-1">
          <div className="text-sm font-medium">Seasonal Tip</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Stock up on high-demand seasonal items at least 30 days before peak season for optimal inventory management.
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SalesForecastChart;
