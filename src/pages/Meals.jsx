import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../pages/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChefHat, 
  Star, 
  MapPin, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  Clock,
  DollarSign
} from "lucide-react";
import useTitle from "../hooks/useTitle";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useTitle("Meals");
  const limit = 9;

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://server-side-eight-gray.vercel.app/meals?page=${currentPage}&limit=${limit}`
        );
        const result = await res.json();

        if (result.success) {
          setMeals(result.data);
          setTotalPages(result.totalPages);
        }
      } catch (err) {
        console.error("Meals fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMeals();
  }, [currentPage]);

  // Sort meals by price
  const handleSort = () => {
    const sortedMeals = [...meals].sort((a, b) =>
      sortAsc ? a.price - b.price : b.price - a.price
    );
    setMeals(sortedMeals);
    setSortAsc(!sortAsc);
  };

  const handleSeeDetails = (mealId) => {
    if (!user) {
      navigate("/auth/login");
    } else {
      navigate(`/meal-details/${mealId}`);
    }
  };

  const getPageNumbers = () => {
    const maxButtons = 5;
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + maxButtons - 1, totalPages);
    start = Math.max(end - maxButtons + 1, 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <section className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">Fresh Daily Meals</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Discover Delicious Meals
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Authentic homemade food from talented home chefs in your area
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-8 border border-gray-200"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">All Meals</h2>
                <p className="text-gray-600 text-sm">
                  Showing {meals.length} meals
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSort}
              className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <ArrowUpDown className="w-5 h-5" />
              <span>Sort by Price</span>
              <span className="text-2xl">{sortAsc ? "⬆️" : "⬇️"}</span>
            </motion.button>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="h-64 bg-gray-300" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-300 rounded" />
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                  <div className="h-4 bg-gray-300 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {meals.map((meal) => (
                  <motion.div
                    key={meal._id}
                    variants={cardVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-100"
                  >
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-orange-100 to-red-100">
                      <img
                        src={meal.foodImage}
                        alt={meal.foodName}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                        <div className="flex items-center gap-1.5">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-bold text-sm text-gray-900">
                            {meal.rating || 4.5}
                          </span>
                        </div>
                      </div>

                
                      <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full shadow-xl font-bold flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>{meal.price} TK</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-1">
                        {meal.foodName}
                      </h3>

                      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <ChefHat className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-600 font-medium truncate">
                            {meal.chefName || "Home Chef"}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: {meal.chefId}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4 text-gray-600">
                        <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                        <span className="text-sm truncate">
                          {meal.deliveryArea || "All Areas"}
                        </span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSeeDetails(meal._id)}
                        className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                      >
                        <span>See Details</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          →
                        </motion.span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
            >
              <div className="flex flex-wrap justify-center items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:shadow-xl"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">Previous</span>
                </motion.button>

                <div className="flex gap-2">
                  {getPageNumbers().map((page) => (
                    <motion.button
                      key={page}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentPage(page)}
                      className={`w-12 h-12 rounded-xl font-bold transition-all ${
                        currentPage === page
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-110"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {page}
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:shadow-xl"
                  }`}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="text-center mt-4 text-gray-600 text-sm">
                Page <span className="font-bold text-orange-600">{currentPage}</span> of{" "}
                <span className="font-bold">{totalPages}</span>
              </div>
            </motion.div>
          </>
        )}
      </div>

      <section className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-4xl font-bold mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-lg mb-6 text-white/90">
              More delicious meals are being added daily by our home chefs
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              Refresh Meals
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Meals;