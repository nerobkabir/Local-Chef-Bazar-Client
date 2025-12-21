import { useNavigate } from "react-router-dom";
import { XCircle, ArrowLeft, ShoppingBag } from "lucide-react";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="text-center p-12 bg-white rounded-3xl shadow-2xl max-w-lg mx-4">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <XCircle className="w-32 h-32 text-red-600 animate-pulse" />
            <div className="absolute inset-0 w-32 h-32 bg-red-200 rounded-full opacity-25 animate-ping"></div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-xl text-gray-700 mb-2">
          Your payment was not completed
        </p>
        <p className="text-gray-500 mb-8">
          No charges were made to your account. Your order is still waiting for payment.
        </p>

        <div className="mb-8 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl text-left">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span>ℹ️</span> What happens now?
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 font-bold">•</span>
              <span>Your order is still active and waiting for payment</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 font-bold">•</span>
              <span>You can retry the payment anytime from your orders page</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 font-bold">•</span>
              <span>The order will remain pending until payment is completed</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/dashboard/my-orders")}
            className="w-full px-6 py-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to My Orders
          </button>

          <button
            onClick={() => navigate("/meals")}
            className="w-full px-6 py-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 font-semibold transition-all duration-200 flex items-center justify-center gap-3"
          >
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Having trouble with payment?
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Contact our support team for assistance
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;