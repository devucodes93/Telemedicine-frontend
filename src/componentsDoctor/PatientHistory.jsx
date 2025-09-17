import React from "react";
import { motion } from "framer-motion";
import { FaHistory } from "react-icons/fa";

const PatientHistory = () => {
  const history = [
    {
      date: "10 Sep 2025",
      title: "Cardiology Consultation",
      desc: "Consulted Dr. Sharma for chest pain. Prescribed Paracetamol.",
    },
    {
      date: "15 Aug 2025",
      title: "Blood Test",
      desc: "Conducted routine blood test. Results normal.",
    },
    {
      date: "20 Jun 2025",
      title: "General Checkup",
      desc: "Annual checkup with Dr. Patel. No major issues reported.",
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

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const dotVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg mt-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-lg font-semibold text-emerald-600 mb-5 flex items-center gap-2">
        <FaHistory /> Patient History
      </h3>
      <div className="relative pl-8">
        <div className="absolute left-2 top-0 bottom-0 w-1 bg-emerald-500 rounded"></div>
        {history.map((item, idx) => (
          <motion.div
            key={idx}
            className="relative mb-5 pl-5"
            variants={itemVariants}
          >
            <motion.div
              className="absolute left-0 top-1.5 w-3 h-3 bg-emerald-600 rounded-full border-2 border-white"
              variants={dotVariants}
            />
            <h4 className="text-sm font-medium text-gray-800 mb-1">
              {item.date} - {item.title}
            </h4>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PatientHistory;