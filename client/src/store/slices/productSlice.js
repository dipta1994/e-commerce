import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Fallback data for when backend is not available
const fallbackProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 99.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    stock: 50,
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with this advanced smartwatch",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    stock: 30,
    rating: 4.3,
    reviews: 89
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and eco-friendly cotton t-shirt",
    price: 29.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    stock: 100,
    rating: 4.7,
    reviews: 256
  },
  {
    id: 4,
    name: "Stainless Steel Water Bottle",
    description: "Keep your drinks cold for 24 hours with this insulated bottle",
    price: 24.99,
    category: "Home & Garden",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
    stock: 75,
    rating: 4.6,
    reviews: 189
  }
];

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/products', { params });
      return response.data;
    } catch (error) {
      console.log('Backend not available, using fallback data. Error:', error.message);
      // Return fallback data if backend is not available
      return {
        products: fallbackProducts,
        totalProducts: fallbackProducts.length,
        totalPages: 1,
        currentPage: 1
      };
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/products/categories/all');
      return response.data;
    } catch (error) {
      console.log('Backend not available, using fallback categories');
      // Return fallback categories if backend is not available
      return ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Accessories'];
    }
  }
);

const initialState = {
  products: [], // Start empty, will be loaded from API
  product: null,
  categories: [],
  loading: false,
  error: null,
  filters: {
    category: 'all',
    search: '',
    sort: 'newest',
    page: 1,
    limit: 8
  },
  pagination: {
    totalProducts: 0,
    totalPages: 0,
    currentPage: 1
  }
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload, page: 1 };
    },
    setPage: (state, action) => {
      state.filters.page = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        category: 'all',
        search: '',
        sort: 'newest',
        page: 1,
        limit: 8
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pagination = {
          totalProducts: action.payload.totalProducts,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Single Product
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        // Normalize payload to an array. Some backends return { categories: [] }
        const payload = action.payload;
        state.categories = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.categories)
            ? payload.categories
            : [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearProduct, setFilters, setPage, clearFilters } = productSlice.actions;
export default productSlice.reducer;
