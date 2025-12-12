import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../pages/AuthProvider";
import Swal from "sweetalert2";
import { Pencil, Trash2 } from "lucide-react";

const MyMeals = () => {
  const { user } = useContext(AuthContext);
  const [meals, setMeals] = useState([]);
  const [editingMeal, setEditingMeal] = useState(null);

  // Load my meals
  const fetchMeals = async () => {
    const res = await fetch(`http://localhost:3000/my-meals?email=${user.email}`);
    const data = await res.json();
    setMeals(data.data || []);
  };

  useEffect(() => {
    if (user?.email) fetchMeals();
  }, [user]);

  // DELETE MEAL
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This meal will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`http://localhost:3000/meals/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();
        if (data.success) {
          Swal.fire("Deleted!", "Meal deleted successfully", "success");
          fetchMeals();
        }
      }
    });
  };

  // UPDATE (open modal)
  const openUpdateModal = (meal) => {
    setEditingMeal(meal);
    document.getElementById("updateModal").showModal();
  };

  // UPDATE SUBMIT
  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedMeal = {
      foodName: form.foodName.value,
      price: parseFloat(form.price.value),
      ingredients: form.ingredients.value.split(",").map((i) => i.trim()),
      estimatedDeliveryTime: form.estimatedDeliveryTime.value,
      chefExperience: form.chefExperience.value,
    };

    const res = await fetch(`http://localhost:3000/meals/${editingMeal._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMeal),
    });

    const data = await res.json();

    if (data.success) {
      Swal.fire("Updated!", "Meal updated successfully!", "success");
      fetchMeals();
      document.getElementById("updateModal").close();
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
        🍽️ My Meals
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {meals.map((meal) => (
          <div
            key={meal._id}
            className="bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-5 border border-gray-200 
            hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* IMAGE */}
            <div className="relative">
              <img
                src={meal.foodImage}
                className="rounded-xl h-48 w-full object-cover group-hover:scale-105 transition"
              />
            </div>

            {/* Meal Name + Action Buttons */}
            <div className="flex items-center justify-between mt-4">
              <h3 className="text-2xl font-bold text-gray-800">
                {meal.foodName}
              </h3>

              <div className="flex gap-2">
                <button
                  onClick={() => openUpdateModal(meal)}
                  className="p-2 bg-yellow-500 text-white rounded-full shadow hover:bg-yellow-600 transition"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => handleDelete(meal._id)}
                  className="p-2 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* DETAILS */}
            <p className="text-lg text-orange-600 font-semibold">💰 ${meal.price}</p>
            <p className="text-gray-700">⭐ Rating: {meal.rating}</p>
            <p className="text-gray-700">👨‍🍳 Chef: {meal.chefName}</p>
            <p className="text-gray-700">🆔 Chef ID: {meal.chefId}</p>

            <p className="mt-2 text-gray-700">
              <b>Ingredients:</b> {meal.ingredients.join(", ")}
            </p>

            <p className="text-gray-700">⏱ Delivery Time: {meal.estimatedDeliveryTime}</p>

            <button
              onClick={() => openUpdateModal(meal)}
              className="btn btn-warning w-full mt-4 rounded-xl"
            >
              Update Meal
            </button>
          </div>
        ))}
      </div>

      {/* UPDATE MODAL */}
      <dialog id="updateModal" className="modal">
        <form method="dialog" className="modal-box bg-white rounded-xl shadow-2xl" onSubmit={handleUpdate}>

          <h3 className="font-bold text-2xl mb-4 text-center text-gray-800">
            ✏️ Update Meal
          </h3>

          <input
            name="foodName"
            defaultValue={editingMeal?.foodName}
            className="input input-bordered w-full mb-3"
            placeholder="Meal Name"
          />

          <input
            name="price"
            type="number"
            defaultValue={editingMeal?.price}
            className="input input-bordered w-full mb-3"
            placeholder="Price"
          />

          <textarea
            name="ingredients"
            defaultValue={editingMeal?.ingredients?.join(", ")}
            className="textarea textarea-bordered w-full mb-3"
            placeholder="Ingredients (comma separated)"
          />

          <input
            name="estimatedDeliveryTime"
            defaultValue={editingMeal?.estimatedDeliveryTime}
            className="input input-bordered w-full mb-3"
            placeholder="Delivery Time"
          />

          <textarea
            name="chefExperience"
            defaultValue={editingMeal?.chefExperience}
            className="textarea textarea-bordered w-full mb-3"
            placeholder="Chef Experience"
          />

          <button className="btn btn-primary w-full mt-3 rounded-xl">
            Update Meal
          </button>
        </form>

        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>

    </div>
  );
};

export default MyMeals;
