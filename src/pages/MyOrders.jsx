import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../pages/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Clock, User } from "lucide-react";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    const loadOrders = async () => {
      const res = await fetch(
        `http://localhost:3000/orders?email=${user.email}`
      );
      const data = await res.json();
      setOrders(data.data || []);
    };

    loadOrders();
  }, [user?.email]);

  if (!user) {
    return (
      <p className="text-center text-lg text-gray-600 mt-20">
        Please login to view your orders.
      </p>
    );
  }

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        My Orders
      </h1>

      {orders.length === 0 && (
        <p className="text-center text-gray-500 text-lg mt-20">
          You have no orders yet.
        </p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-orange-600 mb-2">
              {order.mealName}
            </h2>

            <div className="space-y-2 text-gray-700 mt-3">
              <p><b>Price:</b> {order.price} TK</p>
              <p><b>Quantity:</b> {order.quantity}</p>

              <p className="flex items-center gap-1">
                <b>Order Status:</b>
                <span
                  className={`px-2 py-1 rounded-lg text-white text-sm ${
                    order.orderStatus === "accepted"
                      ? "bg-green-600"
                      : order.orderStatus === "pending"
                      ? "bg-yellow-500"
                      : "bg-blue-600"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </p>

              <p className="flex items-center gap-1">
                <b>Payment:</b>
                <span
                  className={`px-2 py-1 rounded-lg text-white text-sm ${
                    order.paymentStatus === "Pending"
                      ? "bg-red-500"
                      : "bg-green-600"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <b>Chef:</b> {order.chefName || "Unknown"}
              </p>

              <p><b>Chef ID:</b> {order.chefId}</p>

              <p className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <span>{new Date(order.orderTime).toLocaleString()}</span>
              </p>
            </div>

            {order.orderStatus === "accepted" &&
              order.paymentStatus === "Pending" && (
                <button
                  onClick={() => navigate(`/pay/${order._id}`)}
                  className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
                >
                  Pay Now
                </button>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
