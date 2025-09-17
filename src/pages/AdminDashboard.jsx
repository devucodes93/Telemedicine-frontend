import React, { useState, useEffect } from "react";
import { FiCheck, FiX, FiRefreshCcw } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

const ADMIN_EMAIL = "devu@gmail.com";
const ADMIN_PASSWORD = "123456";

const AdminDashboard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/doctor-applications");
      const data = await res.json();
      setRequests(data.requests || []);
    } catch (err) {
      setError("Failed to fetch doctor applications");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      fetchRequests();
    } else {
      setError("Invalid admin credentials");
    }
  };

  const handleReview = async (id, action) => {
    setProcessingId(id);
    try {
      await fetch("http://localhost:5000/api/doctor/doctor-application-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId: id,
          action: action === "approve" ? "approve" : "reject",
        }),
      });
      await fetchRequests();
      toast.success(
        action === "approve"
          ? "Doctor application approved!"
          : "Doctor application rejected!",
        { position: "top-right" }
      );
    } catch (err) {
      toast.error("Failed to process application", { position: "top-right" });
    } finally {
      setProcessingId(null);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const inputVariants = {
    focus: { scale: 1.02, borderColor: "#10b981", transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)", transition: { duration: 0.3 } },
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50 p-4">
        <motion.form
          onSubmit={handleLogin}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
            Admin Login
          </h2>
          <motion.input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all border-emerald-300 text-gray-800 placeholder-gray-500"
            required
            variants={inputVariants}
            whileFocus="focus"
          />
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all border-emerald-300 text-gray-800 placeholder-gray-500"
            required
            variants={inputVariants}
            whileFocus="focus"
          />
          <AnimatePresence>
            {error && (
              <motion.div
                className="text-red-500 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-3 rounded-lg font-semibold transition-all"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Login
          </motion.button>
        </motion.form>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-emerald-50 flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ToastContainer />
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Doctor Applications</h1>
        <motion.button
          onClick={fetchRequests}
          className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-800 transition-colors"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <FiRefreshCcw className="w-5 h-5" />
          <span>Refresh</span>
        </motion.button>
      </header>

      {/* Content */}
      <main className="flex-1 p-4 sm:p-6 overflow-auto">
        {loading ? (
          <motion.div
            className="text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
          >
            Loading...
          </motion.div>
        ) : requests.length === 0 ? (
          <motion.div
            className="text-center text-gray-500 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
          >
            No applications found.
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {requests.map((req) => (
              <motion.div
                key={req._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 sm:p-6 flex flex-col"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={req.avatar}
                    alt="Doctor Avatar"
                    className="w-16 sm:w-20 h-16 sm:h-20 rounded-full object-cover border-2 border-emerald-200"
                  />
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                      {req.username || req.name}
                    </h2>
                    <p className="text-gray-600 text-sm">{req.email}</p>
                  </div>
                </div>

                <div className="mt-4 text-gray-700 space-y-1 text-sm sm:text-base">
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {req.phoneNumber || req.phone}
                  </p>
                  <p>
                    <span className="font-medium">Specialization:</span>{" "}
                    {req.specialization}
                  </p>
                  <p>
                    <span className="font-medium">Experience:</span>{" "}
                    {req.experience} yrs
                  </p>
                  <p>
                    <span className="font-medium">Fee:</span> ₹{req.fee}
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <a
                    href={req.certification}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-500 hover:text-emerald-700 underline text-sm sm:text-base"
                  >
                    View Certification
                  </a>
                  <div className="space-x-2 flex">
                    <motion.button
                      disabled={processingId === req._id}
                      onClick={() => handleReview(req._id, "approve")}
                      className="px-3 sm:px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center space-x-1 text-sm sm:text-base disabled:opacity-50"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <FiCheck />
                      <span>Approve</span>
                    </motion.button>
                    <motion.button
                      disabled={processingId === req._id}
                      onClick={() => handleReview(req._id, "reject")}
                      className="px-3 sm:px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center space-x-1 text-sm sm:text-base disabled:opacity-50"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <FiX />
                      <span>Reject</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </motion.div>
  );
};

export default AdminDashboard;