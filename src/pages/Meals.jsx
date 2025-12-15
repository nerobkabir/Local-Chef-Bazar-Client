import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../pages/AuthProvider";
import { motion } from "framer-motion";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch meals with pagination
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/meals?page=${currentPage}&limit=${limit}`
        );
        const result = await res.json();

        if (result.success) {
          setMeals(result.data);
          setTotalPages(result.totalPages);
        }
      } catch (err) {
        console.error("Meals fetch error:", err);
      }
    };
    fetchMeals();
  }, [currentPage]);

  // Sort meals by price (current page only)
  const handleSort = () => {
    const sortedMeals = [...meals].sort((a, b) =>
      sortAsc ? a.price - b.price : b.price - a.price
    );
    setMeals(sortedMeals);
    setSortAsc(!sortAsc);
  };

  // Handle "See Details"
  const handleSeeDetails = (mealId) => {
    if (!user) {
      navigate("/auth/login");
    } else {
      navigate(`/meal-details/${mealId}`);
    }
  };

  // Smart pagination: show max 5 page buttons + Prev/Next
  const getPageNumbers = () => {
    const maxButtons = 5;
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + maxButtons - 1, totalPages);

    // Adjust start if near the end
    start = Math.max(end - maxButtons + 1, 1);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">All Meals</h2>
        <button
          onClick={handleSort}
          className="bg-orange-500 px-4 py-2 rounded-lg text-white hover:bg-orange-600 transition"
        >
          Sort by Price {sortAsc ? "⬆️" : "⬇️"}
        </button>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {meals.map((meal) => (
          <motion.div
            key={meal._id}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="h-64 overflow-hidden">
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="p-5">
              <h3 className="text-xl font-semibold">{meal.foodName}</h3>
              <p className="text-gray-600 mt-1">
                <span className="font-bold">Chef:</span> {meal.chefName}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Chef ID:</span> {meal.chefId}
              </p>
              <p className="font-bold text-orange-500 mt-2 text-lg">
                Price: {meal.price} TK
              </p>
              <p className="text-yellow-500 mt-1">
                ⭐ {meal.rating || 0}/5
              </p>
              <p className="text-gray-600 mt-1">
                <span className="font-bold">Delivery Area:</span>{" "}
                {meal.deliveryArea || "All Areas"}
              </p>

              <button
                onClick={() => handleSeeDetails(meal._id)}
                className="mt-4 w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition"
              >
                See Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Smart Pagination */}
      <div className="flex justify-center mt-10 gap-2 flex-wrap">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className={`px-4 py-2 rounded-lg font-medium ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Prev
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded-lg font-medium ${
              currentPage === page
                ? "bg-orange-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className={`px-4 py-2 rounded-lg font-medium ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Meals;
