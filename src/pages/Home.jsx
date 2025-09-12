import React from "react";
import Footer from "../components/Footer";
import Faq from "../components/Faq";

const Home = () => {
  return (
    <div className="bg-white text-gray-700">
      {/* Hero Section */}
      <div className="relative bg-[url('/assets/banner-image.jpg')] bg-cover bg-center min-h-screen flex flex-col justify-center">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-10 lg:px-20 text-center sm:text-left flex flex-col gap-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-snug sm:leading-tight drop-shadow-lg">
            Welcome to Our Telecure Platform
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-full sm:max-w-2xl leading-relaxed sm:leading-loose drop-shadow-md">
            Connecting you to quality healthcare from the comfort of your home.
            Experience seamless virtual consultations with our expert medical
            professionals. Your health, our priority. Join us today and take the
            first step towards convenient and accessible healthcare.
          </p>
          <button className="mt-4 sm:mt-6 bg-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-blue-600 hover:scale-105 transition-transform duration-300 shadow-lg w-40 sm:w-44">
            Get Started
          </button>
        </div>
      </div>

      {/* Gradient Overlay at bottom */}
      <div className="w-full h-32 bg-gradient-to-t from-white to-transparent"></div>

      {/* FAQ Section */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center mt-16 mb-8">
        Frequently Asked Questions
      </h2>
      <div className="px-5 sm:px-10 lg:px-20">
        <Faq />
      </div>

      {/* Footer Section */}
      <footer className="bg-blue-500 text-white text-center mt-16">
        <Footer />
        <p className="mt-4 text-sm sm:text-base">
          &copy; {new Date().getFullYear()} Telecure. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
