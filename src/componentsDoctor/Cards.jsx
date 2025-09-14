import React from "react";
import styles from "./Cards.module.css";
import { FaCalendarAlt, FaPrescription, FaFileMedicalAlt } from "react-icons/fa";

const Cards = () => {
  return (
    <div className={styles.cards}>
      <div className={styles.card}>
        <h3><FaCalendarAlt /> Upcoming Appointment</h3>
        <p>Dr. Sharma (Cardiologist)</p>
        <p>15 Sep 2025 - 10:30 AM</p>
        <button>Join Call</button>
      </div>

      <div className={styles.card}>
        <h3><FaPrescription /> Prescriptions</h3>
        <p>Paracetamol <span style={{color: '#10b981'}}>✔</span></p>
        <p>Amoxicillin <span style={{color: '#ef4444'}}>✖</span></p>
      </div>

      <div className={styles.card}>
        <h3><FaFileMedicalAlt /> Health Records</h3>
        <p>Last Consultation: 10 Sep 2025</p>
        <p>Blood Test Report Available</p>
      </div>
    </div>
  );
};

export default Cards;
