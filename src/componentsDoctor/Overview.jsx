import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaVenusMars, FaIdCard, FaCalendarCheck } from "react-icons/fa";

const Overview = () => {
  const cards = [
    { icon: <FaUser />, label: "Age", value: "42" },
    { icon: <FaVenusMars />, label: "Gender", value: "Male" },
    { icon: <FaIdCard />, label: "Patient ID", value: "PAT-0925" },
    { icon: <FaCalendarCheck />, label: "Last Visit", value: "10 Sep 2025" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          className="bg-white p-5 rounded-xl shadow-lg text-center hover:shadow-xl transition-all"
          variants={cardVariants}
          whileHover="hover"
        >
          <h4 className="text-base font-semibold text-emerald-600 mb-2 flex items-center justify-center gap-2">
            {card.icon} {card.label}
          </h4>
          <p className="text-lg font-medium text-gray-800">{card.value}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Overview;