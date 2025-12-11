import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../pages/AuthProvider";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `hover:text-orange-500 transition font-medium ${
            isActive ? "text-orange-500" : "text-gray-700"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/meals"
        className={({ isActive }) =>
          `hover:text-orange-500 transition font-medium ${
            isActive ? "text-orange-500" : "text-gray-700"
          }`
        }
      >
        Meals
      </NavLink>

      {user && (
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `hover:text-orange-500 transition font-medium ${
              isActive ? "text-orange-500" : "text-gray-700"
            }`
          }
        >
          Dashboard
        </NavLink>
      )}
    </>
  );

  // ✅ Updated logout handler
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <header className="shadow-md bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link className="text-2xl font-bold text-orange-600" to="/">
          LocalChefBazaar
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex gap-8 items-center">{navLinks}</nav>

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {!user && (
            <>
              <Link
                to="/auth/login"
                className="px-4 py-2 rounded-lg bg-orange-500 text-white font-medium"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="px-4 py-2 rounded-lg border border-orange-500 text-orange-500 font-medium"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button">
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="w-11 h-11 rounded-full border cursor-pointer"
                />
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu p-3 shadow bg-white rounded-lg w-48"
              >
                <li className="font-semibold text-gray-700">
                  {user.displayName}
                </li>
                <li>
                  <button
                    className="text-red-500 font-medium"
                    onClick={handleLogout} // Updated
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-inner p-5 space-y-5 text-center">
          <div className="flex flex-col gap-4">{navLinks}</div>

          {!user && (
            <div className="flex flex-col gap-3 mt-4">
              <Link
                to="/auth/login"
                className="px-4 py-2 bg-orange-500 text-white rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg"
              >
                Register
              </Link>
            </div>
          )}

          {user && (
            <div className="flex flex-col items-center gap-3 mt-4">
              <img src={user.photoURL} className="w-12 h-12 rounded-full border" />
              <p className="font-medium">{user.displayName}</p>
              <button
                onClick={handleLogout} // Updated
                className="px-4 py-2 bg-gray-700 text-white rounded-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
