import React from "react";
import { motion } from "framer-motion";
import { FaHeartbeat, FaTachometerAlt, FaHeart, FaTint } from "react-icons/fa";

const HealthOverview = () => {
  const metrics = [
    {
      icon: <FaTachometerAlt />,
      label: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      status: "normal",
    },
    { icon: <FaHeart />, label: "Pulse Rate", value: "72", unit: "bpm", status: "normal" },
    {
      icon: <FaTint />,
      label: "Hemoglobin Level",
      value: "13.5",
      unit: "g/dL",
      status: "normal",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const metricVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const circleVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-lg font-semibold text-emerald-600 mb-5 flex items-center gap-2">
        <FaHeartbeat /> Health Overview
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {metrics.map((metric, idx) => (
          <motion.div
            key={idx}
            className="text-center"
            variants={metricVariants}
          >
            <h4 className="flex items-center justify-center gap-2 mb-2 text-base font-medium text-gray-700">
              {metric.icon} {metric.label}
            </h4>
            <motion.div
              className="relative w-24 h-24 mx-auto"
              variants={circleVariants}
            >
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  className="fill-none stroke-gray-200 stroke-8"
                  cx="50"
                  cy="50"
                  r="46"
                />
                <circle
                  className="fill-none stroke-emerald-500 stroke-8 stroke-linecap-round transition-all duration-500"
                  cx="50"
                  cy="50"
                  r="46"
                  strokeDasharray="289.026"
                  strokeDashoffset="72.257"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-base font-medium text-gray-800">
                {metric.value}
              </div>
            </motion.div>
            <p className="mt-2 text-sm text-gray-600">
              {metric.unit}{" "}
              <span
                className={`${
                  metric.status === "normal"
                    ? "text-emerald-500"
                    : metric.status === "high"
                    ? "text-red-500"
                    : "text-yellow-500"
                } font-semibold`}
              >
                {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
              </span>
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HealthOverview;