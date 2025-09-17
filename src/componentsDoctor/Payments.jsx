import React from "react";
import { motion } from "framer-motion";
import { FaCreditCard } from "react-icons/fa";

const Payments = () => {
  const payments = [
    {
      desc: "Cardiology Consultation - 10 Sep 2025",
      amount: "₹1500",
      status: "paid",
      button: "View Details",
    },
    {
      desc: "Blood Test - 15 Aug 2025",
      amount: "₹800",
      status: "paid",
      button: "View Details",
    },
    {
      desc: "Upcoming Appointment - 15 Sep 2025",
      amount: "₹2000",
      status: "pending",
      button: "Pay Now",
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
        <FaCreditCard /> Payments
      </h3>
      <div className="divide-y divide-gray-200">
        {payments.map((p, idx) => (
          <motion.div
            key={idx}
            className="flex justify-between items-center py-4 last:border-b-0"
            variants={itemVariants}
          >
            <p className="flex-2 text-sm text-gray-600">{p.desc}</p>
            <div className="flex-1 flex justify-end items-center gap-4">
              <span
                className={`font-medium ${
                  p.status === "paid" ? "text-emerald-500" : "text-yellow-500"
                }`}
              >
                {p.amount} {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
              </span>
              <motion.button
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {p.button}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Payments;