const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
import { allProducts } from '../data/products';

export const api = {
  // Products
  getProducts: async () => {
    try {
      const res = await fetch(`${API_URL}/products`, {
        signal: AbortSignal.timeout(5000)
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.warn('Backend unavailable, using local product data');
      return {
        success: true,
        count: allProducts.length,
        data: allProducts
      };
    }
  },

  getProduct: async (id) => {
    try {
      console.log('API: Fetching product', id);
      const res = await fetch(`${API_URL}/products/${id}`, {
        signal: AbortSignal.timeout(5000)
      });
      const data = await res.json();
      console.log('API: Response', data);
      return data;
    } catch (error) {
      console.warn('Backend unavailable, using local product data');
      const product = allProducts.find(p => p.id === Number(id));
      console.log('Found product:', product);
      return {
        success: true,
        data: product || null
      };
    }
  },

  // Auth (handled in AuthContext)
  // Orders (can be added later)
};
