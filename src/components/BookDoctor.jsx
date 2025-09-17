import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const BookDoctor = ({ onBooked }) => {
  const { t } = useTranslation(); // Hook for translations
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch doctors on mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/doctor/list")
      .then((res) => {
        const list = res.data.doctors || [];
        setDoctors(list);
        setFilteredDoctors(list);
      })
      .catch(() => {
        setDoctors([]);
        setFilteredDoctors([]);
      });
  }, []);

  // Handle doctor booking
  const handleBook = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const patientId = user?.id;

      if (!patientId || !selectedDoctor || !date) {
        throw new Error(t("Please select a doctor and date."));
      }

      const res = await axios.post(
        "http://localhost:5000/api/booking/booking",
        {
          patientId,
          doctorId: selectedDoctor._id,
          date,
        }
      );

      if (res.data && !res.data.error) {
        setSuccess(t("BookingSuccessful"));
        setSelectedDoctor(null);
        setDate("");
        if (onBooked) {
          setTimeout(() => {
            onBooked();
          }, 700);
        }
      } else {
        throw new Error(res.data.error || t("BookingFailed"));
      }
    } catch (err) {
      setError(err.message || t("SomethingWentWrong"));
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const inputVariants = {
    focus: { scale: 1.02, borderColor: "#10b981", transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="max-h-screen overflow-y-auto bg-gradient-to-br from-emerald-50 to-green-50 p-6 sm:p-8 pt-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-center text-emerald-600 mb-8"
        variants={containerVariants}
      >
        {t("BookDoctor")}
      </motion.h2>

      {/* Doctor Slider */}
      {filteredDoctors.length > 0 ? (
        <div className="w-full overflow-x-auto pb-4 mb-8 hide-scrollbar">
          <div
            ref={scrollRef}
            className="flex gap-3 flex-nowrap snap-x snap-mandatory"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {filteredDoctors.map((doc) => (
              <motion.div
                key={doc._id}
                className={`flex-shrink-0 min-w-[120px] max-w-[140px] bg-white rounded-xl shadow-lg p-2 flex flex-col items-center snap-center transition-all ${
                  selectedDoctor?._id === doc._id ? "ring-4 ring-emerald-400" : ""
                }`}
                onClick={() => setSelectedDoctor(doc)}
                style={{ cursor: "pointer" }}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <div className="w-16 h-16 mb-2 rounded-full border-2 border-emerald-300 shadow-md overflow-hidden bg-gray-100">
                  <img
                    src={
                      doc.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        doc.name || "Doctor"
                      )}`
                    }
                    alt={doc.name || "Doctor"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-bold text-xs mb-0.25 text-emerald-700">
                  {doc.username || "---"}
                </div>
                <div className="text-[10px] text-gray-600 mb-0.25">
                  {doc.specialization || "---"}
                </div>
                <div className="text-[10px] text-gray-600 mb-0.25">
                  {t("Experience")}: {doc.experience ?? "---"} yrs
                </div>
                <div className="text-[10px] text-gray-600 mb-0.25">
                  {t("Fee")}: ₹{doc.fee ?? "---"}
                </div>
                <div className="text-[10px] text-gray-700 font-semibold mb-0.25">
                  {doc.name || "---"}
                </div>
                <motion.button
                  type="button"
                  className={`mt-1 px-2 py-0.5 rounded-full font-semibold text-[10px] transition-all ${
                    selectedDoctor?._id === doc._id
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-emerald-600 border border-emerald-600"
                  }`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {selectedDoctor?._id === doc._id ? t("Selected") : t("Choose")}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          className="text-gray-500 mb-6 text-center"
          variants={containerVariants}
        >
          {t("NoDoctorsAvailable")}
        </motion.div>
      )}

      {/* Booking Form */}
      <motion.form
        onSubmit={handleBook}
        className="space-y-4 mt-6 max-w-md mx-auto"
        variants={containerVariants}
      >
        <div>
          <label
            className="block font-semibold mb-1 text-gray-700 text-sm sm:text-base"
            htmlFor="date"
          >
            {t("ChooseDate")}
          </label>
          <motion.input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all border-emerald-300 text-gray-800"
            variants={inputVariants}
            whileFocus="focus"
          />
        </div>

        <motion.button
          type="submit"
          className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-all w-full disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!selectedDoctor || !date}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {t("BookDoctor")}
        </motion.button>

        <AnimatePresence>
          {success && (
            <motion.div
              className="text-emerald-600 font-semibold mt-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {success}
            </motion.div>
          )}
          {error && (
            <motion.div
              className="text-red-500 font-semibold mt-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </motion.div>
  );
};

export default BookDoctor;