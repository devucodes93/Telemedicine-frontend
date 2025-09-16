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
<<<<<<< HEAD
import PatientOption from "./components/PatientOption";
=======
import AdminDashboard from "./pages/AdminDashboard";
>>>>>>> 629627631805bd070d8eb729f0825a3364f568fb

const App = () => {
  const { connectSocket } = useSocketStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If user is present in localStorage, redirect from /login
    const user = localStorage.getItem("user");
    if (user && location.pathname === "/login") {
      navigate("/patient");
    }
  }, [location, navigate]);
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
        const res = await fetch("http://localhost:5000/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
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

  if (loading) return <div>Loading...</div>;

  return (
    <div>
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
        {/* Removed erroneous React.lazy route for /call/:id */}
      </Routes>
    </div>
  );
};

export default App;
