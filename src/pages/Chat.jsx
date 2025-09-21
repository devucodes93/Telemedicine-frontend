import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import LoadingResponse from "../components/LoadingResponse";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const emojis = ["🩺", "💊", "🧬", "💉", "🩹", "🧪"];
const getRandomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];

const formatText = (text) => {
  const lines = text.trim().split("\n").filter(Boolean);

  return lines
    .map((line, index) => {
      const hasBold = /\*\*(.*?)\*\*/.test(line);
      const isHeading = line.length > 35 && /^[A-Z\s]+$/.test(line);
      const fontSizeClass = isHeading
        ? "text-lg md:text-xl font-semibold"
        : hasBold
        ? "text-base md:text-lg font-medium"
        : "text-sm md:text-base";

      const withBold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      const emoji = index % 2 === 1 ? ` ${getRandomEmoji()}` : "";

      return `<p class="${fontSizeClass} leading-relaxed mb-1 md:mb-2">${withBold}${emoji}</p>`;
    })
    .join("");
};

const formatDoctorList = (doctors) => {
  if (!doctors || doctors.length === 0) {
    return `<p class="text-base md:text-lg">No doctors available at the moment. Please try again later.</p>`;
  }

  const doctorHtml = doctors
    .map(
      (doctor) => `
      <div class="flex items-start gap-3 mb-4 p-4 bg-white rounded-lg shadow">
        <img src="${
          doctor.avatar || "https://via.placeholder.com/150?text=No+Image"
        }" alt="${
        doctor.username
      }'s avatar" class="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover" />
        <div>
          <p class="text-base md:text-lg font-semibold text-blue-600">${
            doctor.username
          }</p>
          <p class="text-sm md:text-base text-gray-600">${
            doctor.specialization || "General Practitioner"
          }</p>
          <p class="text-sm md:text-base text-gray-500">${
            doctor.experience
              ? `${doctor.experience} years of experience`
              : "Experience not specified"
          }</p>
          <p class="text-sm md:text-base text-gray-500">${
            doctor.fee ? `Fee: ₹${doctor.fee}` : "Fee not specified"
          }</p>
          <button class="mt-2 bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700 transition-colors text-sm md:text-base book-appointment" data-doctor-id="${
            doctor._id
          }">Book Appointment</button>
        </div>
      </div>
    `
    )
    .join("");

  return `
    <div>
      <p class="text-lg md:text-xl font-semibold mb-4">Here are the available doctors:</p>
      ${doctorHtml}
    </div>
  `;
};

