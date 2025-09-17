import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const DoctorUpdate = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    phone: "",
    experience: 0,
    fee: 0,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Try to get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        specialization: user.specialization || "",
        experience: user.experience || 0,
        fee: user.fee || 0,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your backend API endpoint
      await axios.post("http://localhost:5000/api/doctor/update", form);
      navigate("/me");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
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

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50 px-4 sm:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.form
        className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-md text-center space-y-4"
        onSubmit={handleSubmit}
        variants={containerVariants}
      >
        <motion.h2
          className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800"
          variants={containerVariants}
        >
          Update Doctor Profile
        </motion.h2>
        <div className="text-left space-y-4">
          {[
            { name: "name", type: "text", placeholder: "Name" },
            { name: "email", type: "email", placeholder: "Email" },
            { name: "password", type: "password", placeholder: "Password" },
            { name: "specialization", type: "text", placeholder: "Specialization" },
            { name: "phone", type: "text", placeholder: "Phone" },
            { name: "experience", type: "number", placeholder: "Experience (years)" },
            { name: "fee", type: "number", placeholder: "Fee" },
          ].map((field) => (
            <div key={field.name}>
              <label
                className="block font-semibold mb-1 text-gray-700 text-sm sm:text-base"
                htmlFor={field.name}
              >
                {field.placeholder}
              </label>
              <motion.input
                type={field.type}
                name={field.name}
                id={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all border-emerald-300 text-gray-800 placeholder-gray-500"
                variants={inputVariants}
                whileFocus="focus"
              />
            </div>
          ))}
        </div>
        <AnimatePresence>
          {error && (
            <motion.p
              className="text-red-500 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Update Profile
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default DoctorUpdate;