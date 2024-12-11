import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { useremailValidate } from "../Helper/Validate";
import { useAuthStore } from "../Helper/store";
import { authenticate } from "../Helper/helper";
import login from "/uploads/app/login.png?url";

export default function Login() {
  const setUsername = useAuthStore((state) => state.setUsername);
  const navigate = useNavigate();

  const handleOAuthLogin = (provider) => {
    toast.success(`Redirecting to ${provider} login...`);
    setTimeout(() => {
      if (provider === "Google") {
        window.location.href = "https://accounts.google.com/o/oauth2/auth";
      } else if (provider === "Facebook") {
        window.location.href = "https://www.facebook.com/v12.0/dialog/oauth";
      }
    }, 1000);
  };

  const formik = useFormik({
    initialValues: { username: "" },
    validate: useremailValidate,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      const authPromise = authenticate(values.username);

      toast.promise(authPromise, {
        loading: "Fetching email...",
        success: (res) => {
          setUsername(values.username);
          navigate("/Password");
          return "Email Found Successfully.";
        },
        error: (err) => {
          navigate("/");
          return "Email does not exist...!";
        },
      });
    },
  });

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Image Section */}
      <div className="w-full md:w-2/3 h-40 md:h-full order-1 md:order-2">
        <img
          src={login}
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

          {/* Google Button */}
          <button
            onClick={() => handleOAuthLogin("Google")}
            className="w-full max-w-xs py-2 mb-4 flex items-center justify-center border rounded bg-white hover:bg-gray-100"
          >
            <img
              src="https://img.icons8.com/color/24/null/google-logo.png"
              alt="Google Logo"
              className="mr-2"
            />
            Log in with Google
          </button>

          {/* Facebook Button */}
          <button
            onClick={() => handleOAuthLogin("Facebook")}
            className="w-full max-w-xs py-2 mb-4 flex items-center justify-center border rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            <img
              src="https://img.icons8.com/color/24/null/facebook.png"
              alt="Facebook Logo"
              className="mr-2"
            />
            Log in with Facebook
          </button>

          {/* Divider */}
          <div className="flex items-center w-full max-w-xs my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500">Or with email</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Email Form */}
          <form onSubmit={formik.handleSubmit} className="py1">

            <div className="textbox flex flex-col items-center justify-center gap-6">
              <input
                {...formik.getFieldProps("username")}
                className="w-full px-4 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="email"
                maxLength="32"
              />
              <button  className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700" type="submit">
                Submit
              </button>
            </div>

            <div className="text-center py-2">
              <span>
                Not a member,{" "}
                <Link to="/register" className="text-blue-500 link">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
