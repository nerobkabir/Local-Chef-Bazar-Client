import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../pages/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Clock, User, CreditCard, Package, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import useTitle from "../hooks/useTitle";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useTitle("My Orders");

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const loadOrders = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/orders?email=${user.email}`
        );
        const data = await res.json();
        setOrders(data.data || []);
      } catch (error) {
        console.error("Error loading orders:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user?.email]);

  const getOrderStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        icon: <AlertCircle className="w-4 h-4" />,
      },
      accepted: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        icon: <CheckCircle2 className="w-4 h-4" />,
      },
      delivered: {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: <Package className="w-4 h-4" />,
      },
      rejected: {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: <XCircle className="w-4 h-4" />,
      },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <div
        className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.bg} ${config.text}`}
      >
        {config.icon}
        <span className="text-xs font-bold uppercase">{status}</span>
      </div>
    );
  };

  const getPaymentStatusBadge = (paymentStatus) => {
    const isPaid = paymentStatus?.toLowerCase() === "paid";

    return (
      <div
        className={`flex items-center gap-2 px-3 py-1 rounded-full ${
          isPaid
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {isPaid ? (
          <CheckCircle2 className="w-4 h-4" />
        ) : (
          <XCircle className="w-4 h-4" />
        )}
        <span className="text-xs font-bold uppercase">{paymentStatus}</span>
      </div>
    );
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">
            Please login to view your orders
          </p>
          <button
            onClick={() => navigate("/auth/login")}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-orange-600"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-orange-600 mb-2">
          🛍️ My Orders
        </h1>
        <p className="text-gray-600">Track and manage your orders</p>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-500 text-xl font-semibold mb-2">
            You have no orders yet
          </p>
          <p className="text-gray-400 mb-6">
            Start ordering delicious meals from our chefs!
          </p>
          <button
            onClick={() => navigate("/meals")}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition"
          >
            Browse Meals
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => {
          const totalAmount = order.price * order.quantity;
          const isAccepted = order.orderStatus === "accepted";
          const isPaid = order.paymentStatus?.toLowerCase() === "paid";
          const canPay = isAccepted && !isPaid;

          return (
            <div
              key={order._id}
              className="p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:shadow-2xl hover:border-orange-200 transition-all duration-300"
            >
              {/* Meal Name */}
              <h2 className="text-2xl font-bold text-orange-600 mb-4 border-b-2 border-orange-100 pb-2">
                {order.mealName}
              </h2>

              {/* Price Details */}
              <div className="space-y-3 text-gray-700 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">💰 Price:</span>
                  <span className="text-orange-600 font-bold">
                    {order.price} TK
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">📦 Quantity:</span>
                  <span className="font-bold">{order.quantity}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="font-semibold text-lg">💵 Total:</span>
                  <span className="text-green-600 font-bold text-xl">
                    {totalAmount} TK
                  </span>
                </div>

                {/* Status Section */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-600">
                      Order Status:
                    </span>
                    {getOrderStatusBadge(order.orderStatus)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-600">
                      Payment:
                    </span>
                    {getPaymentStatusBadge(order.paymentStatus)}
                  </div>
                </div>

                {/* Chef Information */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-orange-600" />
                    <span className="font-semibold">Chef:</span>
                    <span className="text-gray-700">
                      {order.chefName || "Unknown"}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    ID: {order.chefId}
                  </div>
                </div>

                {/* Order Time */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="font-semibold">Order Time:</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {new Date(order.orderTime).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>

                {/* Delivery Time (if delivered) */}
                {order.orderStatus === "delivered" && order.deliveryTime && (
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm mb-1">
                      <Package className="w-4 h-4 text-green-500" />
                      <span className="font-semibold">Delivered At:</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {new Date(order.deliveryTime).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                )}
              </div>

              {/* Pay Now Button */}
              {canPay && (
                <button
                  onClick={() => navigate(`/dashboard/pay/${order._id}`)}
                  className="mt-4 w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  <CreditCard className="w-5 h-5" />
                  Pay Now - {totalAmount} TK
                </button>
              )}

              {/* Payment Completed Badge */}
              {isPaid && (
                <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl text-center">
                  <p className="text-green-700 font-semibold flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Payment Completed
                  </p>
                </div>
              )}

              {/* Waiting for Chef Acceptance */}
              {order.orderStatus === "pending" && (
                <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl text-center">
                  <p className="text-yellow-700 font-semibold flex items-center justify-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Waiting for Chef Acceptance
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;