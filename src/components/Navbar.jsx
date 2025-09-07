import React, { useEffect, useState } from "react";
import { FiBell, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status when Navbar mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Welcome, Admin</h2>
      <div className="flex items-center space-x-4">
        <FiBell className="text-gray-600 w-6 h-6 cursor-pointer" />
        <FiSettings className="text-gray-600 w-6 h-6 cursor-pointer" />

        {isLoggedIn ? (
          <div className="flex items-center space-x-3">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
