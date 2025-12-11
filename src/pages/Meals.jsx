import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../pages/AuthProvider";
import { motion } from "framer-motion";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch meals from server
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch("http://localhost:3000/meals");
        const data = await res.json();
        setMeals(data);
      } catch (err) {
        console.error("Meals fetch error:", err);
      }
    };

    fetchMeals();
  }, []);

  // Sort meals by price
  const handleSort = () => {
    const sortedMeals = [...meals].sort((a, b) =>
      sortAsc ? a.price - b.price : b.price - a.price
    );
    setMeals(sortedMeals);
    setSortAsc(!sortAsc);
  };

  // Handle "See Details" button
  const handleSeeDetails = (mealId) => {
    if (!user) {
      navigate("/auth/login"); // redirect to login if not logged in
    } else {
      navigate(`/meal-details/${mealId}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">All Meals</h2>
        <button
          onClick={handleSort}
          className="bg-orange-500 px-4 py-2 rounded-lg text-white hover:bg-orange-600 transition"
        >
          Sort by Price {sortAsc ? "⬆️" : "⬇️"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {meals.map((meal) => (
          <motion.div
            key={meal._id}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition transform hover:-translate-y-1"
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
              <p className="text-yellow-500 mt-1">⭐ {meal.rating}/5</p>
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
    </div>
  );
};

export default Meals;
