import React from "react";
import { useTranslation } from "react-i18next";
import {
  FiUsers,
  FiClock,
  FiCpu,
  FiFileText,
  FiDollarSign,
  FiGlobe,
  FiTarget,
  FiEye,
} from "react-icons/fi";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Faq from "../components/Faq";

const ImpactCard = ({ title, description, Icon }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md border-2 border-emerald-200 hover:shadow-lg h-80 w-72 p-5 text-center"
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      viewport={{ once: true }}
    >
      {Icon && <Icon className="h-14 w-14 sm:h-16 sm:w-16 mb-4 text-emerald-500" />}
      <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800">{t(title)}</h2>
      <p className="text-gray-600 text-sm sm:text-base">{t(description)}</p>
    </motion.div>
  );
};

const GoalCounter = ({ end, suffix, title }) => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-emerald-500">
        {inView ? <CountUp end={end} duration={2} /> : "0"}
        {suffix}
      </h2>
      <p className="mt-2 text-base sm:text-lg text-gray-600">{t(title)}</p>
    </motion.div>
  );
};

const PersonaCard = ({ name, story, imageSrc, reverse = false }) => {
  const { t } = useTranslation();
  const flexDirection = reverse ? "lg:flex-row-reverse" : "lg:flex-row";

  return (
    <motion.div
      className={`flex flex-col ${flexDirection} items-center gap-8 sm:gap-10`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
      viewport={{ once: true }}
    >
      <img
        src={imageSrc}
        alt={t(name)}
        className="w-full lg:w-1/3 h-56 sm:h-64 rounded-lg shadow-lg object-cover"
      />
      <div className="lg:w-2/3">
        <h3 className="text-xl sm:text-2xl font-bold text-emerald-500 mb-3">
          {t("PersonaTitle", { name })}
        </h3>
        <p className="text-base sm:text-lg text-gray-700">{t(story)}</p>
      </div>
    </motion.div>
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

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="text-gray-700">
      {/* 1. Our Purpose Section */}
      <motion.section
        className="px-5 sm:px-10 lg:px-20 py-16 sm:py-20 bg-gradient-to-br from-emerald-50 to-green-50"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 sm:gap-10">
          <div className="lg:w-1/2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 text-center lg:text-left">
              {t("OurPurpose")}
            </h1>
            <p className="text-base sm:text-lg text-gray-600">{t("PurposeText")}</p>
          </div>
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
            viewport={{ once: true }}
          >
            <img
              src="/assets/purpose-image.jpg"
              alt={t("OurPurpose")}
              className="w-full h-auto rounded-lg shadow-xl object-cover"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* 2. Mission & Vision Reimagined */}
      <motion.section
        className="px-5 sm:px-10 lg:px-20 py-16 sm:py-20 bg-emerald-100"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-10 sm:mb-12">
            {t("OurCoreBeliefs")}
          </h1>
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-10">
            <motion.div
              className="flex-1 bg-white p-6 sm:p-8 rounded-xl shadow-lg text-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
              viewport={{ once: true }}
            >
              <FiTarget className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">{t("OurMission")}</h2>
              <p className="text-gray-600 text-sm sm:text-base">{t("MissionText")}</p>
            </motion.div>
            <motion.div
              className="flex-1 bg-white p-6 sm:p-8 rounded-xl shadow-lg text-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
              viewport={{ once: true }}
            >
              <FiEye className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">{t("OurVision")}</h2>
              <p className="text-gray-600 text-sm sm:text-base">{t("VisionText")}</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 3. Who We Help (Patient Personas) Section */}
      <motion.section
        className="px-5 sm:px-10 lg:px-20 py-16 sm:py-20 bg-emerald-100"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-12 sm:mb-16">
          {t("WhoWeHelp")}
        </h1>
        <div className="max-w-5xl mx-auto space-y-16 sm:space-y-20">
          {personas.map((persona) => (
            <PersonaCard key={persona.name} {...persona} />
          ))}
        </div>
      </motion.section>

      {/* 4. Our Goals (Projected Impact) Section */}
      <motion.section
        className="py-16 sm:py-20 px-5 sm:px-10 lg:px-20 bg-gradient-to-br from-emerald-50 to-green-50"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-12 sm:mb-16">
          {t("OurGoals")}
        </h1>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {goals.map((goal) => (
            <GoalCounter key={goal.title} {...goal} />
          ))}
        </div>
      </motion.section>

      {/* 5. Impact / Features Section */}
      <motion.section
        className="py-16 sm:py-20 px-5 sm:px-10 lg:px-20 bg-emerald-50"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center text-gray-800 mb-12 sm:mb-16">
          {t("Impact")}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
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
      </motion.section>

      {/* 6. FAQ Section */}
      <motion.section
        className="py-16 sm:py-20 bg-gradient-to-br from-emerald-50 to-green-50"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-800 pb-12 sm:pb-16">{t("FAQ")}</h1>
        <Faq />
      </motion.section>
    </div>
  );
};

export default About;