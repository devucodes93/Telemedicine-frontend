import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");

  // handle inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg(""); // clear error on typing
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      if (response.data.success) {
        // save user + token in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");
        const role = response.data.user.role;
        if (role === "patient") {
          window.location.href = "/patient";
        } else if (role === "Doctor") {
          window.location.href = "/doctor";
        } else {
          window.location.reload();
        }
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [error, setError] = useState("");
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/doctor-applications"
      );
      const data = await res.json();
      setRequests(data.requests || []);
    } catch (err) {
      setError("Failed to fetch doctor applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Login
        </h1>

        {errorMsg && (
          <p className="text-red-500 text-center mb-3">{errorMsg}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <FiEyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <FiEye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Login as Admin Link triggers modal */}
        <div className="text-center mt-4">
          <button
            type="button"
            className="text-blue-600 font-semibold hover:underline"
            onClick={() =>
              (window.location.href = "/admin/review-applications")
            }
          >
            Login as Admin
          </button>
        </div>

        {/* Admin Login Modal - Glassmorphism theme */}
        {/* {showAdminModal && (
          // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
          //   <div
          //     className="rounded-2xl shadow-2xl p-8 w-full max-w-xs text-center border border-purple-400"
          //     style={{
          //       background: "rgba(255,255,255,0.15)",
          //       boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          //       backdropFilter: "blur(10px)",
          //       WebkitBackdropFilter: "blur(10px)",
          //       borderRadius: "20px",
          //       border: "1px solid rgba(255,255,255,0.18)",
          //     }}
          //   >
          //     <h2 className="text-xl font-bold mb-4 text-purple-700 drop-shadow">
          //       Admin Secret Login
          //     </h2>
          //     <input
          //       type="email"
          //       placeholder="Admin Email"
          //       value={adminEmail}
          //       onChange={(e) => setAdminEmail(e.target.value)}
          //       className="w-full mb-3 p-2 border rounded bg-white bg-opacity-40 text-purple-900 placeholder-purple-400 border-purple-300"
          //       autoFocus
          //     />
          //     <input
          //       type="password"
          //       placeholder="Password"
          //       value={adminPassword}
          //       onChange={(e) => setAdminPassword(e.target.value)}
          //       className="w-full mb-3 p-2 border rounded bg-white bg-opacity-40 text-purple-900 placeholder-purple-400 border-purple-300"
          //     />
          //     {adminError && (
          //       <div className="text-red-500 mb-2">{adminError}</div>
          //     )}
          //     <button
          //       className="w-full bg-purple-600 bg-opacity-80 text-white py-2 rounded font-semibold mb-2 hover:bg-purple-700"
          //       onClick={() => {
          //         if (
          //           adminEmail === "devu@gmail.com" &&
          //           adminPassword === "123456"
          //         ) {
          //           localStorage.setItem(
          //             "user",
          //             JSON.stringify({ email: adminEmail, role: "admin" })
          //           );
          //           setShowAdminModal(false);
          //           window.location.href = "/admin";
          //         } else {
          //           setAdminError("Invalid admin credentials");
          //         }
          //       }}
          //     >
          //       submit
          //     </button>
          //     <button
          //       className="w-full bg-gray-200 bg-opacity-60 text-purple-700 py-2 rounded font-semibold hover:bg-gray-300"
          //       onClick={() => {
          //         setShowAdminModal(false);
          //         setAdminEmail("");
          //         setAdminPassword("");
          //         setAdminError("");
          //       }}
          //     >
          //       Cancel
          //     </button>
          //   </div>
          // </div>
        )} */}

        {/* Removed small sign up link as requested */}
      </div>
    </div>
  );
};

export default Login;
