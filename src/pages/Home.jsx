import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import Faq from "../components/Faq";
import BookDoctor from "../components/BookDoctor";
import useSocketStore from "../store/socketStore";

const Home = ({ hideBooking }) => {
  const [showBook, setShowBook] = useState(false);
  const [hasBooking, setHasBooking] = useState(false);
  const [bookingStatus, setBookingStatus] = useState("");
  const [isDoctor, setIsDoctor] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    let user = null;

    if (storedUser && storedUser !== "undefined") {
      try {
        user = JSON.parse(storedUser);
      } catch (error) {
        console.error("Invalid user JSON:", error);
        user = null;
      }
    }

    // if (!user || !user.id) return;

    if (user?.role === "Doctor") {
      setIsDoctor(true);
      return;
    }
    if (!user) return;

    fetch(
      `https://telemedicine-backend-2.onrender.com/api/booking/all?patientId=${user?.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        const bookings = Array.isArray(data.bookings)
          ? data.bookings
          : data.bookings
          ? [data.bookings]
          : [];
        if (bookings.length === 0) {
          setHasBooking(false);
          setBookingStatus("");
        } else if (bookings.length === 1) {
          setHasBooking(true);
          setBookingStatus(bookings[0].status);
        } else if (bookings.length >= 2) {
          setHasBooking(true);
          setBookingStatus("multiple");
        }
      })
      .catch(() => {
        setHasBooking(false);
        setBookingStatus("");
      });
  }, []);

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <div className="bg-white text-gray-700">
      {/* Hero Section */}
      <motion.div
        className="relative bg-[url('/assets/banner-image.jpg')] bg-cover bg-center min-h-screen flex flex-col justify-center"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/40 to-green-600/40"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-10 lg:px-20 text-center sm:text-left flex flex-col gap-6">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-snug sm:leading-tight drop-shadow-lg break-words whitespace-normal"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
          >
            {t("Welcome")}
          </motion.h1>
          <motion.p
            className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-full sm:max-w-2xl leading-relaxed sm:leading-loose drop-shadow-md break-words whitespace-normal"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}
          >
            {t("ModernHealthcare")}
          </motion.p>
          {!hideBooking && !isDoctor && (
            <AnimatePresence>
              {!hasBooking ? (
                <motion.button
                  className="mt-4 sm:mt-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg w-40 sm:w-44"
                  onClick={() => setShowBook(true)}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {t("BookDoctor")}
                </motion.button>
              ) : bookingStatus === "active" ||
                bookingStatus === "pending" ||
                bookingStatus === "accepted" ||
                bookingStatus === "multiple" ? (
                <motion.button
                  className="mt-4 sm:mt-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg w-40 sm:w-44"
                  onClick={() => (window.location.href = "/track-booking")}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {t("TrackBooking")}
                </motion.button>
              ) : bookingStatus === "cancelled" ? (
                <>
                  <motion.button
                    className="mt-4 sm:mt-6 bg-red-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg w-56 sm:w-60 font-bold"
                    disabled
                    variants={buttonVariants}
                  >
                    {t("BookingCancelled")}
                  </motion.button>
                  <motion.button
                    className="mt-4 sm:mt-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg w-40 sm:w-44"
                    onClick={() => setShowBook(true)}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {t("BookDoctor")}
                  </motion.button>
                </>
              ) : (
                <motion.button
                  className="mt-4 sm:mt-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg w-40 sm:w-44"
                  onClick={() => (window.location.href = "/track-booking")}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {t("TrackBooking")}
                </motion.button>
              )}
              {showBook && (
                <motion.div
                  className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.div
                    className="bg-white rounded-xl shadow-2xl p-6 relative max-w-md w-full"
                    variants={modalVariants}
                  >
                    <button
                      className="absolute top-2 right-2 text-emerald-500 hover:text-emerald-700 text-xl font-bold"
                      onClick={() => setShowBook(false)}
                    >
                      &times;
                    </button>
                    <BookDoctor
                      onBooked={() => {
                        setShowBook(false);
                        window.location.reload();
                      }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.section
        className="py-16 bg-emerald-50"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-gray-700 mb-4 break-words whitespace-normal"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { delay: 0.2 } }}
            viewport={{ once: true }}
          >
            {t("WhyChoose")}
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-gray-600 mb-12 break-words whitespace-normal"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { delay: 0.4 } }}
            viewport={{ once: true }}
          >
            {t("ModernHealthcare")}
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-14"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: t("LiveDoctorConsultation"),
                desc: t("LiveDoctorConsultationDesc"),
              },
              {
                icon: (
                  <svg
                    className="h-14 w-14"
                    fill="#10b981"
                    viewBox="-3 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#10b981"
                    strokeWidth="0.4800000000000001"
                  >
                    <path d="m15.76 2.852h-2.577v1.221h2.577.007c.655 0 1.186.531 1.186 1.186v.008 16.326.007c0 .656-.532 1.187-1.187 1.187-.002 0-.005 0-.007 0h-13.351c-.002 0-.005 0-.007 0-.656 0-1.187-.532-1.187-1.187 0-.003 0-.005 0-.008v-16.326c0-.002 0-.005 0-.007 0-.656.532-1.187 1.187-1.187h.007 2.577v-1.22h-2.577c-1.331 0-2.411 1.08-2.411 2.411v16.326c.001 1.331 1.08 2.41 2.411 2.41h13.351c1.331 0 2.411-1.08 2.411-2.411v-16.326c0-1.331-1.08-2.411-2.411-2.411z"></path>
                    <path d="m12.605 2.225h-1.319c0-1.229-.996-2.225-2.225-2.225s-2.225.996-2.225 2.225h-1.31v3.057h7.073v-3.057zm-2.258 0h-2.57c0-.01 0-.021 0-.032 0-.71.576-1.286 1.286-1.286s1.286.576 1.286 1.286v.034-.002z"></path>
                    <path d="m5.947 8.512h9.458v1.17h-9.458z"></path>
                    <path d="m5.947 13.41h9.458v1.17h-9.458z"></path>
                    <path d="m5.947 18.25h9.458v1.176h-9.458z"></path>
                    <path d="m2.628 7.757h2.68v2.68h-2.68z"></path>
                    <path d="m2.628 12.655h2.68v2.68h-2.68z"></path>
                    <path d="m2.628 17.497h2.68v2.68h-2.68z"></path>
                  </svg>
                ),
                title: t("EPrescriptions"),
                desc: t("EPrescriptionsDesc"),
              },
              {
                icon: (
                  <svg
                    className="h-14 w-14"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#10b981"
                    strokeWidth="0.504"
                  >
                    <path
                      d="M9 15C8.44771 15 8 15.4477 8 16C8 16.5523 8.44771 17 9 17C9.55229 17 10 16.5523 10 16C10 15.4477 9.55229 15 9 15Z"
                      fill="#10b981"
                    ></path>
                    <path
                      d="M14 16C14 15.4477 14.4477 15 15 15C15.5523 15 16 15.4477 16 16C16 16.5523 15.5523 17 15 17C14.4477 17 14 16.5523 14 16Z"
                      fill="#10b981"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 1C10.8954 1 10 1.89543 10 3C10 3.74028 10.4022 4.38663 11 4.73244V7H6C4.34315 7 3 8.34315 3 10V20C3 21.6569 4.34315 23 6 23H18C19.6569 23 21 21.6569 21 20V10C21 8.34315 19.6569 7 18 7H13V4.73244C13.5978 4.38663 14 3.74028 14 3C14 1.89543 13.1046 1 12 1ZM5 10C5 9.44772 5.44772 9 6 9H7.38197L8.82918 11.8944C9.16796 12.572 9.86049 13 10.618 13H13.382C14.1395 13 14.832 12.572 15.1708 11.8944L16.618 9H18C18.5523 9 19 9.44772 19 10V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V10ZM13.382 11L14.382 9H9.61803L10.618 11H13.382Z"
                      fill="#10b981"
                    ></path>
                    <path
                      d="M1 14C0.447715 14 0 14.4477 0 15V17C0 17.5523 0.447715 18 1 18C1.55228 18 2 17.5523 2 17V15C2 14.4477 1.55228 14 1 14Z"
                      fill="#10b981"
                    ></path>
                    <path
                      d="M22 15C22 14.4477 22.4477 14 23 14C23.5523 14 24 14.4477 24 15V17C24 17.5523 23.5523 18 23 18C22.4477 18 22 17.5523 22 17V15Z"
                      fill="#10b981"
                    ></path>
                  </svg>
                ),
                title: t("AISymptomChecker"),
                desc: t("AISymptomCheckerDesc"),
              },
              {
                icon: (
                  <svg
                    className="h-14 w-14"
                    fill="#10b981"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse cx="6" cy="5.5" rx="1" ry="1.5"></ellipse>
                    <ellipse cx="10" cy="5.5" rx="1" ry="1.5"></ellipse>
                    <path d="M8.071,13.071A5.076,5.076,0,0,1,3,8H4.143A3.929,3.929,0,1,0,12,8h1.143A5.077,5.077,0,0,1,8.071,13.071Z"></path>
                    <path d="M8,1A7,7,0,1,1,1,8,7.008,7.008,0,0,1,8,1M8,0a8,8,0,1,0,8,8A8,8,0,0,0,8,0Z"></path>
                  </svg>
                ),
                title: t("Convenience"),
                desc: t("ConvenienceDesc"),
              },
              {
                icon: (
                  <svg
                    className="h-14 w-14"
                    fill="#10b981"
                    viewBox="0 0 297 297"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#10b981"
                    strokeWidth="5.94"
                  >
                    <path d="M172.096,196.637h-13.529v-13.529c0-5.56-4.508-10.068-10.068-10.068s-10.068,4.508-10.068,10.068v13.529h-13.529 c-5.56,0-10.068,4.508-10.068,10.068c0,5.56,4.508,10.068,10.068,10.068h13.529v13.529c0,5.56,4.508,10.068,10.068,10.068 s10.068-4.508,10.068-10.068v-13.529h13.529c5.56,0,10.068-4.508,10.068-10.068C182.164,201.145,177.656,196.637,172.096,196.637z"></path>
                    <path d="M251.974,51.912h-24.19V37.509C227.784,16.826,210.958,0,190.274,0h-83.549C86.042,0,69.216,16.826,69.216,37.509v14.403 h-24.19C20.199,51.912,0,72.111,0,96.938v156.434C0,277.429,19.571,297,43.627,297h209.745C277.429,297,297,277.429,297,253.372 V96.938C297,72.111,276.801,51.912,251.974,51.912z M89.352,37.509c0-9.58,7.794-17.374,17.374-17.374h83.549 c9.58,0,17.374,7.794,17.374,17.374v14.403H89.352V37.509z M45.026,72.048h206.948c13.724,0,24.89,11.166,24.89,24.89v6.886H20.136 v-6.886C20.136,83.214,31.302,72.048,45.026,72.048z M210.48,123.96h14.472v14.472H210.48V123.96z M72.048,123.96H86.52v14.472 H72.048V123.96z M276.864,253.372c0,12.953-10.539,23.492-23.492,23.492H43.627c-12.953,0-23.491-10.539-23.491-23.492V123.96 h31.776v24.54c0,5.56,4.508,10.068,10.068,10.068h34.608c5.56,0,10.068-4.508,10.068-10.068v-24.54h83.689v24.54 c0,5.56,4.508,10.068,10.068,10.068h34.608c5.56,0,10.068-4.508,10.068-10.068v-24.54h31.776V253.372z"></path>
                  </svg>
                ),
                title: t("QuickSupport"),
                desc: t("QuickSupportDesc"),
              },
              {
                icon: (
                  <svg
                    className="h-14 w-14"
                    fill="#10b981"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      fillRule: "evenodd",
                      clipRule: "evenodd",
                      strokeLinejoin: "round",
                      strokeMiterlimit: 2,
                    }}
                  >
                    <path d="M27,3c0,-0.552 -0.448,-1 -1,-1l-20,0c-0.552,0 -1,0.448 -1,1l0,26c0,0.552 0.448,1 1,1l20,0c0.552,0 1,-0.448 1,-1l0,-26Zm-2,1l0,24l-18,0l0,-24l18,0Zm-9,10c-3.311,0 -6,2.689 -6,6c0,3.311 2.689,6 6,6c3.311,0 6,-2.689 6,-6c0,-3.311 -2.689,-6 -6,-6Zm-1,2.126c-1.724,0.445 -3,2.012 -3,3.874c0,2.208 1.792,4 4,4c1.862,0 3.429,-1.276 3.874,-3l-3.874,0c-0.552,0 -1,-0.448 -1,-1l0,-3.874Zm-2,-4.126l6,0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1l-6,0c-0.552,0 -1,0.448 -1,1c0,0.552 0.448,1 1,1Zm-2,-4l10,0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1l-10,0c-0.552,0 -1,0.448 -1,1c0,0.552 0.448,1 1,1Z" />
                  </svg>
                ),
                title: t("ReportTracking"),
                desc: t("ReportTrackingDesc"),
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-xl"
                variants={cardVariants}
                whileHover="hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.1 },
                }}
                viewport={{ once: true }}
              >
                <div className="text-emerald-600 mb-6 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 break-words whitespace-normal">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed break-words whitespace-normal">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.div
        className="flex flex-col items-center justify-center mb-20 bg-emerald-100 pt-20 rounded-b-2xl shadow-md"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl font-semibold text-gray-800 break-words whitespace-normal"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { delay: 0.2 } }}
          viewport={{ once: true }}
        >
          {t("HowItWorks")}
        </motion.h1>
        <div className="w-full max-w-5xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              ),
              title: t("Step1Title"),
              desc: t("Step1Desc"),
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              ),
              title: t("Step2Title"),
              desc: t("Step2Desc"),
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              ),
              title: t("Step3Title"),
              desc: t("Step3Desc"),
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              variants={cardVariants}
              whileHover="hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { delay: index * 0.1 },
              }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 break-words whitespace-normal">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed break-words whitespace-normal">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.video
          src="/assets/howitworks.mp4"
          controls
          className="h-96 w-full max-w-2xl rounded-lg shadow-md mt-10 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { delay: 0.2 } }}
          viewport={{ once: true }}
        />
      </motion.div>

      {/* What We Offer Section */}
      <motion.section
        className="bg-white py-16"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-gray-800 break-words whitespace-normal"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { delay: 0.2 } }}
              viewport={{ once: true }}
            >
              {t("EverythingYouNeed")}
            </motion.h2>
            <motion.p
              className="mt-4 text-lg text-gray-600 break-words whitespace-normal"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { delay: 0.4 } }}
              viewport={{ once: true }}
            >
              {t("EverythingYouNeedDesc")}
            </motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                ),
                title: t("VideoConsultations"),
                desc: t("VideoConsultationsDesc"),
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                ),
                title: t("EPrescriptions"),
                desc: t("EPrescriptionsDesc2"),
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
                title: t("AISymptomChecker"),
                desc: t("AISymptomCheckerDesc2"),
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
                title: t("BuyMedicine"),
                desc: t("BuyMedicineDesc"),
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                ),
                title: t("TrackReports"),
                desc: t("TrackReportsDesc"),
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="bg-emerald-50 p-6 rounded-lg shadow-sm"
                variants={cardVariants}
                whileHover="hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.1 },
                }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 break-words whitespace-normal">
                  {service.title}
                </h3>
                <p className="text-gray-600 break-words whitespace-normal">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call-to-Action Section */}
      <motion.section
        className="bg-gradient-to-r from-emerald-600 to-green-600"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white break-words whitespace-normal"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { delay: 0.2 } }}
            viewport={{ once: true }}
          >
            <span className="block">{t("ReadyToTakeControl")}</span>
          </motion.h2>
          <motion.p
            className="mt-4 text-lg leading-6 text-emerald-100 break-words whitespace-normal"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { delay: 0.4 } }}
            viewport={{ once: true }}
          >
            {t("JoinTelecure")}
          </motion.p>
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { delay: 0.6 } }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/signup"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-emerald-600 bg-white hover:bg-emerald-50"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {t("GetStartedNow")}
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-emerald-500 to-green-600 text-white text-center">
        <Footer />
        <p className="mt-4 text-sm sm:text-base">
          &copy; {new Date().getFullYear()} Telecure. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
