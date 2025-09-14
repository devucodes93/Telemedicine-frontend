import React from "react";
import { useTranslation } from "react-i18next";
import {
  FiUsers,
  FiClock,
  FiCpu,
  FiFileText,
  FiDollarSign,
  FiGlobe,
} from "react-icons/fi";
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

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="text-gray-700">
      {/* Mission Section */}
      <section className="flex flex-col bg-[url('/assets/ourmission.jpg')] bg-cover bg-center px-5 sm:px-10 lg:px-20 py-20 gap-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center text-gray-700">
          {t("OurMission")}
        </h1>
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-10">
          <p className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl font-normal lg:w-1/2">
            {t("MissionText")}
          </p>
          <img
            src="/assets/rural.jpg"
            alt="Our Mission"
            className="h-64 sm:h-80 md:h-96 w-full lg:w-1/2 rounded-lg shadow-md mt-6 lg:mt-0 object-cover"
          />
        </div>
      </section>

      {/* Vision Section */}
      <section className="flex flex-col lg:flex-row items-center gap-10 px-5 sm:px-10 lg:px-20 py-20">
        <img
          src="/assets/telemed.jpg"
          alt={t("OurVision")}
          className="h-64 sm:h-80 md:h-96 w-full lg:w-1/2 rounded-lg shadow-md object-cover"
        />
        <div className="lg:w-1/2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-700 mb-6 text-center lg:text-left">
            {t("OurVision")}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl font-normal">
            {t("VisionText")}
          </p>
        </div>
      </section>

      <div>
        <h1 className="text-2xl font-semibold text-center pb-10">{t("FAQ")}</h1>
        <Faq />
      </div>

      {/* Impact Section */}
      <section className="py-20 px-5 sm:px-10 lg:px-20 bg-gray-100">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-center mb-16">
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
    </div>
  );
};

export default About;
