import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../Helper/Validate";
import { useAuthStore } from "../Helper/store";
import { login } from "../Helper/helper";
import login1 from "/uploads/app/login.png?url";

export default function LoginForm() {
  const { username } = useAuthStore((state) => state.auth); // Get the stored username
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { password: "" },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ password }) => {
      const email = username; // Use the username as email
      let loginPromise = login({ email, password });

      toast.promise(loginPromise, {
        loading: "Validating Password...",
        success: <b>Login Successfully...!</b>,
        error: <b>Password Not Match...!</b>,
      });

      loginPromise.then((res) => {
        let { token } = res.data;
        localStorage.setItem("token", token);
        navigate("/UserAppointmentStatusPage");
      });
    },
  });

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Image Section */}
      <div className="w-full md:w-2/3 h-40 md:h-full order-1 md:order-2">
        <img
          src={login1}
          alt="Blood Bank"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Login Form Section */}
      <div className="w-full md:w-1/3 bg-white flex flex-col justify-start items-center p-4 md:p-8 overflow-hidden order-2 md:order-1">
        <Toaster position="top-center" reverseOrder={false} />

        <div className="mt-4 md:mt-[10%] w-full flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
            Log in to your Blood Bank Account
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Don’t have an account?{" "}
            <a href="/register" className="text-red-600 hover:underline">
              Sign Up
            </a>
          </p>

          {/* Email and Password Form */}
          <form onSubmit={formik.handleSubmit} className="py1">
            <div className="textbox flex flex-col items-center justify-center gap-6">
              {/* Display username */}
              <input
                value={username} // Use the username value
                className="w-full px-4 py-2 mb-3 border rounded bg-gray-200 text-gray-700 focus:outline-none cursor-not-allowed"
                type="text"
                placeholder="email"
                disabled // Make it disabled
              />
              <input
                {...formik.getFieldProps("password")}
                className="w-full px-4 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Password"
              />
              <button
                className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700"
                type="submit"
              >
                Sign In
              </button>
            </div>

            <div className="text-center py-2">
              <span>
                Forgot Password?{" "}
                <Link to="/recovery" className="text-red-500 link">
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
