import React from "react";
import { FiUsers, FiClock, FiCpu, FiFileText, FiDollarSign, FiGlobe } from "react-icons/fi";

const ImpactCard = ({ title, description, Icon }) => (
  <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md border-2 border-gray-200 hover:scale-105 transition-transform duration-300 h-80 w-72 p-5 text-center">
    {Icon && <Icon className="h-16 w-16 mb-4 text-blue-500" />}
    <h2 className="text-2xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const About = () => {
  return (
    <div className="text-gray-700">
      {/* Mission Section */}
      <section className="flex flex-col bg-[url('/assets/ourmission.jpg')] bg-cover bg-center px-5 sm:px-10 lg:px-20 py-20 gap-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center text-gray-700">
          Our Mission
        </h1>
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-10">
          <p className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl font-normal lg:w-1/2">
            At Telecure, our mission is to revolutionize healthcare by providing accessible, convenient, and high-quality telemedicine services...
          </p>
          <img
            src="/assets/rural.jpg"
            alt="Our Mission"
            className="h-64 sm:h-80 md:h-96 w-full lg:w-1/2 rounded-lg shadow-md mt-6 lg:mt-0 object-cover"
          />
        </div>
      </section>

      {/* Vision Section */}
      <section className="flex flex-col lg:flex-row items-center gap-10 px-5 sm:px-10 lg:px-20 py-20">
        <img
          src="/assets/telemed.jpg"
          alt="Our Vision"
          className="h-64 sm:h-80 md:h-96 w-full lg:w-1/2 rounded-lg shadow-md object-cover"
        />
        <div className="lg:w-1/2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-700 mb-6 text-center lg:text-left">
            Our Vision
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl font-normal">
            Our vision at Telecure is to be a global leader in telemedicine, transforming the way healthcare is delivered and experienced...
          </p>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="flex flex-col items-center justify-center bg-blue-200 py-20 px-5 sm:px-10 lg:px-20 rounded-b-2xl shadow-md gap-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-center">
          How it Works
        </h1>
        <video
          src="/assets/howitworks.mp4"
          controls
          className="h-64 sm:h-80 md:h-96 w-full lg:w-3/4 rounded-lg shadow-md"
        />
      </section>

      {/* Impact Section */}
      <section className="py-20 px-5 sm:px-10 lg:px-20 bg-gray-100">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-center mb-16">
          Impact
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <ImpactCard
            title="Rural Healthcare"
            description="Providing access to medical services in remote and underserved areas."
            Icon={FiUsers}
          />
          <ImpactCard
            title="Time Saving"
            description="Patients save travel time and consult doctors virtually."
            Icon={FiClock}
          />
          <ImpactCard
            title="AI Assistance"
            description="Leverage AI symptom checker to get faster preliminary diagnosis."
            Icon={FiCpu}
          />
          <ImpactCard
            title="Digital Records"
            description="All patient reports and prescriptions are securely stored online."
            Icon={FiFileText}
          />
          <ImpactCard
            title="Affordable Care"
            description="Reducing healthcare costs by minimizing unnecessary visits."
            Icon={FiDollarSign}
          />
          <ImpactCard
            title="Global Reach"
            description="Connecting patients with top doctors irrespective of location."
            Icon={FiGlobe}
          />
        </div>
      </section>
    </div>
  );
};

export default About;
