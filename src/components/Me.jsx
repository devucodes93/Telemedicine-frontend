import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
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

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  if (compact && user) {
    return (
      <motion.div
        className="relative inline-block text-left"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img
          src={user.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full border border-emerald-300 cursor-pointer"
          onClick={() => setDropdownOpen((open) => !open)}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        />
        {showDropdown && dropdownOpen && (
          <AnimatePresence>
            <motion.div
              className="absolute right-0 mt-2 w-48 bg-white border border-emerald-200 rounded-lg shadow-lg z-10"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 transition-colors"
                onClick={() => navigate("/doctor-update")}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Profile Pending
              </motion.button>
              <motion.button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 transition-colors"
                onClick={() => navigate("/me")}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Profile
              </motion.button>
              <motion.button
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-emerald-50 transition-colors"
                onClick={handleLogout}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Logout
              </motion.button>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="bg-white shadow-lg rounded-xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md md:max-w-lg text-center"
        variants={containerVariants}
      >
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-emerald-600"
          variants={textVariants}
        >
          My Profile
        </motion.h1>
        {user ? (
          <div className="space-y-4 sm:space-y-5">
            {user.avatar && (
              <motion.img
                src={user.avatar}
                alt="avatar"
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full mx-auto border border-emerald-300"
                variants={textVariants}
              />
            )}
            <motion.p
              className="text-sm sm:text-base md:text-lg text-gray-700"
              variants={textVariants}
            >
              <strong>Username:</strong> {user.username}
            </motion.p>
            <motion.p
              className="text-sm sm:text-base md:text-lg text-gray-700"
              variants={textVariants}
            >
              <strong>Email:</strong> {user.email}
            </motion.p>
            <motion.p
              className="text-sm sm:text-base md:text-lg text-gray-700"
              variants={textVariants}
            >
              <strong>Phone:</strong> {user.phoneNumber || "Not provided"}
            </motion.p>
            <motion.p
              className="text-sm sm:text-base md:text-lg text-gray-700"
              variants={textVariants}
            >
              <strong>Role:</strong> {user.role || "Not provided"}
            </motion.p>
            <motion.button
              onClick={handleLogout}
              className="mt-4 sm:mt-6 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all w-full"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Logout
            </motion.button>
          </div>
        ) : (
          <motion.p
            className="text-sm sm:text-base md:text-lg text-gray-600"
            variants={textVariants}
          >
            No user found. Please log in.
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Me;