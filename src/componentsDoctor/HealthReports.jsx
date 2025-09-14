import React from "react";
import styles from "./HealthReports.module.css";
import { FaFileMedicalAlt } from "react-icons/fa";

const HealthReports = () => {
  const reports = [
    { name: "Blood Test Report", date: "10 Sep 2025" },
    { name: "ECG Report", date: "10 Sep 2025" },
    { name: "Annual Checkup Report", date: "20 Jun 2025" },
  ];

  return (
    <div className={styles.reports}>
      <h3><FaFileMedicalAlt /> Health Reports</h3>
      {reports.map((report, idx) => (
        <div key={idx} className={styles.reportItem}>
          <p>{report.name} - {report.date}</p>
          <button>Download</button>
        </div>
      ))}
    </div>
  );
};

export default HealthReports;
