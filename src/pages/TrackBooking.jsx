import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useSocketStore from "../store/socketStore";

const TrackBooking = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const { joinVideo } = useSocketStore();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`http://localhost:5000/api/booking/booking?patientId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) setBooking(data);
        else setBooking(null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    // Only run once on mount
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  if (loading) {
    return (
      <motion.div
        className="p-8 text-center text-gray-600"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        Loading...
      </motion.div>
    );
  }

  if (!booking) {
    return (
      <motion.div
        className="p-8 text-center text-gray-600"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        No booking found.
      </motion.div>
    );
  }

  return (
    <motion.div
      className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 mt-8 sm:mt-10 bg-gradient-to-br from-emerald-50 to-green-50 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-2xl sm:text-3xl font-bold mb-4 text-emerald-600"
        variants={textVariants}
      >
        Track Your Booking
      </motion.h2>
      <div className="space-y-3 text-base sm:text-lg text-gray-700">
        <motion.div variants={textVariants}>
          <strong>Doctor Name:</strong> {booking.doctorName}
        </motion.div>
        <motion.div variants={textVariants}>
          <strong>Specialization:</strong> {booking.doctorSpecialization}
        </motion.div>
        <motion.div variants={textVariants}>
          <strong>Experience:</strong> {booking.doctorExperience} years
        </motion.div>
        <motion.div variants={textVariants}>
          <strong>Fee:</strong> ₹{booking.fee}
        </motion.div>
        <motion.div variants={textVariants}>
          <strong>Date:</strong> {booking.date}
        </motion.div>
        <motion.div variants={textVariants}>
          <strong>Time:</strong> {booking.reservedTime || "Pending"}
        </motion.div>
        <motion.div variants={textVariants}>
          <strong>Status:</strong>{" "}
          {booking.status === "accepted" ? (
            <span className="text-emerald-600 font-semibold">
              Accepted by Doctor
            </span>
          ) : (
            <span className="text-yellow-500 font-semibold">
              Waiting for Doctor to Accept
            </span>
          )}
        </motion.div>
        {booking.reservedTime && (
          <motion.div variants={textVariants}>
            <strong>Meeting Link:</strong>{" "}
            {booking.VideoUrl && booking.doctorCameOnline ? (
              <motion.button
                onClick={() => {
                  joinVideo(booking.bookingId, booking.doctorId);
                  navigate(`/call/${booking.bookingId}`);
                }}
                className="text-emerald-500 underline hover:text-emerald-700 transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Join Meeting
              </motion.button>
            ) : (
              <span className="text-gray-500">Doctor not joined yet</span>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TrackBooking;