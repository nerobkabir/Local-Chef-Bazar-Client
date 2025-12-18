import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";
import useTitle from "../hooks/useTitle";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  useTitle("My Profile");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg font-medium">Loading user...</p>
        </div>
      </div>
    );
  }

  const handleRoleRequest = async (type) => {
    const requestData = {
      userName: user.displayName,
      userEmail: user.email,
      requestType: type,
    };

    const res = await fetch("http://localhost:3000/role-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    const data = await res.json();

    if (data.success) {
      Swal.fire({
        title: "Success!",
        text: `Your request to become a ${type} is submitted.`,
        icon: "success",
        confirmButtonColor: "#3b82f6",
      });
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "chef":
        return "bg-orange-100 text-orange-800 border-orange-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  const getStatusBadgeColor = (status) => {
    return status === "fraud"
      ? "bg-red-100 text-red-800 border-red-300"
      : "bg-green-100 text-green-800 border-green-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          {/* Header Background */}
          <div className="h-40 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="User"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                />
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-8">
            {/* Name and Title */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                {user.displayName}
              </h2>
              <p className="text-slate-600 text-lg">{user.email}</p>
              
              {/* Role and Status Badges */}
              <div className="flex items-center justify-center gap-3 mt-4">
                <span
                  className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold border ${getRoleBadgeColor(
                    user.role
                  )}`}
                >
                  {user.role?.toUpperCase() || "USER"}
                </span>
                <span
                  className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold border ${getStatusBadgeColor(
                    user.status
                  )}`}
                >
                  {(user.status || "active").toUpperCase()}
                </span>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Address Card */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium mb-1">
                      Address
                    </p>
                    <p className="text-slate-800 font-semibold">
                      {user?.address || "Not Provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Chef ID Card (if applicable) */}
              {user.role === "chef" && (
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-orange-600 font-medium mb-1">
                        Chef ID
                      </p>
                      <p className="text-orange-900 font-semibold">
                        {user.chefId || "Not Assigned"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Role Request Section */}
            {(user.role !== "chef" || user.role !== "admin") && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    Upgrade Your Account
                  </h3>
                  <p className="text-slate-600">
                    Request additional privileges for your account
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  {/* Be a Chef Button */}
                  {user.role !== "chef" && user.role !== "admin" && (
                    <button
                      className="group relative px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 overflow-hidden"
                      onClick={() => handleRoleRequest("chef")}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                          />
                        </svg>
                        Become a Chef
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                    </button>
                  )}

                  {/* Be an Admin Button */}
                  {user.role !== "admin" && (
                    <button
                      className="group relative px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 overflow-hidden"
                      onClick={() => handleRoleRequest("admin")}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        Become an Admin
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
          <div className="flex items-center gap-3 text-slate-600">
            <svg
              className="w-5 h-5 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm">
              Account created • Member since {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;