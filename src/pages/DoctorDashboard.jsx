import React, { useEffect, useState } from "react";
import { useTranslation } from "../context/TranslationContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../componentsDoctor/Sidebar";
import Header from "../componentsDoctor/Header";
import Overview from "../componentsDoctor/Overview";
import HealthOverview from "../componentsDoctor/HealthOverview";
import Cards from "../componentsDoctor/Cards";
import PatientHistory from "../componentsDoctor/PatientHistory";
import HealthReports from "../componentsDoctor/HealthReports";
import Messages from "../componentsDoctor/Messages";
import Payments from "../componentsDoctor/Payments";
import useSocketStore from "../store/socketStore";
import { FiCalendar, FiClock, FiMail, FiPhone } from "react-icons/fi";
import socket from "../socket";
const DoctorDashboard = () => {
  const { t } = useTranslation();
  const { joinVideo } = useSocketStore();
  const navigate = useNavigate();

  // Theme state
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [appointments, setAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [doctorLocation, setDoctorLocation] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch appointments for the doctor
  useEffect(() => {
    if (user?.role === "Doctor") {
      fetch(
        `https://telemedicine-backend-2.onrender.com/api/booking/doctor?doctorId=${user.id}`
      );
      fetch(
        `https://telemedicine-backend-2.onrender.com/api/booking/doctor?doctorId=${
          user.id || user._id
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          const allAppointments = data.appointments || [];
          setAppointments(allAppointments);

          const now = new Date();
          const upcoming = allAppointments.filter((appointment) => {
            if (
              appointment.status !== "accepted" ||
              !appointment.reservedTime ||
              !appointment.date
            )
              return false;

            const dateStr = appointment.date;
            const timeStr = appointment.reservedTime;
            const dateTime = new Date(`${dateStr} ${timeStr}`);
            return dateTime > now;
          });

          setUpcomingAppointments(upcoming);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
    // Simulate fetching live location and nearby hospitals
    setTimeout(() => {
      setDoctorLocation({ latitude: 12.9716, longitude: 77.5946 }); // Bangalore
      setNearbyHospitals([
        { name: "Apollo Hospital", lat: 12.9722, lng: 77.595 },
        { name: "Fortis Hospital", lat: 12.97, lng: 77.592 },
        { name: "Manipal Hospital", lat: 12.9735, lng: 77.5975 },
      ]);
    }, 1200);
  }, [user?.id, user?.role]);

  // Page title + debug log
  useEffect(() => {
    document.title = "Doctor Dashboard - TeleMedico";
    console.log(appointments);
    setUpcomingAppointments(appointments);
  }, [appointments]);

  // Set doctor live/offline status
  useEffect(() => {
    if (!user || user.role !== "Doctor") return;

    const bookingId = upcomingAppointments[0]?._id || null;
    console.log("bookingId", bookingId);

    // when doctor enters dashboard
    fetch(
      "https://telemedicine-backend-2.onrender.com/api/booking/doctor-live",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: user.id,
          status: false,
          bookingId,
        }),
      }
    );

    // cleanup (when closing)
    return () => {
      fetch(
        "https://telemedicine-backend-2.onrender.com/api/booking/doctor-live",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            doctorId: user.id,
            status: false,
            bookingId,
          }),
        }
      );
    };
  }, [user, upcomingAppointments]);

  return (
    <div
      className={`flex flex-col md:flex-row min-h-screen relative ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
      style={{ minHeight: "100vh" }}
    >
      {/* Theme Toggle Button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full p-2 shadow-lg border border-gray-300 dark:border-gray-700 text-xs hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full z-30 transition-transform duration-300 bg-white border-r border-gray-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:w-64 w-64`}
        style={{
          boxShadow: sidebarOpen ? "2px 0 8px rgba(0,0,0,0.05)" : "none",
        }}
      >
        <Sidebar />
      </div>

      {/* Sidebar Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 bg-blue-600 text-white rounded-full p-2 shadow-lg focus:outline-none"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
      >
        {sidebarOpen ? <span>&#10005;</span> : <span>&#9776;</span>}
      </button>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col p-2 sm:p-4 md:p-8 gap-4 transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : ""
        } ${
          theme === "dark"
            ? "bg-gray-900 text-gray-100"
            : "bg-gray-50 text-gray-900"
        }`}
        style={{ minHeight: "100vh" }}
      >
        <Header />

        {/* Upcoming Appointments (untouched) */}
        {user?.role === "Doctor" && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2 text-blue-700">
              {t("upcomingAppointments")}
            </h2>
            {loading ? (
              <div>{t("loadingAppointments")}</div>
            ) : upcomingAppointments.length === 0 ? (
              <div>{t("noUpcomingAppointments")}</div>
            ) : (
              <ul className="space-y-3">
                <ul className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <li
                      key={appointment._id}
                      className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-md transition-shadow"
                    >
                      {/* ...existing code for appointment display... */}
                      <div className="flex items-start gap-4 flex-1">
                        {/* Avatar */}
                        {appointment.patientAvatar ? (
                          <img
                            src={appointment.patientAvatar}
                            alt="avatar"
                            className="w-14 h-14 rounded-full border object-cover shadow-sm"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold shadow-sm">
                            {appointment?.patientName?.[0] || "?"}
                          </div>
                        )}
                        {/* Patient Details */}
                        <div className="space-y-1 w-full">
                          <p className="text-lg font-semibold text-gray-800 truncate">
                            {appointment?.patientName || appointment.patientId}
                          </p>
                          <p className="flex items-center gap-2 text-sm text-gray-600 truncate">
                            <FiMail className="text-gray-400" />
                            {appointment.patientEmail}
                          </p>
                          <p className="flex items-center gap-2 text-sm text-gray-600 truncate">
                            <FiPhone className="text-gray-400" />
                            {appointment.patientPhone}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:gap-6 mt-2 text-sm text-gray-600">
                            <p className="flex items-center gap-2">
                              <FiCalendar className="text-gray-400" />
                              {appointment.date}
                            </p>
                            <p className="flex items-center gap-2 mt-1 sm:mt-0">
                              <FiClock className="text-gray-400" />
                              {appointment.reservedTime}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Right Section: Join Button */}
                      <div className="flex justify-end md:justify-center">
                        <button
                          onClick={() => {
                            joinVideo(appointment._id, appointment.doctorId);
                            navigate(`/call/${appointment._id}`);
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md transition-colors w-full sm:w-auto"
                        >
                          {t("join")}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </ul>
            )}
          </div>
        )}

        {/* Live Doctor Location Map */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 text-blue-700">
            Doctor Live Location
          </h2>
          <div className="w-full h-64 rounded-xl overflow-hidden shadow-md">
            {doctorLocation ? (
              <iframe
                title="doctor-location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${doctorLocation.latitude},${doctorLocation.longitude}&z=15&output=embed`}
              ></iframe>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Loading map...
              </div>
            )}
          </div>
        </div>

        {/* Nearby Hospitals Map */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 text-blue-700">
            Nearby Hospitals
          </h2>
          <div className="w-full h-64 rounded-xl overflow-hidden shadow-md">
            {doctorLocation && nearbyHospitals.length > 0 ? (
              <iframe
                title="nearby-hospitals"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/search/hospital/@${doctorLocation.latitude},${doctorLocation.longitude},14z`}
              ></iframe>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Loading hospitals...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
