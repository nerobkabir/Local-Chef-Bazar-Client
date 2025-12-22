# LocalChefBazaar

## Project Name

**LocalChefBazaar — Marketplace for Local Home-Cooked Meals**

---

## Purpose of the Project

LocalChefBazaar is a full-stack MERN-based marketplace platform that connects **local home chefs** with **customers** who are looking for fresh, healthy, and affordable homemade meals.

The main goal of this project is to:

* Enable home chefs to earn by selling their meals online
* Allow customers to easily browse, order, pay, and review meals
* Provide admins with full control over users, roles, orders, and platform statistics

This project is built as a **skill assessment system** focusing on authentication, role-based access control, secure payment, real-time order updates, and clean UI/UX.

---

## Live Website

* **Client Live URL:** [https://localchefbazaar-31da8.web.app](https://localchefbazaar-31da8.web.app)
* **Server Live URL:** [https://server-side-eight-gray.vercel.app](https://server-side-eight-gray.vercel.app)


## Key Features

### Authentication & Security

* Firebase Email/Password Authentication
* JWT-based authentication (httpOnly cookie)
* Protected routes for User, Chef, and Admin
* Role-based access control
* Environment variables used for Firebase & MongoDB credentials

---

### Public Features

* Animated Home Page (Framer Motion)
* Daily Meals Section (Dynamic)
* Customer Reviews Section
* Meals Page with:

  * Sorting (Price Asc/Desc)
  * Pagination (10 meals per page)
  * Conditional access to details page

---

### Meal Details (Private)

* Complete meal information
* Review system (Add / Read reviews)
* Favorite meal functionality
* Instant UI update after review submission

---

### Order System

* Order confirmation with SweetAlert
* Quantity-based total price calculation
* Order status tracking (pending → accepted → delivered)
* Stripe payment integration
* Payment history stored in MongoDB

---

### Dashboards

####  Chef Dashboard

* Create meal (image upload)
* Manage own meals (update/delete)
* View and manage order requests
* Live order status updates

####  User Dashboard

* My Profile
* My Orders
* My Reviews (update/delete)
* Favorite Meals

#### Admin Dashboard

* Manage Users (make fraud)
* Manage Role Requests (Chef/Admin)
* Platform Statistics (Recharts)
* Total Payments, Orders, Users overview

---

### Profile Management

* View profile details
* Request to become Chef or Admin
* Conditional buttons based on role

## Technologies Used

### Frontend

* React

* React Router DOM

* Firebase Authentication

* React Hook Form

* Framer Motion

* Recharts

* SweetAlert2

* React Icons

* Tailwind CSS

### Backend

* Node.js

* Express.js

* MongoDB

* Stripe Payment Gateway

* CORS

* dotenv

---

## NPM Packages Used

### Client Side

```bash
react
react-router-dom
firebase
axios
react-hook-form
framer-motion
sweetalert2
recharts
react-icons
```

### Server Side

```bash
express
cors
mongodb
dotenv
jsonwebtoken
stripe
cookie-parser
```

## Deployment Checklist

* Firebase authorized domain added
* CORS configured properly
* No 404 / 504 errors on refresh
* Private routes persist on reload
* Environment variables secured

---

## Developer

**Name:** Kabir Hossain
**Role:** MERN Stack Developer

---

If you like this project, feel free to give it a star on GitHub!
