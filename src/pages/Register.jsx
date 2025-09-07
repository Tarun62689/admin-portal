import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "../assets/image.jpg"; // ✅ import background image

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    adminName: "",
    email: "",
    password: "",
    role: "admin",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await axios.post(
        "https://college-event-management-0f88.onrender.com/auth/admin/register",
        {
          admin_name: formData.adminName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }
      );

      console.log(res.data);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Something went wrong!");
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

      {/* 🔹 Registration Card */}
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
          Staff Registration
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Admin Name */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="adminName"
            >
              Admin Name
            </label>
            <input
              id="adminName"
              name="adminName"
              type="text"
              value={formData.adminName}
              onChange={handleChange}
              className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 focus:outline-none"
              placeholder="Admin Name"
              required
            />
          </div>

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
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 focus:outline-none"
              placeholder="Email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 focus:outline-none"
              placeholder="Password"
              required
            />
          </div>

          {/* Role */}
          <div className="mb-6">
            <p className="block text-gray-700 text-sm font-bold mb-2">Role</p>
            <div className="flex items-center space-x-4">
              {["admin", "staff", "superAdmin"].map((role) => (
                <label key={role} className="flex items-center text-gray-600">
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={formData.role === role}
                    onChange={handleChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2 capitalize">{role}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Submit */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl w-full transition transform hover:scale-105 disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <a
            className="text-blue-500 hover:text-blue-800 font-bold"
            href="/login"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
