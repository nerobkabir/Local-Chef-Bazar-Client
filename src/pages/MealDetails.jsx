import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../pages/AuthProvider";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useTitle from "../hooks/useTitle";

const MealDetails = () => {
  const { mealId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useTitle("Meal Details");

  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
  });

  // Fetch meal & reviews
  useEffect(() => {
  if (!user) {
    navigate("/auth/login");
    return;
  }

  const fetchMealAndReviews = async () => {
    try {
      // ✅ fetch single meal
      const mealRes = await fetch(`http://localhost:3000/meals/${mealId}`);
      const mealData = await mealRes.json();
      if (mealData.success) {
        setMeal(mealData.data);
      } else {
        setMeal(null);
      }

      // fetch reviews
      const reviewRes = await fetch(`http://localhost:3000/reviews/${mealId}`);
      const reviewsData = await reviewRes.json();
      setReviews(reviewsData || []);

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  fetchMealAndReviews();
}, [mealId, user, navigate]);


  // Add to Favorites
  const handleAddFavorite = async () => {
    try {
      const res = await fetch("http://localhost:3000/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user.email,
          mealId: meal._id,
          mealName: meal.foodName,
          chefId: meal.chefId,
          chefName: meal.chefName,
          price: meal.price,
        }),
      });
      const data = await res.json();

      Swal.fire({
        icon: data.success ? "success" : "info",
        title: data.message,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Submit Review
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewForm.comment) return;

    const newReview = {
      foodId: meal._id,
      userEmail: user.email,             // ✅ add this
      mealName: meal.foodName,           // ✅ add mealName
      reviewerName: user.displayName,
      reviewerImage: user.photoURL || "https://i.ibb.co/sample-user.jpg",
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      date: new Date(),
    };

    try {
      const res = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: data.message,
          timer: 2000,
          showConfirmButton: false,
        });

        setReviews((prev) => [newReview, ...prev]);
        setReviewForm({ rating: 5, comment: "" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-lg text-gray-500">Loading...</p>;
  if (!meal)
    return <p className="text-center mt-20 text-lg text-red-500">Meal not found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      {/* Meal Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row gap-6 md:gap-0"
      >
        <div className="md:w-1/2 h-80 md:h-auto overflow-hidden">
          <img
            src={meal.foodImage}
            alt={meal.foodName}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{meal.foodName}</h2>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Chef:</span> {meal.chefName}</p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Chef ID:</span> {meal.chefId}
            </p>

            <p className="text-gray-600 mb-2"><span className="font-semibold">Experience:</span> {meal.chefExperience || "N/A"}</p>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Delivery Area:</span> {meal.deliveryArea || "All Areas"}</p>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Estimated Delivery:</span> {meal.deliveryTime || "30-40 mins"}</p>

            <div className="flex items-center gap-4 mt-4">
              <p className="text-yellow-500 font-semibold text-lg">⭐ {meal.rating}/5</p>
              <p className="text-orange-500 font-bold text-2xl">{meal.price} TK</p>
            </div>

            <p className="text-gray-800 mt-6 mb-4">
              <span className="font-bold">Ingredients:</span> {meal.ingredients || "Not available"}
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => navigate(`/order/${meal._id}`)}
                className="bg-orange-500 text-white font-semibold py-3 rounded-xl w-full hover:bg-orange-600 transition-all shadow-lg"
              >
                Order Now
              </button>
              <button
                onClick={handleAddFavorite}
                className="bg-gray-900 text-white font-semibold py-3 rounded-xl w-full hover:bg-gray-800 transition-all shadow-lg"
              >
                ❤️ Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Review Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>

        {/* Add Review Form */}
        <form onSubmit={handleSubmitReview} className="mb-8 space-y-4">
          <h3 className="text-xl font-semibold">Give Your Review</h3>
          <div className="flex items-center gap-4">
            <label className="font-semibold">Rating:</label>
            <select
              value={reviewForm.rating}
              onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
              className="border rounded px-3 py-1"
            >
              {[5,4,3,2,1].map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <textarea
            value={reviewForm.comment}
            onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
            placeholder="Write your review..."
            className="w-full border rounded px-4 py-2"
          />
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition">
            Submit Review
          </button>
        </form>

        {/* Display Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <motion.div
              key={rev._id || rev.date} // fallback
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-2xl shadow-lg flex gap-4"
            >
              <img src={rev.reviewerImage} alt={rev.reviewerName} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <h4 className="font-semibold">{rev.reviewerName}</h4>
                <p className="text-yellow-500 font-bold">⭐ {rev.rating}/5</p>
                <p className="text-gray-600">{rev.comment}</p>
                <p className="text-gray-400 text-sm">{new Date(rev.date).toLocaleDateString()}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MealDetails;
