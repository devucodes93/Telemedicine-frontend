import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Nav = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleUser = () => {
    navigate("/me");
  };
  const handleLogo = () => {
    navigate("/");
  };

  return (
    <nav className="bg-blue-500 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-20 flex justify-between items-center h-20">
        {/* Logo */}
        <div className="flex flex-col items-center cursor-pointer justify-center " onClick={handleLogo}>
          <img src="/assets/logo4.svg" alt="Logo" className="h-10 sm:h-12 w-10 sm:w-12" />
          <span className="text-xs sm:text-sm">Care Meets Convenience</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 sm:gap-10 items-center text-base sm:text-lg font-medium">
          <li>
            <Link to="/" className="hover:text-gray-200 transition-colors">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-200 transition-colors">About</Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-gray-200 transition-colors">Services</Link>
          </li>
          <li>
            <Link to="/signup" className="hover:text-gray-200 transition-colors">Sign Up</Link>
          </li>
        </ul>

        {/* User Icon + Mobile Hamburger */}
        <div className="flex items-center gap-4">
          <img
            onClick={handleUser}
            src="/assets/user3.svg"
            alt="User"
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full cursor-pointer border-2 border-white"
          />

          {/* Hamburger button */}
          <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 sm:w-72 h-full bg-blue-500 shadow-xl transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)} className="focus:outline-none">
            <X size={28} />
          </button>
        </div>

        {/* Sidebar Menu */}
        <ul className="flex flex-col items-start gap-6 p-6 text-lg font-medium">
          <li>
            <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-gray-200 transition-colors">Home</Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-gray-200 transition-colors">About</Link>
          </li>
          <li>
            <Link to="/services" onClick={() => setIsOpen(false)} className="hover:text-gray-200 transition-colors">Services</Link>
          </li>
          <li>
            <Link to="/signup" onClick={() => setIsOpen(false)} className="hover:text-gray-200 transition-colors">Sign Up</Link>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Nav;
