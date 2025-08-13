const express = require('express');
const router = express.Router();

// Dummy product data with new categories
const products = [
  // Raw Materials
  {
    id: 1,
    name: "High-Purity Cell Culture Media",
    description: "Premium cell culture media for optimal cell growth and proliferation",
    price: 299.99,
    category: "Raw Materials",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400",
    stock: 25,
    rating: 4.8,
    reviews: 156
  },
  {
    id: 2,
    name: "Recombinant Growth Factors",
    description: "High-quality recombinant proteins for cell culture applications",
    price: 599.99,
    category: "Raw Materials",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400",
    stock: 15,
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: "Serum-Free Supplements",
    description: "Advanced supplements for serum-free cell culture systems",
    price: 199.99,
    category: "Raw Materials",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400",
    stock: 40,
    rating: 4.7,
    reviews: 203
  },
  
  // Cleanroom Essentials
  {
    id: 4,
    name: "Sterile Gowning System",
    description: "Complete sterile gowning system for cleanroom operations",
    price: 89.99,
    category: "Cleanroom Essentials",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
    stock: 60,
    rating: 4.6,
    reviews: 178
  },
  {
    id: 5,
    name: "HEPA Air Filtration Units",
    description: "High-efficiency particulate air filtration for cleanroom environments",
    price: 1299.99,
    category: "Cleanroom Essentials",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
    stock: 8,
    rating: 4.8,
    reviews: 67
  },
  {
    id: 6,
    name: "Sterile Gloves & Masks",
    description: "Premium sterile gloves and masks for contamination control",
    price: 24.99,
    category: "Cleanroom Essentials",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
    stock: 200,
    rating: 4.5,
    reviews: 342
  },
  
  // Downstream Support
  {
    id: 7,
    name: "Protein Purification Columns",
    description: "High-performance chromatography columns for protein purification",
    price: 899.99,
    category: "Downstream Support",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400",
    stock: 12,
    rating: 4.9,
    reviews: 45
  },
  {
    id: 8,
    name: "Centrifugation Systems",
    description: "Advanced centrifugation systems for cell and protein separation",
    price: 2499.99,
    category: "Downstream Support",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400",
    stock: 5,
    rating: 4.7,
    reviews: 23
  },
  {
    id: 9,
    name: "Filtration Membranes",
    description: "Ultrafiltration and microfiltration membranes for downstream processing",
    price: 399.99,
    category: "Downstream Support",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400",
    stock: 30,
    rating: 4.6,
    reviews: 78
  },
  
  // Filtration Support
  {
    id: 10,
    name: "Sterile Filters (0.22μm)",
    description: "Sterile membrane filters for final product filtration",
    price: 149.99,
    category: "Filtration Support",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400",
    stock: 80,
    rating: 4.8,
    reviews: 234
  },
  {
    id: 11,
    name: "Filter Housings & Holders",
    description: "Robust filter housings for various filtration applications",
    price: 299.99,
    category: "Filtration Support",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400",
    stock: 20,
    rating: 4.5,
    reviews: 56
  },
  {
    id: 12,
    name: "Depth Filtration Systems",
    description: "Complete depth filtration systems for clarification processes",
    price: 799.99,
    category: "Filtration Support",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400",
    stock: 15,
    rating: 4.7,
    reviews: 34
  },
  
  // Upstream Support
  {
    id: 13,
    name: "Bioreactor Systems",
    description: "Advanced bioreactor systems for cell culture and fermentation",
    price: 15999.99,
    category: "Upstream Support",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400",
    stock: 3,
    rating: 4.9,
    reviews: 12
  },
  {
    id: 14,
    name: "Cell Culture Incubators",
    description: "Precision-controlled incubators for optimal cell growth conditions",
    price: 3999.99,
    category: "Upstream Support",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400",
    stock: 8,
    rating: 4.8,
    reviews: 28
  },
  {
    id: 15,
    name: "pH & DO Monitoring Systems",
    description: "Real-time monitoring systems for pH and dissolved oxygen",
    price: 1299.99,
    category: "Upstream Support",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400",
    stock: 12,
    rating: 4.6,
    reviews: 41
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
// Get categories (place above dynamic route to avoid shadowing)
router.get('/categories/all', (req, res) => {
  try {
    const categories = [...new Set(products.map(product => product.category))];
    res.json(categories);
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

module.exports = router;
