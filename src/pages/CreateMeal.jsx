import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../pages/AuthProvider";
import Swal from "sweetalert2";
import useTitle from "../hooks/useTitle";

const CreateMeal = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);
  const [userStatus, setUserStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  useTitle("Create Meal");

  // Fetch user info (status) from backend
  useEffect(() => {
    if (!user) return;

    const fetchUserStatus = async () => {
      try {
        const res = await fetch(`http://localhost:3000/users?email=${user.email}`);
        const data = await res.json();
        setUserStatus(data.status || "active"); // default active
      } catch (error) {
        console.error("Error fetching user status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStatus();
  }, [user]);

  const onSubmit = async (data) => {
    if (!user) {
      return Swal.fire("Login Required", "Please login first", "warning");
    }

    if (userStatus === "fraud") {
      return Swal.fire(
        "Access Denied",
        "Fraud chefs cannot create meals.",
        "error"
      );
    }

    if (!data.foodImage || data.foodImage.length === 0) {
      return Swal.fire("Image Required", "Upload a food image!", "error");
    }

    try {
      // Upload image to IMGBB
      const formData = new FormData();
      formData.append("image", data.foodImage[0]);
      const apiKey = import.meta.env.VITE_IMGBB_KEY;
      const uploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );
      const imageUrl = uploadRes.data.data.url;

      // Prepare meal data
      const mealData = {
        foodName: data.foodName.trim(),
        chefName: data.chefName.trim(),
        foodImage: imageUrl,
        price: parseFloat(data.price),
        rating: 0,
        ingredients: data.ingredients.split(",").map((i) => i.trim()),
        estimatedDeliveryTime: data.estimatedDeliveryTime.trim(),
        chefExperience: data.chefExperience.trim(),
        chefId: data.chefId.trim(),
        userEmail: user.email,
        createdAt: new Date(),
      };

      // Send to backend
      const res = await fetch("http://localhost:3000/create-meal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mealData),
      });
      const result = await res.json();

      if (result.success) {
        Swal.fire("Success!", "Meal Created Successfully!", "success");
        reset();
      } else {
        Swal.fire("Failed", result.message || "Meal creation failed!", "error");
      }
    } catch (error) {
      console.error("Meal Create Error:", error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  if (!user) {
    return (
      <p className="text-center mt-20 text-xl text-gray-600">
        Please login to create a meal.
      </p>
    );
  }

  if (loading) {
    return <p className="text-center mt-20 text-xl">Loading...</p>;
  }

  if (userStatus === "fraud") {
    return (
      <p className="text-center mt-20 text-xl text-red-600">
        Fraud chefs cannot create meals.
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Create New Meal</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("foodName", { required: true })} className="input input-bordered w-full" placeholder="Food Name" />
        <input {...register("chefName", { required: true })} className="input input-bordered w-full" placeholder="Chef Name" />
        <input type="file" accept="image/*" {...register("foodImage", { required: true })} className="file-input file-input-bordered w-full" />
        <input {...register("price", { required: true })} type="number" className="input input-bordered w-full" placeholder="Price" />
        <textarea {...register("ingredients", { required: true })} className="textarea textarea-bordered w-full" placeholder="Ingredients (comma separated)" />
        <input {...register("estimatedDeliveryTime", { required: true })} className="input input-bordered w-full" placeholder="Estimated Delivery Time" />
        <textarea {...register("chefExperience", { required: true })} className="textarea textarea-bordered w-full" placeholder="Chef Experience" />
        <input className="input input-bordered w-full bg-gray-200" value="0" readOnly />
        <input {...register("chefId", { required: true })} className="input input-bordered w-full" placeholder="Chef ID (Assigned by Admin)" />
        <input className="input input-bordered w-full bg-gray-200" value={user?.email || ""} readOnly />
        <button className="btn btn-primary w-full">Create Meal</button>
      </form>
    </div>
  );
};

export default CreateMeal;
