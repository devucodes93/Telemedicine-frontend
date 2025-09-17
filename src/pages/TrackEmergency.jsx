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

        // Fetch location names
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

  if (!emergency) return <div>Loading...</div>;

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

  // Determine which location to show based on role
  const locationNameToShow =
    user.role === "Doctor" ? patientLocationName : doctorLocationName;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Track Emergency</h1>

      {/* Emergency Info */}
      <div className="flex justify-between items-center bg-white shadow-md rounded-xl p-4">
        <span className="font-medium text-gray-600">Code: {emergencyCode}</span>
        <span className="font-medium text-gray-600">Option: {option}</span>
        {distance && (
          <span className="font-semibold text-red-600">
            Distance: {distance.toFixed(2)} km
          </span>
        )}
      </div>

      {/* Map */}
      <div className="w-full h-96 rounded-xl overflow-hidden shadow-md">
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

      {/* Location Info */}
      <div className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center">
        <span className="font-medium text-gray-800">
          {user.role === "Doctor" ? "Patient Location:" : "Doctor Location:"}
        </span>

        <span className="text-gray-600">{locationNameToShow}</span>
      </div>
    </div>
  );
};

export default TrackEmergency;
