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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch appointments for the doctor
  useEffect(() => {
    if (user?.role === "Doctor") {
      fetch(`http://localhost:5000/api/booking/doctor?doctorId=${user.id}`)
      fetch(
        `http://localhost:5000/api/booking/doctor?doctorId=${
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
    fetch("http://localhost:5000/api/booking/doctor-live", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doctorId: user.id,
        status: false,
        bookingId,
      }),
    });

    // cleanup (when closing)
    return () => {
      fetch("http://localhost:5000/api/booking/doctor-live", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: user.id,
          status: false,
          bookingId,
        }),
      });
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

        {/* Upcoming Appointments */}
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
                {upcomingAppointments.map((appointment) => (
                  <li
                    key={appointment._id}
                    className="bg-white rounded shadow p-4 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        {appointment.patientAvatar && (
                          <img
                            src={appointment?.patientAvatar}
                            alt="avatar"
                            className="w-10 h-10 rounded-full border"
                          />
                        )}
                        <div>
                          <div>
                            <strong>{t("patientName")}:</strong>{" "}
                            {appointment?.patientName || appointment.patientId}
                          </div>
                          <div>
                            <strong>{t("email")}:</strong>{" "}
                            {appointment.patientEmail}
                          </div>
                          <div>
                            <strong>{t("phone")}:</strong>{" "}
                            {appointment.patientPhone}
                          </div>
                        </div>
                      </div>
                      <div>
                        <strong>{t("date")}:</strong> {appointment.date}
                      </div>
                      <div>
                        <strong>{t("time")}:</strong> {appointment.reservedTime}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        joinVideo(appointment._id, appointment.doctorId);
                        navigate(`/call/${appointment._id}`);
                      }}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 font-semibold"
                    >
                      {t("join")}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Overview />
          <HealthOverview />
          <Cards />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PatientHistory />
          <HealthReports />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Messages />
          <Payments />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
