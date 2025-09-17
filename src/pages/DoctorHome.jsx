import React from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Faq from "../components/Faq";
import Sidebar from "../componentsDoctor/Sidebar";
import DoctorUpdate from "./DoctorUpdate";
import Me from "../components/Me";

const DoctorHome = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const heroVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  return (
    <motion.div
      className="flex min-h-screen bg-emerald-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Sidebar />
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <motion.div
          className="flex justify-end mb-6 gap-4"
          variants={textVariants}
        >
          <DoctorUpdate />
          <Me compact={true} showDropdown={true} />
        </motion.div>
        {/* Doctor-specific Hero Section */}
        <motion.div
          className="relative bg-[url('/assets/banner-image.jpg')] bg-cover bg-center min-h-[300px] flex flex-col justify-center rounded-xl mb-8"
          variants={heroVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/60 to-green-600/60 rounded-xl"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col gap-4 sm:gap-6">
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-snug sm:leading-tight drop-shadow-lg"
              variants={textVariants}
            >
              Welcome Doctor!
            </motion.h1>
            <motion.p
              className="text-white text-sm sm:text-base md:text-lg lg:text-xl max-w-full sm:max-w-2xl leading-relaxed sm:leading-loose drop-shadow-md"
              variants={textVariants}
            >
              Manage your appointments, view patient requests, and update your profile here.
            </motion.p>
          </div>
        </motion.div>
        {/* Doctor-specific Dashboard Section */}
        <motion.section
          className="py-8 bg-emerald-100 rounded-xl"
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4"
              variants={textVariants}
            >
              Doctor Dashboard
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg text-gray-600 mb-8"
              variants={textVariants}
            >
              All your tools and information in one place.
            </motion.p>
            {/* Add more doctor-specific features here */}
          </div>
        </motion.section>
        <Faq />
        <Footer />
      </div>
    </motion.div>
  );
};

export default DoctorHome;