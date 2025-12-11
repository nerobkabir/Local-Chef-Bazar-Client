import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../pages/AuthProvider";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editReview, setEditReview] = useState(null);

  // Load user's reviews
  useEffect(() => {
    if (!user?.email) return;

    const loadReviews = async () => {
      const res = await fetch(`http://localhost:3000/my-reviews?email=${user.email}`);
      const data = await res.json();
      setReviews(data.data || []);
    };

    loadReviews();
  }, [user?.email]);

  // DELETE review
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This review will be removed permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e63946",
      cancelButtonColor: "#777",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`http://localhost:3000/reviews/${id}`, { method: "DELETE" });
        setReviews(reviews.filter((r) => r._id !== id));
        Swal.fire("Deleted!", "Review has been deleted.", "success");
      }
    });
  };

  // OPEN update modal
  const openUpdateModal = (review) => {
    setEditReview(review);
    setModalOpen(true);
  };

  // UPDATE review
  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:3000/reviews/${editReview._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: editReview.rating, comment: editReview.comment }),
    });
    const data = await res.json();

    if (data.success) {
      Swal.fire("Updated!", "Review updated successfully", "success");
      setReviews((prev) => prev.map((r) => (r._id === editReview._id ? editReview : r)));
      setModalOpen(false);
    }
  };

  if (!user) {
    return <p className="text-center mt-20 text-gray-600 text-lg">Loading your reviews...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">My Reviews</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-orange-200 to-orange-100">
            <tr>
              <th className="py-3 px-6 text-left font-semibold text-gray-700">Meal Name</th>
              <th className="py-3 px-6 text-left font-semibold text-gray-700">Rating</th>
              <th className="py-3 px-6 text-left font-semibold text-gray-700">Comment</th>
              <th className="py-3 px-6 text-left font-semibold text-gray-700">Date</th>
              <th className="py-3 px-6 text-center font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500 font-medium">
                  No reviews found.
                </td>
              </tr>
            ) : (
              reviews.map((rev, idx) => (
                <tr
                  key={rev._id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-orange-50 transition-all`}
                >
                  <td className="py-4 px-6 border-b text-gray-800 font-medium">{rev.mealName}</td>
                  <td className="py-4 px-6 border-b text-yellow-600 font-semibold">⭐ {rev.rating}/5</td>
                  <td className="py-4 px-6 border-b text-gray-700">{rev.comment}</td>
                  <td className="py-4 px-6 border-b text-gray-500">{new Date(rev.date).toLocaleDateString()}</td>
                  <td className="py-4 px-6  flex justify-center gap-3">
                    <button
                      onClick={() => openUpdateModal(rev)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(rev._id)}
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

      {/* Update Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl w-96 shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Update Review</h3>

            <label className="font-semibold text-gray-700">Rating:</label>
            <select
              value={editReview.rating}
              onChange={(e) => setEditReview({ ...editReview, rating: parseInt(e.target.value) })}
              className="border border-gray-300 w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <label className="font-semibold text-gray-700 mt-2">Comment:</label>
            <textarea
              value={editReview.comment}
              onChange={(e) => setEditReview({ ...editReview, comment: e.target.value })}
              className="border border-gray-300 w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded shadow"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
