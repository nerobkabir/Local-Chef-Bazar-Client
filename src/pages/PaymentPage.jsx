import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CreditCard, AlertCircle } from "lucide-react";
import useTitle from "../hooks/useTitle";

const PaymentPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useTitle("Payment Processing");

  useEffect(() => {
    const redirectToStripe = async () => {
      try {
        setLoading(true);

        console.log("🔄 Initiating payment for order:", orderId);

        const res = await fetch("https://server-side-eight-gray.vercel.app/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });

        const data = await res.json();

        console.log("📦 Payment response:", data);

        if (data.success && data.url) {
          console.log("✅ Redirecting to Stripe...");
          // Redirect to Stripe Checkout
          window.location.href = data.url;
        } else {
          setError(data.message || "Failed to create payment session");
          setLoading(false);
        }
      } catch (err) {
        console.error("❌ Payment error:", err);
        setError("Something went wrong. Please try again.");
        setLoading(false);
      }
    };

    if (orderId) {
      redirectToStripe();
    }
  }, [orderId]);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-red-100">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-2xl">
          <div className="flex justify-center mb-4">
            <AlertCircle className="w-20 h-20 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/dashboard/my-orders")}
              className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition"
            >
              Back to Orders
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="text-center p-12 bg-white rounded-3xl shadow-2xl max-w-md">
        <div className="mb-6 flex justify-center">
          <CreditCard className="w-24 h-24 text-orange-600 animate-pulse" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Processing Payment
        </h2>
        <p className="text-gray-600 mb-6">
          Please wait while we redirect you to secure payment gateway...
        </p>
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg text-orange-600"></span>
        </div>
        <p className="text-sm text-gray-500 mt-6">
          You will be redirected to Stripe in a moment
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;