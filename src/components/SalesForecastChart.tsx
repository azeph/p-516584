
import { useState } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card } from "@/components/ui/card";
import { TrendingUp, RefreshCcw, TrendingDown, BarChart2, Zap, ArrowRight, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { wooCommerceApi, ProductsByMonth, PopularProduct } from "@/services/woocommerceApi";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const radarChartConfig = {
  sales: {
    label: "Sales Potential",
    theme: {
      light: "#8B5CF6",
      dark: "#8B5CF6",
    },
  },
};

const SalesForecastChart = () => {
  const { data: seasonalProductData, isLoading: isSeasonalLoading, error: seasonalError, refetch: refetchSeasonal } = useQuery({
    queryKey: ['seasonalProductForecast'],
    queryFn: () => wooCommerceApi.getSeasonalProductForecast(),
  });

  const { data: popularProducts, isLoading: isPopularLoading, error: popularError, refetch: refetchPopular } = useQuery({
    queryKey: ['popularProducts'],
    queryFn: () => wooCommerceApi.getPopularProducts(),
  });

  const [chartType, setChartType] = useState<'bar' | 'radar'>('bar');

  if (isSeasonalLoading || isPopularLoading) {
    return (
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 border-0 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Zap className="h-5 w-5 mr-2 text-purple-400" />
            Seasonal Product Forecast
          </h3>
          <div className="p-2 bg-purple-900/50 rounded-full animate-spin">
            <RefreshCcw className="h-4 w-4 text-purple-400" />
          </div>
        </div>
        <p className="text-sm text-slate-400 mb-6">
          Loading forecast data from WooCommerce API...
        </p>
        <div className="h-[400px] w-full flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 bg-purple-600/20 rounded-full animate-pulse mb-4"></div>
            <p className="text-slate-400">Loading chart data...</p>
          </div>
        </div>
      </Card>
    );
  }

  if (seasonalError || popularError) {
    return (
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 border-0 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Zap className="h-5 w-5 mr-2 text-purple-400" />
            Seasonal Product Forecast
          </h3>
          <button 
            onClick={() => {
              refetchSeasonal();
              refetchPopular();
            }}
            className="p-2 bg-purple-900/50 rounded-full hover:bg-purple-800/50 transition-colors"
          >
            <RefreshCcw className="h-4 w-4 text-purple-400" />
          </button>
        </div>
        <p className="text-sm text-slate-400 mb-6">
          Error loading data from WooCommerce API
        </p>
        <div className="p-4 bg-red-900/20 rounded-lg text-red-400">
          Failed to fetch data. Please check your API configuration and try again.
        </div>
      </Card>
    );
  }

  const currentMonth = new Date().getMonth();
  const nextMonth = (currentMonth + 1) % 12;

  // Transform data for radar chart
  const radarData = seasonalProductData?.map(item => ({
    month: item.month,
    sales: item.salesPotential,
  }));

  return (
    <Card className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 border-0 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Zap className="h-5 w-5 mr-2 text-purple-400" />
          Seasonal Product Intelligence
        </h3>
        <div className="flex items-center gap-2">
          <Tabs 
            value={chartType} 
            onValueChange={(v) => setChartType(v as 'bar' | 'radar')}
            className="mr-2"
          >
            <TabsList className="bg-slate-800/70">
              <TabsTrigger value="bar" className="data-[state=active]:bg-purple-900/50">
                <BarChart2 className="h-4 w-4 mr-1" />
                Bar
              </TabsTrigger>
              <TabsTrigger value="radar" className="data-[state=active]:bg-purple-900/50">
                <TrendingUp className="h-4 w-4 mr-1" />
                Radar
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <button 
            onClick={() => {
              refetchSeasonal();
              refetchPopular();
            }} 
            className="p-2 bg-purple-900/50 rounded-full hover:bg-purple-800/50 transition-colors"
            title="Refresh data"
          >
            <RefreshCcw className="h-4 w-4 text-purple-400" />
          </button>
        </div>
      </div>
      <p className="text-sm text-slate-400 mb-6">
        AI-powered insights from WooCommerce sales data to optimize your inventory
      </p>
      
      <div className="h-[400px] w-full">
        {chartType === 'bar' ? (
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={seasonalProductData} margin={{ top: 10, right: 10, left: 0, bottom: 100 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  height={70}
                />
                <YAxis 
                  tickFormatter={(value) => `${value}%`}
                  width={50}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  label={{ value: 'Sales Potential', position: 'insideLeft', style: { textAnchor: 'middle', fill: '#94a3b8' } }}
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
        ) : (
          <ChartContainer config={radarChartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="month" tick={{ fill: '#94a3b8' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
                <Radar
                  name="sales"
                  dataKey="sales"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.6}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, name, props) => {
                        const month = props.payload.month;
                        const productName = seasonalProductData?.find(item => item.month === month)?.topProduct;
                        return [`${value}% potential - ${productName}`];
                      }}
                    />
                  }
                />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 flex flex-col">
          <div className="text-sm font-medium text-slate-400">Current Focus</div>
          <div className="mt-1 text-lg font-bold text-purple-400">
            {seasonalProductData && seasonalProductData[currentMonth]?.topProduct}
          </div>
          <div className="flex items-center mt-2 text-sm text-slate-400">
            <Clock className="h-3 w-3 mr-1" />
            {seasonalProductData && seasonalProductData[currentMonth]?.month}
          </div>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 flex flex-col">
          <div className="text-sm font-medium text-slate-400">Next Month</div>
          <div className="mt-1 text-lg font-bold text-purple-400">
            {seasonalProductData && seasonalProductData[nextMonth]?.topProduct}
          </div>
          <div className="flex items-center mt-2 text-sm text-slate-400">
            <ArrowRight className="h-3 w-3 mr-1" />
            {seasonalProductData && seasonalProductData[nextMonth]?.month}
          </div>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 col-span-1 md:col-span-2 lg:col-span-2">
          <div className="text-sm font-medium text-slate-400 mb-2">Top Performing Products</div>
          <div className="space-y-2">
            {popularProducts && popularProducts.slice(0, 3).map((product) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  {product.image && (
                    <div className="w-8 h-8 mr-2 rounded bg-slate-700 overflow-hidden flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-medium text-white">{product.name}</div>
                    <div className="text-xs text-slate-400">{product.price}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-1">{product.total_sales}</span>
                  {product.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-400" />}
                  {product.trend === 'down' && <TrendingDown className="h-3 w-3 text-red-400" />}
                  {product.trend === 'stable' && <div className="h-1 w-3 bg-yellow-400 rounded-full" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SalesForecastChart;
