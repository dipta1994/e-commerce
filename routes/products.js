const express = require('express');
const router = express.Router();

// Dummy product data
const products = [
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
  },
  {
    id: 5,
    name: "Wireless Charging Pad",
    description: "Fast wireless charging for all Qi-compatible devices",
    price: 39.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
    stock: 45,
    rating: 4.4,
    reviews: 67
  },
  {
    id: 6,
    name: "Leather Wallet",
    description: "Genuine leather wallet with multiple card slots",
    price: 49.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
    stock: 60,
    rating: 4.8,
    reviews: 142
  },
  {
    id: 7,
    name: "Bluetooth Speaker",
    description: "Portable waterproof speaker with amazing sound quality",
    price: 79.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    stock: 35,
    rating: 4.2,
    reviews: 93
  },
  {
    id: 8,
    name: "Yoga Mat",
    description: "Non-slip yoga mat perfect for home workouts",
    price: 34.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    stock: 80,
    rating: 4.6,
    reviews: 178
  }
];

// Get all products
router.get('/', (req, res) => {
  try {
    const { category, search, sort, page = 1, limit = 8 } = req.query;
    
    let filteredProducts = [...products];
    
    // Filter by category
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Search functionality
    if (search) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Sorting
    if (sort) {
      switch (sort) {
        case 'price-low':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filteredProducts.sort((a, b) => b.id - a.id);
          break;
        default:
          break;
      }
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    res.json({
      products: paginatedProducts,
      totalProducts: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single product
router.get('/:id', (req, res) => {
  try {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get categories
router.get('/categories/all', (req, res) => {
  try {
    const categories = [...new Set(products.map(product => product.category))];
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
