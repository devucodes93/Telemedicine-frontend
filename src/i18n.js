import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      Welcome: "Welcome to Our Telecure Platform",
      CareMeetsConvenience: "Care Meets Convenience",
      BookDoctor: "Book Doctor",
      TrackBooking: "Track Booking",
      BookingCancelled: "Booking Cancelled",
      WhyChoose: "Why Choose Telecure?",
      ModernHealthcare: "Experience modern healthcare designed for you",
      LiveDoctorConsultation: "24/7 Live Doctor Consultation",
      LiveDoctorConsultationDesc:
        "Connect with certified doctors anytime, anywhere for immediate care.",
      EPrescriptions: "E-Prescriptions",
      EPrescriptionsDesc:
        "Receive valid digital prescriptions sent directly to your pharmacy.",
      AISymptomChecker: "AI-Symptom Checker",
      AISymptomCheckerDesc:
        "Get instant, reliable health insights powered by AI.",
      Convenience: "Convenience",
      ConvenienceDesc:
        "Connect to doctors within a click from the comfort of your house.",
      QuickSupport: "Quick Support",
      QuickSupportDesc:
        "Call for help or get instant medical assistance at the time of emergency within a click.",
      ReportTracking: "Report tracking",
      ReportTrackingDesc:
        "Track your report on your device without having to go to the hospital.",
      HowItWorks: "How it Works",
      Step1Title: "Step 1: Find Your Doctor",
      Step1Desc:
        "Browse through our list of certified specialists or use the search to find one that fits your needs.",
      Step2Title: "Step 2: Start Your Consultation",
      Step2Desc:
        "Choose an available time slot and connect with your doctor instantly via a secure video call.",
      Step3Title: "Step 3: Get Your Prescription",
      Step3Desc:
        "Receive your diagnosis and get prescriptions sent directly to a local pharmacy of your choice.",
      EverythingYouNeed: "Everything You Need for Your Health",
      EverythingYouNeedDesc:
        "From instant consultations to managing your health records, all in one place.",
      VideoConsultations: "Video Consultations",
      VideoConsultationsDesc:
        "Connect with certified doctors instantly through secure, high-quality video calls from the comfort of your home.",
      EPrescriptionsDesc2:
        "Receive digital prescriptions from your doctor directly in the app, sent to a local pharmacy of your choice.",
      AISymptomCheckerDesc2:
        "Unsure about your symptoms? Our intelligent AI helps you understand potential conditions and guides you to the right specialist.",
      BuyMedicine: "Buy Medicine",
      BuyMedicineDesc:
        "Order prescribed medicines and wellness products from trusted partner pharmacies and get them delivered to your doorstep.",
      TrackReports: "Track Reports",
      TrackReportsDesc:
        "Securely store and access all your medical reports and consultation history in one place, available anytime you need it.",
      ReadyToTakeControl: "Ready to take control of your health?",
      JoinTelecure:
        "Join Telecure today and get access to quality healthcare, anytime you need it.",
      GetStartedNow: "Get Started Now",
      
  OurPurpose: "Bridging Distances, Delivering Care",
  PurposeText: "In a country as vast as India, timely access to quality healthcare remains a significant challenge, often hindered by distance, time, and cost. As a team of passionate technologists, we chose this problem because we believe in the power of technology to create a more equitable healthcare system. Our purpose is to build a seamless, secure, and user-friendly platform that connects patients with qualified doctors, ensuring that expert medical advice is just a click away for everyone, everywhere.",
  
  OurCoreBeliefs: "Our Guiding Principles",
  OurMission: "Our Mission",
  MissionText: "To leverage cutting-edge technology to provide instant, affordable, and high-quality virtual healthcare consultations, breaking down the barriers of geography and time for every patient.",
  OurVision: "Our Vision",
  VisionText: "To create a future where every Indian has equitable access to premier healthcare services from the comfort of their home, leading to healthier communities and a stronger nation.",
  
  MeetTheTeam: "Meet the Team",
  FrontendDeveloper: "Frontend Developer",
  BackendDeveloper: "Backend Developer",
  UIDesigner: "UI/UX Designer",
  
  WhoWeHelp: "Solving for Real People",
  PersonaTitle: "A Story for {{name}}",
  PriyaPersonaStory: "As a busy software developer in Bengaluru, Priya can't afford to lose half a day for a doctor's visit. When she noticed a sudden skin rash, our platform allowed her to connect with a top dermatologist between meetings, getting a diagnosis and prescription in under 15 minutes.",
  RohanPersonaStory: "Rohan lives in a Tier-2 city and manages his elderly parents' health. For his father's regular diabetes follow-ups, traveling to a specialist was a recurring challenge. Our service enables his parents to consult with an endocrinologist from their home, ensuring consistent care and peace of mind for Rohan.",

  OurGoals: "Our Vision for the Future",
  TargetConsultations: "Consultations in Year One",
  TargetSatisfaction: "Patient Satisfaction Rate",
  TargetWaitTime: "Average Wait Time",

  FAQ: "Frequently Asked Questions"

    },
  },
  hi: {
    translation: {
      Welcome: "हमारे टेलीकेयर प्लेटफॉर्म में आपका स्वागत है",
      CareMeetsConvenience: "सुविधा से मिलती देखभाल",
      BookDoctor: "डॉक्टर बुक करें",
      TrackBooking: "बुकिंग ट्रैक करें",
      BookingCancelled: "बुकिंग रद्द की गई",
      WhyChoose: "टेलीकेयर क्यों चुनें?",
      ModernHealthcare:
        "आपके लिए डिज़ाइन की गई आधुनिक स्वास्थ्य सेवा का अनुभव करें",
      LiveDoctorConsultation: "24/7 लाइव डॉक्टर परामर्श",
      LiveDoctorConsultationDesc:
        "किसी भी समय, कहीं भी प्रमाणित डॉक्टरों से तुरंत देखभाल प्राप्त करें।",
      EPrescriptions: "ई-प्रिस्क्रिप्शन",
      EPrescriptionsDesc:
        "डिजिटल प्रिस्क्रिप्शन सीधे आपके फ़ार्मेसी में भेजे जाते हैं।",
      AISymptomChecker: "एआई-लक्षण चेकर",
      AISymptomCheckerDesc:
        "एआई द्वारा संचालित त्वरित, विश्वसनीय स्वास्थ्य जानकारी प्राप्त करें।",
      Convenience: "सुविधा",
      ConvenienceDesc: "अपने घर से एक क्लिक में डॉक्टरों से जुड़ें।",
      QuickSupport: "त्वरित सहायता",
      QuickSupportDesc:
        "आपातकाल में एक क्लिक में तुरंत चिकित्सा सहायता प्राप्त करें।",
      ReportTracking: "रिपोर्ट ट्रैकिंग",
      ReportTrackingDesc: "बिना अस्पताल जाए अपने डिवाइस पर रिपोर्ट ट्रैक करें।",
      HowItWorks: "कैसे काम करता है",
      Step1Title: "चरण 1: अपना डॉक्टर खोजें",
      Step1Desc:
        "हमारे प्रमाणित विशेषज्ञों की सूची देखें या अपनी आवश्यकता के अनुसार खोजें।",
      Step2Title: "चरण 2: अपनी परामर्श शुरू करें",
      Step2Desc:
        "उपलब्ध समय चुनें और सुरक्षित वीडियो कॉल के माध्यम से डॉक्टर से जुड़ें।",
      Step3Title: "चरण 3: अपनी प्रिस्क्रिप्शन प्राप्त करें",
      Step3Desc:
        "अपना निदान प्राप्त करें और प्रिस्क्रिप्शन सीधे स्थानीय फ़ार्मेसी में भेजें।",
      EverythingYouNeed: "आपके स्वास्थ्य के लिए सब कुछ",
      EverythingYouNeedDesc:
        "तुरंत परामर्श से लेकर स्वास्थ्य रिकॉर्ड प्रबंधन तक, सब एक जगह।",
      VideoConsultations: "वीडियो परामर्श",
      VideoConsultationsDesc:
        "अपने घर से सुरक्षित, उच्च गुणवत्ता वाले वीडियो कॉल के माध्यम से प्रमाणित डॉक्टरों से तुरंत जुड़ें।",
      EPrescriptionsDesc2:
        "डॉक्टर से डिजिटल प्रिस्क्रिप्शन सीधे ऐप में प्राप्त करें, स्थानीय फ़ार्मेसी में भेजें।",
      AISymptomCheckerDesc2:
        "अपने लक्षणों को लेकर अनिश्चित हैं? हमारा एआई आपको संभावित स्थितियों को समझने और सही विशेषज्ञ तक मार्गदर्शन करता है।",
      BuyMedicine: "दवा खरीदें",
      BuyMedicineDesc:
        "विश्वसनीय फ़ार्मेसी से दवाएं और वेलनेस उत्पाद ऑर्डर करें और घर पर डिलीवरी पाएं।",
      TrackReports: "रिपोर्ट ट्रैक करें",
      TrackReportsDesc:
        "अपने सभी मेडिकल रिपोर्ट और परामर्श इतिहास को एक जगह सुरक्षित रूप से स्टोर और एक्सेस करें।",
      ReadyToTakeControl: "क्या आप अपने स्वास्थ्य का नियंत्रण लेना चाहते हैं?",
      JoinTelecure:
        "आज ही टेलीकेयर से जुड़ें और कभी भी गुणवत्तापूर्ण स्वास्थ्य सेवा प्राप्त करें।",
      GetStartedNow: "अभी शुरू करें",
    },
  },
  kn: {
    translation: {
      Welcome: "ನಮ್ಮ ಟೆಲಿಕ್ಯೂರ್ ವೇದಿಕೆಗೆ ಸ್ವಾಗತ",
      CareMeetsConvenience: "ಆರೋಗ್ಯ ಸೇವೆ ಸುಲಭವಾಗಿ",
      BookDoctor: "ಡಾಕ್ಟರ್ ಬುಕ್ ಮಾಡಿ",
      TrackBooking: "ಬುಕಿಂಗ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
      BookingCancelled: "ಬುಕಿಂಗ್ ರದ್ದುಪಡಿಸಲಾಗಿದೆ",
      WhyChoose: "ಟೆಲಿಕ್ಯೂರ್ ಅನ್ನು ಏಕೆ ಆಯ್ಕೆಮಾಡಬೇಕು?",
      ModernHealthcare:
        "ನಿಮಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಿದ ಆಧುನಿಕ ಆರೋಗ್ಯ ಸೇವೆಯನ್ನು ಅನುಭವಿಸಿ",
      LiveDoctorConsultation: "24/7 ಲೈವ್ ಡಾಕ್ಟರ್ ಸಲಹೆ",
      LiveDoctorConsultationDesc:
        "ಯಾವುದೇ ಸಮಯದಲ್ಲಿ, ಎಲ್ಲಿಯೂ ಪ್ರಮಾಣಿತ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ ಮತ್ತು ತಕ್ಷಣ ಚಿಕಿತ್ಸೆ ಪಡೆಯಿರಿ.",
      EPrescriptions: "ಇ-ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್",
      EPrescriptionsDesc:
        "ಡಿಜಿಟಲ್ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ನೇರವಾಗಿ ನಿಮ್ಮ ಫಾರ್ಮಸಿಗೆ ಕಳುಹಿಸಲಾಗುತ್ತದೆ.",
      AISymptomChecker: "ಎಐ-ಲಕ್ಷಣ ಪರಿಶೀಲಕ",
      AISymptomCheckerDesc: "ಎಐ ಮೂಲಕ ತಕ್ಷಣ, ವಿಶ್ವಾಸಾರ್ಹ ಆರೋಗ್ಯ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.",
      Convenience: "ಸೌಲಭ್ಯ",
      ConvenienceDesc: "ನಿಮ್ಮ ಮನೆಯಿಂದ ಒಂದು ಕ್ಲಿಕ್‌ನಲ್ಲಿ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      QuickSupport: "ತ್ವರಿತ ಸಹಾಯ",
      QuickSupportDesc:
        "ಅಪಘಾತದ ಸಮಯದಲ್ಲಿ ಒಂದು ಕ್ಲಿಕ್‌ನಲ್ಲಿ ತಕ್ಷಣ ವೈದ್ಯಕೀಯ ಸಹಾಯ ಪಡೆಯಿರಿ.",
      ReportTracking: "ರಿಪೋರ್ಟ್ ಟ್ರ್ಯಾಕಿಂಗ್",
      ReportTrackingDesc:
        "ಆಸ್ಪತ್ರೆಗೆ ಹೋಗದೆ ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ರಿಪೋರ್ಟ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",
      HowItWorks: "ಹೆಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
      Step1Title: "ಹಂತ 1: ನಿಮ್ಮ ವೈದ್ಯರನ್ನು ಹುಡುಕಿ",
      Step1Desc:
        "ನಮ್ಮ ಪ್ರಮಾಣಿತ ತಜ್ಞರ ಪಟ್ಟಿಯನ್ನು ವೀಕ್ಷಿಸಿ ಅಥವಾ ನಿಮ್ಮ ಅಗತ್ಯಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಹುಡುಕಿ.",
      Step2Title: "ಹಂತ 2: ನಿಮ್ಮ ಸಲಹೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿ",
      Step2Desc:
        "ಲಭ್ಯವಿರುವ ಸಮಯ ಆಯ್ಕೆ ಮಾಡಿ ಮತ್ತು ಸುರಕ್ಷಿತ ವಿಡಿಯೋ ಕಾಲ್ ಮೂಲಕ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      Step3Title: "ಹಂತ 3: ನಿಮ್ಮ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಪಡೆಯಿರಿ",
      Step3Desc:
        "ನಿಮ್ಮ ರೋಗನಿರ್ಣಯವನ್ನು ಪಡೆಯಿರಿ ಮತ್ತು ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ನೇರವಾಗಿ ಸ್ಥಳೀಯ ಫಾರ್ಮಸಿಗೆ ಕಳುಹಿಸಿ.",
      EverythingYouNeed: "ನಿಮ್ಮ ಆರೋಗ್ಯಕ್ಕಾಗಿ ಎಲ್ಲವೂ",
      EverythingYouNeedDesc:
        "ತಕ್ಷಣ ಸಲಹೆಗಳಿಂದ ಆರೋಗ್ಯ ದಾಖಲೆ ನಿರ್ವಹಣೆಗೆ, ಎಲ್ಲವೂ ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ.",
      VideoConsultations: "ವೀಡಿಯೋ ಸಲಹೆ",
      VideoConsultationsDesc:
        "ನಿಮ್ಮ ಮನೆಯಿಂದ ಸುರಕ್ಷಿತ, ಉನ್ನತ ಗುಣಮಟ್ಟದ ವೀಡಿಯೋ ಕಾಲ್ ಮೂಲಕ ಪ್ರಮಾಣಿತ ವೈದ್ಯರನ್ನು ತಕ್ಷಣ ಸಂಪರ್ಕಿಸಿ.",
      EPrescriptionsDesc2:
        "ವೈದ್ಯರಿಂದ ಡಿಜಿಟಲ್ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ನೇರವಾಗಿ ಆ್ಯಪ್‌ನಲ್ಲಿ ಪಡೆಯಿರಿ, ಸ್ಥಳೀಯ ಫಾರ್ಮಸಿಗೆ ಕಳುಹಿಸಿ.",
      AISymptomCheckerDesc2:
        "ನಿಮ್ಮ ಲಕ್ಷಣಗಳ ಬಗ್ಗೆ ಅನುಮಾನವಿದೆಯೆ? ನಮ್ಮ ಎಐ ನಿಮಗೆ ಸಾಧ್ಯವಿರುವ ಸ್ಥಿತಿಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಮತ್ತು ಸರಿಯಾದ ತಜ್ಞರಿಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ.",
      BuyMedicine: "ಔಷಧಿ ಖರೀದಿಸಿ",
      BuyMedicineDesc:
        "ವಿಶ್ವಾಸಾರ್ಹ ಫಾರ್ಮಸಿಯಿಂದ ಔಷಧಿಗಳು ಮತ್ತು ವೆಲ್‌ನೆಸ್ ಉತ್ಪನ್ನಗಳನ್ನು ಆರ್ಡರ್ ಮಾಡಿ ಮತ್ತು ಮನೆಗೆ ತಲುಪಿಸಿ.",
      TrackReports: "ರಿಪೋರ್ಟ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
      TrackReportsDesc:
        "ನಿಮ್ಮ ಎಲ್ಲಾ ವೈದ್ಯಕೀಯ ವರದಿ ಮತ್ತು ಸಲಹೆ ಇತಿಹಾಸವನ್ನು ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹಿಸಿ ಮತ್ತು ಪ್ರವೇಶಿಸಿ.",
      ReadyToTakeControl: "ನೀವು ನಿಮ್ಮ ಆರೋಗ್ಯವನ್ನು ನಿಯಂತ್ರಿಸಲು ಸಿದ್ಧರಾಗಿದ್ದೀರಾ?",
      JoinTelecure:
        "ಇಂದು ಟೆಲಿಕ್ಯೂರ್‌ಗೆ ಸೇರಿ ಮತ್ತು ಯಾವಾಗ ಬೇಕಾದರೂ ಗುಣಮಟ್ಟದ ಆರೋಗ್ಯ ಸೇವೆಯನ್ನು ಪಡೆಯಿರಿ.",
      GetStartedNow: "ಈಗ ಪ್ರಾರಂಭಿಸಿ",
    },
  },
  ta: {
    translation: {
      Welcome: "எங்கள் டெலிக்யூர் தளத்திற்கு வரவேற்கிறோம்",
      CareMeetsConvenience: "சுகாதார சேவை வசதியாக",
      BookDoctor: "டாக்டரை முன்பதிவு செய்யவும்",
      TrackBooking: "புக்கிங் கண்காணிக்கவும்",
      BookingCancelled: "புக்கிங் ரத்து செய்யப்பட்டது",
      WhyChoose: "டெலிக்யூரை ஏன் தேர்வு செய்ய வேண்டும்?",
      ModernHealthcare:
        "உங்களுக்காக வடிவமைக்கப்பட்ட நவீன சுகாதார சேவையை அனுபவிக்கவும்",
      LiveDoctorConsultation: "24/7 நேரடி டாக்டர் ஆலோசனை",
      LiveDoctorConsultationDesc:
        "எப்போது வேண்டுமானாலும், எங்கே வேண்டுமானாலும் சான்றளிக்கப்பட்ட டாக்டர்களுடன் உடனடி பராமரிப்பு பெறுங்கள்.",
      EPrescriptions: "இ-மருந்து",
      EPrescriptionsDesc:
        "டிஜிட்டல் மருந்து நேரடியாக உங்கள் மருந்தகத்திற்கு அனுப்பப்படும்.",
      AISymptomChecker: "ஏஐ-அறிகுறி சரிபார்ப்பு",
      AISymptomCheckerDesc:
        "ஏஐ மூலம் உடனடி, நம்பகமான சுகாதார தகவலைப் பெறுங்கள்.",
      Convenience: "வசதி",
      ConvenienceDesc:
        "உங்கள் வீட்டிலிருந்து ஒரு கிளிக்கில் டாக்டர்களுடன் இணைக.",
      QuickSupport: "விரைவு ஆதரவு",
      QuickSupportDesc:
        "அவசர நேரத்தில் ஒரு கிளிக்கில் உடனடி மருத்துவ உதவி பெறுங்கள்.",
      ReportTracking: "அறிக்கை கண்காணிப்பு",
      ReportTrackingDesc:
        "மருத்துவமனைக்கு செல்லாமல் உங்கள் சாதனத்தில் அறிக்கையை கண்காணிக்கவும்.",
      HowItWorks: "எப்படி வேலை செய்கிறது",
      Step1Title: "படி 1: உங்கள் டாக்டரை கண்டறியவும்",
      Step1Desc:
        "எங்கள் சான்றளிக்கப்பட்ட நிபுணர்களின் பட்டியலைப் பார்க்கவும் அல்லது உங்கள் தேவைக்கேற்றவாறு தேடவும்.",
      Step2Title: "படி 2: உங்கள் ஆலோசனையை தொடங்கவும்",
      Step2Desc:
        "கிடைக்கும் நேரத்தைத் தேர்ந்தெடுத்து பாதுகாப்பான வீடியோ அழைப்பில் டாக்டருடன் இணைக.",
      Step3Title: "படி 3: உங்கள் மருந்தை பெறுங்கள்",
      Step3Desc:
        "உங்கள் நோயறிதலைப் பெறுங்கள் மற்றும் மருந்தை நேரடியாக உள்ளூர் மருந்தகத்திற்கு அனுப்புங்கள்.",
      EverythingYouNeed: "உங்கள் சுகாதாரத்திற்கான அனைத்தும்",
      EverythingYouNeedDesc:
        "உடனடி ஆலோசனையிலிருந்து சுகாதார பதிவுகளை நிர்வகிப்பது வரை, அனைத்தும் ஒரே இடத்தில்.",
      VideoConsultations: "வீடியோ ஆலோசனை",
      VideoConsultationsDesc:
        "உங்கள் வீட்டிலிருந்து பாதுகாப்பான, உயர் தரமான வீடியோ அழைப்பில் சான்றளிக்கப்பட்ட டாக்டர்களுடன் உடனடி இணைப்பு பெறுங்கள்.",
      EPrescriptionsDesc2:
        "டாக்டரிடமிருந்து டிஜிட்டல் மருந்தை நேரடியாக செயலியில் பெறுங்கள், உள்ளூர் மருந்தகத்திற்கு அனுப்புங்கள்.",
      AISymptomCheckerDesc2:
        "உங்கள் அறிகுறிகள் குறித்து சந்தேகமா? எங்கள் ஏஐ உங்களுக்கு சாத்தியமான நிலைகளைப் புரிந்துகொள்ளவும் சரியான நிபுணரிடம் வழிகாட்டவும் உதவுகிறது.",
      BuyMedicine: "மருந்து வாங்குங்கள்",
      BuyMedicineDesc:
        "நம்பகமான மருந்தகத்திலிருந்து மருந்துகள் மற்றும் நலன் பொருட்களை ஆர்டர் செய்து வீட்டிற்கு பெற்றுக்கொள்ளுங்கள்.",
      TrackReports: "அறிக்கைகளை கண்காணிக்கவும்",
      TrackReportsDesc:
        "உங்கள் அனைத்து மருத்துவ அறிக்கைகள் மற்றும் ஆலோசனை வரலாற்றை ஒரே இடத்தில் பாதுகாப்பாக சேமித்து அணுகவும்.",
      ReadyToTakeControl: "உங்கள் சுகாதாரத்தை கட்டுப்படுத்த தயாரா?",
      JoinTelecure:
        "இன்று டெலிக்யூரில் சேருங்கள் மற்றும் எப்போது வேண்டுமானாலும் தரமான சுகாதார சேவையைப் பெறுங்கள்.",
      GetStartedNow: "இப்போது தொடங்குங்கள்",
    },
  },
  ml: {
    translation: {
      Welcome: "ഞങ്ങളുടെ ടെലിക്യൂർ പ്ലാറ്റ്‌ഫോമിലേക്ക് സ്വാഗതം",
      CareMeetsConvenience: "ആരോഗ്യ സേവനം സൗകര്യപ്രദമായി",
      BookDoctor: "ഡോക്ടറെ ബുക്ക് ചെയ്യുക",
      TrackBooking: "ബുക്കിംഗ് ട്രാക്ക് ചെയ്യുക",
      BookingCancelled: "ബുക്കിംഗ് റദ്ദാക്കി",
      WhyChoose: "ടെലിക്യൂർ എങ്ങനെ തിരഞ്ഞെടുക്കാം?",
      ModernHealthcare:
        "നിങ്ങൾക്കായി രൂപകൽപ്പന ചെയ്ത ആധുനിക ആരോഗ്യ സേവനം അനുഭവിക്കുക",
      LiveDoctorConsultation: "24/7 ലൈവ് ഡോക്ടർ കൺസൾട്ടേഷൻ",
      LiveDoctorConsultationDesc:
        "ഏത് സമയത്തും, എവിടെയും സർട്ടിഫൈഡ് ഡോക്ടർമാരുമായി ഉടൻ ബന്ധപ്പെടുക.",
      EPrescriptions: "ഇ-പ്രിസ്ക്രിപ്ഷൻ",
      EPrescriptionsDesc:
        "ഡിജിറ്റൽ പ്രിസ്ക്രിപ്ഷൻ നേരിട്ട് നിങ്ങളുടെ ഫാർമസിയിലേക്ക് അയക്കുന്നു.",
      AISymptomChecker: "എഐ-ലക്ഷണ പരിശോധന",
      AISymptomCheckerDesc:
        "എഐ ഉപയോഗിച്ച് ഉടൻ, വിശ്വസനീയമായ ആരോഗ്യ വിവരങ്ങൾ നേടുക.",
      Convenience: "സൗകര്യം",
      ConvenienceDesc:
        "നിങ്ങളുടെ വീട്ടിൽ നിന്ന് ഒരു ക്ലിക്കിൽ ഡോക്ടർമാരുമായി ബന്ധപ്പെടുക.",
      QuickSupport: "വേഗത്തിലുള്ള സഹായം",
      QuickSupportDesc: "അപകട സമയത്ത് ഒരു ക്ലിക്കിൽ ഉടൻ മെഡിക്കൽ സഹായം നേടുക.",
      ReportTracking: "റിപ്പോർട്ട് ട്രാക്കിംഗ്",
      ReportTrackingDesc:
        "ആശുപത്രിയിൽ പോകാതെ നിങ്ങളുടെ ഉപകരണത്തിൽ റിപ്പോർട്ട് ട്രാക്ക് ചെയ്യുക.",
      HowItWorks: "എങ്ങനെ പ്രവർത്തിക്കുന്നു",
      Step1Title: "പടി 1: നിങ്ങളുടെ ഡോക്ടറെ കണ്ടെത്തുക",
      Step1Desc:
        "ഞങ്ങളുടെ സർട്ടിഫൈഡ് വിദഗ്ധരുടെ പട്ടിക കാണുക അല്ലെങ്കിൽ നിങ്ങളുടെ ആവശ്യത്തിന് അനുയോജ്യമായത് തിരയുക.",
      Step2Title: "പടി 2: നിങ്ങളുടെ കൺസൾട്ടേഷൻ ആരംഭിക്കുക",
      Step2Desc:
        "ലഭ്യമായ സമയം തിരഞ്ഞെടുക്കുക, സുരക്ഷിതമായ വീഡിയോ കോൾ വഴി ഡോക്ടറുമായി ബന്ധപ്പെടുക.",
      Step3Title: "പടി 3: നിങ്ങളുടെ പ്രിസ്ക്രിപ്ഷൻ നേടുക",
      Step3Desc:
        "നിങ്ങളുടെ രോഗനിർണയം നേടുക, പ്രിസ്ക്രിപ്ഷൻ നേരിട്ട് പ്രാദേശിക ഫാർമസിയിലേക്ക് അയക്കുക.",
      EverythingYouNeed: "നിങ്ങളുടെ ആരോഗ്യത്തിനായി എല്ലാം",
      EverythingYouNeedDesc:
        "ഉടൻ കൺസൾട്ടേഷനുകളിൽ നിന്ന് ആരോഗ്യ രേഖകൾ കൈകാര്യം ചെയ്യുന്നതുവരെ, എല്ലാം ഒരിടത്ത്.",
      VideoConsultations: "വീഡിയോ കൺസൾട്ടേഷൻ",
      VideoConsultationsDesc:
        "നിങ്ങളുടെ വീട്ടിൽ നിന്ന് സുരക്ഷിതമായ, ഉയർന്ന നിലവാരമുള്ള വീഡിയോ കോൾ വഴി സർട്ടിഫൈഡ് ഡോക്ടർമാരുമായി ഉടൻ ബന്ധപ്പെടുക.",
      EPrescriptionsDesc2:
        "ഡോക്ടറിൽ നിന്ന് ഡിജിറ്റൽ പ്രിസ്ക്രിപ്ഷൻ നേരിട്ട് ആപ്പിൽ ലഭിക്കുക, പ്രാദേശിക ഫാർമസിയിലേക്ക് അയക്കുക.",
      AISymptomCheckerDesc2:
        "നിങ്ങളുടെ ലക്ഷണങ്ങൾ സംബന്ധിച്ച് ഉറപ്പില്ലേ? ഞങ്ങളുടെ എഐ നിങ്ങൾക്ക് സാധ്യതയുള്ള അവസ്ഥകൾ മനസ്സിലാക്കാനും ശരിയായ വിദഗ്ധരിലേക്ക് വഴികാട്ടാനും സഹായിക്കുന്നു.",
      BuyMedicine: "മരുന്ന് വാങ്ങുക",
      BuyMedicineDesc:
        "വിശ്വസനീയമായ ഫാർമസിയിൽ നിന്ന് മരുന്നുകളും വെൽനസ് ഉൽപ്പന്നങ്ങളും ഓർഡർ ചെയ്ത് വീട്ടിൽ ലഭിക്കുക.",
      TrackReports: "റിപ്പോർട്ടുകൾ ട്രാക്ക് ചെയ്യുക",
      TrackReportsDesc:
        "നിങ്ങളുടെ എല്ലാ മെഡിക്കൽ റിപ്പോർട്ടുകളും കൺസൾട്ടേഷൻ ചരിത്രവും ഒരിടത്ത് സുരക്ഷിതമായി സൂക്ഷിക്കുകയും ആക്സസ് ചെയ്യുകയും ചെയ്യുക.",
      ReadyToTakeControl:
        "നിങ്ങൾ നിങ്ങളുടെ ആരോഗ്യത്തെ നിയന്ത്രിക്കാൻ തയ്യാറാണോ?",
      JoinTelecure:
        "ഇന്ന് ടെലിക്യൂറിൽ ചേരുക, എപ്പോൾ വേണമെങ്കിലും ഗുണനിലവാരമുള്ള ആരോഗ്യ സേവനം നേടുക.",
      GetStartedNow: "ഇപ്പോൾ ആരംഭിക്കുക",
    },
  },
  bn: {
    translation: {
      Welcome: "আমাদের টেলিকিউর প্ল্যাটফর্মে স্বাগতম",
      CareMeetsConvenience: "স্বাস্থ্যসেবা সহজে",
      BookDoctor: "ডাক্তার বুক করুন",
      TrackBooking: "বুকিং ট্র্যাক করুন",
      BookingCancelled: "বুকিং বাতিল হয়েছে",
      WhyChoose: "টেলিকিউর কেন বেছে নেবেন?",
      ModernHealthcare: "আপনার জন্য ডিজাইন করা আধুনিক স্বাস্থ্যসেবা উপভোগ করুন",
      LiveDoctorConsultation: "২৪/৭ লাইভ ডাক্তার পরামর্শ",
      LiveDoctorConsultationDesc:
        "যেকোনো সময়, যেকোনো স্থানে সার্টিফাইড ডাক্তারের সাথে তাৎক্ষণিক চিকিৎসা নিন।",
      EPrescriptions: "ই-প্রিসক্রিপশন",
      EPrescriptionsDesc:
        "ডিজিটাল প্রিসক্রিপশন সরাসরি আপনার ফার্মেসিতে পাঠানো হয়।",
      AISymptomChecker: "এআই-লক্ষণ চেকার",
      AISymptomCheckerDesc:
        "এআই দ্বারা পরিচালিত তাৎক্ষণিক, নির্ভরযোগ্য স্বাস্থ্য তথ্য পান।",
      Convenience: "সুবিধা",
      ConvenienceDesc: "আপনার বাড়ি থেকে এক ক্লিকে ডাক্তারের সাথে সংযোগ করুন।",
      QuickSupport: "দ্রুত সহায়তা",
      QuickSupportDesc: "জরুরি সময়ে এক ক্লিকে তাৎক্ষণিক চিকিৎসা সহায়তা পান।",
      ReportTracking: "রিপোর্ট ট্র্যাকিং",
      ReportTrackingDesc:
        "হাসপাতালে না গিয়ে আপনার ডিভাইসে রিপোর্ট ট্র্যাক করুন।",
      HowItWorks: "কিভাবে কাজ করে",
      Step1Title: "ধাপ ১: আপনার ডাক্তার খুঁজুন",
      Step1Desc:
        "আমাদের সার্টিফাইড বিশেষজ্ঞদের তালিকা দেখুন বা আপনার প্রয়োজন অনুযায়ী অনুসন্ধান করুন।",
      Step2Title: "ধাপ ২: আপনার পরামর্শ শুরু করুন",
      Step2Desc:
        "উপলব্ধ সময় নির্বাচন করুন এবং নিরাপদ ভিডিও কলে ডাক্তারের সাথে সংযোগ করুন।",
      Step3Title: "ধাপ ৩: আপনার প্রিসক্রিপশন পান",
      Step3Desc:
        "আপনার রোগ নির্ণয় পান এবং প্রিসক্রিপশন সরাসরি স্থানীয় ফার্মেসিতে পাঠান।",
      EverythingYouNeed: "আপনার স্বাস্থ্যের জন্য সবকিছু",
      EverythingYouNeedDesc:
        "তাৎক্ষণিক পরামর্শ থেকে স্বাস্থ্য রেকর্ড ব্যবস্থাপনা পর্যন্ত, সবকিছু এক জায়গায়।",
      VideoConsultations: "ভিডিও পরামর্শ",
      VideoConsultationsDesc:
        "আপনার বাড়ি থেকে নিরাপদ, উচ্চ-মানের ভিডিও কলে সার্টিফাইড ডাক্তারের সাথে তাৎক্ষণিক সংযোগ করুন।",
      EPrescriptionsDesc2:
        "ডাক্তারের কাছ থেকে ডিজিটাল প্রিসক্রিপশন সরাসরি অ্যাপে পান, স্থানীয় ফার্মেসিতে পাঠান।",
      AISymptomCheckerDesc2:
        "আপনার লক্ষণ নিয়ে অনিশ্চিত? আমাদের এআই আপনাকে সম্ভাব্য অবস্থাগুলি বুঝতে এবং সঠিক বিশেষজ্ঞের কাছে যেতে সাহায্য করে।",
      BuyMedicine: "ওষুধ কিনুন",
      BuyMedicineDesc:
        "বিশ্বস্ত ফার্মেসি থেকে ওষুধ এবং ওয়েলনেস পণ্য অর্ডার করুন এবং বাড়িতে ডেলিভারি পান।",
      TrackReports: "রিপোর্ট ট্র্যাক করুন",
      TrackReportsDesc:
        "আপনার সমস্ত মেডিকেল রিপোর্ট এবং পরামর্শ ইতিহাস এক জায়গায় নিরাপদে সংরক্ষণ করুন এবং অ্যাক্সেস করুন।",
      ReadyToTakeControl: "আপনি কি আপনার স্বাস্থ্য নিয়ন্ত্রণে নিতে প্রস্তুত?",
      JoinTelecure:
        "আজই টেলিকিউরে যোগ দিন এবং যেকোনো সময় মানসম্পন্ন স্বাস্থ্যসেবা পান।",
      GetStartedNow: "এখনই শুরু করুন",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("siteLanguage") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