const Chat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const widthsRef = useRef({});
  const measureRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPopup]);

  const API_KEY = "AIzaSyATk3iQ8qM3UtKmeSkUqZyd_LqO6KKB9mU";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const callGeminiAPI = async (language = "English") => {
    setIsLoading(true);
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");

    const wordCount = userMessage.split(/\s+/).length;

    const systemInstruction = `You are a professional healthcare assistant.
Only provide health-related advice, tips, or guidance.
If the query is unrelated to health, reply: "I can't assist with that".
Always respond in the same language as the user.`;

    const userPrompt =
      wordCount < 5
        ? userMessage
        : wordCount >= 5 && wordCount < 10
        ? `Provide a concise healthcare advice with proper formatting and some emojis. Respond in ${language}:\n${userMessage}`
        : `Answer this in a structured, professional healthcare format with bold headings, line breaks, spacing, and a few relevant emojis. Respond in ${language}:\n${userMessage}`;

    const data = {
      contents: [
        {
          parts: [
            { text: `${systemInstruction}\n\nUser Query:\n${userPrompt}` },
          ],
        },
      ],
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      const raw =
        json?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
      const formatted = formatText(raw);

      setMessages((prev) => [...prev, { sender: "ai", text: formatted }]);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Error: " + err.message },
      ]);
    }
  };

  const handleBookDoctor = async () => {
    setIsLoading(true);
    try {
      const storedUser = localStorage.getItem("user");
      let user = null;
      if (storedUser) {
        user = JSON.parse(storedUser);
      }

      if (user?.id) {
        const bookingRes = await fetch(
          `https://telemedicine-backend-2.onrender.com/api/booking/all?patientId=${user.id}`
        );
        const bookingData = await bookingRes.json();
        const bookings = bookingData.bookings || [];

        if (bookings.length > 0) {
          const booking = bookings[0]; // Get the first booking
          setMessages((prev) => [
            ...prev,
            {
              sender: "ai",
              text: `<p class="text-base md:text-lg">You already have a booked appointment on ${booking.date}. 🩺</p>
                     <button class="mt-2 bg-gray-200 text-gray-800 px-4 py-1 rounded-full hover:bg-gray-300 transition-colors text-sm md:text-base track-booking">Track Booking</button>`,
            },
          ]);
        } else {
          const res = await axios.get(
            "https://telemedicine-backend-2.onrender.com/api/doctor/list"
          );
          const doctors = res.data.doctors || [];
          const formattedDoctorList = formatDoctorList(doctors);
          setMessages((prev) => [
            ...prev,
            { sender: "ai", text: formattedDoctorList },
          ]);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: `<p class="text-base md:text-lg">Please log in to book an appointment.</p>`,
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Error checking bookings or fetching doctors: " + err.message,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrackBooking = () => {
    navigate("/track-booking");
  };

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
        "https://telemedicine-backend-2.onrender.com/api/booking/booking",
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
        setShowPopup(false);
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: `<p class="text-base md:text-lg">Booking confirmed for ${selectedDoctor.username} on ${date}. 🩺</p>
                   <button class="mt-2 bg-gray-200 text-gray-800 px-4 py-1 rounded-full hover:bg-gray-300 transition-colors text-sm md:text-base track-booking">Track Booking</button>`,
          },
        ]);
      } else {
        throw new Error(res.data.error || "Booking failed.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    messages.forEach((msg, idx) => {
      if (msg.sender === "user" && !widthsRef.current[idx]) {
        if (measureRef.current) {
          measureRef.current.innerText = msg.text;
          const width = measureRef.current.offsetWidth;
          widthsRef.current[idx] = Math.min(
            width + 32,
            window.innerWidth * 0.75
          );
          setMessages((m) => [...m]);
        }
      }
    });
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.classList.contains("book-appointment")) {
        const doctorId = e.target.getAttribute("data-doctor-id");
        const doctor = messages
          .find(
            (msg) =>
              msg.sender === "ai" &&
              msg.text.includes("Here are the available doctors")
          )
          ?.text.match(/data-doctor-id="([^"]+)"/g)
          ?.map((match) => match.match(/data-doctor-id="([^"]+)"/)[1])
          .map((id) => {
            const regex = new RegExp(
              `data-doctor-id="${id}"[^>]*>([^<]+)</button>`
            );
            const usernameMatch = messages
              .find((msg) => msg.sender === "ai" && msg.text.includes(id))
              ?.text.match(regex);
            return {
              _id: id,
              username: usernameMatch
                ? usernameMatch[1].replace("Book Appointment", "").trim()
                : "",
            };
          })
          .find((doc) => doc._id === doctorId);

        if (doctor) {
          setSelectedDoctor(doctor);
          setShowPopup(true);
        }
      } else if (e.target.classList.contains("track-booking")) {
        navigate("/track-booking");
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [messages, navigate]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") callGeminiAPI();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Back button */}
      {!isMobile && (
        <button
          onClick={() => navigate("/")}
          className="fixed top-4 left-4 z-50 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform duration-200"
          title="Go Back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="stroke-blue-500"
          >
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              d="M11 6L5 12M5 12L11 18M5 12H19"
            />
          </svg>
        </button>
      )}

      {/* Header */}
      <div className="text-center text-xl md:text-2xl font-bold py-4 bg-white shadow text-blue-600 sticky top-0 z-40">
        Telecure Health Assistant
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4 mb-28 md:mb-32">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 animate-pulse">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3063/3063829.png"
              alt="health assistant"
              className="w-24 h-24 md:w-28 md:h-28 mb-4 opacity-70"
            />
            <p className="text-lg md:text-xl font-semibold">
              Welcome to Telecure Health Assistant 🩺
            </p>
            <p className="text-sm md:text-base mt-2 max-w-md">
              Ask any health-related questions or seek medical guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleBookDoctor}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm md:text-base"
              >
                Book a Doctor
              </button>
              <button
                onClick={handleTrackBooking}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300 transition-colors text-sm md:text-base"
              >
                Track Booking
              </button>
            </div>
          </div>
        ) : (
          messages.map((msg, i) => {
            if (msg.sender === "user") {
              const widthStyle = {
                maxWidth: widthsRef.current[i] || "75%",
                width: widthsRef.current[i] || "auto",
                color: "black",
                backgroundColor: "#d1eee0",
              };

              return (
                <div
                  key={i}
                  className="self-end ml-auto text-right rounded-xl px-3 py-2 md:px-4 md:py-3 break-words"
                  style={widthStyle}
                  ref={bottomRef}
                >
                  {msg.text}
                </div>
              );
            } else {
              return (
                <div
                  ref={bottomRef}
                  key={i}
                  className={`bg-[#f4f4f4] text-black self-start text-left shadow px-3 py-2 md:px-4 md:py-3 rounded-xl break-words max-w-[85%] md:max-w-[70%]`}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              );
            }
          })
        )}
        {isLoading && <LoadingResponse />}
      </div>

      {/* Popup for booking */}
      {showPopup && (
        <div className="fixed inset-0 bg-[#00000065] bg-opacity-[0.05] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-lg md:text-xl font-semibold text-blue-600 mb-4">
              Book Appointment with {selectedDoctor?.username}
            </h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {success && (
              <p className="text-green-500 text-sm mb-4">{success}</p>
            )}
            <div className="mb-4">
              <label className="block text-sm md:text-base text-gray-600 mb-2">
                Select Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowPopup(false);
                  setSelectedDoctor(null);
                  setDate("");
                  setError("");
                  setSuccess("");
                }}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors text-sm md:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleBook}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm md:text-base"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed input area */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t px-4 md:px-6 py-3 shadow-lg z-40">
        <div className="flex items-center gap-2 max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask your health question..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
          />
          <button
            onClick={callGeminiAPI}
            className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-[10px] md:text-xs text-gray-500 mt-2 text-center">
          ⚠️ This bot can make mistakes. Always consult a medical professional
          for accurate diagnosis and treatment.
        </p>
      </div>

      <span
        ref={measureRef}
        className="invisible absolute left-[-9999px] top-0 whitespace-nowrap text-black font-semibold px-3 py-2 rounded-xl"
        style={{ fontSize: "0.875rem" }}
      />
    </div>
  );
};

export default Chat;
