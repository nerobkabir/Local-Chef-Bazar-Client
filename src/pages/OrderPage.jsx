import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../pages/AuthProvider";

const OrderPage = () => {
  const { mealId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [meal, setMeal] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadMeal = async () => {
    try {
      const res = await fetch(`http://localhost:3000/meals/${mealId}`);
      const data = await res.json();
      if (data.success) {
        setMeal(data.data);
      } else {
        setMeal(null);
      }
    } catch (err) {
      console.error(err);
      setMeal(null);
    } finally {
      setLoading(false);
    }
  };
  loadMeal();
}, [mealId]);


  // 🔴 NOT LOGGED IN
  if (!user) {
    return (
      <p className="text-center mt-20 text-xl text-gray-600">
        Please login to place an order.
      </p>
    );
  }

  // 🔴 FRAUD USER BLOCK (FRONTEND)
  if (user.status === "fraud") {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          🚫 You are blocked
        </h2>
        <p className="text-gray-600">
          Fraud users are not allowed to place orders.
        </p>
      </div>
    );
  }

  if (loading || !meal) {
    return <p className="text-center mt-20 text-xl">Loading meal...</p>;
  }

  const totalPrice = meal.price * quantity;

  const handleOrderSubmit = async () => {
    if (!address) {
      return Swal.fire("Error", "Please enter a delivery address", "error");
    }

    const confirm = await Swal.fire({
      title: "Confirm Order?",
      html: `Your total price is <b>${totalPrice} TK</b>.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm",
    });

    if (!confirm.isConfirmed) return;

    const orderData = {
      foodId: meal._id,
      mealName: meal.foodName,
      price: meal.price,
      quantity,
      chefId: meal.chefId,
      userEmail: user.email,
      userAddress: address,
    };

    const res = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    // 🔴 BACKEND FRAUD BLOCK HANDLE
    if (!res.ok) {
      return Swal.fire("Blocked", data.message || "Action not allowed", "error");
    }

    Swal.fire("Success!", "Order placed successfully!", "success");
    navigate("/meals");
  };

  return (
    <div className="max-w-xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Confirm Your Order
      </h2>

      <div className="space-y-3">
        <p><b>Meal Name:</b> {meal.foodName}</p>
        <p><b>Price:</b> {meal.price} TK</p>
        <p><b>Your Email:</b> {user.email}</p>

        <label className="block font-semibold mt-4">Quantity:</label>
        <input
          type="number"
          min="1"
          className="border px-3 py-2 rounded w-full"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <label className="block font-semibold mt-4">
          Delivery Address:
        </label>
        <textarea
          className="border px-3 py-2 rounded w-full"
          placeholder="Enter full address..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <p className="mt-4 text-xl font-bold">
          Total Price: {totalPrice} TK
        </p>

        <button
          onClick={handleOrderSubmit}
          className="w-full bg-orange-600 text-white py-3 rounded-xl mt-6 hover:bg-orange-700 transition"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
