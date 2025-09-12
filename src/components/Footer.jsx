import React from 'react';

const Footer = () => {
  return (
    <div className="bg-blue-400 text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-20 py-20">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center">Get in touch</h1>
        
        <div className="flex flex-col lg:flex-row mt-16 gap-10">
          
          {/* Left Section */}
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">Let's talk</h2>
            <p className="text-sm sm:text-base lg:text-lg">
              I'm currently available to take on new projects, so feel free to send me a message about anything that you want me to work on. You can contact anytime. Feel free to reach out for any inquiries, collaborations, or just to say hello!
            </p>
          </div>
          
          {/* Right Section - Form */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-lg sm:text-xl mb-1">Your name</h3>
              <input 
                placeholder="Enter your user name" 
                className="w-full bg-gray-700 rounded p-3 sm:p-4 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl mb-1">Your email</h3>
              <input 
                placeholder="Enter your email" 
                className="w-full bg-gray-700 rounded p-3 sm:p-4 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl mb-1">Write your message here</h3>
              <textarea 
                placeholder="Enter your message" 
                className="w-full bg-gray-700 rounded p-3 sm:p-4 h-40 sm:h-48 mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="px-5 py-3 bg-gradient-to-r from-indigo-700 via-blue-500 to-cyan-300 rounded-full hover:scale-105 transition-transform">
              Submit Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Footer;
