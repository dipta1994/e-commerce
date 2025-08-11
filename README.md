# E-commerce Website

A full-stack e-commerce website built with Node.js backend, React.js frontend, and Redux Toolkit for state management.

## Features

- **User Authentication**: Login, registration, and JWT token management
- **Product Management**: Browse products with filtering, sorting, and search
- **Shopping Cart**: Add/remove items, quantity management, and persistent storage
- **Order Management**: Place orders, view order history, and track status
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Redux Toolkit for efficient state management

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React.js** - UI library
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Toastify** - Notifications

## Project Structure

```
ecommerce-website/
├── server.js                 # Main server file
├── package.json             # Backend dependencies
├── routes/                  # API routes
│   ├── auth.js             # Authentication routes
│   ├── products.js         # Product routes
│   └── orders.js           # Order routes
└── client/                  # React frontend
    ├── package.json        # Frontend dependencies
    ├── public/             # Static files
    ├── src/
    │   ├── components/     # React components
    │   │   ├── auth/       # Authentication components
    │   │   ├── layout/     # Layout components
    │   │   └── pages/      # Page components
    │   ├── store/          # Redux store
    │   │   └── slices/     # Redux slices
    │   ├── App.js          # Main app component
    │   └── index.js        # Entry point
    └── tailwind.config.js  # Tailwind configuration
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm run server
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`

### Run Both (Development)

From the root directory:
```bash
npm run dev
```

This will start both backend and frontend concurrently.

## Deployment

### Quick Deployment (Recommended)

1. **Run the deployment script:**
   ```bash
   # On Windows:
   deploy.bat
   
   # On Mac/Linux:
   ./deploy.sh
   ```

2. **Follow the prompts to deploy to Render**

### Manual Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to various free hosting services.

### Free Hosting Options

- **Render** - Full-stack hosting (750 hours/month free)
- **Vercel** - Frontend hosting + Render backend
- **Netlify** - Frontend hosting + Cyclic backend

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get user profile

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories/all` - Get all categories

### Orders
- `GET /api/orders/user/:userId` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PATCH /api/orders/:id/status` - Update order status
- `PATCH /api/orders/:id/cancel` - Cancel order

## Demo Credentials

You can use these demo accounts to test the application:

**Regular User:**
- Email: `john@example.com`
- Password: `password`

**Admin User:**
- Email: `jane@example.com`
- Password: `password`

## Features in Detail

### Product Browsing
- View all products with pagination
- Filter by category
- Search by product name or description
- Sort by price, rating, or newest
- Responsive grid layout

### Shopping Cart
- Add products to cart
- Update quantities
- Remove items
- Persistent storage (localStorage)
- Real-time total calculation

### User Authentication
- Secure registration and login
- JWT token-based authentication
- Protected routes
- User profile management

### Order Management
- Complete checkout process
- Shipping information collection
- Payment method selection
- Order history and tracking
- Order status updates

## Customization

### Adding New Products
Edit the `routes/products.js` file and add new products to the `products` array.

### Styling
The project uses Tailwind CSS. Modify `client/tailwind.config.js` for custom colors and themes.

### Backend Configuration
Update environment variables in a `.env` file:
```env
PORT=5000
JWT_SECRET=your-secret-key
```

## Deployment

### Backend Deployment
1. Set environment variables
2. Run `npm start` (production mode)
3. Deploy to your preferred hosting service

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `build` folder to your hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the GitHub repository.

---

**Note**: This is a demo project with dummy data. In a production environment, you would need to:
- Connect to a real database (MongoDB, PostgreSQL, etc.)
- Implement proper payment processing
- Add security measures (HTTPS, rate limiting, etc.)
- Set up proper error logging and monitoring
- Add unit and integration tests
