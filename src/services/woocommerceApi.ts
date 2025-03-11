
import axios from 'axios';

// WooCommerce API configuration
interface WooCommerceConfig {
  url: string;
  consumerKey: string;
  consumerSecret: string;
  version: string;
}

// Default configuration
const defaultConfig: WooCommerceConfig = {
  url: 'https://your-store-url.com',
  consumerKey: 'your_consumer_key',
  consumerSecret: 'your_consumer_secret',
  version: 'v3'
};

// Product data interface
export interface ProductData {
  id: number;
  name: string;
  stock_quantity: number;
  stock_status: string;
  categories: { id: number; name: string }[];
  price: string;
  images?: { src: string }[];
}

export interface ProductsByMonth {
  month: string;
  topProduct: string;
  stockLevel: number;
  secondProduct: string;
  secondStockLevel: number;
  topProductImage?: string;
  secondProductImage?: string;
}

export interface PopularProduct {
  id: number;
  name: string;
  stock_quantity: number;
  image: string;
  price: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  stockTrend: 'up' | 'down' | 'stable';
  reorderPoint: number;
}

// Create WooCommerce API client
export const createWooCommerceClient = (config: Partial<WooCommerceConfig> = {}) => {
  const fullConfig = { ...defaultConfig, ...config };
  
  const api = axios.create({
    baseURL: `${fullConfig.url}/wp-json/wc/${fullConfig.version}`,
    auth: {
      username: fullConfig.consumerKey,
      password: fullConfig.consumerSecret
    }
  });

  return {
    // Get all products with stock information
    getProducts: async (params = {}): Promise<ProductData[]> => {
      try {
        const response = await api.get('/products', { params });
        return response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
        return [];
      }
    },
    
    // Get inventory levels of popular products
    getPopularProducts: async (limit = 10): Promise<PopularProduct[]> => {
      try {
        // Simulated API response with inventory focus
        return [
          { id: 1, name: "Premium Headphones", stock_quantity: 142, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", price: "$129.99", status: "in_stock", stockTrend: "up", reorderPoint: 50 },
          { id: 2, name: "Smart Watch", stock_quantity: 25, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", price: "$199.99", status: "low_stock", stockTrend: "down", reorderPoint: 30 },
          { id: 3, name: "Wireless Earbuds", stock_quantity: 0, image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb", price: "$89.99", status: "out_of_stock", stockTrend: "down", reorderPoint: 25 },
          { id: 4, name: "Fitness Tracker", stock_quantity: 89, image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63043", price: "$79.99", status: "in_stock", stockTrend: "stable", reorderPoint: 40 },
          { id: 5, name: "Bluetooth Speaker", stock_quantity: 35, image: "https://images.unsplash.com/photo-1589491107330-c6007a0a5591", price: "$69.99", status: "in_stock", stockTrend: "down", reorderPoint: 30 }
        ];
      } catch (error) {
        console.error('Error fetching popular products:', error);
        return [];
      }
    },
    
    // Get seasonal inventory forecast
    getSeasonalProductForecast: async (): Promise<ProductsByMonth[]> => {
      try {
        // Simulated seasonal inventory data
        return [
          { month: "Jan", topProduct: "Winter Gear", stockLevel: 85, secondProduct: "Thermal Wear", secondStockLevel: 75, topProductImage: "https://images.unsplash.com/photo-1483917128463-5ca305343bd9", secondProductImage: "https://images.unsplash.com/photo-1544787219-7f47ccb76574" },
          { month: "Feb", topProduct: "Valentine Gifts", stockLevel: 95, secondProduct: "Accessories", secondStockLevel: 90, topProductImage: "https://images.unsplash.com/photo-1494336956603-39e73c031f5c", secondProductImage: "https://images.unsplash.com/photo-1526081347589-7fa3cb41b4b2" },
          { month: "Mar", topProduct: "Spring Collection", stockLevel: 80, secondProduct: "Outdoor Gear", secondStockLevel: 75, topProductImage: "https://images.unsplash.com/photo-1522438823541-d077e0a978e1", secondProductImage: "https://images.unsplash.com/photo-1558910018-dc378dc62554" },
          { month: "Apr", topProduct: "Rain Gear", stockLevel: 85, secondProduct: "Home Decor", secondStockLevel: 70, topProductImage: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e", secondProductImage: "https://images.unsplash.com/photo-1616046229478-9901c5536a45" },
          { month: "May", topProduct: "Summer Wear", stockLevel: 90, secondProduct: "Beach Items", secondStockLevel: 85, topProductImage: "https://images.unsplash.com/photo-1533678265838-c3cc4ecad7a3", secondProductImage: "https://images.unsplash.com/photo-1524656855800-59465ebcec69" },
          { month: "Jun", topProduct: "Outdoor Sports", stockLevel: 95, secondProduct: "Camping Gear", secondStockLevel: 90, topProductImage: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b", secondProductImage: "https://images.unsplash.com/photo-1570197788417-0e82375c9371" }
        ];
      } catch (error) {
        console.error('Error fetching seasonal product forecast:', error);
        return [];
      }
    }
  };
};

export const wooCommerceApi = createWooCommerceClient();
