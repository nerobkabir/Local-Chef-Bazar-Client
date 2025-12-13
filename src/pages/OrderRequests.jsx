import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../pages/AuthProvider";
import Swal from "sweetalert2";

const OrderRequests = () => {
  const { user } = useContext(AuthContext);

  const [dbUser, setDbUser] = useState(null);
  const [orders, setOrders] = useState([]);

  /* ===============================
     Load DB User (MongoDB _id)
  =============================== */
  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/users?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setDbUser(data));
  }, [user?.email]);

  /* ===============================
     Load Chef Orders
  =============================== */
  useEffect(() => {
    if (!dbUser?._id) return;

    fetch(`http://localhost:3000/chef-orders?chefId=${dbUser._id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data.data || []));
  }, [dbUser?._id]);

  /* ===============================
     Update Order Status
  =============================== */
  const updateStatus = async (id, newStatus) => {
    const res = await fetch(
      `http://localhost:3000/orders/status/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    const data = await res.json();

    if (data.success) {
      Swal.fire("Updated!", `Order ${newStatus} successfully`, "success");

      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, orderStatus: newStatus } : o
        )
      );
    }
  };

  /* ===============================
     UI
  =============================== */
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Order Requests
      </h1>

      {orders.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          No order requests found
        </p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {orders.map((order) => {
          const isPending = order.orderStatus === "pending";
          const isAccepted = order.orderStatus === "accepted";
          const isCancelled = order.orderStatus === "cancelled";
          const isDelivered = order.orderStatus === "delivered";

          return (
            <div
              key={order._id}
              className="bg-white p-6 rounded-2xl shadow-lg border"
            >
              <h2 className="text-2xl font-bold text-orange-600">
                {order.mealName}
              </h2>

              <div className="mt-4 space-y-2 text-gray-700">
                <p><b>Price:</b> {order.price} TK</p>
                <p><b>Quantity:</b> {order.quantity}</p>
                <p><b>User Email:</b> {order.userEmail}</p>
                <p><b>Address:</b> {order.userAddress}</p>

                <p>
                  <b>Status:</b>{" "}
                  <span className="px-2 py-1 rounded bg-blue-600 text-white">
                    {order.orderStatus}
                  </span>
                </p>

                <p>
                  <b>Payment:</b>{" "}
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      order.paymentStatus === "Pending"
                        ? "bg-red-500"
                        : "bg-green-600"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </p>

                <p>
                  <b>Order Time:</b>{" "}
                  {new Date(order.orderTime).toLocaleString()}
                </p>
              </div>

              {/* ================= Buttons ================= */}
              <div className="mt-6 space-y-2">
                <button
                  disabled={!isPending}
                  onClick={() => updateStatus(order._id, "cancelled")}
                  className={`w-full py-2 rounded-lg text-white ${
                    isPending
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-gray-400"
                  }`}
                >
                  Cancel
                </button>

                <button
                  disabled={!isPending}
                  onClick={() => updateStatus(order._id, "accepted")}
                  className={`w-full py-2 rounded-lg text-white ${
                    isPending
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-400"
                  }`}
                >
                  Accept
                </button>

                <button
                  disabled={!isAccepted}
                  onClick={() => updateStatus(order._id, "delivered")}
                  className={`w-full py-2 rounded-lg text-white ${
                    isAccepted
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400"
                  }`}
                >
                  Deliver
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderRequests;
