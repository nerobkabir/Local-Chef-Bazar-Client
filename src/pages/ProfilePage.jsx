import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  

  if (!user) return <p className="text-center mt-20">Loading user...</p>;

  const handleRoleRequest = async (type) => {
    const requestData = {
      userName: user.displayName,
      userEmail: user.email,
      requestType: type,   // chef / admin
    };

    const res = await fetch("http://localhost:3000/role-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    const data = await res.json();

    if (data.success) {
      Swal.fire("Success!", `Your request to become a ${type} is submitted.`, "success");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6">My Profile</h2>

      <div className="flex flex-col items-center">
        <img
          src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
          alt="User"
          className="w-28 h-28 rounded-full border"
        />

        <div className="mt-5 space-y-2 w-full">

          <p><b>Name:</b> {user.displayName}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Address:</b> {user?.address || "Not Provided"}</p>
          <p><b>Role:</b> {user.role}</p>
          <p><b>Status:</b> {user.status || "active"}</p>

          {user.role === "chef" && (
            <p><b>Chef ID:</b> {user.chefId || "Not Assigned"}</p>
          )}
        </div>

        {/* ROLE REQUEST BUTTONS */}
        <div className="mt-6 flex gap-4">

          {/* Show “Be a Chef” only if not a chef */}
          {user.role !== "chef" && user.role !== "admin" && (
            <button
              className="px-6 py-2 bg-green-600 text-white rounded-lg"
              onClick={() => handleRoleRequest("chef")}
            >
              Be a Chef
            </button>
          )}

          {/* Show “Be an Admin” only if not admin */}
          {user.role !== "admin" && (
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg"
              onClick={() => handleRoleRequest("admin")}
            >
              Be an Admin
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
