const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  // Products
  getProducts: async () => {
    const res = await fetch(`${API_URL}/products`);
    return res.json();
  },

  getProduct: async (id) => {
    const res = await fetch(`${API_URL}/products/${id}`);
    return res.json();
  },

  // Auth (handled in AuthContext)
  // Orders (can be added later)
};
