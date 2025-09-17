import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";

const Appointments = () => {
  const [showTimeInput, setShowTimeInput] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [fee, setFee] = useState("");
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.role === "Doctor") {
      fetch(`http://localhost:5000/api/booking/doctor?doctorId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setAppointments(data.appointments || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto p-4 sm:p-6 bg-emerald-50 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-emerald-600">
        {t("AllAppointments")}
      </h1>
      {loading ? (
        <motion.div
          className="text-gray-600 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
        >
          {t("LoadingAppointments")}
        </motion.div>
      ) : appointments.length === 0 ? (
        <motion.div
          className="text-gray-600 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
        >
          {t("NoAppointmentsFound")}
        </motion.div>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appointment) => (
            <motion.li
              key={appointment._id}
              className="bg-white rounded-xl shadow-md p-4 sm:p-5 flex items-center justify-between"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="text-sm sm:text-base text-gray-700">
                <div>
                  <span className="font-semibold">{t("Patient")}:</span>{" "}
                  {appointment.patientId}
                </div>
                <div>
                  <span className="font-semibold">{t("Date")}:</span>{" "}
                  {appointment.date}
                </div>
                <div>
                  <span className="font-semibold">{t("Time")}:</span>{" "}
                  {appointment.status === "accepted" && appointment.reservedTime
                    ? appointment.reservedTime
                    : appointment.time || t("Pending")}
                </div>
                <div>
                  <span className="font-semibold">{t("Status")}:</span>{" "}
                  {appointment.status === "accepted" ? (
                    <span className="text-emerald-600 font-semibold">
                      {t("Accepted")}
                    </span>
                  ) : appointment.status === "cancelled" ? (
                    <span className="text-red-500 font-semibold">
                      {t("Cancelled")}
                    </span>
                  ) : (
                    <span className="text-yellow-500 font-semibold">
                      {t("Pending")}
                    </span>
                  )}
                </div>
              </div>
              {(!appointment.status ||
                appointment.status === "pending" ||
                appointment.status === null) && (
                <motion.button
                  className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-3 sm:px-4 py-2 rounded-full font-semibold text-sm sm:text-base hover:from-emerald-700 hover:to-green-700 transition-all"
                  onClick={() => {
                    setSelectedAppointment(appointment);
                    setShowModal(true);
                  }}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {t("Action")}
                </motion.button>
              )}
            </motion.li>
          ))}
        </ul>
      )}
      {/* Glassmorphism Popup Modal */}
      <AnimatePresence>
        {showModal && selectedAppointment && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0, 0, 0, 0.5)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="backdrop-blur-lg bg-white/90 border border-emerald-200 rounded-xl shadow-2xl p-4 sm:p-6 w-full max-w-[95vw] sm:max-w-md relative flex flex-col items-center"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold bg-white/80 rounded-full w-8 h-8 flex items-center justify-center shadow-md border border-emerald-300"
                onClick={() => setShowModal(false)}
                aria-label="Close"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                &times;
              </motion.button>
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-emerald-600 tracking-wide">
                {t("AppointmentAction")}
              </h2>
              <div className="mb-6 w-full text-left text-sm sm:text-base text-gray-700">
                <div className="mb-2">
                  <span className="font-semibold">{t("Patient")}:</span>{" "}
                  <span className="text-emerald-600">{selectedAppointment.patientId}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">{t("Date")}:</span>{" "}
                  <span className="text-emerald-600">{selectedAppointment.date}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">{t("Time")}:</span>{" "}
                  <span className="text-emerald-600">
                    {selectedAppointment.status === "accepted" &&
                    selectedAppointment.reservedTime
                      ? selectedAppointment.reservedTime
                      : selectedAppointment.time || "Pending"}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4 w-full flex-col sm:flex-row">
                <motion.button
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold text-sm sm:text-base hover:from-red-600 transition-all shadow-md flex-1 flex items-center justify-center gap-2"
                  disabled={actionLoading}
                  onClick={async () => {
                    setActionLoading(true);
                    await fetch(
                      `http://localhost:5000/api/booking/cancel/${selectedAppointment._id}`,
                      { method: "POST" }
                    );
                    setShowModal(false);
                    setActionLoading(false);
                    window.location.reload();
                  }}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span>{t("Cancel")}</span>
                </motion.button>
                {!showTimeInput ? (
                  <motion.button
                    className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold text-sm sm:text-base hover:from-emerald-700 hover:to-green-700 transition-all shadow-md flex-1 flex items-center justify-center gap-2"
                    disabled={actionLoading}
                    onClick={() => setShowTimeInput(true)}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <span>{t("Accept")}</span>
                  </motion.button>
                ) : (
                  <motion.form
                    className="flex flex-col gap-3 flex-1 items-center"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!selectedTime || fee <= 0) return;
                      setActionLoading(true);
                      await fetch(
                        `http://localhost:5000/api/booking/accept/${selectedAppointment._id}`,
                        {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            time: selectedTime,
                            fee,
                          }),
                        }
                      );
                      setShowModal(false);
                      setActionLoading(false);
                      setShowTimeInput(false);
                      setSelectedTime("");
                      setFee("");
                      window.location.reload();
                    }}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <label
                      htmlFor="fee-input"
                      className="block mb-1 text-sm font-medium text-gray-700 w-full text-left"
                    >
                      {t("Fee")} ₹
                    </label>
                    <motion.input
                      id="fee-input"
                      type="number"
                      value={fee}
                      onChange={(e) => setFee(Number(e.target.value))}
                      placeholder={t("EnterFee")}
                      className="w-full border border-emerald-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800 placeholder-gray-500"
                      required
                      min={0}
                      variants={buttonVariants}
                      whileFocus="hover"
                    />
                    <div className="w-full mb-2">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          label={t("SelectTime")}
                          value={selectedTime ? dayjs(selectedTime, "HH:mm") : null}
                          onChange={(newValue) => {
                            setSelectedTime(newValue ? newValue.format("HH:mm") : "");
                          }}
                          ampm={false}
                          minutesStep={5}
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-root": {
                              borderRadius: "0.5rem",
                              border: "1px solid #6ee7b7",
                              backgroundColor: "#f0fdfa",
                              "&:focus-within": {
                                borderColor: "#10b981",
                                boxShadow: "0 0 0 2px rgba(16, 185, 129, 0.5)",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              color: "#374151",
                            },
                          }}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              size: "medium",
                              variant: "outlined",
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                    <motion.button
                      type="submit"
                      className={`px-3 sm:px-4 py-2 rounded-xl font-bold text-sm sm:text-base transition-all shadow w-full ${
                        actionLoading || !selectedTime || fee <= 0
                          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                          : "bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700"
                      }`}
                      disabled={actionLoading || !selectedTime || fee <= 0}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {t("Confirm")}
                    </motion.button>
                  </motion.form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Appointments;