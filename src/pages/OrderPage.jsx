import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../pages/AuthProvider";
import useTitle from "../hooks/useTitle";

const OrderPage = () => {
  const { mealId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useTitle("Place Order");

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: 1,
      userAddress: "",
    },
  });

  const quantity = watch("quantity");

  useEffect(() => {
    const loadMeal = async () => {
      try {
        const res = await fetch(`https://server-side-eight-gray.vercel.app/meals/${mealId}`);
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

  const onSubmit = async (formData) => {
    const confirm = await Swal.fire({
      title: "Confirm Order?",
      html: `Your total price is <b>${totalPrice} TK</b>. Do you want to confirm the order?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    const orderData = {
      foodId: meal._id,
      mealName: meal.foodName,
      price: meal.price,
      quantity: formData.quantity,
      chefId: meal.chefId,
      paymentStatus: "Pending",
      userEmail: user.email,
      userAddress: formData.userAddress,
      orderStatus: "pending",
      orderTime: new Date().toISOString(),
    };

    try {
      const res = await fetch("https://server-side-eight-gray.vercel.app/orders", {
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
    } catch (error) {
      console.error("Order submission error:", error);
      Swal.fire("Error", "Failed to place order. Please try again.", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Confirm Your Order
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <p>
            <b>Meal Name:</b> {meal.foodName}
          </p>
        </div>

        <div>
          <p>
            <b>Price:</b> {meal.price} TK
          </p>
        </div>

        <div>
          <p>
            <b>Your Email:</b> {user.email}
          </p>
        </div>

        <div>
          <label className="block font-semibold mt-4">Quantity:</label>
          <input
            type="number"
            min="1"
            className="border px-3 py-2 rounded w-full"
            {...register("quantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Quantity must be at least 1" },
              valueAsNumber: true,
            })}
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mt-4">
            Delivery Address: <span className="text-red-500">*</span>
          </label>
          <textarea
            className="border px-3 py-2 rounded w-full"
            placeholder="Enter full address..."
            rows="3"
            {...register("userAddress", {
              required: "Delivery address is required",
              minLength: {
                value: 10,
                message: "Address must be at least 10 characters",
              },
            })}
          />
          {errors.userAddress && (
            <p className="text-red-500 text-sm mt-1">
              {errors.userAddress.message}
            </p>
          )}
        </div>

        <div>
          <p className="mt-4 text-xl font-bold">Total Price: {totalPrice} TK</p>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-3 rounded-xl mt-6 hover:bg-orange-700 transition"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default OrderPage;