const express = require('express');
const router = express.Router();

// Dummy order data
let orders = [
  {
    id: 1,
    userId: 1,
    items: [
      {
        productId: 1,
        name: "Wireless Bluetooth Headphones",
        price: 99.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
      }
    ],
    totalAmount: 99.99,
    status: "delivered",
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    paymentMethod: "credit_card",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-18T14:20:00Z"
  },
  {
    id: 2,
    userId: 1,
    items: [
      {
        productId: 3,
        name: "Organic Cotton T-Shirt",
        price: 29.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
      },
      {
        productId: 4,
        name: "Stainless Steel Water Bottle",
        price: 24.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400"
      }
    ],
    totalAmount: 84.97,
    status: "processing",
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    paymentMethod: "paypal",
    createdAt: "2024-01-20T09:15:00Z",
    updatedAt: "2024-01-20T09:15:00Z"
  }
];

// Get all orders for a user
router.get('/user/:userId', (req, res) => {
  try {
    const userOrders = orders.filter(order => order.userId === parseInt(req.params.userId));
    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single order
router.get('/:id', (req, res) => {
  try {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new order
router.post('/', (req, res) => {
  try {
    const { userId, items, totalAmount, shippingAddress, paymentMethod } = req.body;
    
    if (!userId || !items || !totalAmount || !shippingAddress || !paymentMethod) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const newOrder = {
      id: orders.length + 1,
      userId,
      items,
      totalAmount,
      status: 'pending',
      shippingAddress,
      paymentMethod,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    orders.push(newOrder);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status
router.patch('/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const order = orders.find(o => o.id === parseInt(req.params.id));
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    order.status = status;
    order.updatedAt = new Date().toISOString();
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel order
router.patch('/:id/cancel', (req, res) => {
  try {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    if (order.status === 'delivered' || order.status === 'shipped') {
      return res.status(400).json({ message: 'Cannot cancel order that is already shipped or delivered' });
    }
    
    order.status = 'cancelled';
    order.updatedAt = new Date().toISOString();
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get order statistics
router.get('/stats/user/:userId', (req, res) => {
  try {
    const userOrders = orders.filter(order => order.userId === parseInt(req.params.userId));
    
    const stats = {
      totalOrders: userOrders.length,
      totalSpent: userOrders.reduce((sum, order) => sum + order.totalAmount, 0),
      ordersByStatus: {
        pending: userOrders.filter(o => o.status === 'pending').length,
        processing: userOrders.filter(o => o.status === 'processing').length,
        shipped: userOrders.filter(o => o.status === 'shipped').length,
        delivered: userOrders.filter(o => o.status === 'delivered').length,
        cancelled: userOrders.filter(o => o.status === 'cancelled').length
      }
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
