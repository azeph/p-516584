
import { Card } from "@/components/ui/card";
import { Package, Package2, PackageCheck, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import SalesForecastChart from "@/components/SalesForecastChart";

const inventoryData = [
  { name: "Jan", quantity: 240 },
  { name: "Feb", quantity: 139 },
  { name: "Mar", quantity: 980 },
  { name: "Apr", quantity: 390 },
  { name: "May", quantity: 480 },
  { name: "Jun", quantity: 380 },
];

const Index = () => {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-primary">Inventory Dashboard</h1>
          <p className="text-secondary-foreground">Manage your stock levels and product inventory</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="glass-card px-4 py-2 rounded-lg hover-scale">
            <Package className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Products</p>
              <h2 className="text-2xl font-bold">1,563</h2>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <Package2 className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Low Stock Items</p>
              <h2 className="text-2xl font-bold">24</h2>
            </div>
            <div className="p-2 bg-yellow-100 rounded-full">
              <ArrowDownRight className="h-4 w-4 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Out of Stock</p>
              <h2 className="text-2xl font-bold">8</h2>
            </div>
            <div className="p-2 bg-red-100 rounded-full">
              <ArrowDownRight className="h-4 w-4 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Inventory Forecasting Section */}
      <SalesForecastChart />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-card p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Stock Level Trends</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={inventoryData}>
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="quantity"
                  stroke="#8989DE"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Low Stock Alerts</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-muted rounded-full">
                    <PackageCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Product {i}</p>
                    <p className="text-sm text-muted-foreground">5 units left</p>
                  </div>
                </div>
                <p className="font-medium text-yellow-500">Low Stock</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
