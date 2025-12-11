import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../pages/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
  const { email, password, name, address } = data;

  if (data.password !== data.confirm) {
    alert("Passwords do not match");
    return;
  }

  try {
    // ✅ Correct FormData for imgbb
    const formData = new FormData();
    formData.append("image", data.photo[0]);

    const apiKey = import.meta.env.VITE_IMGBB_KEY;

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      formData
    );

    const photoURL = res.data.data.url;

    // Firebase Register
    await registerUser(email, password, name, photoURL, address);

    // 🔥 Redirect (now it will work!)
    navigate("/", { replace: true });

  } catch (err) {
    console.log("IMGBB / Register Error:", err);
  }
};


  return (
    <div className="max-w-md mx-auto p-6 shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-5 text-center">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Name */}
        <div>
          <label>Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label>Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="input input-bordered w-full"
          />
          {errors.password &&
            <p className="text-red-500">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            {...register("confirm", { required: "Confirm your password" })}
            className="input input-bordered w-full"
          />
          {errors.confirm &&
            <p className="text-red-500">{errors.confirm.message}</p>}
        </div>

        {/* Photo */}
        <div>
          <label>Upload Photo</label>
          <input
            type="file"
            {...register("photo", { required: "Photo is required" })}
            className="file-input file-input-bordered w-full"
          />
          {errors.photo &&
            <p className="text-red-500">{errors.photo.message}</p>}
        </div>

        {/* Address */}
        <div>
          <label>Address</label>
          <input
            {...register("address", { required: "Address is required" })}
            className="input input-bordered w-full"
          />
          {errors.address &&
            <p className="text-red-500">{errors.address.message}</p>}
        </div>

        {/* Submit */}
        <button className="btn btn-primary w-full mt-3" type="submit">
          Register
        </button>

        <p className="text-center mt-3">
          Already have an account?
          <Link className="text-orange-500 font-semibold" to="/auth/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
