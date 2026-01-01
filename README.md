# LocalChefBazaar – Marketplace for Local Home-Cooked Meals

A full-stack MERN marketplace platform that connects local home chefs with customers looking for fresh, healthy, and affordable homemade meals. LocalChefBazaar empowers home chefs to earn by selling their culinary creations while providing customers with an easy-to-use platform to discover, order, and enjoy authentic home-cooked meals.

## 🔗 Live Links

- **Client:** [https://localchefbazaar-31da8.web.app](https://localchefbazaar-31da8.web.app)
- **Server:** [https://server-side-eight-gray.vercel.app](https://server-side-eight-gray.vercel.app)

---

## 📖 Project Overview

LocalChefBazaar is designed to create a thriving marketplace ecosystem where:
- **Home Chefs** can showcase their culinary skills and earn income
- **Customers** can easily browse, order, pay, and review homemade meals
- **Admins** have complete control over platform management and analytics

This project demonstrates advanced full-stack development skills including authentication, role-based access control, secure payment integration, real-time order updates, and modern UI/UX design principles.

---

## ✨ Core Features

### 🔐 Authentication & Security
- **Firebase Email/Password Authentication** – Secure user registration and login
- **JWT-based Authentication** – Token stored in httpOnly cookies for security
- **Protected Routes** – Separate access levels for User, Chef, and Admin
- **Role-based Access Control** – Granular permissions based on user roles
- **Environment Variables** – Secure storage of Firebase and MongoDB credentials

### 🌐 Public Features
- **Animated Home Page** – Smooth animations using Framer Motion
- **Daily Meals Section** – Dynamically loaded featured meals
- **Customer Reviews Section** – Social proof and testimonials
- **Meals Page** with:
  - Sorting by price (Ascending/Descending)
  - Pagination (10 meals per page)
  - Conditional access to detail pages
  - Search and filter functionality

### 🍽️ Meal Details (Private Route)
- Complete meal information display
- Review system (Add and read reviews)
- Favorite meal functionality
- Instant UI updates after review submission
- Chef profile information
- Nutritional details and ingredients

### 🛒 Order System
- Order confirmation with SweetAlert notifications
- Quantity-based price calculation
- Order status tracking (Pending → Accepted → Delivered)
- **Stripe Payment Integration** – Secure online payments
- Payment history stored in MongoDB
- Order receipt generation

### 👨‍🍳 Chef Dashboard
- **Create Meal** – Upload meals with image, description, and pricing
- **Manage Meals** – Update or delete own meal listings
- **Order Management** – View and process customer orders
- **Live Status Updates** – Real-time order tracking
- **Revenue Analytics** – Track earnings and performance

### 👤 User Dashboard
- **My Profile** – View and edit personal information
- **My Orders** – Track order history and status
- **My Reviews** – Manage reviews (update/delete)
- **Favorite Meals** – Quick access to saved meals
- **Payment History** – View all transaction records

### 👑 Admin Dashboard
- **Manage Users** – View all users, mark fraudulent accounts
- **Role Management** – Approve Chef and Admin role requests
- **Platform Statistics** – Interactive charts using Recharts
- **Overview Metrics** – Total payments, orders, and users
- **System Monitoring** – Platform health and activity tracking

### 📊 Profile Management
- View detailed profile information
- Request Chef or Admin role
- Conditional UI based on current role
- Profile picture upload
- Contact information management

---

## 🛠️ Technologies Used

### Frontend
- **React.js** - Component-based UI library
- **React Router DOM** - Client-side routing
- **Firebase Authentication** - User authentication service
- **React Hook Form** - Form validation and management
- **Framer Motion** - Animation library
- **Recharts** - Data visualization charts
- **SweetAlert2** - Beautiful alert popups
- **React Icons** - Comprehensive icon library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Stripe** - Payment processing platform
- **JWT** - JSON Web Token for authentication
- **CORS** - Cross-Origin Resource Sharing
- **Cookie Parser** - Parse HTTP cookies
- **dotenv** - Environment variable management

---

## 📦 Dependencies

### Client Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "firebase": "^10.7.1",
  "axios": "^1.6.2",
  "react-hook-form": "^7.49.2",
  "framer-motion": "^10.16.16",
  "sweetalert2": "^11.10.3",
  "recharts": "^2.10.3",
  "react-icons": "^4.12.0",
  "@stripe/stripe-js": "^2.4.0",
  "@stripe/react-stripe-js": "^2.4.0"
}
```

### Server Dependencies
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "mongodb": "^6.3.0",
  "dotenv": "^16.3.1",
  "jsonwebtoken": "^9.0.2",
  "stripe": "^14.10.0",
  "cookie-parser": "^1.4.6"
}
```

---

## 🚀 Running the Project Locally

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Firebase project with Authentication enabled
- Stripe account for payment integration

---

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/nerobkabir/Local-Chef-Bazar-Client.git
cd localchefbazaar
```

---

### **Step 2: Setup Client (Frontend)**

#### Navigate to client directory
```bash
cd client
```

#### Install dependencies
```bash
npm install
```

#### Create environment variables
Create a `.env.local` file in the client root directory:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
```

#### Start development server
```bash
npm run dev
```

**Client runs on:** `http://localhost:5173`

---

### **Step 3: Setup Server (Backend)**

Open a new terminal and navigate to server directory:
```bash
cd server
```

#### Install dependencies
```bash
npm install
```

#### Create environment variables
Create a `.env` file in the server root directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key

# Cookie Settings
COOKIE_SECRET=your_cookie_secret
NODE_ENV=development
```

#### Start the server
```bash
npm start
# or for development with nodemon
npm run dev
```

**Server runs on:** `http://localhost:5000`

---

### **Step 4: Setup MongoDB Database**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database named `localchefbazaar`
4. Create collections:
   - `users` - Store user information and roles
   - `meals` - Store meal listings
   - `orders` - Store order information
   - `reviews` - Store meal reviews
   - `payments` - Store payment records
5. Get your connection string and add it to server `.env` file
6. Whitelist your IP address in MongoDB Atlas

---

### **Step 5: Setup Firebase Authentication**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication:
   - Go to Authentication → Sign-in method
   - Enable **Email/Password** authentication
   - Enable **Google** authentication (optional)
4. Add authorized domains:
   - Go to Authentication → Settings → Authorized domains
   - Add `localhost` and your production domain
5. Get Firebase config credentials from Project Settings
6. Add credentials to client `.env.local` file

---

### **Step 6: Setup Stripe Payment**

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your API keys:
   - Publishable key (for client)
   - Secret key (for server)
3. Add keys to respective `.env` files
4. Enable test mode for development
5. Configure webhook endpoints (for production)

---

### **Step 7: Access the Application**

Open your browser and visit:
- **Frontend:** `http://localhost:5173`
- **Backend API:** `http://localhost:5000`

#### Test Accounts
Create accounts with different roles to test functionality:
- Regular User (default)
- Chef (request role upgrade)
- Admin (manually set in database)

---

## 📂 Project Structure
```
localchefbazaar/
│
├── client/                          # Frontend React Application
│   ├── public/
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── assets/                 # Images, icons, static files
│   │   │   ├── images/
│   │   │   └── logo.png
│   │   │
│   │   ├── components/             # Reusable UI components
│   │   │   ├── shared/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Loader.jsx
│   │   │   ├── home/
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── DailyMeals.jsx
│   │   │   │   └── Reviews.jsx
│   │   │   ├── meals/
│   │   │   │   ├── MealCard.jsx
│   │   │   │   ├── MealDetails.jsx
│   │   │   │   └── ReviewForm.jsx
│   │   │   └── dashboard/
│   │   │       ├── StatCard.jsx
│   │   │       └── OrderCard.jsx
│   │   │
│   │   ├── pages/                  # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Meals.jsx
│   │   │   ├── MealDetails.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── layouts/                # Layout components
│   │   │   ├── MainLayout.jsx
│   │   │   └── DashboardLayout.jsx
│   │   │
│   │   ├── routes/                 # Route configuration
│   │   │   ├── Routes.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── RoleBasedRoute.jsx
│   │   │
│   │   ├── context/                # Context API
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   │
│   │   ├── hooks/                  # Custom hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useAxios.js
│   │   │   └── useRole.js
│   │   │
│   │   ├── utils/                  # Utility functions
│   │   │   ├── api.js
│   │   │   └── helpers.js
│   │   │
│   │   ├── firebase/               # Firebase config
│   │   │   └── firebase.config.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env.local
│   ├── package.json
│   └── vite.config.js
│
└── server/                          # Backend Node.js Application
    ├── config/
    │   └── db.js                   # MongoDB connection
    │
    ├── middleware/
    │   ├── auth.js                 # JWT verification
    │   ├── roleCheck.js            # Role-based access
    │   └── errorHandler.js         # Error handling
    │
    ├── models/
    │   ├── User.js
    │   ├── Meal.js
    │   ├── Order.js
    │   ├── Review.js
    │   └── Payment.js
    │
    ├── routes/
    │   ├── auth.js                 # Authentication routes
    │   ├── users.js                # User management
    │   ├── meals.js                # Meal CRUD operations
    │   ├── orders.js               # Order management
    │   ├── reviews.js              # Review system
    │   ├── payments.js             # Payment processing
    │   └── admin.js                # Admin operations
    │
    ├── controllers/
    │   ├── authController.js
    │   ├── mealController.js
    │   ├── orderController.js
    │   ├── reviewController.js
    │   ├── paymentController.js
    │   └── adminController.js
    │
    ├── utils/
    │   ├── jwtToken.js
    │   └── validators.js
    │
    ├── .env
    ├── server.js
    └── package.json
```

---

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Verify JWT token

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/request-role` - Request Chef/Admin role
- `GET /api/users` - Get all users (Admin only)
- `PATCH /api/users/:id/role` - Update user role (Admin only)

### Meals
- `GET /api/meals` - Get all meals (with pagination & sorting)
- `GET /api/meals/:id` - Get single meal details
- `POST /api/meals` - Create new meal (Chef only)
- `PUT /api/meals/:id` - Update meal (Chef only)
- `DELETE /api/meals/:id` - Delete meal (Chef only)
- `GET /api/meals/chef/:chefId` - Get meals by chef

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PATCH /api/orders/:id/status` - Update order status (Chef only)
- `GET /api/orders/chef/all` - Get chef's orders

### Reviews
- `GET /api/reviews/meal/:mealId` - Get reviews for a meal
- `POST /api/reviews` - Add review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review
- `GET /api/reviews/user` - Get user's reviews

### Payments
- `POST /api/payments/create-intent` - Create Stripe payment intent
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/history` - Get payment history
- `GET /api/payments/stats` - Get payment statistics (Admin only)

### Admin
- `GET /api/admin/stats` - Get platform statistics
- `GET /api/admin/role-requests` - Get pending role requests
- `PATCH /api/admin/role-requests/:id` - Approve/reject role request
- `PATCH /api/admin/users/:id/fraud` - Mark user as fraudulent

---

## 🚀 Deployment

### Deploy Client to Firebase Hosting

1. **Install Firebase CLI:**
```bash
npm install -g firebase-tools
```

2. **Login to Firebase:**
```bash
firebase login
```

3. **Initialize Firebase:**
```bash
firebase init hosting
```

4. **Build the project:**
```bash
npm run build
```

5. **Deploy:**
```bash
firebase deploy
```

6. **Add authorized domain:**
   - Go to Firebase Console → Authentication → Settings
   - Add your production domain to authorized domains

### Deploy Server to Vercel

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Create `vercel.json` in server root:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

3. **Deploy:**
```bash
vercel --prod
```

4. **Set environment variables:**
   - Go to Vercel dashboard → Project Settings → Environment Variables
   - Add all server environment variables

### Deploy Server to Railway (Alternative)

1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically on push

---

## 🧪 Testing

### Manual Testing Checklist

#### Authentication
- [ ] User registration with email/password
- [ ] User login and logout
- [ ] Firebase Google authentication
- [ ] JWT token persistence
- [ ] Protected route access

#### User Flow
- [ ] Browse meals with pagination
- [ ] Sort meals by price
- [ ] View meal details
- [ ] Add to favorites
- [ ] Place order
- [ ] Complete payment via Stripe
- [ ] View order history
- [ ] Add and manage reviews

#### Chef Flow
- [ ] Request Chef role
- [ ] Create new meal
- [ ] Upload meal images
- [ ] Update meal details
- [ ] Delete meal
- [ ] View incoming orders
- [ ] Update order status
- [ ] View revenue analytics

#### Admin Flow
- [ ] View platform statistics
- [ ] Manage users
- [ ] Approve role requests
- [ ] Mark fraudulent users
- [ ] Monitor payments
- [ ] View system metrics

## 👨‍💻 Developer

**Kabir Hossain**  
*MERN Stack Developer*
---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Recharts](https://recharts.org/)

---
**Made with ❤️ by Kabir Hossain**
