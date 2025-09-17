import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaPrescription, FaFileMedicalAlt } from "react-icons/fa";

const Cards = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 px-4 sm:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
        variants={cardVariants}
        whileHover="hover"
      >
        <h3 className="text-lg font-semibold text-emerald-600 mb-4 flex items-center gap-2">
          <FaCalendarAlt /> Upcoming Appointment
        </h3>
        <p className="text-gray-600 mb-2">Dr. Sharma (Cardiologist)</p>
        <p className="text-gray-600 mb-4">15 Sep 2025 - 10:30 AM</p>
        <motion.button
          className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:from-emerald-700 hover:to-green-700 transition-all"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Join Call
        </motion.button>
      </motion.div>

      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
        variants={cardVariants}
        whileHover="hover"
      >
        <h3 className="text-lg font-semibold text-emerald-600 mb-4 flex items-center gap-2">
          <FaPrescription /> Prescriptions
        </h3>
        <p className="text-gray-600 mb-2">
          Paracetamol <span className="text-emerald-500">✔</span>
        </p>
        <p className="text-gray-600 mb-4">
          Amoxicillin <span className="text-red-500">✖</span>
        </p>
      </motion.div>

      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
        variants={cardVariants}
        whileHover="hover"
      >
        <h3 className="text-lg font-semibold text-emerald-600 mb-4 flex items-center gap-2">
          <FaFileMedicalAlt /> Health Records
        </h3>
        <p className="text-gray-600 mb-2">Last Consultation: 10 Sep 2025</p>
        <p className="text-gray-600 mb-4">Blood Test Report Available</p>
      </motion.div>
    </motion.div>
  );
};

export default Cards;