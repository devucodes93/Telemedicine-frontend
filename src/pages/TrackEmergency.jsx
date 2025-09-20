import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getDistance } from "geolib";

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const TrackEmergency = () => {
  const [emergency, setEmergency] = useState(null);
  const [patientLocationName, setPatientLocationName] = useState("");
  const [doctorLocationName, setDoctorLocationName] = useState("");

  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    const fetchEmergency = async () => {
      const emergencyData = JSON.parse(localStorage.getItem("emergencyCode"));
      try {
        const res = await fetch(
          `https://telemedicine-backend-2.onrender.com/api/emergencies?code=${emergencyData.emergencyCode}`
        );
        const data = await res.json();
        setEmergency(data.emergencies);

        const { latitude, longitude, doctorLocation } = data.emergencies;

        // Patient location name
        const patientRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const patientData = await patientRes.json();
        setPatientLocationName(patientData.display_name);

        // Doctor location name
        if (doctorLocation?.coordinates) {
          const doctorRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${doctorLocation.coordinates[1]}&lon=${doctorLocation.coordinates[0]}&format=json`
          );
          const doctorData = await doctorRes.json();
          setDoctorLocationName(doctorData.display_name);
        }
      } catch (err) {
        console.error("Error fetching emergency:", err);
      }
    };
    fetchEmergency();
  }, []);

  if (!emergency)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 font-semibold text-lg">
        Loading Emergency Data...
      </div>
    );

  const { latitude, longitude, doctorLocation, option, emergencyCode } =
    emergency;

  const patientPos = [latitude, longitude];
  const doctorPos = doctorLocation?.coordinates
    ? [doctorLocation.coordinates[1], doctorLocation.coordinates[0]]
    : null;

  const distance =
    doctorPos &&
    getDistance(
      { latitude, longitude },
      { latitude: doctorPos[0], longitude: doctorPos[1] }
    ) / 1000;

  const locationNameToShow =
    user.role === "Doctor" ? patientLocationName : doctorLocationName;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center sm:text-left">
        Track Emergency
      </h1>

      {/* Emergency Info Card */}
      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <span className="font-medium text-gray-600">Code: {emergencyCode}</span>
        <span className="font-medium text-gray-600">Option: {option}</span>
        {distance && (
          <span className="font-semibold text-red-600">
            Distance: {distance.toFixed(2)} km
          </span>
        )}
      </div>

      {/* Map */}
      <div className="w-full h-96 sm:h-[500px] rounded-xl overflow-hidden shadow-lg">
        <MapContainer
          center={patientPos}
          zoom={14}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={patientPos}>
            <Popup>Patient</Popup>
          </Marker>
          {doctorPos && (
            <>
              <Marker position={doctorPos}>
                <Popup>Doctor</Popup>
              </Marker>
              <Polyline positions={[patientPos, doctorPos]} color="red" />
            </>
          )}
        </MapContainer>
      </div>

      {/* Location Info Card */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <span className="font-medium text-gray-800">
          {user.role === "Doctor" ? "Patient Location:" : "Doctor Location:"}
        </span>
        <span className="text-gray-600 break-words">{locationNameToShow}</span>
      </div>
    </div>
  );
};

export default TrackEmergency;
