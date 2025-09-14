import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookDoctor = ({ onBooked }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch doctors on mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/doctor/list")
      .then((res) => {
        const list = res.data.doctors || [];
        setDoctors(list);
        setFilteredDoctors(list);
      })
      .catch(() => {
        setDoctors([]);
        setFilteredDoctors([]);
      });
  }, []);

  // Handle doctor booking
  const handleBook = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const patientId = user?.id;

      if (!patientId || !selectedDoctor || !date) {
        throw new Error("Please select a doctor and date.");
      }

      const res = await axios.post(
        "http://localhost:5000/api/booking/booking",
        {
          patientId,
          doctorId: selectedDoctor._id,
          date,
        }
      );

      if (res.data && !res.data.error) {
        setSuccess("Booking successful!");
        setSelectedDoctor(null);
        setDate("");
        if (onBooked) {
          setTimeout(() => {
            onBooked();
          }, 700);
        }
      } else {
        throw new Error(res.data.error || "Booking failed.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center">Book a Doctor</h2>

      {/* Doctor Slider */}
      {filteredDoctors.length > 0 ? (
        <div className="w-full max-w-full overflow-x-auto pb-4 mb-8 hide-scrollbar">
          <div
            ref={scrollRef}
            className="flex gap-4 flex-nowrap snap-x snap-mandatory"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {filteredDoctors.map((doc) => (
              <div
                key={doc._id}
                className={`flex-shrink-0 min-w-[160px] max-w-[180px] bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center snap-center transition-transform duration-300 hover:scale-105 ${
                  selectedDoctor?._id === doc._id ? "ring-4 ring-blue-400" : ""
                }`}
                onClick={() => setSelectedDoctor(doc)}
                style={{ cursor: "pointer" }}
              >
                <div className="w-24 h-24 mb-4 rounded-full border-4 border-blue-300 shadow-md overflow-hidden bg-gray-100">
                  <img
                    src={
                      doc.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        doc.name || "Doctor"
                      )}`
                    }
                    alt={doc.name || "Doctor"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-bold text-md mb-1 text-blue-700">
                  {doc.username || "---"}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  {doc.specialization || "---"}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  Experience: {doc.experience ?? "---"} yrs
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  Fee: ₹{doc.fee ?? "---"}
                </div>
                <div className="text-sm text-gray-700 font-semibold mb-1">
                  {doc.name || "---"}
                </div>
                <button
                  type="button"
                  className={`mt-2 px-4 py-1 rounded-full font-semibold text-sm transition-all duration-200 ${
                    selectedDoctor?._id === doc._id
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 border border-blue-600"
                  }`}
                >
                  {selectedDoctor?._id === doc._id ? "Selected" : "Choose"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-gray-500 mb-6 text-center">
          No doctors available.
        </div>
      )}

      {/* Booking Form */}
      <form onSubmit={handleBook} className="space-y-4 mt-6 max-w-md mx-auto">
        <div>
          <label className="block font-semibold mb-1" htmlFor="date">
            Choose Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded font-semibold hover:bg-blue-600 transition w-full"
          disabled={!selectedDoctor || !date}
        >
          Book Doctor
        </button>

        {success && (
          <div className="text-green-600 font-semibold mt-2 text-center">
            {success}
          </div>
        )}
        {error && (
          <div className="text-red-600 font-semibold mt-2 text-center">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default BookDoctor;
