import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await fetch("http://localhost:3000/role-requests");
    const data = await res.json();
    if (data.success) setRequests(data.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    const res = await fetch(`http://localhost:3000/role-requests/approve/${id}`, {
      method: "PUT",
    });
    const data = await res.json();

    if (data.success) {
      Swal.fire("Approved!", data.message, "success");
      fetchRequests();
    }
  };

  const handleReject = async (id) => {
    const res = await fetch(`http://localhost:3000/role-requests/reject/${id}`, {
      method: "PUT",
    });
    const data = await res.json();

    if (data.success) {
      Swal.fire("Rejected!", data.message, "error");
      fetchRequests();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Manage Role Requests</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Request Type</th>
            <th>Status</th>
            <th>Request Time</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.userName}</td>
              <td>{req.userEmail}</td>
              <td className="capitalize">{req.requestType}</td>
              <td className="capitalize">{req.requestStatus}</td>
              <td>{new Date(req.requestTime).toLocaleString()}</td>

              <td className="flex gap-2">
                <button
                  disabled={req.requestStatus !== "pending"}
                  onClick={() => handleApprove(req._id)}
                  className="btn btn-success btn-sm"
                >
                  Accept
                </button>

                <button
                  disabled={req.requestStatus !== "pending"}
                  onClick={() => handleReject(req._id)}
                  className="btn btn-error btn-sm"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRequests;
