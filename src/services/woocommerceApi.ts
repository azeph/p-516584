
import axios from 'axios';

// WooCommerce API configuration
interface WooCommerceConfig {
  url: string;
  consumerKey: string;
  consumerSecret: string;
  version: string;
}

// Default configuration - these would come from environment variables in production
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
  total_sales: number;
  categories: { id: number; name: string }[];
  price: string;
  images?: { src: string }[];
}

export interface ProductsByMonth {
  month: string;
  topProduct: string;
  salesPotential: number;
  secondProduct: string;
  secondSalesPotential: number;
  topProductImage?: string;
  secondProductImage?: string;
}

export interface PopularProduct {
  id: number;
  name: string;
  total_sales: number;
  image: string;
  price: string;
  trend: 'up' | 'down' | 'stable';
  growth: number;
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
    // Get all products
    getProducts: async (params = {}): Promise<ProductData[]> => {
      try {
        const response = await api.get('/products', { params });
        return response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
        return [];
      }
    },
    
    // Get popular products with sales data
    getPopularProducts: async (limit = 10): Promise<PopularProduct[]> => {
      try {
        // In a real implementation, we would fetch this data from the WooCommerce API
        // For now, using simulated data with the structure we would expect from the API
        
        // Simulated API call
        // const response = await api.get('/products', { 
        //   params: { 
        //     orderby: 'popularity',
        //     order: 'desc',
        //     per_page: limit
        //   } 
        // });
        
        // Mock data that would come from WooCommerce
        return [
          { id: 1, name: "Premium Headphones", total_sales: 342, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", price: "$129.99", trend: "up", growth: 12 },
          { id: 2, name: "Smart Watch", total_sales: 285, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", price: "$199.99", trend: "up", growth: 8 },
          { id: 3, name: "Wireless Earbuds", total_sales: 253, image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb", price: "$89.99", trend: "up", growth: 15 },
          { id: 4, name: "Fitness Tracker", total_sales: 210, image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63043", price: "$79.99", trend: "stable", growth: 2 },
          { id: 5, name: "Bluetooth Speaker", total_sales: 198, image: "https://images.unsplash.com/photo-1589491107330-c6007a0a5591", price: "$69.99", trend: "down", growth: -3 }
        ];
      } catch (error) {
        console.error('Error fetching popular products:', error);
        return [];
      }
    },
    
    // Get seasonal product forecast data
    getSeasonalProductForecast: async (): Promise<ProductsByMonth[]> => {
      try {
        // This would normally make an actual API call to get seasonal data
        // For now, we're simulating this with the current hardcoded data
        // In a real implementation, you would parse the API response and transform it
        
        // Simulated API response
        return [
          { month: "Jan", topProduct: "Winter Wear", salesPotential: 85, secondProduct: "Hot Beverages", secondSalesPotential: 75, topProductImage: "https://images.unsplash.com/photo-1483917128463-5ca305343bd9", secondProductImage: "https://images.unsplash.com/photo-1544787219-7f47ccb76574" },
          { month: "Feb", topProduct: "Flowers & Gifts", salesPotential: 95, secondProduct: "Chocolates", secondSalesPotential: 90, topProductImage: "https://images.unsplash.com/photo-1494336956603-39e73c031f5c", secondProductImage: "https://images.unsplash.com/photo-1526081347589-7fa3cb41b4b2" },
          { month: "Mar", topProduct: "Spring Clothing", salesPotential: 80, secondProduct: "Garden Supplies", secondSalesPotential: 75, topProductImage: "https://images.unsplash.com/photo-1522438823541-d077e0a978e1", secondProductImage: "https://images.unsplash.com/photo-1558910018-dc378dc62554" },
          { month: "Apr", topProduct: "Rain Gear", salesPotential: 85, secondProduct: "Home Decor", secondSalesPotential: 70, topProductImage: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e", secondProductImage: "https://images.unsplash.com/photo-1616046229478-9901c5536a45" },
          { month: "May", topProduct: "Summer Clothes", salesPotential: 90, secondProduct: "Sunscreen", secondSalesPotential: 85, topProductImage: "https://images.unsplash.com/photo-1533678265838-c3cc4ecad7a3", secondProductImage: "https://images.unsplash.com/photo-1524656855800-59465ebcec69" },
          { month: "Jun", topProduct: "Beverages", salesPotential: 95, secondProduct: "Ice Cream", secondSalesPotential: 90, topProductImage: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b", secondProductImage: "https://images.unsplash.com/photo-1570197788417-0e82375c9371" },
          { month: "Jul", topProduct: "Cold Drinks", salesPotential: 100, secondProduct: "Beach Items", secondSalesPotential: 95, topProductImage: "https://images.unsplash.com/photo-1596803244618-8dce33e4e322", secondProductImage: "https://images.unsplash.com/photo-1509233725247-49e657c54213" },
          { month: "Aug", topProduct: "Back to School", salesPotential: 95, secondProduct: "Electronics", secondSalesPotential: 90, topProductImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b", secondProductImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f" },
          { month: "Sep", topProduct: "Fall Clothing", salesPotential: 85, secondProduct: "Home Appliances", secondSalesPotential: 80, topProductImage: "https://images.unsplash.com/photo-1600574691453-499962cc0611", secondProductImage: "https://images.unsplash.com/photo-1574269252556-89926e7c5805" },
          { month: "Oct", topProduct: "Halloween Items", salesPotential: 90, secondProduct: "Decorations", secondSalesPotential: 85, topProductImage: "https://images.unsplash.com/photo-1508361001413-7a9dca21d08a", secondProductImage: "https://images.unsplash.com/photo-1577126997592-ba61484c05b2" },
          { month: "Nov", topProduct: "Candles & Decor", salesPotential: 95, secondProduct: "Winter Gear", secondSalesPotential: 85, topProductImage: "https://images.unsplash.com/photo-1519420076181-6d95931379fc", secondProductImage: "https://images.unsplash.com/photo-1613416721396-061cb256f49a" },
          { month: "Dec", topProduct: "Gift Items", salesPotential: 100, secondProduct: "Holiday Decorations", secondSalesPotential: 95, topProductImage: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a", secondProductImage: "https://images.unsplash.com/photo-1607262807149-dda0a6550235" },
        ];
      } catch (error) {
        console.error('Error fetching seasonal product forecast:', error);
        return [];
      }
    }
  };
};

export const wooCommerceApi = createWooCommerceClient();
