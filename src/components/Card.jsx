import React from "react";
import { FiArrowRight } from "react-icons/fi"; // Importing an arrow icon for the button

const Card = ({ id, svg, Icon, service, description }) => {
  return (
    <div
      // Added "group" to control child element styles on hover (e.g., text color)
      // Added "relative" to position the ID number
      className="group relative flex flex-col items-center justify-start bg-white rounded-2xl shadow-md border border-gray-200 
      hover:-translate-y-1.5 transition-all duration-300 
      hover:bg-gradient-to-tr from-indigo-600 via-blue-500 to-cyan-400 
      hover:text-white hover:shadow-xl w-full max-w-xs h-[400px] p-6 text-center"
    >
      {/* Card ID - Made smaller and positioned at the top-right for a subtle, professional look */}
      <h1 className="absolute top-4 right-6 text-2xl font-bold text-gray-200 group-hover:text-blue-200 transition-colors">
        {id}
      </h1>

      {/* Service Icon or SVG */}
      <div className="mt-8">
        {svg && (
          <img
            src={svg}
            alt={service}
            className="h-28 w-28 object-contain"
          />
        )}
        {Icon && (
          // Icon color now changes to white on hover
          <Icon className="h-28 w-28 text-blue-500 group-hover:text-white transition-colors" />
        )}
      </div>

      {/* Service Name - Main title of the card */}
      <h2 className="text-xl font-bold mt-6 text-gray-800 group-hover:text-white">
        {service}
      </h2>

      {/* NEW: Service Description */}
      <p className="text-sm text-gray-600 mt-2 flex-grow group-hover:text-gray-100">
        {description}
      </p>
      
      {/* NEW: "Book Now" Button - Appears on hover */}
      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="flex items-center gap-2 font-semibold text-white">
          Book Now <FiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Card;