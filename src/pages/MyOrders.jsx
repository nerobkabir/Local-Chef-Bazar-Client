import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../pages/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadOrders = async () => {
      const res = await fetch(`http://localhost:3000/orders?email=${user.email}`);
      const data = await res.json();
      setOrders(data.data);
    };
    loadOrders();
  }, [user.email]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map(order => (
          <div key={order._id} className="p-5 bg-white shadow-md rounded-xl">

            <h2 className="text-xl font-bold text-orange-700">{order.mealName}</h2>
            <p><b>Price:</b> {order.price} TK</p>
            <p><b>Quantity:</b> {order.quantity}</p>
            <p><b>Order Status:</b> {order.orderStatus}</p>
            <p><b>Payment Status:</b> {order.paymentStatus}</p>
            <p><b>Chef Name:</b> {order.chefName || "Unknown"}</p>
            <p><b>Chef ID:</b> {order.chefId}</p>
            <p><b>Order Time:</b> {new Date(order.orderTime).toLocaleString()}</p>

            {/* ===========================
                SHOW PAY BUTTON IF:
                1) orderStatus === accepted
                2) paymentStatus === Pending
            ============================= */}

            {order.orderStatus === "accepted" && order.paymentStatus === "Pending" && (
              <button
                onClick={() => navigate(`/pay/${order._id}`)}
                className="mt-4 w-full bg-green-600 text-white p-2 rounded-lg"
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
