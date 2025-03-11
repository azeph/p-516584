
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
}

export interface ProductsByMonth {
  month: string;
  topProduct: string;
  salesPotential: number;
  secondProduct: string;
  secondSalesPotential: number;
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
    
    // Get seasonal product forecast data
    getSeasonalProductForecast: async (): Promise<ProductsByMonth[]> => {
      try {
        // This would normally make an actual API call to get seasonal data
        // For now, we're simulating this with the current hardcoded data
        // In a real implementation, you would parse the API response and transform it
        
        // Simulated API response
        return [
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
      } catch (error) {
        console.error('Error fetching seasonal product forecast:', error);
        return [];
      }
    }
  };
};

export const wooCommerceApi = createWooCommerceClient();
