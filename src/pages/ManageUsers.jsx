import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/all-users")
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
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch(
      `http://localhost:3000/users/fraud/${id}`,
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
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, idx) => (
            <tr key={user._id}>
              <td>{idx + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="capitalize">{user.role}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-white ${
                    user.status === "fraud"
                      ? "bg-red-600"
                      : "bg-green-600"
                  }`}
                >
                  {user.status}
                </span>
              </td>

              <td>
                {user.role !== "admin" && user.status !== "fraud" ? (
                  <button
                    onClick={() => makeFraud(user._id)}
                    className="btn btn-sm btn-error"
                  >
                    Make Fraud
                  </button>
                ) : (
                  <span className="text-gray-400">N/A</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
