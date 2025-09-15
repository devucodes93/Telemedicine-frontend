import React from "react";
import { useTranslation } from "react-i18next";
import {
  FiUsers,
  FiClock,
  FiCpu,
  FiFileText,
  FiDollarSign,
  FiGlobe,
  FiHeart,
  FiTarget,
  FiEye,
} from "react-icons/fi";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Faq from "../components/Faq";

const ImpactCard = ({ title, description, Icon }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md border-2 border-gray-200 hover:scale-105 transition-transform duration-300 h-80 w-72 p-5 text-center">
      {Icon && <Icon className="h-16 w-16 mb-4 text-blue-500" />}
      <h2 className="text-2xl font-semibold mb-2">{t(title)}</h2>
      <p className="text-gray-600 text-sm">{t(description)}</p>
    </div>
  );
};

const GoalCounter = ({ end, suffix, title }) => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="text-center">
      <h2 className="text-5xl md:text-6xl font-bold text-blue-500">
        {inView ? <CountUp end={end} duration={2} /> : "0"}
        {suffix}
      </h2>
      <p className="mt-2 text-lg text-gray-600">{t(title)}</p>
    </div>
  );
};

const PersonaCard = ({ name, story, imageSrc, reverse = false }) => {
  const { t } = useTranslation();
  const flexDirection = reverse ? "lg:flex-row-reverse" : "lg:flex-row";

  return (
    <div className={`flex flex-col ${flexDirection} items-center gap-10`}>
      <img
        src={imageSrc}
        alt={name}
        className="w-full lg:w-1/3 h-64 rounded-lg shadow-lg object-cover"
      />
      <div className="lg:w-2/3">
        <h3 className="text-2xl font-bold text-blue-500 mb-3">
          {t("PersonaTitle", { name })}
        </h3>
        <p className="text-lg text-gray-700">{t(story)}</p>
      </div>
    </div>
  );
};

const About = () => {
  const { t } = useTranslation();

  const personas = [
    { name: "Priya", story: "PriyaPersonaStory", imageSrc: "/assets/persona1.webp" },
    { name: "Rohan", story: "RohanPersonaStory", imageSrc: "/assets/telemed.jpg", reverse: true },
  ];

  const goals = [
    { end: 10000, suffix: "+", title: "TargetConsultations" },
    { end: 95, suffix: "%", title: "TargetSatisfaction" },
    { end: 5, suffix: " min", title: "TargetWaitTime" },
  ];

  return (
    <div className="text-gray-700">
      {/* 1. Our Purpose Section */}
      <section className="px-5 sm:px-10 lg:px-20 py-20 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6 text-center lg:text-left">
              {t("OurPurpose")}
            </h1>
            <p className="text-lg text-gray-600">
              {t("PurposeText")}
            </p>
          </div>
          <div className="lg:w-1/2">
            <img
              src="/assets/purpose-image.jpg"
              alt={t("OurPurpose")}
              className="w-full h-auto rounded-lg shadow-xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. Mission & Vision Reimagined */}
      <section className="px-5 sm:px-10 lg:px-20 py-20 bg-blue-200">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-12">
            {t("OurCoreBeliefs")}
          </h1>
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 bg-white p-8 rounded-xl shadow-lg text-center">
              <FiTarget className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">{t("OurMission")}</h2>
              <p className="text-gray-600">{t("MissionText")}</p>
            </div>
            <div className="flex-1 bg-white p-8 rounded-xl shadow-lg text-center">
              <FiEye className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">{t("OurVision")}</h2>
              <p className="text-gray-600">{t("VisionText")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* The "Meet the Team" section has been removed */}

      {/* 3. Who We Help (Patient Personas) Section */}
      <section className="px-5 sm:px-10 lg:px-20 py-20 bg-blue-200">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-800 mb-16">
          {t("WhoWeHelp")}
        </h1>
        <div className="max-w-5xl mx-auto space-y-20">
          {personas.map((persona) => (
            <PersonaCard key={persona.name} {...persona} />
          ))}
        </div>
      </section>

      {/* 4. Our Goals (Projected Impact) Section */}
      <section className="py-20 px-5 sm:px-10 lg:px-20 bg-white">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-800 mb-16">
          {t("OurGoals")}
        </h1>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {goals.map((goal) => (
            <GoalCounter key={goal.title} {...goal} />
          ))}
        </div>
      </section>

      {/* 5. Impact / Features Section */}
      <section className="py-20 px-5 sm:px-10 lg:px-20 bg-gray-100">
        <h1 className="text-4xl sm:text-5xl font-semibold text-center mb-16">
          {t("Impact")}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <ImpactCard
            title="RuralHealthcare"
            description="RuralHealthcareDesc"
            Icon={FiUsers}
          />
          <ImpactCard
            title="TimeSaving"
            description="TimeSavingDesc"
            Icon={FiClock}
          />
          <ImpactCard
            title="AIAssistance"
            description="AIAssistanceDesc"
            Icon={FiCpu}
          />
          <ImpactCard
            title="DigitalRecords"
            description="DigitalRecordsDesc"
            Icon={FiFileText}
          />
          <ImpactCard
            title="AffordableCare"
            description="AffordableCareDesc"
            Icon={FiDollarSign}
          />
          <ImpactCard
            title="GlobalReach"
            description="GlobalReachDesc"
            Icon={FiGlobe}
          />
        </div>
      </section>

      {/* 6. FAQ Section */}
      <div className="py-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-800 pb-16">{t("FAQ")}</h1>
        <Faq />
      </div>
    </div>
  );
};

export default About;