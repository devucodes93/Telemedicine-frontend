import React, { useState, useEffect } from "react";
import { FiCheck, FiX, FiRefreshCcw } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ADMIN_EMAIL = "devu@gmail.com";
const ADMIN_PASSWORD = "123456";

const AdminDashboard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      fetchRequests();
    } else {
      setError("Invalid admin credentials");
    }
  };

  const handleReview = async (id, action) => {
    setProcessingId(id);
    try {
      await fetch(
        "http://localhost:5000/api/doctor/doctor-application-response",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            applicationId: id,
            action: action === "approve" ? "approve" : "reject",
          }),
        }
      );
      await fetchRequests();
      toast.success(
        action === "approve"
          ? "Doctor application approved!"
          : "Doctor application rejected!",
        { position: "top-right" }
      );
    } catch (err) {
      toast.error("Failed to process application", { position: "top-right" });
    } finally {
      setProcessingId(null);
    }
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-bold text-center">Admin Login</h2>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ToastContainer />
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Doctor Applications</h1>
        <button
          onClick={fetchRequests}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <FiRefreshCcw className="w-5 h-5" />
          <span>Refresh</span>
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 p-6 overflow-auto">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : requests.length === 0 ? (
          <div className="text-center text-gray-500 mt-12">
            No applications found.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={req.avatar}
                    alt="Doctor Avatar"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">
                      {req.username || req.name}
                    </h2>
                    <p className="text-gray-600 text-sm ">{req.email}</p>
                  </div>
                </div>

                <div className="mt-4 text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {req.phoneNumber || req.phone}
                  </p>
                  <p>
                    <span className="font-medium">Specialization:</span>{" "}
                    {req.specialization}
                  </p>
                  <p>
                    <span className="font-medium">Experience:</span>{" "}
                    {req.experience} yrs
                  </p>
                  <p>
                    <span className="font-medium">Fee:</span> ₹{req.fee}
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <a
                    href={req.certification}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 underline"
                  >
                    View Certification
                  </a>
                  <div className="space-x-2">
                    <button
                      disabled={processingId === req._id}
                      onClick={() => handleReview(req._id, "approve")}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center space-x-1 mb-2"
                    >
                      <FiCheck />
                      <span>Approve</span>
                    </button>
                    <button
                      disabled={processingId === req._id}
                      onClick={() => handleReview(req._id, "reject")}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center space-x-1"
                    >
                      <FiX />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
