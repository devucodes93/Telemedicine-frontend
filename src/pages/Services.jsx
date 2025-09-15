import React from "react";
import Card from "../components/Card";
// Icons for the "How It Works" section
import { FiSettings, FiList, FiPhoneCall, FiFileText } from "react-icons/fi";

// A new component for the "How It Works" steps for clarity
const HowItWorksStep = ({ Icon, number, title, description }) => {
  return (
    <div className="text-center flex flex-col items-center">
      <div className="flex items-center justify-center w-20 h-20 bg-blue-200 text-blue-600 rounded-full mb-4">
        <Icon className="w-10 h-10" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-xs">{description}</p>
    </div>
  );
};


const Services = () => {
  return (
    // The main container for the page
    <div>
      {/* 1. Hero Section - Welcomes the user */}
      <section className="text-center py-20 px-4 sm:px-10 lg:px-20 bg-white">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-600">
          Quality Healthcare, From Your Home
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Get medical help from trusted doctors without the need to travel. It's simple, safe, and secure.
        </p>
      </section>

      {/* 2. Our Services Section - Your original card grid */}
      <section className="text-gray-700 bg-blue-100 py-20 px-4 sm:px-10 lg:px-20">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">What We Offer</h2>
          <p className="mt-2 text-gray-600">Choose the help you need from the services below.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-16 max-w-5xl mx-auto">
          <Card id="01" svg="/assets/video.svg" service="TELE-CONSULTATION" />
          <Card id="02" svg="/assets/prescription.svg" service="e-PRESCRIPTION" />
          <Card id="03" svg="/assets/report.svg" service="REPORTS" />
          <Card id="04" svg="/assets/ai.svg" service="AI SYMPTOM CHECKER" />
          <Card id="05" svg="/assets/medicine.svg" service="BUY MEDICINE" />
          <Card
            id="06"
            Icon={FiSettings} // Using an icon for the last card
            service="Service-06"
          />
        </div>
      </section>

      {/* 3. How It Works Section - A simple guide */}
      <section className="py-20 px-4 sm:px-10 lg:px-20 bg-white">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Get Help in 3 Simple Steps</h2>
          <p className="mt-2 text-gray-600">We have made the process very easy for you.</p>
        </div>

        <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
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
      </section>

      {/* 4. Call to Action (CTA) - The final prompt */}
      <section className="bg-blue-600 py-20 px-4 text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Ready to Get the Care You Need?
        </h2>
        <p className="mt-4 max-w-xl mx-auto">
          Don't wait. Our doctors are available to help you feel better.
        </p>
        <button className="mt-8 px-10 py-3 bg-white text-blue-600 font-bold rounded-full text-lg hover:bg-gray-200 transition-colors duration-300">
          Book an Appointment
        </button>
      </section>
    </div>
  );
};

export default Services;