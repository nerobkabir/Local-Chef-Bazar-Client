import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useTitle from "../hooks/useTitle";

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected
  useTitle("Manage Role Requests");

  const fetchRequests = async () => {
    const res = await fetch("http://localhost:3000/role-requests");
    const data = await res.json();
    if (data.success) setRequests(data.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    const result = await Swal.fire({
      title: "Approve Request?",
      text: "This will grant the requested role to the user.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    const res = await fetch(`http://localhost:3000/role-requests/approve/${id}`, {
      method: "PUT",
    });
    const data = await res.json();

    if (data.success) {
      Swal.fire({
        title: "Approved!",
        text: data.message,
        icon: "success",
        confirmButtonColor: "#3b82f6",
      });
      fetchRequests();
    }
  };

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Reject Request?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    const res = await fetch(`http://localhost:3000/role-requests/reject/${id}`, {
      method: "PUT",
    });
    const data = await res.json();

    if (data.success) {
      Swal.fire({
        title: "Rejected!",
        text: data.message,
        icon: "error",
        confirmButtonColor: "#3b82f6",
      });
      fetchRequests();
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getRoleIcon = (type) => {
    if (type === "chef") {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    );
  };

  const filteredRequests = requests.filter(req => {
    if (filter === "all") return true;
    return req.requestStatus === filter;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.requestStatus === "pending").length,
    approved: requests.filter(r => r.requestStatus === "approved").length,
    rejected: requests.filter(r => r.requestStatus === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-2">
                Manage Role Requests
              </h2>
              <p className="text-slate-600">
                Review and process user role upgrade requests
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <p className="text-sm font-medium text-blue-600 mb-1">Total Requests</p>
              <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
              <p className="text-sm font-medium text-yellow-600 mb-1">Pending</p>
              <p className="text-3xl font-bold text-yellow-900">{stats.pending}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <p className="text-sm font-medium text-green-600 mb-1">Approved</p>
              <p className="text-3xl font-bold text-green-900">{stats.approved}</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
              <p className="text-sm font-medium text-red-600 mb-1">Rejected</p>
              <p className="text-3xl font-bold text-red-900">{stats.rejected}</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-200">
          <div className="flex flex-wrap gap-3">
            {["all", "pending", "approved", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 capitalize ${
                  filter === status
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {status} {status === "all" && `(${stats.total})`}
                {status === "pending" && `(${stats.pending})`}
                {status === "approved" && `(${stats.approved})`}
                {status === "rejected" && `(${stats.rejected})`}
              </button>
            ))}
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Requested Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Request Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {filteredRequests.map((req) => (
                  <tr
                    key={req._id}
                    className="hover:bg-slate-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                          {req.userName.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-slate-800 font-medium">
                          {req.userName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {req.userEmail}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg ${req.requestType === "chef" ? "bg-orange-500" : "bg-purple-500"} flex items-center justify-center text-white shadow-md`}>
                          {getRoleIcon(req.requestType)}
                        </div>
                        <span className="font-semibold text-slate-800 capitalize">
                          {req.requestType}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusBadgeColor(
                          req.requestStatus
                        )}`}
                      >
                        {req.requestStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm">
                      {new Date(req.requestTime).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          disabled={req.requestStatus !== "pending"}
                          onClick={() => handleApprove(req._id)}
                          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                            req.requestStatus === "pending"
                              ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Accept
                        </button>

                        <button
                          disabled={req.requestStatus !== "pending"}
                          onClick={() => handleReject(req._id)}
                          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                            req.requestStatus === "pending"
                              ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredRequests.length === 0 && (
            <div className="text-center py-16">
              <div className="text-slate-400 text-6xl mb-4">📋</div>
              <p className="text-slate-600 text-lg font-medium">
                No {filter !== "all" && filter} requests found
              </p>
              <p className="text-slate-500 text-sm mt-2">
                {filter === "all" 
                  ? "Role requests will appear here when users submit them"
                  : `There are no ${filter} requests at this time`
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageRequests;