import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

// ===========================
// Sidebar Component
// ===========================
const DashboardSidebar = ({ role }) => {
  const commonLinks = [
    { name: "My Profile", path: "profile" },
  ];

  const userLinks = [
    { name: "My Orders", path: "my-orders" },
    { name: "My Reviews", path: "my-reviews" },
    { name: "Favorite Meals", path: "favorites" },
    { name: "My Meals", path: "my-meals" },
    { name: "Order Requests", path: "order-requests" },
     
  ];

  const chefLinks = [
    { name: "Create Meal", path: "create-meal" },
    { name: "My Meals", path: "my-meals" },
    { name: "Order Requests", path: "order-requests" },
    
  ];

  const adminLinks = [
    { name: "Manage Users", path: "manage-users" },
    { name: "Manage Requests", path: "manage-requests" },
    { name: "Platform Statistics", path: "statistics" },
  ];

  let roleLinks = [];

  if (role === "user") roleLinks = userLinks;
  else if (role === "chef") roleLinks = chefLinks;
  else if (role === "admin") roleLinks = adminLinks;

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      {/* ✅ Dashboard Title as NavLink */}
      <NavLink
        to="/"
        className="p-4 text-2xl font-bold border-b border-gray-800 hover:text-orange-400"
      >
        Dashboard
      </NavLink>

      <nav className="flex-1 flex flex-col p-4 gap-2">
        {commonLinks.concat(roleLinks).map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `block p-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

// ===========================
// Main Dashboard Page
// ===========================
const Dashboard = () => {
  const { user } = useContext(AuthContext);

  // যদি role না থাকে → default 'chef' দিবো
  const role = user?.role || "chef";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar role={role} />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">
            Welcome, {user?.displayName || "User"}
          </h1>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-gray-500 mt-1">Role: {role.toUpperCase()}</p>
        </header>

        {/* Nested Route Content */}
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
