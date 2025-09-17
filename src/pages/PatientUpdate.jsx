import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const PatientUpdate = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: 0,
    gender: "",
    bloodGroup: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setForm((prev) => ({
          ...prev,
          name: user.name || user.username || "",
          email: user.email || "",
          phone: user.phone || "",
          age: user.age || 0,
          gender: user.gender || "",
          bloodGroup: user.bloodGroup || "",
        }));
      } catch (err) {
        console.error("Invalid user JSON:", err);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/patient/update", form);
      navigate("/me");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
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
    focus: { scale: 1.02, borderColor: "#10b981", transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50 px-4 sm:px-6">
      <motion.form
        className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-md text-center space-y-4 sm:space-y-5"
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
          Update Patient Profile
        </h2>
        <div className="text-left space-y-4">
          {/* Name */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700" htmlFor="name">
              Name
            </label>
            <motion.input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all border-emerald-300"
              variants={inputVariants}
              whileFocus="focus"
            />
          </div>
          {/* Email */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700" htmlFor="email">
              Email
            </label>
            <motion.input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all border-emerald-300"
              variants={inputVariants}
              whileFocus="focus"
            />
          </div>
          {/* Password */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700" htmlFor="password">
              Password
            </label>
            <motion.input
              type="password"
              name="password"
              id="password"
              value={form.password}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-emerald-900 text-white opacity-70 cursor-not-allowed"
              variants={inputVariants}
            />
          </div>
          {/* Phone */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700" htmlFor="phone">
              Phone
            </label>
            <motion.input
              type="text"
              name="phone"
              id="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all border-emerald-300"
              variants={inputVariants}
              whileFocus="focus"
            />
          </div>
          {/* Age */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700" htmlFor="age">
              Age
            </label>
            <motion.input
              type="number"
              name="age"
              id="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Age"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all border-emerald-300"
              variants={inputVariants}
              whileFocus="focus"
            />
          </div>
          {/* Gender */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700" htmlFor="gender">
              Gender
            </label>
            <motion.input
              type="text"
              name="gender"
              id="gender"
              value={form.gender}
              onChange={handleChange}
              placeholder="Gender"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all border-emerald-300"
              variants={inputVariants}
              whileFocus="focus"
            />
          </div>
          {/* Blood Group */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700" htmlFor="bloodGroup">
              Blood Group
            </label>
            <motion.select
              name="bloodGroup"
              id="bloodGroup"
              value={form.bloodGroup || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all border-emerald-300"
              variants={inputVariants}
              whileFocus="focus"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </motion.select>
          </div>
        </div>
        {error && (
          <motion.p
            className="text-red-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}
        <motion.button
          type="submit"
          className="w-full py-3 sm:py-4 font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 transition-all rounded-lg"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Update Profile
        </motion.button>
      </motion.form>
    </div>
  );
};

export default PatientUpdate;