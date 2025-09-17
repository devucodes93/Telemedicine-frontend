import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const Card = ({ id, svg, Icon, service, description }) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: {
      y: -6,
      scale: 1.03,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
      background: "linear-gradient(to top right, #059669, #10b981, #34d399)",
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="group relative flex flex-col items-center justify-start bg-white rounded-2xl shadow-md border border-emerald-200 w-full max-w-xs h-[400px] p-6 text-center"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
    >
      {/* Card ID */}
      <h1 className="absolute top-4 right-6 text-xl sm:text-2xl font-bold text-gray-200 group-hover:text-emerald-200 transition-colors">
        {id}
      </h1>

      {/* Service Icon or SVG */}
      <div className="mt-8">
        {svg && (
          <img
            src={svg}
            alt={service}
            className="h-24 sm:h-28 w-24 sm:w-28 object-contain"
          />
        )}
        {Icon && (
          <Icon className="h-24 sm:h-28 w-24 sm:w-28 text-emerald-500 group-hover:text-white transition-colors" />
        )}
      </div>

      {/* Service Name */}
      <h2 className="text-lg sm:text-xl font-bold mt-6 text-gray-800 group-hover:text-white">
        {service}
      </h2>

      {/* Service Description */}
      <p className="text-sm sm:text-base text-gray-600 mt-2 flex-grow group-hover:text-gray-100">
        {description}
      </p>
    </motion.div>
  );
};

export default Card;