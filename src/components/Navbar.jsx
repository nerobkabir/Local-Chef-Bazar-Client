import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../pages/AuthProvider";
import { Menu, X, ChefHat, User, LogOut, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/meals", label: "Meals" },
    ...(user ? [{ path: "/dashboard", label: "Dashboard" }] : []),
  ];

  const handleLogout = async () => {
    try {
      await logoutUser();
      setProfileOpen(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
            >
              <ChefHat className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                LocalChefBazaar
              </span>
              <span className="text-xs text-gray-500 hidden sm:block">
                Homemade with Love
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-orange-600"
                      : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Link
                  to="/auth/login"
                  className="px-5 py-2.5 rounded-lg text-orange-600 font-semibold hover:bg-orange-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-gradient-to-r from-orange-100 to-red-100 hover:from-orange-200 hover:to-red-200 transition-all"
                >
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover"
                  />
                  <span className="font-semibold text-gray-800 hidden lg:block">
                    {user.displayName}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                    >
                      <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 text-white">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.photoURL}
                            alt="profile"
                            className="w-12 h-12 rounded-full border-2 border-white shadow-lg object-cover"
                          />
                          <div>
                            <p className="font-bold">{user.displayName}</p>
                            <p className="text-xs opacity-90">{user.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        <Link
                          to="/dashboard/profile"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <User className="w-5 h-5 text-gray-600" />
                          <span className="font-medium text-gray-700">My Profile</span>
                        </Link>

                        <Link
                          to="/dashboard"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <LayoutDashboard className="w-5 h-5 text-gray-600" />
                          <span className="font-medium text-gray-700">Dashboard</span>
                        </Link>

                        <div className="border-t border-gray-100 my-2" />

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors text-red-600 font-medium"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {open ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-gray-100"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg font-semibold transition-colors ${
                        isActive
                          ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}

                {/* Mobile Auth */}
                {!user ? (
                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    <Link
                      to="/auth/login"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 text-center rounded-lg border-2 border-orange-500 text-orange-600 font-semibold hover:bg-orange-50 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/auth/register"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 text-center rounded-lg bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold shadow-lg"
                    >
                      Register
                    </Link>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg mb-2">
                      <img
                        src={user.photoURL}
                        alt="profile"
                        className="w-12 h-12 rounded-full border-2 border-orange-200 object-cover"
                      />
                      <div>
                        <p className="font-bold text-gray-800">{user.displayName}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setOpen(false);
                      }}
                      className="w-full px-4 py-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Close dropdown*/}
      {profileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setProfileOpen(false)}
        />
      )}
    </header>
  );
};

export default Navbar;