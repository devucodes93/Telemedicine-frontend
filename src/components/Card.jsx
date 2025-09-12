import React from "react";

const Card = ({ id, svg, Icon, service }) => {
  return (
    <div
      className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md border border-gray-300 
      hover:scale-105 transition-transform duration-300 
      hover:bg-gradient-to-tr from-indigo-600 via-blue-500 to-cyan-400 
      text-black font-semibold hover:shadow-lg w-full max-w-xs sm:max-w-sm h-auto py-6 px-4"
    >
      {/* Card ID */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
        {id}
      </h1>

      {/* Service Icon */}
      {svg && (
        <img
          src={svg}
          alt={service}
          className="h-32 sm:h-36 md:h-40 w-32 sm:w-36 md:w-40 mt-4 object-contain"
        />
      )}
      {Icon && (
        <Icon className="h-32 sm:h-36 md:h-40 w-32 sm:w-36 md:w-40 mt-4 text-black" />
      )}

      {/* Service Name */}
      <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold mt-4 text-center">
        {service}
      </h2>
    </div>
  );
};

export default Card;
