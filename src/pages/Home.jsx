import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/meals")
      .then((res) => res.json())
      .then((data) => setMeals(data.slice(0, 6)))
      .catch((err) => console.error("Meals fetch error:", err));

    fetch("http://localhost:3000/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Reviews fetch error:", err));
  }, []);

  return (
    <div>

      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-6xl mx-auto text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-bold mb-4 leading-tight"
          >
            Welcome to Local Chef Bazaar
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg max-w-2xl mx-auto"
          >
            Taste the authentic homemade foods every day! Experience freshness, quality, and love in every bite.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-orange-500 px-8 py-4 rounded-full mt-8 text-white font-semibold shadow-lg hover:shadow-xl transition"
          >
            Order Now
          </motion.button>
        </div>
      </section>

      {/* Daily Meals */}
      <section className="max-w-6xl mx-auto my-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Today’s Special Meals</h2>

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
                <h3 className="text-xl font-semibold mb-2">{meal.foodName}</h3>
                <p className="text-gray-600 mb-3">{meal.ingredients?.slice(0, 3).join(", ") + (meal.ingredients?.length > 3 ? "..." : "")}</p>
                <p className="font-bold text-orange-500 text-lg">Price: {meal.price} TK</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Customer Reviews</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <motion.div
                key={review._id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition hover:shadow-xl"
              >
                <img
                  src={review.reviewerImage}
                  alt={review.name}
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <h3 className="text-lg font-semibold">{review.reviewerName}</h3>
                <p className="text-yellow-500 font-bold mt-1 mb-2">⭐ {review.rating}/5</p>
                <p className="text-gray-600">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Section */}
      <section className="max-w-6xl mx-auto my-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-2xl shadow-lg text-center transition hover:shadow-xl">
            <h3 className="font-bold text-xl mb-3">🥗 Healthy Meals</h3>
            <p className="text-gray-600">Always fresh and cooked with love by home chefs.</p>
          </div>

          <div className="p-6 border rounded-2xl shadow-lg text-center transition hover:shadow-xl">
            <h3 className="font-bold text-xl mb-3">🚀 Fast Delivery</h3>
            <p className="text-gray-600">We deliver your meals within 30 minutes.</p>
          </div>

          <div className="p-6 border rounded-2xl shadow-lg text-center transition hover:shadow-xl">
            <h3 className="font-bold text-xl mb-3">💰 Affordable Price</h3>
            <p className="text-gray-600">Best price for best homemade foods!</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
