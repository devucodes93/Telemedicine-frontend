import React from "react";
import styles from "./Payments.module.css";
import { FaCreditCard } from "react-icons/fa";

const Payments = () => {
  const payments = [
    {
      desc: "Cardiology Consultation - 10 Sep 2025",
      amount: "₹1500",
      status: "paid",
      button: "View Details",
    },
    {
      desc: "Blood Test - 15 Aug 2025",
      amount: "₹800",
      status: "paid",
      button: "View Details",
    },
    {
      desc: "Upcoming Appointment - 15 Sep 2025",
      amount: "₹2000",
      status: "pending",
      button: "Pay Now",
    },
  ];

  return (
    <div className={styles.payments}>
      <h3>
        <FaCreditCard /> Payments
      </h3>
      {payments.map((p, idx) => (
        <div key={idx} className={styles.paymentItem}>
          <p className={styles.desc}>{p.desc}</p>
          <div className={styles.amountStatus}>
            <span className={`${styles.status} ${styles[p.status]}`}>
              {p.amount} {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
            </span>
            <button>{p.button}</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Payments;
