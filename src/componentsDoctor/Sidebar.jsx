import React from "react";
import { useNavigate } from "react-router-dom";
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
  return (
    <div className={styles.sidebar}>
      <div className="py-6 px-4 text-center border-b border-gray-200">
        <span className="text-2xl font-bold text-blue-700 tracking-wide">
          Doctor Dashboard
        </span>
      </div>
      <ul className="mt-6 space-y-2">
        <li
          className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 rounded-lg cursor-pointer"
          onClick={() => navigate("/doctor")}
        >
          <FaHome /> <span>Home</span>
        </li>
        <li
          className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 rounded-lg cursor-pointer"
          onClick={() => navigate("/appointments")}
        >
          <FaCalendarAlt /> <span>Appointments</span>
        </li>
        <li className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 rounded-lg cursor-pointer">
          <FaFileMedical /> <span>Health Records</span>
        </li>
        <li className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 rounded-lg cursor-pointer">
          <FaPrescriptionBottle /> <span>Pharmacy</span>
        </li>
        <li className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 rounded-lg cursor-pointer">
          <FaHeadset /> <span>Support</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
