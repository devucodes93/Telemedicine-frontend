import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

const Messages = () => {
  const messages = [
    {
      sender: "Dr. Sharma",
      text: "Your blood test results are available. Please review.",
      time: "10 Sep 2025, 2:30 PM",
    },
    {
      sender: "Clinic Support",
      text: "Reminder: Your appointment is scheduled for 15 Sep 2025.",
      time: "8 Sep 2025, 10:00 AM",
    },
    {
      sender: "Pharmacy Team",
      text: "Your prescription for Paracetamol is ready for pickup.",
      time: "7 Sep 2025, 4:15 PM",
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
        <FaEnvelope /> Messages
      </h3>
      <div className="divide-y divide-gray-200">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            className="flex justify-between items-center py-4 last:border-b-0"
            variants={itemVariants}
          >
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-800">{msg.sender}</p>
              <p className="text-sm text-gray-600">{msg.text}</p>
              <p className="text-xs text-gray-400">{msg.time}</p>
            </div>
            <motion.button
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Reply
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Messages;