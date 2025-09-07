import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "../assets/image.jpg"; // ✅ Background image

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://college-event-management-0f88.onrender.com/auth/admin/login",
        { email, password }
      );

      const { session } = res.data;

      // ✅ Save JWT and user info
      localStorage.setItem("token", session.access_token);
      localStorage.setItem("user", JSON.stringify(session.user));

      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 🔹 Blur Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* 🔹 Login Card */}
      <div className="relative bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            <svg
              className="w-8 h-8 text-black-600"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.47L18.66 8.01L12 11.55L5.34 8.01L12 4.47ZM4 9.47L11 13.11V20.3L4 16.5V9.47ZM13 20.3V13.11L20 9.47V16.5L13 20.3Z" />
            </svg>
            <span className="text-xl font-semibold text-gray-800">
              CAMPUS CONNECT
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Admin Login
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl w-full transition transform hover:scale-105 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Don’t have an account?{" "}
          <a
            className="text-blue-500 hover:text-blue-800 font-bold"
            href="/register"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
