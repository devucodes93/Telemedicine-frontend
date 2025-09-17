import React, { useEffect } from "react";
import Nav from "../components/Nav";
import "./Loader.css";
import useSocketStore from "../store/socketStore";

// RadarLoader component with blinking dots
const RadarLoader = () => {
  const { socket } = useSocketStore();

  useEffect(() => {
    socket.on("emergency-accepted", (data) => {
      console.log("Emergency accepted:", data);
      window.location.href = "/track-emergency";
      localStorage.setItem("emergencyCode", JSON.stringify(data || {}));
    });
  }, [socket]);
  const dots = [
    { angle: 25, radius: 50 },
    { angle: 80, radius: 65 },
    { angle: 145, radius: 55 },
    { angle: 20, radius: 70 },
    { angle: 300, radius: 60 },
  ];

  return (
    <div
      className="loader"
      style={{ transform: "scale(2)", position: "relative" }}
    >
      <span></span>
      {dots.map((dot, i) => {
        const rad = (dot.angle * Math.PI) / 180;
        const x = 75 + dot.radius * Math.cos(rad);
        const y = 75 + dot.radius * Math.sin(rad);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - 5,
              top: y - 5,
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 0 8px 2px #fff",
              opacity: 0.7,
              animation: "blinkDot 2s infinite",
              zIndex: 2,
            }}
          />
        );
      })}
      <style>{`
        @keyframes blinkDot {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
};

const Finding = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 w-full h-screen bg-black flex flex-col">
      <Nav />
      <div className="flex-1 flex flex-col justify-center items-center">
        <RadarLoader />
        <div className="mt-22 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white animate-pulse mb-2 text-center drop-shadow-lg">
            Waiting for doctors to respond
          </h2>
          <p className="text-base sm:text-lg text-gray-300 text-center">
            It may take a few seconds.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Finding;
