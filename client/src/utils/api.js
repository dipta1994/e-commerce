import axios from 'axios';

// Configure base URL for API calls
// Check for explicit environment variable first, then determine based on environment
const getApiBaseUrl = () => {
  // If REACT_APP_API_URL is explicitly set, use it
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // For production, try different strategies
  if (process.env.NODE_ENV === 'production') {
    // Strategy 1: If deployed on same domain (like Render), use relative path
    if (window.location.hostname.includes('onrender.com') || 
        window.location.hostname.includes('vercel.app') ||
        window.location.hostname.includes('netlify.app')) {
      return '/api';
    }
    
    // Strategy 2: If backend is on different domain, you need to set REACT_APP_API_URL
    // For now, fallback to relative path
    return '/api';
  }
  
  // Development: use localhost
  return 'http://localhost:5000';
};

const API_BASE_URL = getApiBaseUrl();

// Log API configuration for debugging
console.log('API Configuration:', {
  NODE_ENV: process.env.NODE_ENV,
  REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  API_BASE_URL: API_BASE_URL,
  hostname: typeof window !== 'undefined' ? window.location.hostname : 'server'
});

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Send token in both headers to support different backends
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      baseURL: error.config?.baseURL
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    // Handle network errors (common in production)
    if (!error.response) {
      console.error('Network error - API server may be down or unreachable');
    }
    
    return Promise.reject(error);
  }
);

export default api;
