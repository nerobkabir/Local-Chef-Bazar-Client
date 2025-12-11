import { useEffect } from "react";
import { useParams } from "react-router-dom";

const PaymentPage = () => {
  const { orderId } = useParams();

  useEffect(() => {
    const redirectToStripe = async () => {
      const res = await fetch("http://localhost:3000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const data = await res.json();
      window.location.href = data.url;
    };

    redirectToStripe();
  }, [orderId]);

  return (
    <div className="text-center mt-20 text-xl font-bold">
      Redirecting to Payment...
    </div>
  );
};

export default PaymentPage;
