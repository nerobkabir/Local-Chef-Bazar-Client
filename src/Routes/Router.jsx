import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import RootLayout from "../pages/RootLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Meals from "../pages/Meals";
import Dashboard from "../pages/Dashboard";
import CreateMeal from "../pages/CreateMeal";
import MealDetails from "../pages/MealDetails";
import OrderPage from "../pages/OrderPage";
import ProfilePage from "../pages/ProfilePage";
import MyOrders from "../pages/MyOrders";
import PaymentPage from "../pages/PaymentPage";
import PaymentSuccess from "../pages/PaymentSuccess";
import MyReviews from "../pages/MyReviews";
import FavoriteMeals from "../pages/FavoriteMeals";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,   // <-- FIXED
        element: <Home />,
      },
      {
        path: "meals",
        element: <Meals />,
      },
      {
        path: "meal-details/:mealId",
        element: <MealDetails />,
      },
      {
        path: "order/:mealId",
        element: <OrderPage />,
      },

    ]
  },
  {
    path: "auth",
    element: <RootLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> }
    ],
  },

  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "create-meal",
        element: <CreateMeal />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "pay/:orderId",
        element: <PaymentPage />,   
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "my-reviews",
        element: <MyReviews />,
      },
      {
        path: "favorites",
        element: <FavoriteMeals />,
      }


    ],
  }

]);
