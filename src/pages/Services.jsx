import React from "react";
import { FiSettings, FiList, FiPhoneCall, FiFileText } from "react-icons/fi";
import { motion } from "framer-motion";
import Card from "../components/Card";

// A new component for the "How It Works" steps for clarity
const HowItWorksStep = ({ Icon, title, description }) => {
  return (
    <motion.div
      className="text-center flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-emerald-100 text-emerald-600 rounded-full mb-4">
        <Icon className="w-8 sm:w-10 h-8 sm:h-10" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm sm:text-base max-w-xs">{description}</p>
    </motion.div>
  );
};

const Services = () => {
  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Animation variants for button
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <div>
      {/* 1. Hero Section - Welcomes the user */}
      <motion.section
        className="text-center py-16 sm:py-20 px-4 sm:px-10 lg:px-20 bg-gradient-to-br from-emerald-50 to-green-50"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-600">
          Quality Healthcare, From Your Home
        </h1>
        <p className="mt-4 text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
          Get medical help from trusted doctors without the need to travel. It's simple, safe, and secure.
        </p>
      </motion.section>

      {/* 2. Our Services Section - Your original card grid */}
      <motion.section
        className="text-gray-700 bg-emerald-100 py-16 sm:py-20 px-4 sm:px-10 lg:px-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">What We Offer</h2>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">Choose the help you need from the services below.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-12 sm:pt-16 max-w-5xl mx-auto">
          <Card
            id="01"
            svg="/assets/video.svg"
            service="TELE-CONSULTATION"
            description="Connect with doctors via video or audio calls for expert medical advice."
          />
          <Card
            id="02"
            svg="/assets/prescription.svg"
            service="e-PRESCRIPTION"
            description="Receive digital prescriptions instantly after your consultation."
          />
          <Card
            id="03"
            svg="/assets/report.svg"
            service="REPORTS"
            description="Access and manage your medical reports securely online."
          />
          <Card
            id="04"
            svg="/assets/ai.svg"
            service="AI SYMPTOM CHECKER"
            description="Use our AI tool to assess symptoms and get preliminary guidance."
          />
          <Card
            id="05"
            svg="/assets/medicine.svg"
            service="BUY MEDICINE"
            description="Order medications from nearby pharmacies with ease."
          />
          <Card
            id="06"
            Icon={FiSettings}
            service="HEALTH TOOLS"
            description="Explore additional tools for managing your health and wellness."
          />
        </div>
      </motion.section>

      {/* 3. How It Works Section - A simple guide */}
      <motion.section
        className="py-16 sm:py-20 px-4 sm:px-10 lg:px-20 bg-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">Get Help in 3 Simple Steps</h2>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">We have made the process very easy for you.</p>
        </div>

        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          <HowItWorksStep
            Icon={FiList}
            title="1. Choose a Service"
            description="Select the type of medical help you need from our list of services."
          />
          <HowItWorksStep
            Icon={FiPhoneCall}
            title="2. Talk to the Doctor"
            description="Connect with a qualified doctor through a secure video or phone call."
          />
          <HowItWorksStep
            Icon={FiFileText}
            title="3. Get Your Prescription"
            description="Receive your digital prescription and medical advice right on your phone."
          />
        </div>
      </motion.section>

      {/* 4. Call to Action (CTA) - The final prompt */}
      <motion.section
        className="bg-gradient-to-r from-emerald-600 to-green-600 py-16 sm:py-20 px-4 text-center text-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Ready to Get the Care You Need?
        </h2>
        <p className="mt-4 text-sm sm:text-base max-w-xl mx-auto">
          Don't wait. Our doctors are available to help you feel better.
        </p>
        <motion.button
          className="mt-8 px-8 sm:px-10 py-3 bg-white text-emerald-600 font-bold rounded-full text-base sm:text-lg hover:bg-emerald-50 transition-colors duration-300"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Book an Appointment
        </motion.button>
      </motion.section>
    </div>
  );
};

export default Services;