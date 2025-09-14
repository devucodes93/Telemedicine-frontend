import React from "react";
import styles from "./Messages.module.css";
import { FaEnvelope } from "react-icons/fa";

const Messages = () => {
  const messages = [
    { sender: "Dr. Sharma", text: "Your blood test results are available. Please review.", time: "10 Sep 2025, 2:30 PM" },
    { sender: "Clinic Support", text: "Reminder: Your appointment is scheduled for 15 Sep 2025.", time: "8 Sep 2025, 10:00 AM" },
    { sender: "Pharmacy Team", text: "Your prescription for Paracetamol is ready for pickup.", time: "7 Sep 2025, 4:15 PM" },
  ];

  return (
    <div className={styles.messages}>
      <h3><FaEnvelope /> Messages</h3>
      {messages.map((msg, idx) => (
        <div key={idx} className={styles.messageItem}>
          <div className={styles.content}>
            <p className={styles.sender}>{msg.sender}</p>
            <p>{msg.text}</p>
            <p className={styles.timestamp}>{msg.time}</p>
          </div>
          <button>Reply</button>
        </div>
      ))}
    </div>
  );
};

export default Messages;
