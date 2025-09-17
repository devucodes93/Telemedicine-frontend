import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
    navigate("/signup");
  };

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <motion.header
      className={`w-full flex flex-row items-center justify-between gap-4 px-4 py-3 shadow-md transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-r from-emerald-50 to-green-50 text-gray-900"
      }`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Message */}
      <motion.div
        className="flex items-center gap-3 text-sm font-medium"
        variants={headerVariants}
      >
        <span
          className={theme === "dark" ? "text-gray-100" : "text-gray-900"}
        >
          Welcome, {user ? user.username : "Doctor"}
        </span>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-row items-center gap-4 w-auto">
        {/* Search Bar */}
        <motion.div
          className={`flex items-center w-full sm:w-72 rounded-lg px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-emerald-500 transition-all duration-300 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
          variants={headerVariants}
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
          />
        </motion.div>

        {/* Profile Icon + Dropdown */}
        <motion.div className="relative" variants={headerVariants}>
          {user && user.avatar ? (
            <motion.img
              src={user.avatar}
              alt="Profile"
              className={`w-10 h-10 rounded-full border ${
                theme === "dark" ? "border-gray-700" : "border-emerald-300"
              } cursor-pointer`}
              onClick={() => setDropdownOpen((open) => !open)}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            />
          ) : (
            <motion.div
              className={`w-10 h-10 rounded-full border ${
                theme === "dark" ? "border-gray-700" : "border-emerald-300"
              } cursor-pointer`}
              onClick={() => setDropdownOpen((open) => !open)}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaUserCircle className="w-full h-full" />
            </motion.div>
          )}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 text-sm border ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-white border-emerald-200 text-gray-900"
                }`}
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/doctor-update");
                  }}
                  className={`block w-full text-left px-4 py-2 transition-colors duration-300 ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-emerald-50"
                  }`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Profile Pending
                </motion.button>
                <motion.button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/me");
                  }}
                  className={`block w-full text-left px-4 py-2 transition-colors duration-300 ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-emerald-50"
                  }`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Profile
                </motion.button>
                <motion.button
                  onClick={handleLogout}
                  className={`block w-full text-left px-4 py-2 text-red-500 transition-colors duration-300 ${
                    theme === "dark" ? "hover:bg-red-900" : "hover:bg-red-100"
                  }`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Logout
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;