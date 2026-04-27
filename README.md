# Luxe Cart - Full-Stack E-Commerce Platform

A production-ready, full-stack e-commerce application built with React, Node.js, Express, and MongoDB.

![Luxe Cart](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

✅ **Full Authentication System**
- JWT-based authentication with bcrypt password hashing
- Login, signup, profile management
- Persistent sessions with token validation

✅ **Product Catalog**
- Dynamic product listing from MongoDB
- Category filtering (Men, Women, Unisex)
- Product detail pages with ratings & reviews
- Search and sort functionality

✅ **Shopping Cart**
- Add/remove products
- Quantity management
- Wishlist functionality
- Real-time cart count

✅ **Payment Integration**
- PayPal checkout integration
- Secure payment processing

✅ **Production Ready**
- RESTful API with Express
- MongoDB database
- JWT authentication
- CORS security
- Environment variables
- Deployment configs (Vercel + Render)

## Tech Stack

**Frontend:**
- React 19 with Vite
- Tailwind CSS v4
- React Router DOM
- Context API (Auth & Cart)
- PayPal SDK

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- Bcrypt encryption
- Helmet security
- CORS & compression

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB installed locally or MongoDB Atlas account
- PayPal Developer account (for production payments)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/harsshsingh8/culture-circle.git
cd culture-circle
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd server
npm install
cd ..
```

4. **Set up environment variables**

Create `.env` in the `server` folder:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/luxecart
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

Create `.env` in the root folder:
```env
VITE_API_URL=http://localhost:5000/api
```

5. **Start MongoDB**
```bash
# Windows (if MongoDB is installed as a service)
net start MongoDB

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in server/.env
```

6. **Seed the database with products**
```bash
cd server
npm run seed
```

7. **Start the backend server**
```bash
npm run dev
```
Server runs on http://localhost:5000

8. **Start the frontend (in a new terminal)**
```bash
npm run dev
```
Frontend runs on http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Health Check
- `GET /api/health` - API status

## Project Structure

```
culture-circle/
├── server/                 # Backend
│   ├── config/            # Database config
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Auth middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── index.js          # Server entry point
│   └── package.json
├── src/                   # Frontend
│   ├── components/       # React components
│   ├── context/          # Context providers
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── data/             # Static data
│   └── App.jsx
├── .env.example
├── vercel.json
├── render.yaml
└── package.json
```

## Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variable: `VITE_API_URL` (your backend URL)
4. Deploy

### Backend (Render)

1. Create new Web Service on Render
2. Connect GitHub repository
3. Set root directory: `server`
4. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `CLIENT_URL` (your frontend URL)
5. Deploy

### MongoDB (Atlas)

1. Create free cluster on MongoDB Atlas
2. Get connection string
3. Update `MONGODB_URI` in backend environment variables
4. Allow access from all IPs (0.0.0.0/0) for production

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- Helmet security headers
- Input validation
- Environment variable protection

## Demo Account

For testing without signup:
- Email: `demo@luxecart.com`
- Password: `demo123`

## Scripts

- `npm run dev` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build
- `cd server && npm run dev` - Start backend with nodemon
- `cd server && npm start` - Start backend in production
- `cd server && npm run seed` - Seed database with products

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Author

**Harsh Singh**
- GitHub: [@harsshsingh8](https://github.com/harsshsingh8)

## Support

If you find this project helpful, please give it a ⭐ on GitHub!
