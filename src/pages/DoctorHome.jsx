import React from "react";
import Footer from "../components/Footer";
import Faq from "../components/Faq";
import Sidebar from "../componentsDoctor/Sidebar";
import DoctorUpdate from "./DoctorUpdate";
import Me from "../components/Me";

const DoctorHome = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-white p-8">
        <div className="flex justify-end mb-6 gap-4">
          <DoctorUpdate />
          <Me compact={true} showDropdown={true} />
        </div>
        {/* Doctor-specific Hero Section */}
        <div className="relative bg-[url('/assets/banner-image.jpg')] bg-cover bg-center min-h-[300px] flex flex-col justify-center rounded-xl mb-8">
          <div className="absolute inset-0 bg-black/40 rounded-xl"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-10 lg:px-20 text-center sm:text-left flex flex-col gap-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-snug sm:leading-tight drop-shadow-lg">
              Welcome Doctor!
            </h1>
            <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-full sm:max-w-2xl leading-relaxed sm:leading-loose drop-shadow-md">
              Manage your appointments, view patient requests, and update your
              profile here.
            </p>
          </div>
        </div>
        {/* Add doctor-specific dashboard, appointments, etc. here */}
        <section className="py-8 bg-gray-100 rounded-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-700 mb-4">
              Doctor Dashboard
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              All your tools and information in one place.
            </p>
            {/* Add more doctor-specific features here */}
          </div>
        </section>
        <Faq />
        <Footer />
      </div>
    </div>
  );
};

export default DoctorHome;
