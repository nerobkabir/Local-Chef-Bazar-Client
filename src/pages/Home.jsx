import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChefHat, Clock, Star, TrendingUp, Shield, Heart } from "lucide-react";
import useTitle from "../hooks/useTitle";

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [reviews, setReviews] = useState([]); // ✅ Empty array দিয়ে initialize
  const navigate = useNavigate();
  useTitle("Home");

  useEffect(() => {
    // Fetch first 6 meals
    fetch("https://server-side-eight-gray.vercel.app/meals?page=1&limit=6")
      .then((res) => res.json())
      .then((result) => {
        if (result.success && Array.isArray(result.data)) {
          setMeals(result.data);
        } else {
          setMeals([]);
        }
      })
      .catch((err) => {
        console.error("Meals fetch error:", err);
        setMeals([]);
      });

    // Fetch all reviews
    fetch("https://server-side-eight-gray.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => {
        console.log("Reviews data:", data);
        
        // ✅ Check: data array কিনা
        if (Array.isArray(data)) {
          setReviews(data);
        } else if (data?.data && Array.isArray(data.data)) {
          setReviews(data.data);
        } else {
          console.error("Reviews is not an array:", data);
          setReviews([]);
        }
      })
      .catch((err) => {
        console.error("Reviews fetch error:", err);
        setReviews([]);
      });
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section with Gradient Background */}
      <section className="relative bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 text-white py-12 md:py-20 overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-20 -left-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-20 -right-20 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
              >
                <ChefHat className="w-5 h-5" />
                <span className="font-semibold">100% Homemade Quality</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight"
              >
                Welcome to<br />
                <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                  Local Chef Bazaar
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base md:text-lg text-white/90 mb-6 max-w-xl"
              >
                Taste the authentic homemade foods every day! Experience freshness, 
                quality, and love in every bite from our local home chefs.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-orange-600 px-6 py-3 rounded-full font-bold shadow-2xl hover:shadow-3xl transition-all flex items-center gap-2 group"
                  onClick={() => navigate("/meals")}
                >
                  <span>Order Now</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold border-2 border-white/50 hover:bg-white/30 transition-all"
                  onClick={() => navigate("/meals")}
                >
                  Browse Meals
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/20"
              >
                <div>
                  <div className="text-2xl font-bold mb-1">500+</div>
                  <div className="text-white/80 text-xs">Happy Customers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">50+</div>
                  <div className="text-white/80 text-xs">Home Chefs</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">1000+</div>
                  <div className="text-white/80 text-xs">Meals Served</div>
                </div>
              </motion.div>
            </div>

            {/* Right Content - Floating Meal Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hidden lg:block relative"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <div className="w-full h-80 bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                  <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600"
                    alt="Delicious Food"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                    <div>
                      <div className="font-bold text-gray-800">4.9</div>
                      <div className="text-xs text-gray-600">Rating</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-6 h-6 text-orange-500" />
                    <div>
                      <div className="font-bold text-gray-800">30 min</div>
                      <div className="text-xs text-gray-600">Delivery</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Today's Special Meals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-4 font-semibold">
            <TrendingUp className="w-5 h-5" />
            <span>Popular Today</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Today's Special Meals
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Fresh, homemade meals prepared with love by our talented home chefs
          </p>
        </motion.div>

        {meals.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {meals.map((meal, index) => (
              <motion.div
                key={meal._id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer border border-gray-100"
                onClick={() => navigate(`/meal-details/${meal._id}`)}
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-orange-100 to-red-100">
                  <img
                    src={meal.foodImage}
                    alt={meal.foodName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-sm">{meal.rating || 4.5}</span>
                    </div>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg font-bold">
                    ৳{meal.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {meal.foodName}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {/* ✅ Safe ingredients handling */}
                    {Array.isArray(meal.ingredients) 
                      ? meal.ingredients.slice(0, 3).join(", ") + (meal.ingredients.length > 3 ? "..." : "")
                      : meal.ingredients || "Delicious homemade meal"
                    }
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                        <ChefHat className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-gray-600 font-medium">
                        {meal.chefName || "Home Chef"}
                      </span>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="text-orange-600 font-semibold group-hover:text-orange-700"
                    >
                      View Details →
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading meals...</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/meals")}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
          >
            View All Meals →
          </motion.button>
        </motion.div>
      </section>

      {/* Customer Reviews */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-600 px-4 py-2 rounded-full mb-4 font-semibold">
              <Heart className="w-5 h-5" />
              <span>Loved by customers</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 text-lg">
              Real reviews from real food lovers
            </p>
          </motion.div>

          {/* ✅ Conditional Rendering */}
          {reviews.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {reviews.slice(0, 6).map((review) => (
                <motion.div
                  key={review._id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-3xl shadow-lg p-6 md:p-8 transition-all hover:shadow-2xl border border-gray-100"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "{review.comment}"
                  </p>

                  {/* Reviewer Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <img
                      src={review.reviewerImage}
                      alt={review.reviewerName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-orange-200"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {review.reviewerName}
                      </h4>
                      <p className="text-sm text-gray-600">Verified Customer</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No reviews yet. Be the first to review!</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Local Chef Bazaar?
          </h2>
          <p className="text-gray-600 text-lg">
            Experience the difference with our homemade quality
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {[
            {
              icon: "🥗",
              title: "Healthy & Fresh",
              description: "Always fresh and cooked with love by experienced home chefs using quality ingredients."
            },
            {
              icon: "🚀",
              title: "Fast Delivery",
              description: "Hot meals delivered to your doorstep within 30 minutes. Quick, reliable, and safe."
            },
            {
              icon: "💰",
              title: "Affordable Pricing",
              description: "Best prices for authentic homemade food. Quality meals without breaking the bank."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg p-8 text-center transition-all hover:shadow-2xl border border-gray-100"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="text-6xl mb-6"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to taste the difference?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of happy customers enjoying homemade meals daily
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/meals")}
              className="bg-white text-orange-600 px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
            >
              Start Ordering Now →
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;