import React, { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider"; // ✅ আপনার actual AuthContext
import { 
  User, 
  ShoppingBag, 
  Star, 
  Heart, 
  ChefHat, 
  UtensilsCrossed, 
  ClipboardList, 
  Users, 
  FileText, 
  BarChart3,
  Menu,
  X,
  Home,
  LogOut
} from "lucide-react";
import useTitle from "../hooks/useTitle";

// ===========================
// Sidebar Component
// ===========================
const DashboardSidebar = ({ role, isMobileOpen, setIsMobileOpen, handleLogout }) => {
  const commonLinks = [
    { name: "My Profile", path: "profile", icon: <User className="w-5 h-5" /> },
  ];

  const userLinks = [
    { name: "My Orders", path: "my-orders", icon: <ShoppingBag className="w-5 h-5" /> },
    { name: "My Reviews", path: "my-reviews", icon: <Star className="w-5 h-5" /> },
    { name: "Favorite Meals", path: "favorites", icon: <Heart className="w-5 h-5" /> },
  ];

  const chefLinks = [
    { name: "Create Meal", path: "create-meal", icon: <UtensilsCrossed className="w-5 h-5" /> },
    { name: "My Meals", path: "my-meals", icon: <ChefHat className="w-5 h-5" /> },
    { name: "Order Requests", path: "order-requests", icon: <ClipboardList className="w-5 h-5" /> },
  ];

  const adminLinks = [
    { name: "Manage Users", path: "manage-users", icon: <Users className="w-5 h-5" /> },
    { name: "Manage Requests", path: "manage-requests", icon: <FileText className="w-5 h-5" /> },
    { name: "Platform Statistics", path: "platform-stats", icon: <BarChart3 className="w-5 h-5" /> },
  ];

  let roleLinks = [];
  if (role === "user") roleLinks = userLinks;
  else if (role === "chef") roleLinks = chefLinks;
  else if (role === "admin") roleLinks = adminLinks;

  const allLinks = commonLinks.concat(roleLinks);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen
        w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
        text-white flex flex-col shadow-2xl
        transform transition-transform duration-300 ease-in-out z-50
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="relative">
          <NavLink
            to="/"
            className="flex items-center gap-3 p-6 text-2xl font-bold border-b border-gray-700 hover:bg-gray-800 transition-colors group"
            onClick={() => setIsMobileOpen(false)}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Home className="w-6 h-6" />
            </div>
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Dashboard
            </span>
          </NavLink>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden absolute top-6 right-6 p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {allLinks.map((link, index) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl font-medium transition-all duration-200 group
                ${isActive 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105' 
                  : 'hover:bg-gray-700 hover:translate-x-2'
                }`
              }
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="group-hover:scale-110 transition-transform">
                {link.icon}
              </div>
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer - Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 p-3 rounded-xl bg-red-600 hover:bg-red-700 font-medium transition-all hover:scale-105 active:scale-95"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

// ===========================
// Role Badge Component
// ===========================
const RoleBadge = ({ role }) => {
  const roleConfig = {
    user: { 
      bg: 'bg-gradient-to-r from-blue-500 to-blue-600', 
      icon: <User className="w-4 h-4" />,
      label: 'User'
    },
    chef: { 
      bg: 'bg-gradient-to-r from-orange-500 to-red-500', 
      icon: <ChefHat className="w-4 h-4" />,
      label: 'Chef'
    },
    admin: { 
      bg: 'bg-gradient-to-r from-purple-500 to-pink-500', 
      icon: <BarChart3 className="w-4 h-4" />,
      label: 'Admin'
    },
  };

  const config = roleConfig[role] || roleConfig.user;

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${config.bg} text-white font-semibold shadow-lg`}>
      {config.icon}
      <span className="capitalize">{config.label}</span>
    </div>
  );
};

// ===========================
// Main Dashboard Page
// ===========================
const Dashboard = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  useTitle("Dashboard");
  
  const role = user?.role || "user";

  // Logout Handler
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Sidebar */}
      <DashboardSidebar 
        role={role} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white shadow-md border-b border-gray-200">
          <div className="flex items-center justify-between p-4 lg:p-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* Welcome Section */}
            <div className="flex-1 ml-4 lg:ml-0">
              <h1 className="text-xl lg:text-3xl font-bold text-gray-800 flex items-center gap-2">
                <span className="hidden sm:inline">👋</span>
                <span className="hidden sm:inline">Welcome,</span>
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  {user?.displayName || "User"}
                </span>
              </h1>
              <p className="text-sm lg:text-base text-gray-600 mt-1 hidden sm:block">
                {user?.email}
              </p>
            </div>

            {/* Role Badge */}
            <div className="hidden sm:block">
              <RoleBadge role={role} />
            </div>
          </div>

          {/* Mobile Role Badge */}
          <div className="sm:hidden px-4 pb-3">
            <RoleBadge role={role} />
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Nested Route Content */}
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;