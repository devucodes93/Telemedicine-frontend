import React, { useEffect, useState } from "react";
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
import styles from "../componentsDoctor/Cards.module.css";
import useSocketStore from "../store/socketStore";

const DoctorDashboard = () => {
  const { joinVideo } = useSocketStore();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    if (user?.role === "Doctor") {
      fetch(`http://localhost:5000/api/booking/doctor?doctorId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          const allAppointments = data.appointments || [];
          setAppointments(allAppointments);
          // Filter upcoming appointments based on current date and time
          const now = new Date();
          const upcoming = allAppointments.filter((appointment) => {
            if (
              appointment.status !== "accepted" ||
              !appointment.reservedTime ||
              !appointment.date
            )
              return false;
            // Combine date and reservedTime to get appointment datetime
            const dateStr = appointment.date;
            const timeStr = appointment.reservedTime;
            // Try to parse date and time
            const dateTime = new Date(`${dateStr} ${timeStr}`);
            return dateTime > now;
          });
          setUpcomingAppointments(upcoming);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    document.title = "Doctor Dashboard - TeleMedico";
    console.log(appointments);
  }, [appointments]);
  return (
    <div
      className="flex flex-col md:flex-row min-h-screen bg-gray-50"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-full md:w-64 bg-white border-r border-gray-200">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col p-2 sm:p-4 md:p-8 gap-4">
        <Header />
        {/* Upcoming Appointments Section */}
        {user?.role === "Doctor" && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2 text-blue-700">
              Upcoming Appointments
            </h2>
            {loading ? (
              <div>Loading appointments...</div>
            ) : upcomingAppointments.length === 0 ? (
              <div>No upcoming appointments.</div>
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
                            <strong>Patient Name:</strong>{" "}
                            {appointment?.patientName || appointment.patientId}
                          </div>
                          <div>
                            <strong>Email:</strong> {appointment.patientEmail}
                          </div>
                          <div>
                            <strong>Phone:</strong> {appointment.patientPhone}
                          </div>
                        </div>
                      </div>
                      <div>
                        <strong>Date:</strong> {appointment.date}
                      </div>
                      <div>
                        <strong>Time:</strong> {appointment.reservedTime}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        joinVideo(appointment._id, appointment.doctorId);
                        navigate(`/call/${appointment._id}`);
                      }}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 font-semibold"
                    >
                      Join
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {/* ...existing dashboard... */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Overview />
          <HealthOverview />
          <Cards />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PatientHistory />
          <HealthReports />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Messages />
          <Payments />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
