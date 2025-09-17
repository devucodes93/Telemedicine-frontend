import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socket from "../socket";

const Api = axios.create({ baseURL: "http://localhost:5000/api" });

const PatientOption = () => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"));
  const LocalpatientId = userId?.id;

  const [formData, setFormData] = useState({
    patientId: LocalpatientId || "",
    doctorId: "",
    latitude: "",
    longitude: "",
    emergencyCode:
      Date.now().toString(36) + Math.random().toString(36).substring(2),
    option: "General Health Conditions",
  });

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

  // Request location on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            toast.error(
              <div className="flex items-center">
                <span className="text-xl mr-2">⚠️</span>
                Please allow location access to send emergencies.
              </div>,
              {
                className:
                  "bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold p-4 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm",
                position: "top-right",
                autoClose: 5000,
                pauseOnHover: true,
                draggable: true,
              }
            );
          } else {
            toast.error(
              <div className="flex items-center">
                <span className="text-xl mr-2">❌</span>
                Unable to retrieve your location.
              </div>,
              {
                className:
                  "bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold p-4 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm",
                position: "top-right",
                autoClose: 5000,
                pauseOnHover: true,
                draggable: true,
              }
            );
          }
        }
      );
    } else {
      toast.error(
        <div className="flex items-center">
          <span className="text-xl mr-2">❌</span>
          Geolocation is not supported by your browser.
        </div>,
        {
          className:
            "bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold p-4 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm",
          position: "top-right",
          autoClose: 5000,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.latitude || !formData.longitude) {
      toast.error(
        <div className="flex items-center">
          <span className="text-xl mr-2">⚠️</span>
          Location access is required to send emergencies.
        </div>,
        {
          className:
            "bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold p-4 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm",
          position: "top-right",
          autoClose: 5000,
        }
      );
      return;
    }

    try {
      await Api.post("/patient-option", formData);
      toast.success(
        <div className="flex items-center">
          <span className="text-xl mr-2">✅</span>
          Emergency sent successfully!
        </div>,
        {
          className:
            "bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold p-4 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm",
          position: "top-right",
          autoClose: 3000,
        }
      );
      socket.emit("new-emergency", {
        ...formData,
      });
      setFormData({
        patientId: LocalpatientId || "",
        doctorId: "",
        latitude: formData.latitude,
        longitude: formData.longitude,
        option: "General Health Conditions",
      });
      navigate("/Waiting");
    } catch (err) {
      toast.error(
        <div className="flex items-center">
          <span className="text-xl mr-2">❌</span>
          {err.response?.data?.error || "Error sending emergency"}
        </div>,
        {
          className:
            "bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold p-4 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm",
          position: "top-right",
          autoClose: 5000,
        }
      );
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 px-4 sm:px-6 pt-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8"
        variants={containerVariants}
      >
        <motion.h1
          className="text-2xl sm:text-3xl font-extrabold text-emerald-600 text-center mb-6"
          variants={containerVariants}
        >
          Send Emergency
        </motion.h1>
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          variants={containerVariants}
        >
          {/* Patient ID */}
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1"
              htmlFor="patientId"
            >
              Patient ID
            </label>
            <motion.input
              type="text"
              name="patientId"
              id="patientId"
              placeholder="Enter your Patient ID"
              value={formData.patientId}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all border-emerald-300 text-gray-800 placeholder-gray-500"
              variants={inputVariants}
              whileFocus="focus"
            />
          </div>

          {/* Emergency Type */}
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1"
              htmlFor="option"
            >
              Emergency Type
            </label>
            <motion.select
              name="option"
              id="option"
              value={formData.option}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all border-emerald-300 text-gray-800"
              variants={inputVariants}
              whileFocus="focus"
            >
              <option>Critical Conditions</option>
              <option>Urgent Conditions</option>
              <option>General Health Conditions</option>
            </motion.select>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-lg font-bold rounded-lg shadow-lg hover:from-emerald-700 hover:to-green-700 transition-all"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Send Emergency
          </motion.button>
        </motion.form>
      </motion.div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        className="mt-20"
        toastClassName="custom-toast"
      />
    </motion.div>
  );
};

export default PatientOption;
