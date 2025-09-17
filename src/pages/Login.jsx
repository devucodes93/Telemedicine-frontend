import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [error, setError] = useState("");

  // Fetch doctor applications
  const fetchRequests = async () => {
    setLoadingRequests(true);
    try {
      const res = await fetch(
        "https://telemedicine-backend-2.onrender.com/api/auth/doctor-applications"
      );
      const data = await res.json();
      setRequests(data.requests || []);
    } catch (err) {
      setError("Failed to fetch doctor applications");
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg(""); // Clear error on typing
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://telemedicine-backend-2.onrender.com/api/auth/login",
        formData
      );
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");
        const role = response.data.user.role;
        if (role === "patient") {
          window.location.href = "/patient";
        } else if (role === "Doctor") {
          window.location.href = "/doctor";
        } else {
          window.location.reload();
        }
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      borderColor: "#10b981",
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
          Login
        </h1>

        {errorMsg && (
          <motion.p
            className="text-red-500 text-center mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {errorMsg}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Email */}
          <motion.div
            className="relative"
            whileFocus="focus"
            variants={inputVariants}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full pl-10 pr-4 py-3 sm:py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 transition-all border-emerald-300"
            />
          </motion.div>

          {/* Password */}
          <motion.div
            className="relative"
            whileFocus="focus"
            variants={inputVariants}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full pl-10 pr-12 py-3 sm:py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 transition-all border-emerald-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <FiEyeOff className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
              ) : (
                <FiEye className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
              )}
            </button>
          </motion.div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 sm:py-4 font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 transition-all disabled:opacity-50 rounded-lg"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {/* Login as Admin Link */}
        <div className="text-center mt-4">
          <motion.button
            type="button"
            className="text-emerald-600 font-semibold hover:underline"
            onClick={() =>
              (window.location.href = "/admin/review-applications")
            }
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Login as Admin
          </motion.button>
        </div>

        {/* Admin Login Modal - Commented Out but Updated */}
        {/* 
        <AnimatePresence>
          {showAdminModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-xs text-center border border-emerald-400"
                variants={modalVariants}
              >
                <h2 className="text-xl font-bold mb-4 text-emerald-600">
                  Admin Secret Login
                </h2>
                <input
                  type="email"
                  placeholder="Admin Email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full mb-3 p-2 border rounded bg-emerald-50 text-emerald-900 placeholder-emerald-400 border-emerald-300 focus:ring-2 focus:ring-emerald-500"
                  autoFocus
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full mb-3 p-2 border rounded bg-emerald-50 text-emerald-900 placeholder-emerald-400 border-emerald-300 focus:ring-2 focus:ring-emerald-500"
                />
                {adminError && (
                  <div className="text-red-500 mb-2">{adminError}</div>
                )}
                <motion.button
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-2 rounded font-semibold hover:from-emerald-700 hover:to-green-700"
                  onClick={() => {
                    if (adminEmail === "devu@gmail.com" && adminPassword === "123456") {
                      localStorage.setItem("user", JSON.stringify({ email: adminEmail, role: "admin" }));
                      setShowAdminModal(false);
                      window.location.href = "/admin";
                    } else {
                      setAdminError("Invalid admin credentials");
                    }
                  }}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Submit
                </motion.button>
                <motion.button
                  className="w-full bg-emerald-100 text-emerald-700 py-2 rounded font-semibold hover:bg-emerald-200 mt-2"
                  onClick={() => {
                    setShowAdminModal(false);
                    setAdminEmail("");
                    setAdminPassword("");
                    setAdminError("");
                  }}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Cancel
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        */}
      </motion.div>
    </div>
  );
};

export default Login;
