import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PatintUpdate = () => {
  const [form, setForm] = useState({
    bloodGroup: "",
    age: "",
    phoneNumber: "",
    email: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add API call to update patient profile
    // On success:
    navigate("/me");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md text-center space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Update Patient Profile</h2>
        <input
          type="text"
          name="bloodGroup"
          value={form.bloodGroup}
          onChange={handleChange}
          placeholder="Blood Group"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
        />
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="Age"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
        />
        <input
          type="text"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
        />
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

export default PatintUpdate;
