import React from "react";
import styles from "./Overview.module.css";
import { FaUser, FaVenusMars, FaIdCard, FaCalendarCheck } from "react-icons/fa";

const Overview = () => {
  const cards = [
    { icon: <FaUser />, label: "Age", value: "42" },
    { icon: <FaVenusMars />, label: "Gender", value: "Male" },
    { icon: <FaIdCard />, label: "Patient ID", value: "PAT-0925" },
    { icon: <FaCalendarCheck />, label: "Last Visit", value: "10 Sep 2025" },
  ];

  return (
    <div className={styles.overview}>
      {cards.map((card, idx) => (
        <div key={idx} className={styles.card}>
          <h4>{card.icon} {card.label}</h4>
          <p>{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Overview;
