import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { FaUserCircle, FaSearch, FaGlobe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
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
    navigate("/signup");
  };

  return (
    <div className={styles.header}>
      <h1>
        {user && user.avatar ? (
          <img
            src={user.avatar}
            alt="profile"
            className="inline-block w-10 h-10 rounded-full mr-2 border"
          />
        ) : (
          <FaUserCircle />
        )}
        Welcome, {user ? user.username : "Doctor"}
      </h1>
      <div className={styles.userControls}>
        <div className={styles.searchBar}>
          <FaSearch />
          <input type="text" placeholder="Search records, appointments..." />
        </div>
        <button className={styles.language}>
          <FaGlobe /> English
        </button>
        {/* Profile image with dropdown */}
        {user && user.avatar && (
          <div className="relative inline-block text-left">
            <img
              src={user.avatar}
              alt="profile"
              className="w-10 h-10 rounded-full border cursor-pointer"
              onClick={() => setDropdownOpen((open) => !open)}
            />
            {dropdownOpen && (
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
        )}
      </div>
    </div>
  );
};

export default Header;
