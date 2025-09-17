import React, { useEffect, useState } from "react";
import "./input.css";
import Nav from "./components/Nav";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import TrackBooking from "./pages/TrackBooking";
import About from "./pages/About";
import Services from "./pages/Services";
import Signup from "./pages/Signup";
import Me from "./components/Me";
import Login from "./pages/Login";
import AuthSuccess from "./pages/AuthSuccess";
import DoctorUpdate from "./pages/DoctorUpdate";
import PatientUpdate from "./pages/PatientUpdate";
import DoctorHome from "./pages/DoctorHome";
import DoctorDashboard from "./pages/DoctorDashboard";
import Appointments from "./pages/Appointments";
import CallPage from "./components/CallPage";
import useSocketStore from "./store/socketStore";
import CallPageLoad from "./pages/CallPage";
import PatientOption from "./components/PatientOption";
import AdminDashboard from "./pages/AdminDashboard";
import Finding from "./pages/Finding";
import TrackEmergency from "./pages/TrackEmergency";

const App = () => {
  const { connectSocket } = useSocketStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [emergency, setEmergency] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { socket } = useSocketStore();
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    // If user is present in localStorage, redirect from /login
    const user = localStorage.getItem("user");
    if (user && location.pathname === "/login") {
      navigate("/patient");
    }
  }, [location, navigate]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const doctorLocation = {
            type: "Point",
            coordinates: {
              latitude,
              longitude,
            },
          };

          setCoords(doctorLocation);
          console.log("Doctor location set:", doctorLocation);
        },
        (error) => {
          console.error("Error fetching location:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  }, []);

  // Role-based route protection using API
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const user = localStorage.getItem("user");
    user && connectSocket();
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setRole(null);
          setLoading(false);
          return;
        }
        const res = await fetch(
          "https://telemedicine-backend-2.onrender.com/auth/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        console.log(data);
        console.log(role, "roleeeeeeeee");
        if (data.success && data.user) {
          setRole(data.user.role);

          console.log(role, "roleeeeeeeee");
        } else {
          setRole(null);
        }
      } catch {
        setRole(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (role === "patient" && location.pathname === "/doctor") {
        navigate("/patient", { replace: true });
      }
      if (role === "doctor" && location.pathname === "/patient") {
        navigate("/doctor", { replace: true });
      }
    }
  }, [role, loading, location.pathname, navigate]);

  useEffect(() => {
    if (!socket) return;
    socket.on("emergency-alert", (data) => {
      setEmergency(data);
    });
    return () => {
      socket.off("emergency-alert");
    };
  }, [socket]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role !== "patient" && emergency) {
      setIsPopupVisible(true);
      console.log(emergency);
    }
  }, [emergency]);
  useEffect(() => {
    if (isPopupVisible) {
      document.body.style.overflow = "hidden"; // disable scroll
    } else {
      document.body.style.overflow = "auto"; // re-enable scroll
    }
  }, [isPopupVisible]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {isPopupVisible && (
        <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/50">
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0"
            onClick={() => setIsPopupVisible(false)}
          ></div>

          {/* Popup Card */}
          <div
            className="relative bg-white w-full sm:w-[450px] rounded-t-2xl shadow-2xl p-6 text-center animate-slideUpSlow z-[10000]"
            style={{ height: "55vh", maxHeight: "450px" }} // fixed height, no scroll
          >
            {/* Header with icon */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M6.938 19h10.124c1.054 0 1.636-1.14 1.054-2.054l-5.062-8.772c-.527-.912-1.944-.912-2.472 0l-5.062 8.772C5.302 17.86 5.884 19 6.938 19z"
                />
              </svg>
              <h2 className="text-xl font-bold text-red-600 drop-shadow">
                Emergency Alert
              </h2>
            </div>

            {/* Message */}
            <p className="text-gray-700 text-sm font-medium mb-3">
              {emergency?.option || "Emergency reported!"}
            </p>

            {/* User Details */}
            <div className="flex flex-col items-center space-y-1">
              <img
                src={emergency?.avatar}
                alt={emergency?.username}
                className="w-16 h-16 rounded-full border-2 border-red-500 shadow"
              />
              <h3 className="text-lg font-bold text-gray-800">
                {emergency?.username || "Unknown"}
              </h3>

              <p className="text-gray-700 text-sm font-medium">
                📞 {emergency?.phoneNumber}
              </p>
            </div>

            {/* Google Maps */}
            {emergency && (
              <iframe
                title="patient-location"
                width="100%"
                height="120"
                className="rounded-lg shadow-md"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${emergency.latitude},${emergency.longitude}&z=15&output=embed`}
              ></iframe>
            )}

            {/* Close button top-right */}
            <button
              className="absolute top-3 right-3 px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition"
              onClick={() => setIsPopupVisible(false)}
            >
              ✕
            </button>

            {/* Action buttons */}
            <div className="mt-5 flex gap-3">
              <button
                className="flex-1 px-6 py-2 bg-gray-300 text-gray-800 text-sm font-semibold rounded-lg shadow-md hover:bg-gray-400 transition"
                onClick={() => setIsPopupVisible(false)}
              >
                Cancel
              </button>{" "}
              <button
                className="flex-1 px-6 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
                onClick={async () => {
                  console.log("Accepted");
                  await fetch(
                    "https://telemedicine-backend-2.onrender.com/api/emergency/response",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                      body: JSON.stringify({
                        doctorId: JSON.parse(localStorage.getItem("user"))._id,
                        patientId: emergency._id, // use the actual patientId
                        doctorLocation: {
                          latitude: coords.coordinates.latitude,
                          longitude: coords.coordinates.longitude,
                        },
                        emergencyCode: emergency.emergencyCode,
                        accept: true, // if you want to send this
                      }),
                    }
                  );
                  setIsPopupVisible(false);
                  setEmergency(null);
                  navigate("/track-emergency");
                  socket.emit("emergency-accepted", {
                    patientId: emergency._id,
                    doctorId: JSON.parse(localStorage.getItem("user"))._id,
                    DoctorLocation: {
                      latitude: coords.coordinates.latitude,
                      longitude: coords.coordinates.longitude,
                    },
                    emergencyCode: emergency.emergencyCode,
                    accept: true,
                  });
                  localStorage.setItem(
                    "emergencyCode",
                    JSON.stringify({
                      patientId: emergency._id,
                      doctorId: JSON.parse(localStorage.getItem("user"))._id,
                      DoctorLocation: {
                        latitude: coords.coordinates.latitude,
                        longitude: coords.coordinates.longitude,
                      },
                      emergencyCode: emergency.emergencyCode,
                      accept: true,
                    })
                  );
                }}
              >
                Accept
              </button>
            </div>
          </div>

          <style>{`
      @keyframes slideUpSlow {
        0% {
          transform: translateY(100%);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
      .animate-slideUpSlow {
        animation: slideUpSlow 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }
    `}</style>
        </div>
      )}

      {/* Only show Nav if not on /doctor and not doctor role */}
      {!(role === "Doctor" && location.pathname === "/doctor") && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route
          path="/signup"
          element={
            role ? (
              role === "patient" ? (
                <Home />
              ) : (
                <DoctorDashboard />
              )
            ) : (
              <Signup />
            )
          }
        />
        <Route
          path="/login"
          element={
            role ? (
              role === "patient" ? (
                <Home />
              ) : (
                <DoctorDashboard />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route path="/me" element={<Me />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/doctor-update" element={<DoctorUpdate />} />
        <Route path="/patient-update" element={<PatientUpdate />} />
        <Route path="/patient-option" element={<PatientOption />} />
        {/* Role-based route: /patient renders Home only for patient */}
        <Route
          path="/patient"
          element={role === "patient" ? <Home /> : <Login />}
        />
        {/* /doctor renders DoctorDashboard for doctor, block patient access */}
        <Route
          path="/doctor"
          element={
            role === "Doctor" ? (
              <DoctorDashboard />
            ) : role === "patient" ? (
              <Home />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/track-booking" element={<TrackBooking />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/call" element={<CallPageLoad />} />
        <Route path="/call/:id" element={<CallPage />} />
        <Route path="/call/:id/active" element={<CallPage />} />

        <Route path="/admin/review-applications" element={<AdminDashboard />} />
        <Route path="/waiting" element={<Finding />} />
        <Route path="/track-emergency" element={<TrackEmergency />} />
        {/* Removed erroneous React.lazy route for /call/:id */}
      </Routes>
    </div>
  );
};

export default App;
