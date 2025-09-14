import React from "react";
import styles from "./HealthOverview.module.css";
import { FaHeartbeat, FaTachometerAlt, FaHeart, FaTint } from "react-icons/fa";

const HealthOverview = () => {
  const metrics = [
    { icon: <FaTachometerAlt />, label: "Blood Pressure", value: "120/80", unit: "mmHg", status: "normal" },
    { icon: <FaHeart />, label: "Pulse Rate", value: "72", unit: "bpm", status: "normal" },
    { icon: <FaTint />, label: "Hemoglobin Level", value: "13.5", unit: "g/dL", status: "normal" },
  ];

  return (
    <div className={styles.healthOverview}>
      <h3><FaHeartbeat /> Health Overview</h3>
      <div className={styles.metrics}>
        {metrics.map((metric, idx) => (
          <div key={idx} className={styles.metric}>
            <h4>{metric.icon} {metric.label}</h4>
            <div className={styles.circleProgress}>
              <svg>
                <circle className={styles.background} cx="50" cy="50" r="46"></circle>
                <circle className={styles.progress} cx="50" cy="50" r="46" strokeDasharray="289.026" strokeDashoffset="72.257"></circle>
              </svg>
              <div className={styles.value}>{metric.value}</div>
            </div>
            <p>{metric.unit} <span className={`${styles.status} ${styles[metric.status]}`}>{metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthOverview;
