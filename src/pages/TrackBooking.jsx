import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSocketStore from "../store/socketStore";

const TrackBooking = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const { joinVideo } = useSocketStore();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`http://localhost:5000/api/booking/booking?patientId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) setBooking(data);
        else setBooking(null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    // Only run once on mount
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!booking) return <div className="p-8 text-center">No booking found.</div>;

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        Track Your Booking
      </h2>
      <div className="space-y-3 text-lg">
        <div>
          <strong>Doctor Name:</strong> {booking.doctorName}
        </div>
        <div>
          <strong>Specialization:</strong> {booking.doctorSpecialization}
        </div>
        <div>
          <strong>Experience:</strong> {booking.doctorExperience} years
        </div>
        <div>
          <strong>Fee:</strong> ₹{booking.fee}
        </div>
        <div>
          <strong>Date:</strong> {booking.date}
        </div>
        <div>
          <strong>Time:</strong> {booking.reservedTime || "Pending"}
        </div>
        <div>
          <strong>Status:</strong>{" "}
          {booking.status === "accepted"
            ? "Accepted by Doctor"
            : "Waiting for Doctor to Accept"}
        </div>
        {booking.reservedTime && (
          <div>
            <strong>Meeting Link:</strong>{" "}
            {booking.VideoUrl ? (
              <button
                onClick={() => {
                  joinVideo(booking.bookingId, booking.doctorId);
                  navigate(`/call/${booking.bookingId}`);
                }}
                className="text-blue-600 underline"
              >
                Join Meeting
              </button>
            ) : (
              "Not provided yet"
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackBooking;
