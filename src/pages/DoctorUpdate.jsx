import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DoctorUpdate = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    phone: "",
    experience: 0,
    fee: 0,
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
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        specialization: user.specialization || "",
        experience: user.experience || 0,
        fee: user.fee || 0,
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
      await axios.post("http://localhost:5000/api/doctor/update", form);
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
        <h2 className="text-2xl font-bold mb-4">Update Doctor Profile</h2>
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
            required
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
            placeholder="Email"
            required
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
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring mb-3"
          />
          <label className="block font-semibold mb-1" htmlFor="specialization">
            Specialization
          </label>
          <input
            type="text"
            name="specialization"
            id="specialization"
            value={form.specialization}
            onChange={handleChange}
            placeholder="Specialization"
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring mb-3"
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
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring mb-3"
          />
          <label className="block font-semibold mb-1" htmlFor="experience">
            Experience (years)
          </label>
          <input
            type="number"
            name="experience"
            id="experience"
            value={form.experience}
            onChange={handleChange}
            placeholder="Experience (years)"
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring mb-3"
          />
          <label className="block font-semibold mb-1" htmlFor="fee">
            Fee
          </label>
          <input
            type="number"
            name="fee"
            id="fee"
            value={form.fee}
            onChange={handleChange}
            placeholder="Fee"
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring mb-3"
          />
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

export default DoctorUpdate;
