import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useTitle from "../hooks/useTitle";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  useTitle("Manage Users");

  useEffect(() => {
    fetch("https://server-side-eight-gray.vercel.app/all-users")
      .then(res => res.json())
      .then(data => setUsers(data.data || []));
  }, []);

  const makeFraud = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be marked as fraud!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Make Fraud",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch(
      `https://server-side-eight-gray.vercel.app/users/fraud/${id}`,
      { method: "PUT" }
    );

    const data = await res.json();

    if (data.success) {
      Swal.fire("Success!", data.message, "success");

      setUsers(prev =>
        prev.map(u =>
          u._id === id ? { ...u, status: "fraud" } : u
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">
                Manage Users
              </h1>
              <p className="text-slate-600">
                Monitor and manage all registered users
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl shadow-md">
              <p className="text-sm font-medium">Total Users</p>
              <p className="text-3xl font-bold">{users.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">#</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {users.map((user, idx) => (
                  <tr 
                    key={user._id}
                    className="hover:bg-slate-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 text-slate-700 font-medium">
                      {idx + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-slate-800 font-medium">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 capitalize">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm capitalize ${
                          user.status === "fraud"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.role !== "admin" && user.status !== "fraud" ? (
                        <button
                          onClick={() => makeFraud(user._id)}
                          className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          Mark as Fraud
                        </button>
                      ) : (
                        <span className="text-slate-400 text-sm font-medium">
                          N/A
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="text-center py-16">
              <div className="text-slate-400 text-6xl mb-4">👥</div>
              <p className="text-slate-600 text-lg font-medium">
                No users found
              </p>
              <p className="text-slate-500 text-sm mt-2">
                Users will appear here once they register
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;