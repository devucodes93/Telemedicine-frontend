import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../context/TranslationContext";
import { motion } from "framer-motion";
import {
  FaHome,
  FaCalendarAlt,
  FaFileMedical,
  FaPrescriptionBottle,
  FaHeadset,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { language, setLanguage, t } = useTranslation();

  // Language options
  const languageOptions = [
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
    { code: "pa", label: "Punjabi" },
    { code: "kn", label: "Kannada" },
    { code: "ta", label: "Tamil" },
    { code: "te", label: "Telugu" },
    { code: "mr", label: "Marathi" },
    { code: "gu", label: "Gujarati" },
    { code: "bn", label: "Bengali" },
    { code: "ml", label: "Malayalam" },
    { code: "or", label: "Odia" },
    { code: "as", label: "Assamese" },
    { code: "ur", label: "Urdu" },
  ];

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    localStorage.setItem("siteLanguage", lang);
    window.location.reload();
  };

  // Animation variants
  const sidebarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const selectVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className={`w-64 h-screen fixed p-5 shadow-lg ${
        theme === "dark"
          ? "bg-gray-800 text-gray-100"
          : "bg-gradient-to-b from-emerald-50 to-green-50 text-gray-900"
      } transition-all duration-300`}
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      <div
        className={`py-6 px-4 text-center border-b ${
          theme === "dark" ? "border-gray-700" : "border-emerald-200"
        }`}
      >
        <span
          className={`text-2xl font-bold tracking-wide ${
            theme === "dark" ? "text-emerald-400" : "text-emerald-600"
          }`}
        >
          {t("doctorDashboard")}
        </span>
      </div>
      <ul className="mt-6 space-y-2">
        {[
          { icon: <FaHome />, label: "Home", path: "/doctor" },
          { icon: <FaCalendarAlt />, label: "Appointments", path: "/appointments" },
          { icon: <FaFileMedical />, label: "Health Records", path: "#" },
          { icon: <FaPrescriptionBottle />, label: "Pharmacy", path: "#" },
          { icon: <FaHeadset />, label: "Support", path: "#" },
        ].map((item, idx) => (
          <motion.li
            key={idx}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer ${
              theme === "dark"
                ? "hover:bg-gray-700 text-gray-100"
                : "hover:bg-emerald-100 text-gray-900"
            } transition-all duration-300`}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            onClick={() => item.path !== "#" && navigate(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </motion.li>
        ))}
      </ul>
      {/* Language dropdown at bottom */}
      <motion.div
        className="mt-8 px-4"
        variants={selectVariants}
        initial="hidden"
        animate="visible"
      >
        <label
          htmlFor="sidebar-language-select"
          className={`block mb-2 text-sm font-semibold ${
            theme === "dark" ? "text-emerald-400" : "text-emerald-600"
          }`}
        >
          {t("changeLanguage")}
        </label>
        <select
          id="sidebar-language-select"
          value={language}
          onChange={handleLanguageChange}
          className={`w-full px-2 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 ${
            theme === "dark"
              ? "bg-gray-800 text-gray-100 border-gray-700"
              : "bg-white text-gray-900 border-emerald-200"
          }`}
        >
          {languageOptions.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.label}
            </option>
          ))}
        </select>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;