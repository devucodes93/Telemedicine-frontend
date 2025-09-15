import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { FaUserCircle, FaSearch, FaGlobe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { theme } = useTheme();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.replace("/signup");
  };

  return (
    <div
      className={`w-full flex flex-row items-center justify-between gap-4 px-2 py-2 shadow-md transition-colors duration-300
        ${
          theme === "dark"
            ? "bg-gray-900 text-gray-100"
            : "bg-white text-gray-900"
        }`}
      style={{ color: theme === "dark" ? "#f3f4f6" : "#111827" }} // Tailwind gray-100 and gray-900
    >
      {/* Welcome Message */}
      <div className="flex items-center gap-3 text-sm font-medium">
        <span style={{ color: theme === "dark" ? "#f3f4f6" : "#111827" }}>
          Welcome, {user ? user.username : "Doctor"}
        </span>
      </div>

      {/* Controls */}
      <div className="flex flex-row items-center gap-4 w-auto">
        {/* Search Bar */}
        <div
          className={`flex items-center w-full sm:w-72 rounded-md px-3 py-2 text-sm focus-within:ring-2 ring-blue-500 transition-colors duration-300 ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <FaSearch
            className={`mr-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <input
            type="text"
            placeholder="Search records, appointments..."
            className={`bg-transparent outline-none w-full text-sm transition-colors duration-300 ${
              theme === "dark"
                ? "text-gray-200 placeholder-gray-400"
                : "text-gray-700 placeholder-gray-500"
            }`}
            style={{ color: theme === "dark" ? "#e5e7eb" : "#374151" }} // Tailwind gray-200 and gray-700
          />
        </div>

        {/* Single Profile Icon + Dropdown */}
        <div className="relative">
          {user && user.avatar ? (
            <img
              src={user.avatar}
              alt="profile"
              className="w-10 h-10 rounded-full border cursor-pointer"
              onClick={() => setDropdownOpen((open) => !open)}
            />
          ) : (
            <FaUserCircle
              className="w-10 h-10 rounded-full border cursor-pointer"
              onClick={() => setDropdownOpen((open) => !open)}
            />
          )}
          {dropdownOpen && (
            <div
              className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 text-sm border transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
              style={{ color: theme === "dark" ? "#f3f4f6" : "#111827" }}
            >
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/doctor-update");
                }}
                className={`block w-full text-left px-4 py-2 transition-colors duration-300 ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                Profile Pending
              </button>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/me");
                }}
                className={`block w-full text-left px-4 py-2 transition-colors duration-300 ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className={`block w-full text-left px-4 py-2 text-red-500 transition-colors duration-300 ${
                  theme === "dark" ? "hover:bg-red-900" : "hover:bg-red-100"
                }`}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
