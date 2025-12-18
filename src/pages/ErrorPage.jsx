import { Link, useRouteError } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  useTitle("Error");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow text-center max-w-md">
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          Oops!
        </h1>
        <p className="text-gray-600 mb-6">
          Something went wrong. Please try again.
        </p>

        <Link
          to="/"
          className="btn btn-warning"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
