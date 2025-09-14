import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const Appointments = () => {
  const [showTimeInput, setShowTimeInput] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [fee, setFee] = useState(0);
  const { t } = useTranslation();
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

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">
        {t("AllAppointments")}
      </h1>
      {loading ? (
        <div>{t("LoadingAppointments")}</div>
      ) : appointments.length === 0 ? (
        <div>{t("NoAppointmentsFound")}</div>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appointment) => (
            <li
              key={appointment._id}
              className="bg-white rounded shadow p-4 flex items-center justify-between"
            >
              <div>
                <div>
                  <strong>{t("Patient")}: </strong> {appointment.patientId}
                </div>
                <div>
                  <strong>{t("Date")}: </strong> {appointment.date}
                </div>
                <div>
                  <strong>{t("Time")}: </strong>
                  {appointment.status === "accepted" && appointment.reservedTime
                    ? appointment.reservedTime
                    : appointment.time || t("Pending")}
                </div>
                <div>
                  <strong>{t("Status")}: </strong>
                  {appointment.status === "accepted" ? (
                    <span className="text-green-600 font-semibold">
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
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 transition"
                  onClick={() => {
                    setSelectedAppointment(appointment);
                    setShowModal(true);
                  }}
                >
                  {t("Action")}
                </button>
              )}
              {/* Glassmorphism Popup Modal */}
              {showModal && selectedAppointment && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn"
                  style={{ background: "rgba(255,255,255,0.5)" }}
                >
                  <div className="backdrop-blur-lg bg-white/80 border border-gray-200 rounded-3xl shadow-2xl p-8 w-full max-w-md relative flex flex-col items-center animate-slideUp transition-all duration-300">
                    <button
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl font-extrabold focus:outline-none bg-white/80 rounded-full w-10 h-10 flex items-center justify-center shadow-lg border border-gray-300"
                      onClick={() => setShowModal(false)}
                      aria-label="Close"
                      style={{ transition: "all 0.2s" }}
                    >
                      &#10005;
                    </button>
                    <h2 className="text-2xl font-extrabold mb-6 text-blue-700 tracking-wide drop-shadow">
                      {t("AppointmentAction")}
                    </h2>
                    <div className="mb-8 w-full text-left text-lg">
                      <div className="mb-2">
                        <span className="font-semibold text-gray-700">
                          {t("Patient")}:
                        </span>{" "}
                        <span className="text-blue-700">
                          {selectedAppointment.patientId}
                        </span>
                      </div>
                      <div className="mb-2">
                        <span className="font-semibold text-gray-700">
                          {t("Date")}:
                        </span>{" "}
                        <span className="text-blue-700">
                          {selectedAppointment.date}
                        </span>
                      </div>
                      <div className="mb-2">
                        <span className="font-semibold text-gray-700">
                          {t("Time")}:
                        </span>{" "}
                        <span className="text-blue-700">
                          {selectedAppointment.status === "accepted" &&
                          selectedAppointment.reservedTime
                            ? selectedAppointment.reservedTime
                            : selectedAppointment.time || "Pending"}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-4 w-full">
                      <button
                        className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-bold text-lg hover:scale-105 hover:from-red-600 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
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
                      >
                        <span className="material-icons"></span> {t("Cancel")}
                      </button>
                      {!showTimeInput ? (
                        <button
                          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-2xl font-bold text-lg hover:scale-105 hover:from-green-600 transition-all duration-200 flex-1 shadow-lg flex items-center justify-center gap-2"
                          disabled={actionLoading}
                          onClick={() => setShowTimeInput(true)}
                        >
                          <span className="material-icons"></span> {t("Accept")}
                        </button>
                      ) : (
                        <form
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
                            setFee(0);
                            window.location.reload();
                          }}
                        >
                          {/* Time Picker */}
                          <div className="w-full mb-2">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                label={t("SelectTime")}
                                value={
                                  selectedTime
                                    ? dayjs(selectedTime, "HH:mm")
                                    : null
                                }
                                onChange={(newValue) => {
                                  setSelectedTime(
                                    newValue ? newValue.format("HH:mm") : ""
                                  );
                                }}
                                ampm={false}
                                minutesStep={5}
                                sx={{ width: "100%" }}
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

                          {/* Fee Input */}
                          <input
                            type="number"
                            value={fee}
                            onChange={(e) => setFee(Number(e.target.value))}
                            placeholder={t("EnterFee")}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                            required
                            min={0}
                          />

                          {/* Submit Button */}
                          <button
                            type="submit"
                            className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg w-full 
      ${
        actionLoading || !selectedTime || fee <= 0
          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
          : "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:scale-105 hover:from-green-600"
      }`}
                            disabled={
                              actionLoading || !selectedTime || fee <= 0
                            }
                          >
                            {t("Confirm")}
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Appointments;
