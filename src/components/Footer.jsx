import React, { useState } from "react";
import { motion } from "framer-motion";

const Footer = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (placeholder)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add API call or further logic here
    setFormData({ name: "", email: "", message: "" });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const iconVariants = {
    hover: { scale: 1.2, rotate: 10, transition: { duration: 0.3 } },
  };

  return (
    <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-10 sm:mb-12"
          variants={sectionVariants}
        >
          Get in Touch
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left Section */}
          <motion.div
            className="flex-1"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6">
              Let's Talk
            </h2>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed mb-8 sm:mb-10">
              Have a question or need support? We're here to help. Connect with our team for assistance with appointments, technical queries, or information about our services. We are committed to providing you with clear and confidential support, just a click or call away.
            </p>

            {/* Contact Info Section */}
            <div className="space-y-4 sm:space-y-5">
              {/* Email */}
              <div className="flex items-center gap-3 sm:gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:telecure@gmail.com"
                  className="text-sm sm:text-base lg:text-lg hover:underline"
                  aria-label="Email telecure@gmail.com"
                >
                  telecure@gmail.com
                </a>
              </div>
              {/* Phone */}
              <div className="flex items-center gap-3 sm:gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+91987654321"
                  className="text-sm sm:text-base lg:text-lg hover:underline"
                  aria-label="Phone +91 987654321"
                >
                  +91 987654321
                </a>
              </div>
              {/* Location */}
              <div className="flex items-start gap-3 sm:gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="text-sm sm:text-base lg:text-lg">
                  Bengaluru, Karnataka, India
                </p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-8 sm:mt-10">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                Follow Us
              </h3>
              <div className="flex items-center gap-4 sm:gap-5">
                {/* Facebook */}
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  variants={iconVariants}
                  whileHover="hover"
                  aria-label="Follow us on Facebook"
                >
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.a>
                {/* Twitter (X) */}
                <motion.a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  variants={iconVariants}
                  whileHover="hover"
                  aria-label="Follow us on X"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </motion.a>
                {/* Instagram */}
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  variants={iconVariants}
                  whileHover="hover"
                  aria-label="Follow us on Instagram"
                >
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.326 2.633-1.301 3.608-.975.975-2.242 1.24-3.608 1.301-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.326-3.608-1.301-.975-.975-1.24-2.242-1.301-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.326-2.633 1.301-3.608.975-.975 2.242-1.24 3.608-1.301 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.453.066-2.758.353-3.778 1.373-1.02 1.02-1.307 2.325-1.373 3.778-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.066 1.453.353 2.758 1.373 3.778 1.02 1.02 2.325 1.307 3.778 1.373 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.453-.066 2.758-.353 3.778-1.373 1.02-1.02 1.307-2.325 1.373-3.778.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.066-1.453-.353-2.758-1.373-3.778-1.02-1.02-2.325-1.307-3.778-1.373-1.28-.058-1.688-.072-4.947-.072zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                  </svg>
                </motion.a>
                {/* YouTube */}
                <motion.a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  variants={iconVariants}
                  whileHover="hover"
                  aria-label="Follow us on YouTube"
                >
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.506 2.506 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.418-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418zM9.75 15.562V8.438L15.028 12 9.75 15.562z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Section - Form */}
          <motion.div
            className="flex-1 space-y-4 sm:space-y-5"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-base sm:text-lg lg:text-xl mb-1 block font-semibold"
                >
                  Your Name
                </label>
                <motion.input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full bg-emerald-50 rounded-lg p-3 sm:p-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  variants={inputVariants}
                  whileFocus="focus"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-base sm:text-lg lg:text-xl mb-1 block font-semibold"
                >
                  Your Email
                </label>
                <motion.input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full bg-emerald-50 rounded-lg p-3 sm:p-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  variants={inputVariants}
                  whileFocus="focus"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="text-base sm:text-lg lg:text-xl mb-1 block font-semibold"
                >
                  Your Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Enter your message"
                  className="w-full bg-emerald-50 rounded-lg p-3 sm:p-4 h-40 sm:h-48 text-gray-800 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  variants={inputVariants}
                  whileFocus="focus"
                  required
                  aria-required="true"
                />
              </div>
              <motion.button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full text-white font-semibold hover:from-emerald-700 hover:to-green-700 transition-all"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Submit Now
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Footer;