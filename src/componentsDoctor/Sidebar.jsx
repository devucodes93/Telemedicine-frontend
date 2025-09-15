import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../context/TranslationContext";
import styles from "./Sidebar.module.css";
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
  return (
    <div
      className={styles.sidebar}
      style={{
        background: theme === "dark" ? "#1f2937" : "#fff", // Tailwind gray-800 and white
        color: theme === "dark" ? "#f3f4f6" : "#111827", // Tailwind gray-100 and gray-900
      }}
    >
      <div
        className="py-6 px-4 text-center border-b"
        style={{ borderColor: theme === "dark" ? "#374151" : "#e5e7eb" }} // Tailwind gray-700 and gray-200
      >
        <span
          className="text-2xl font-bold tracking-wide"
          style={{ color: theme === "dark" ? "#60a5fa" : "#2563eb" }} // Tailwind blue-400 and blue-700
        >
          {t("doctorDashboard")}
        </span>
      </div>
      <ul className="mt-6 space-y-2">
        <li
          className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer"
          style={{
            background: "transparent",
            color: theme === "dark" ? "#f3f4f6" : "#111827",
          }}
          onClick={() => navigate("/doctor")}
          onMouseOver={(e) =>
            (e.currentTarget.style.background =
              theme === "dark" ? "#1e293b" : "#eff6ff")
          }
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <FaHome /> <span>Home</span>
        </li>
        <li
          className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer"
          style={{
            background: "transparent",
            color: theme === "dark" ? "#f3f4f6" : "#111827",
          }}
          onClick={() => navigate("/appointments")}
          onMouseOver={(e) =>
            (e.currentTarget.style.background =
              theme === "dark" ? "#1e293b" : "#eff6ff")
          }
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <FaCalendarAlt /> <span>Appointments</span>
        </li>
        <li
          className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer"
          style={{
            background: "transparent",
            color: theme === "dark" ? "#f3f4f6" : "#111827",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background =
              theme === "dark" ? "#1e293b" : "#eff6ff")
          }
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <FaFileMedical /> <span>Health Records</span>
        </li>
        <li
          className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer"
          style={{
            background: "transparent",
            color: theme === "dark" ? "#f3f4f6" : "#111827",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background =
              theme === "dark" ? "#1e293b" : "#eff6ff")
          }
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <FaPrescriptionBottle /> <span>Pharmacy</span>
        </li>
        <li
          className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer"
          style={{
            background: "transparent",
            color: theme === "dark" ? "#f3f4f6" : "#111827",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background =
              theme === "dark" ? "#1e293b" : "#eff6ff")
          }
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <FaHeadset /> <span>Support</span>
        </li>
      </ul>
      {/* Language dropdown at bottom */}
      <div className="mt-8 px-4">
        <label
          htmlFor="sidebar-language-select"
          className="block mb-2 text-sm font-semibold"
          style={{ color: theme === "dark" ? "#60a5fa" : "#2563eb" }} // Tailwind blue-400 and blue-700
        >
          {t("changeLanguage")}
        </label>
        <select
          id="sidebar-language-select"
          value={language}
          onChange={handleLanguageChange}
          className="w-full px-2 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{
            background: theme === "dark" ? "#1f2937" : "#fff",
            color: theme === "dark" ? "#f3f4f6" : "#111827",
            borderColor: theme === "dark" ? "#374151" : "#d1d5db", // Tailwind gray-700 and gray-300
          }}
        >
          {languageOptions.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
