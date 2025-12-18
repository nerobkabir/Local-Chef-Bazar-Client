import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../pages/AuthProvider";
import Swal from "sweetalert2";
import { Pencil, Trash2, Clock, Star, ChefHat, Utensils } from "lucide-react";
import useTitle from "../hooks/useTitle";

const MyMeals = () => {
  const { user } = useContext(AuthContext);
  const [meals, setMeals] = useState([]);
  const [editingMeal, setEditingMeal] = useState(null);
  useTitle("My Meals");

  const fetchMeals = async () => {
    const res = await fetch(`http://localhost:3000/my-meals?email=${user.email}`);
    const data = await res.json();
    setMeals(data.data || []);
  };

  useEffect(() => {
    if (user?.email) fetchMeals();
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This meal will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      const res = await fetch(`http://localhost:3000/meals/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) {
        Swal.fire({
          title: "Deleted!",
          text: "Meal deleted successfully",
          icon: "success",
          confirmButtonColor: "#3b82f6",
        });
        fetchMeals();
      }
    }
  };

  const openUpdateModal = (meal) => {
    setEditingMeal(meal);
    document.getElementById("updateModal").showModal();
  };

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
      Swal.fire({
        title: "Updated!",
        text: "Meal updated successfully!",
        icon: "success",
        confirmButtonColor: "#3b82f6",
      });
      fetchMeals();
      document.getElementById("updateModal").close();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mb-6 shadow-lg">
            <Utensils className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl font-bold text-slate-800 mb-3">
            My Delicious Meals
          </h2>
          <p className="text-slate-600 text-lg">
            Manage and update your culinary creations
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-slate-200">
            <span className="text-slate-600 font-medium">Total Meals:</span>
            <span className="text-2xl font-bold text-orange-600">{meals.length}</span>
          </div>
        </div>

        {/* Meals Grid */}
        {meals.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-16 text-center border border-slate-200">
            <div className="text-slate-300 text-8xl mb-6">🍽️</div>
            <h3 className="text-2xl font-bold text-slate-700 mb-2">No Meals Yet</h3>
            <p className="text-slate-500">Start creating delicious meals for your customers!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {meals.map((meal) => (
              <div
                key={meal._id}
                className="group bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={meal.foodImage}
                    alt={meal.foodName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => openUpdateModal(meal)}
                      className="p-2.5 bg-amber-500 text-white rounded-full shadow-lg hover:bg-amber-600 transition-all duration-200 transform hover:scale-110"
                      title="Edit Meal"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(meal._id)}
                      className="p-2.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all duration-200 transform hover:scale-110"
                      title="Delete Meal"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  {/* Price Badge */}
                  <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg font-bold text-lg">
                    ${meal.price}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Meal Name */}
                  <h3 className="text-2xl font-bold text-slate-800 mb-4 line-clamp-1">
                    {meal.foodName}
                  </h3>

                  {/* Info Grid */}
                  <div className="space-y-3 mb-5">
                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                      </div>
                      <span className="text-slate-700 font-medium">
                        Rating: <span className="text-yellow-600 font-bold">{meal.rating}</span>
                      </span>
                    </div>

                    {/* Chef Info */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <ChefHat className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-slate-700 font-medium line-clamp-1">
                        {meal.chefName}
                      </span>
                    </div>

                    {/* Delivery Time */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-slate-700 font-medium">
                        {meal.estimatedDeliveryTime}
                      </span>
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 mb-4 border border-orange-200">
                    <p className="text-sm font-semibold text-orange-700 mb-2">Ingredients</p>
                    <div className="flex flex-wrap gap-2">
                      {meal.ingredients.slice(0, 3).map((ingredient, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-white text-orange-700 px-3 py-1 rounded-full font-medium border border-orange-200"
                        >
                          {ingredient}
                        </span>
                      ))}
                      {meal.ingredients.length > 3 && (
                        <span className="text-xs bg-orange-200 text-orange-800 px-3 py-1 rounded-full font-medium">
                          +{meal.ingredients.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Update Button */}
                  <button
                    onClick={() => openUpdateModal(meal)}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Update Meal
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Update Modal */}
        <dialog id="updateModal" className="modal">
          <div className="modal-box max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-0">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-6 text-center">
              <h3 className="font-bold text-3xl text-white flex items-center justify-center gap-3">
                <Pencil className="w-8 h-8" />
                Update Meal
              </h3>
              <p className="text-amber-100 mt-2">Modify your meal details below</p>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUpdate} className="p-8 space-y-5">
              {/* Food Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Meal Name
                </label>
                <input
                  name="foodName"
                  defaultValue={editingMeal?.foodName}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-200"
                  placeholder="Enter meal name"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Price ($)
                </label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={editingMeal?.price}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-200"
                  placeholder="0.00"
                  required
                />
              </div>

              {/* Ingredients */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Ingredients (comma separated)
                </label>
                <textarea
                  name="ingredients"
                  defaultValue={editingMeal?.ingredients?.join(", ")}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-200 min-h-[100px]"
                  placeholder="e.g., Chicken, Rice, Vegetables"
                  required
                />
              </div>

              {/* Delivery Time */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Estimated Delivery Time
                </label>
                <input
                  name="estimatedDeliveryTime"
                  defaultValue={editingMeal?.estimatedDeliveryTime}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-200"
                  placeholder="e.g., 30-45 mins"
                  required
                />
              </div>

              {/* Chef Experience */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Chef Experience
                </label>
                <textarea
                  name="chefExperience"
                  defaultValue={editingMeal?.chefExperience}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-200 min-h-[100px]"
                  placeholder="Share your culinary expertise"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Update Meal
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById("updateModal").close()}
                  className="flex-1 bg-slate-200 text-slate-700 py-3.5 rounded-xl font-semibold hover:bg-slate-300 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default MyMeals;