import React from "react";
import styles from "./PatientHistory.module.css";
import { FaHistory } from "react-icons/fa";

const PatientHistory = () => {
  const history = [
    { date: "10 Sep 2025", title: "Cardiology Consultation", desc: "Consulted Dr. Sharma for chest pain. Prescribed Paracetamol." },
    { date: "15 Aug 2025", title: "Blood Test", desc: "Conducted routine blood test. Results normal." },
    { date: "20 Jun 2025", title: "General Checkup", desc: "Annual checkup with Dr. Patel. No major issues reported." },
  ];

  return (
    <div className={styles.history}>
      <h3><FaHistory /> Patient History</h3>
      <div className={styles.timeline}>
        {history.map((item, idx) => (
          <div key={idx} className={styles.item}>
            <h4>{item.date} - {item.title}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientHistory;
