import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const CallPageLoad = () => {
  const { id } = useParams();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const elementVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-2xl sm:text-3xl font-bold mb-4 text-emerald-600"
        variants={elementVariants}
      >
        Video Call Room
      </motion.h1>
      <motion.div
        className="mb-4 text-base sm:text-lg text-gray-700"
        variants={elementVariants}
      >
        Call ID: <span className="font-mono text-emerald-500">{id}</span>
      </motion.div>
      {/* Placeholder for video call UI */}
      <motion.div
        className="w-full max-w-2xl h-80 sm:h-96 bg-white rounded-xl shadow-md flex items-center justify-center"
        variants={elementVariants}
      >
        <span className="text-gray-500 text-sm sm:text-base">
          Video call will appear here
        </span>
      </motion.div>
    </motion.div>
  );
};

export default CallPageLoad;