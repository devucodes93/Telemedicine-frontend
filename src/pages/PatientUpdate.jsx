import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PatientUpdate = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: 0,
    gender: "",
    bloodGroup: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Try to get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setForm((prev) => ({
        ...prev,
        name: user.name || user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        age: user.age || 0,
        gender: user.gender || "",
        bloodGroup: user.bloodGroup || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your backend API endpoint
      await axios.post("http://localhost:5000/api/patient/update", form);
      navigate("/me");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md text-center space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Update Patient Profile</h2>
        <div className="text-left">
          <label className="block font-semibold mb-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring mb-3"
          />
          <label className="block font-semibold mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring mb-3"
          />
          <label className="block font-semibold mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            disabled
            style={{ backgroundColor: "#222", color: "#fff", opacity: 0.7 }}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring mb-3 cursor-not-allowed"
          />
          <label className="block font-semibold mb-1" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring mb-3"
          />
          <label className="block font-semibold mb-1" htmlFor="age">
            Age
          </label>
          <input
            type="number"
            name="age"
            id="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring mb-3"
          />
          <label className="block font-semibold mb-1" htmlFor="gender">
            Gender
          </label>
          <input
            type="text"
            name="gender"
            id="gender"
            value={form.gender}
            onChange={handleChange}
            placeholder="Gender"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring mb-3"
          />
          <label className="block font-semibold mb-1" htmlFor="bloodGroup">
            Blood Group
          </label>
          <select
            name="bloodGroup"
            id="bloodGroup"
            value={form.bloodGroup || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring mb-3"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded font-semibold hover:bg-blue-600 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default PatientUpdate;
