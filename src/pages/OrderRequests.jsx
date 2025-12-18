import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../pages/AuthProvider";
import Swal from "sweetalert2";
import useTitle from "../hooks/useTitle";

const OrderRequests = () => {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isChef, setIsChef] = useState(false);
  useTitle("Order Requests");

  /* ===============================
     Load Orders by Chef Email
  =============================== */
  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    console.log("🔍 Fetching orders for email:", user.email);
    setLoading(true);

    // First check if user is a chef
    fetch(`http://localhost:3000/users?email=${user.email}`)
      .then((res) => res.json())
      .then((userData) => {
        console.log("📌 DB USER Response:", userData);
        
        const finalUser = userData?.data || userData;
        
        // Check if user is chef
        if (finalUser?.role === "chef") {
          setIsChef(true);
          console.log("✅ User is a Chef");
          
          // Fetch orders for this chef
          return fetch(`http://localhost:3000/chef-orders?email=${user.email}`);
        } else {
          console.log("❌ User is not a chef");
          setIsChef(false);
          setLoading(false);
          return null;
        }
      })
      .then((res) => {
        if (!res) return null;
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        
        console.log("📦 Chef Orders Response:", data);

        if (data?.success && Array.isArray(data.data)) {
          setOrders(data.data);
          console.log("✅ Orders loaded:", data.data.length);
        } else {
          console.log("⚠️ No orders found");
          setOrders([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching orders:", err);
        setOrders([]);
        setLoading(false);
      });
  }, [user?.email]);

  /* ===============================
     Update Order Status
  =============================== */
  const updateStatus = async (id, newStatus) => {
    try {
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
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: `Order ${newStatus} successfully`,
          timer: 2000,
        });

        // ✅ Update local state
        setOrders((prev) =>
          prev.map((o) =>
            o._id === id ? { ...o, orderStatus: newStatus } : o
          )
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: data.message || "Failed to update",
        });
      }
    } catch (err) {
      console.error("❌ Update error:", err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong",
      });
    }
  };

  /* ===============================
     UI
  =============================== */
  
  // ✅ Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-orange-600"></span>
      </div>
    );
  }

  // ✅ If user is not a chef
  if (!isChef) {
    return (
      <div className="p-6 max-w-2xl mx-auto mt-20">
        <div className="alert alert-warning shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>❌ You are not registered as a Chef. Only chefs can view order requests.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-orange-600">
        🍽️ Order Requests
      </h1>

      <p className="text-center text-gray-600 mb-8">
        Showing orders for: <span className="font-bold text-orange-600">{user.email}</span>
      </p>

      {/* Empty State */}
      {orders.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-500 text-xl font-semibold">
            No order requests found
          </p>
          <p className="text-gray-400 mt-2">
            Orders will appear here when customers place orders for your meals
          </p>
        </div>
      )}

      {/* Orders Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => {
          const isPending = order.orderStatus === "pending";
          const isAccepted = order.orderStatus === "accepted";
          const isCancelled = order.orderStatus === "cancelled";
          const isDelivered = order.orderStatus === "delivered";

          return (
            <div
              key={order._id}
              className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-100 hover:shadow-2xl hover:border-orange-200 transition-all duration-300"
            >
              {/* Meal Name */}
              <h2 className="text-2xl font-bold text-orange-600 mb-4 border-b-2 border-orange-100 pb-2">
                {order.mealName}
              </h2>

              {/* Order Details */}
              <div className="space-y-3 text-gray-700 mb-4">
                <div className="flex justify-between">
                  <span className="font-semibold">💰 Price:</span>
                  <span className="text-orange-600 font-bold">{order.price} TK</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold">📦 Quantity:</span>
                  <span className="font-bold">{order.quantity}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold">💵 Total:</span>
                  <span className="text-green-600 font-bold">{order.price * order.quantity} TK</span>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <p className="font-semibold mb-1">👤 Customer:</p>
                  <p className="text-sm text-gray-600">{order.userEmail}</p>
                </div>

                <div>
                  <p className="font-semibold mb-1">📍 Delivery Address:</p>
                  <p className="text-sm text-gray-600">{order.userAddress}</p>
                </div>

                {/* Status Badges */}
                <div className="flex justify-between items-center pt-2">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Order Status:</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      isPending ? "bg-yellow-100 text-yellow-700" :
                      isAccepted ? "bg-blue-100 text-blue-700" :
                      isCancelled ? "bg-red-100 text-red-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {order.orderStatus}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Payment:</p>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        order.paymentStatus === "Pending"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Order Time */}
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500">🕒 Order Time:</p>
                  <p className="text-sm font-semibold text-gray-700">
                    {new Date(order.orderTime).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short"
                    })}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 mt-4">
                <button
                  disabled={!isPending}
                  onClick={() => updateStatus(order._id, "cancelled")}
                  className={`w-full py-2.5 rounded-lg text-white font-semibold transition-all duration-200 ${
                    isPending
                      ? "bg-red-600 hover:bg-red-700 hover:scale-105 active:scale-95"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  ❌ Cancel Order
                </button>

                <button
                  disabled={!isPending}
                  onClick={() => updateStatus(order._id, "accepted")}
                  className={`w-full py-2.5 rounded-lg text-white font-semibold transition-all duration-200 ${
                    isPending
                      ? "bg-green-600 hover:bg-green-700 hover:scale-105 active:scale-95"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  ✅ Accept Order
                </button>

                <button
                  disabled={!isAccepted}
                  onClick={() => updateStatus(order._id, "delivered")}
                  className={`w-full py-2.5 rounded-lg text-white font-semibold transition-all duration-200 ${
                    isAccepted
                      ? "bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  🚚 Mark as Delivered
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