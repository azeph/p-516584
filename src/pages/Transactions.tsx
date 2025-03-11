
import { Card } from "@/components/ui/card";
import { Package, AlertTriangle } from "lucide-react";

const Stock = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">Stock Management</h1>
        <p className="text-secondary-foreground">Monitor and manage your inventory levels</p>
      </header>

      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Current Stock Levels</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-muted rounded-full">
                  <Package className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Product {i}</p>
                  <p className="text-sm text-muted-foreground">{Math.floor(Math.random() * 100)} units in stock</p>
                </div>
              </div>
              {Math.random() > 0.7 && (
                <div className="flex items-center text-yellow-500">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <p className="font-medium">Low Stock</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Stock;
