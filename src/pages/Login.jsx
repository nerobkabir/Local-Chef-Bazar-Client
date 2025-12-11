import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../pages/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
  try {
    await loginUser(data.email, data.password);
    navigate("/", { replace: true });
  } catch (err) {
    alert(err.message);
  }
};


  return (
    <div className="max-w-md mx-auto p-6 shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Email */}
        <div>
          <label>Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="input input-bordered w-full"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button className="btn btn-primary w-full">Login</button>

        <p className="text-center mt-3">
          Don't have an account?  
          <Link className="text-orange-500 font-semibold" to="/auth/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

