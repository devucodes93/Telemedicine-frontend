import React from "react";
import { useParams } from "react-router-dom";

const CallPageLoad = () => {
  const { id } = useParams();

  // Placeholder for video call logic (e.g., WebRTC, Jitsi, etc.)
  // You can integrate a video call SDK here

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Video Call Room</h1>
      <div className="mb-2 text-lg">
        Call ID: <span className="font-mono text-blue-600">{id}</span>
      </div>
      {/* Video call UI goes here */}
      <div className="w-full max-w-2xl h-96 bg-white rounded-lg shadow flex items-center justify-center">
        <span className="text-gray-400">Video call will appear here</span>
      </div>
    </div>
  );
};

export default CallPageLoad;
