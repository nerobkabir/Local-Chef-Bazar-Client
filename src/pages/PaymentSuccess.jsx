import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, Loader2 } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [updating, setUpdating] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updatePaymentStatus = async () => {
      if (!orderId) {
        setError("Order ID not found");
        setUpdating(false);
        return;
      }

      try {
        const response = await fetch(
          `https://server-side-eight-gray.vercel.app/orders/payment/${orderId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentStatus: "paid",
            }),
          }
        );

        const data = await response.json();

        if (data.success) {
          console.log("Payment status updated successfully");
          setUpdating(false);

          setTimeout(() => {
            navigate("/dashboard/my-orders");
          }, 3000);
        } else {
          setError(data.message || "Failed to update payment status");
          setUpdating(false);
        }
      } catch (err) {
        console.error("Error updating payment:", err);
        setError("Failed to update payment status");
        setUpdating(false);
      }
    };

    updatePaymentStatus();
  }, [orderId, navigate]);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-red-100">
        <div className="text-center p-12 bg-white rounded-3xl shadow-2xl max-w-md">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="w-24 h-24 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Payment Update Failed
          </h1>
          <p className="text-lg text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => navigate("/dashboard/my-orders")}
            className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition"
          >
            Go to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="text-center p-12 bg-white rounded-3xl shadow-2xl max-w-md">
        <div className="mb-6 flex justify-center">
          {updating ? (
            <Loader2 className="w-24 h-24 text-green-600 animate-spin" />
          ) : (
            <CheckCircle className="w-24 h-24 text-green-600 animate-bounce" />
          )}
        </div>

        <h1 className="text-4xl font-bold text-green-600 mb-4">
          {updating ? "Updating Payment..." : "Payment Successful!"}
        </h1>

        <p className="text-lg text-gray-700 mb-2">
          {updating
            ? "Please wait while we confirm your payment"
            : "Thank you for your purchase 🎉"}
        </p>

        {orderId && (
          <p className="text-sm text-gray-500 mb-6">Order ID: {orderId}</p>
        )}

        {!updating && (
          <div className="space-y-3">
            <button
              onClick={() => navigate("/dashboard/my-orders")}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition"
            >
              View My Orders
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition"
            >
              Back to Home
            </button>
          </div>
        )}

        <p className="text-sm text-gray-500 mt-6">
          {updating
            ? "Confirming your payment..."
            : "Redirecting to orders page in 3 seconds..."}
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;