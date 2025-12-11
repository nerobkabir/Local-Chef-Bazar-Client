import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../pages/AuthProvider";
import Swal from "sweetalert2";

const FavoriteMeals = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch favorite meals
  useEffect(() => {
    if (!user?.email) return;

    const fetchFavorites = async () => {
      try {
        const res = await fetch(`http://localhost:3000/favorites?email=${user.email}`);
        const data = await res.json();
        setFavorites(data.data || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user?.email]);

  // Delete favorite meal
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This meal will be removed from favorites!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e63946",
      cancelButtonColor: "#777",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:3000/favorites/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();

          if (data.success) {
            setFavorites(favorites.filter((f) => f._id !== id));
            Swal.fire("Removed!", "Meal removed from favorites successfully.", "success");
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Failed to remove meal.", "error");
        }
      }
    });
  };

  if (!user) {
    return <p className="text-center mt-20 text-gray-600 text-lg">Loading favorites...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">My Favorite Meals</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-orange-200 to-orange-100">
            <tr>
              <th className="py-3 px-6 text-left font-semibold text-gray-700">Meal Name</th>
              <th className="py-3 px-6 text-left font-semibold text-gray-700">Chef Name</th>
              <th className="py-3 px-6 text-left font-semibold text-gray-700">Price</th>
              <th className="py-3 px-6 text-left font-semibold text-gray-700">Date Added</th>
              <th className="py-3 px-6 text-center font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500 font-medium">
                  Loading...
                </td>
              </tr>
            ) : favorites.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500 font-medium">
                  No favorite meals found.
                </td>
              </tr>
            ) : (
              favorites.map((fav, idx) => (
                <tr
                  key={fav._id}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-orange-50 transition-all`}
                >
                  <td className="py-4 px-6 border-b text-gray-800 font-medium">{fav.mealName}</td>
                  <td className="py-4 px-6 border-b text-gray-700">{fav.chefName}</td>
                  <td className="py-4 px-6 border-b text-gray-700">{fav.price ? `${fav.price} TK` : "N/A"}</td>
                  <td className="py-4 px-6 border-b text-gray-500">
                    {new Date(fav.addedTime).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6  flex justify-center">
                    <button
                      onClick={() => handleDelete(fav._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FavoriteMeals;
