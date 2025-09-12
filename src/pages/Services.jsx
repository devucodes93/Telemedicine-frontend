import React from "react";
import Card from "../components/Card";
import { FiSettings } from "react-icons/fi";

const Services = () => {
  return (
    <div className="text-gray-700 bg-blue-100 py-16 sm:py-20 px-4 sm:px-10 lg:px-20">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center">
        Our Services
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-12 sm:pt-16">
        <Card id="01" svg="/assets/video.svg" service="TELE-CONSULTATION" />
        <Card id="02" svg="/assets/prescription.svg" service="e-PRESCRIPTION" />
        <Card id="03" svg="/assets/report.svg" service="REPORTS" />
        <Card id="04" svg="/assets/ai.svg" service="AI SYMPTOM CHECKER" />
        <Card id="05" svg="/assets/medicine.svg" service="BUY MEDICINE" />
        <Card
          id="06"
          Icon={FiSettings}
          service="Service-06"
        />
      </div>
    </div>
  );
};

export default Services;
