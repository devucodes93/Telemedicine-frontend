import React from "react";
import { motion } from "framer-motion";
import { FaFileMedicalAlt } from "react-icons/fa";

const HealthReports = () => {
  const reports = [
    { name: "Blood Test Report", date: "10 Sep 2025" },
    { name: "ECG Report", date: "10 Sep 2025" },
    { name: "Annual Checkup Report", date: "20 Jun 2025" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg mt-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-lg font-semibold text-emerald-600 mb-5 flex items-center gap-2">
        <FaFileMedicalAlt /> Health Reports
      </h3>
      <div className="divide-y divide-gray-200">
        {reports.map((report, idx) => (
          <motion.div
            key={idx}
            className="flex justify-between items-center py-4 last:border-b-0"
            variants={itemVariants}
          >
            <p className="text-sm text-gray-600">
              {report.name} - {report.date}
            </p>
            <motion.button
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Download
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HealthReports;