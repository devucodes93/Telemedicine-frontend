import React, { createContext, useContext, useState, useEffect } from "react";

const translations = {
  en: {
    upcomingAppointments: "Upcoming Appointments",
    loadingAppointments: "Loading appointments...",
    noUpcomingAppointments: "No upcoming appointments.",
    patientName: "Patient Name",
    email: "Email",
    phone: "Phone",
    date: "Date",
    time: "Time",
    join: "Join",
    doctorDashboard: "Doctor Dashboard",
    changeLanguage: "Change Language",
    home: "Home",
    appointments: "Appointments",
    healthRecords: "Health Records",
    pharmacy: "Pharmacy",
    support: "Support",
  },
  hi: {
    upcomingAppointments: "आगामी अपॉइंटमेंट्स",
    loadingAppointments: "अपॉइंटमेंट्स लोड हो रहे हैं...",
    noUpcomingAppointments: "कोई आगामी अपॉइंटमेंट नहीं।",
    patientName: "रोगी का नाम",
    email: "ईमेल",
    phone: "फोन",
    date: "तारीख",
    time: "समय",
    join: "जोड़ें",
    doctorDashboard: "डॉक्टर डैशबोर्ड",
    changeLanguage: "भाषा बदलें",
    home: "होम",
    appointments: "अपॉइंटमेंट्स",
    healthRecords: "हेल्थ रिकॉर्ड्स",
    pharmacy: "फार्मेसी",
    support: "सहायता",
  },
  kn: {
    upcomingAppointments: "ಮುಂಬರುವ ನೇಮಕಾತಿಗಳು",
    loadingAppointments: "ನೇಮಕಾತಿಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    noUpcomingAppointments: "ಯಾವುದೇ ಮುಂಬರುವ ನೇಮಕಾತಿಗಳು ಇಲ್ಲ.",
    patientName: "ರೋಗಿಯ ಹೆಸರು",
    email: "ಇಮೇಲ್",
    phone: "ಫೋನ್",
    date: "ದಿನಾಂಕ",
    time: "ಸಮಯ",
    join: "ಸೇರಿಸಿ",
    doctorDashboard: "ಡಾಕ್ಟರ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    changeLanguage: "ಭಾಷೆ ಬದಲಿಸಿ",
    home: "ಮುಖಪುಟ",
    appointments: "ನೇಮಕಾತಿಗಳು",
    healthRecords: "ಆರೋಗ್ಯ ದಾಖಲೆಗಳು",
    pharmacy: "ಫಾರ್ಮಸಿ",
    support: "ಬೆಂಬಲ",
  },
  // Add more languages as needed
};

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("siteLanguage") || "en"
  );

  useEffect(() => {
    localStorage.setItem("siteLanguage", language);
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || translations["en"][key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
