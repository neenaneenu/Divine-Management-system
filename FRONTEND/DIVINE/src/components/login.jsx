import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { api } from "../axios";

const Login = () => {
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  // ---------------- LOGIN ----------------
  const loginFormik = useFormik({
  initialValues: {
    email: "",
    password: "",
  },
  onSubmit: async (values) => {
    try {
      const { data } = await api.post("users/login", values); // ✅ use POST
      localStorage.setItem("access_token", data.token);
      toast.success("Login successful!");
      navigate("/home");
    } catch (error) {
      console.error(error);
      toast.error("Login failed, try again later");
    }
  },
});


  // ---------------- SIGNUP ----------------
  const signupFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const { data } = await api.post("users/signup", values);
        toast.success("Signup successful! Please login.");
        setShowSignup(false);
        navigate("/home")
      } catch (error) {
        console.error(error);
        toast.error("Signup failed, try again later");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Login Form */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={loginFormik.handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginFormik.values.email}
              onChange={loginFormik.handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginFormik.values.password}
              onChange={loginFormik.handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => setShowSignup(true)}
            className="text-blue-500 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>

            <form onSubmit={signupFormik.handleSubmit}>
              {/* Name */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={signupFormik.values.name}
                  onChange={signupFormik.handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={signupFormik.values.email}
                  onChange={signupFormik.handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={signupFormik.values.password}
                  onChange={signupFormik.handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                className="w-full bg-green-500 text-white font-semibold p-3 rounded-lg hover:bg-green-600 transition"
              >
                Sign Up
              </button>
            </form>

            {/* Close button */}
            <button
              onClick={() => setShowSignup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
