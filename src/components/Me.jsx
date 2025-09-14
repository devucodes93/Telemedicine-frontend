import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Me = ({ compact, showDropdown }) => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch user from backend
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return; // No token, so no API call
    }

    axios
      .get("http://localhost:5000/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/signup");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/signup");
  };

  if (compact && user) {
    return (
      <div className="relative inline-block text-left">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full border cursor-pointer"
          onClick={() => setDropdownOpen((open) => !open)}
        />
        {showDropdown && dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => navigate("/doctor-update")}
            >
              Profile Pending
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => navigate("/me")}
            >
              Profile
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md md:max-w-lg text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          My Profile
        </h1>
        {user ? (
          <div className="space-y-4 sm:space-y-5">
            {user.avatar && (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full mx-auto border"
              />
            )}
            <p className="text-sm sm:text-base md:text-lg">
              <strong>Username:</strong> {user.username}
            </p>
            <p className="text-sm sm:text-base md:text-lg">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-sm sm:text-base md:text-lg">
              <strong>Phone:</strong> {user.phoneNumber || "Not provided"}
            </p>
            <p className="text-sm sm:text-base md:text-lg">
              <strong>Role:</strong> {user.role || "Not provided"}
            </p>
            <button
              onClick={handleLogout}
              className="mt-4 sm:mt-6 bg-red-400 hover:bg-red-600 text-white font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-2xl transition-colors duration-300 w-full"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-sm sm:text-base md:text-lg">
            No user found. Please log in.
          </p>
        )}
      </div>
    </div>
  );
};

export default Me;
