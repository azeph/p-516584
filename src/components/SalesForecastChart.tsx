
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

// Sample data with seasonal product forecasting
const seasonalProductData = [
  { month: "Jan", topProduct: "Winter Wear", salesPotential: 85, secondProduct: "Hot Beverages", secondSalesPotential: 75 },
  { month: "Feb", topProduct: "Flowers & Gifts", salesPotential: 95, secondProduct: "Chocolates", secondSalesPotential: 90 },
  { month: "Mar", topProduct: "Spring Clothing", salesPotential: 80, secondProduct: "Garden Supplies", secondSalesPotential: 75 },
  { month: "Apr", topProduct: "Rain Gear", salesPotential: 85, secondProduct: "Home Decor", secondSalesPotential: 70 },
  { month: "May", topProduct: "Summer Clothes", salesPotential: 90, secondProduct: "Sunscreen", secondSalesPotential: 85 },
  { month: "Jun", topProduct: "Beverages", salesPotential: 95, secondProduct: "Ice Cream", secondSalesPotential: 90 },
  { month: "Jul", topProduct: "Cold Drinks", salesPotential: 100, secondProduct: "Beach Items", secondSalesPotential: 95 },
  { month: "Aug", topProduct: "Back to School", salesPotential: 95, secondProduct: "Electronics", secondSalesPotential: 90 },
  { month: "Sep", topProduct: "Fall Clothing", salesPotential: 85, secondProduct: "Home Appliances", secondSalesPotential: 80 },
  { month: "Oct", topProduct: "Halloween Items", salesPotential: 90, secondProduct: "Decorations", secondSalesPotential: 85 },
  { month: "Nov", topProduct: "Candles & Decor", salesPotential: 95, secondProduct: "Winter Gear", secondSalesPotential: 85 },
  { month: "Dec", topProduct: "Gift Items", salesPotential: 100, secondProduct: "Holiday Decorations", secondSalesPotential: 95 },
];

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
  return (
    <Card className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Seasonal Product Forecast</h3>
        <div className="p-2 bg-purple-100 rounded-full">
          <TrendingUp className="h-4 w-4 text-purple-600" />
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Recommended products to stock based on seasonal trends
      </p>
      
      <div className="h-[400px] w-full">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={seasonalProductData} margin={{ top: 10, right: 10, left: 0, bottom: 100 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tick={{ angle: 0, fontSize: 12 }}
                height={70}
              />
              <YAxis 
                tickFormatter={(value) => `${value}%`}
                width={50}
                axisLine={false}
                tick={{ fontSize: 12 }}
                label={{ value: 'Sales Potential', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
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
            {seasonalProductData[new Date().getMonth()].topProduct}
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
          <div className="text-sm font-medium">Next Month Preparation</div>
          <div className="mt-1 text-lg font-bold text-purple-600">
            {seasonalProductData[(new Date().getMonth() + 1) % 12].topProduct}
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
