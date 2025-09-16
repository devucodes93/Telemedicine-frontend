import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Api = axios.create({ baseURL: "http://localhost:5000/api" });

const PatientOption = () => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"));
  const LocalpatientId = userId?.id;
  const [formData, setFormData] = useState({
    patientId: LocalpatientId,
    doctorId: "",
    latitude: "",
    longitude: "",
    option: "General Health Conditions",
  });

  // ✅ Ask location permission when user visits
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (error) => {
          console.error("Location access denied:", error.message);
          alert("⚠️ Location permission is required to send emergencies.");
        }
      );
    } else {
      alert("❌ Geolocation is not supported by your browser.");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.post("/patient-option", formData);
      alert("🚑 Emergency sent successfully!");
      setFormData({
        patientId: "",
        doctorId: "",
        latitude: formData.latitude, // keep location
        longitude: formData.longitude,
        option: "General Health Conditions",
      });
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Error sending emergency");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🚨 Send Emergency</h1>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
        <input
          type="text"
          name="patientId"
          placeholder="Patient ID"
          value={formData.patientId}
          onChange={handleChange}
          required
          className="block mb-3 border p-2 w-full rounded"
        />
        <select
          name="option"
          value={formData.option}
          onChange={handleChange}
          className="block mb-3 border p-2 w-full rounded"
        >
          <option>Critical Conditions</option>
          <option>Urgent Conditions</option>
          <option>General Health Conditions</option>
        </select>

        <button
          type="submit"
          className="bg-red-600 text-white p-2 rounded w-full font-bold"
        >
          Send Emergency
        </button>
      </form>
    </div>
  );
};
export default PatientOption;
