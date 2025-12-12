import { useForm } from "react-hook-form";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../pages/AuthProvider";
import Swal from "sweetalert2";

const CreateMeal = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      if (!user) {
        return Swal.fire("Login Required", "Please login first", "warning");
      }

      if (!data.foodImage || data.foodImage.length === 0) {
        return Swal.fire("Image Required", "Upload a food image!", "error");
      }

      // ==============================
      // 1. Upload Image to IMGBB
      // ==============================
      const formData = new FormData();
      formData.append("image", data.foodImage[0]);

      const apiKey = import.meta.env.VITE_IMGBB_KEY;

      const uploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );

      const imageUrl = uploadRes.data.data.url;

      // ==============================
      // 2. Prepare Meal Data
      // ==============================
      const mealData = {
        foodName: data.foodName.trim(),
        chefName: data.chefName.trim(),
        foodImage: imageUrl,
        price: parseFloat(data.price),
        rating: 0, // requirement
        ingredients: data.ingredients.split(",").map((i) => i.trim()),
        estimatedDeliveryTime: data.estimatedDeliveryTime.trim(),
        chefExperience: data.chefExperience.trim(),
        chefId: data.chefId.trim(), // MUST HAVE
        userEmail: user.email,
        createdAt: new Date(),
      };

      // ==============================
      // 3. Send to Backend
      // ==============================
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
        Swal.fire("Failed", "Meal creation failed!", "error");
      }

    } catch (error) {
      console.error("Meal Create Error:", error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Create New Meal</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input
          {...register("foodName", { required: true })}
          className="input input-bordered w-full"
          placeholder="Food Name"
        />

        <input
          {...register("chefName", { required: true })}
          className="input input-bordered w-full"
          placeholder="Chef Name"
        />

        <input
          type="file"
          accept="image/*"
          {...register("foodImage", { required: true })}
          className="file-input file-input-bordered w-full"
        />

        <input
          {...register("price", { required: true })}
          type="number"
          className="input input-bordered w-full"
          placeholder="Price"
        />

        <textarea
          {...register("ingredients", { required: true })}
          className="textarea textarea-bordered w-full"
          placeholder="Ingredients (comma separated)"
        />

        <input
          {...register("estimatedDeliveryTime", { required: true })}
          className="input input-bordered w-full"
          placeholder="Estimated Delivery Time"
        />

        <textarea
          {...register("chefExperience", { required: true })}
          className="textarea textarea-bordered w-full"
          placeholder="Chef Experience"
        />

        {/* Rating (Auto default 0) */}
        <input
          className="input input-bordered w-full bg-gray-200"
          value="0"
          readOnly
        />

        {/* CHEF ID — REQUIRED FIELD */}
        <input
          {...register("chefId", { required: true })}
          className="input input-bordered w-full"
          placeholder="Chef ID (Assigned by Admin)"
        />

        {/* USER EMAIL — AUTO FILLED */}
        <input
          className="input input-bordered w-full bg-gray-200"
          value={user?.email || ""}
          readOnly
        />

        <button className="btn btn-primary w-full">Create Meal</button>
      </form>
    </div>
  );
};

export default CreateMeal;
