import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  // Animation variants for the answer
  const answerVariants = {
    open: { maxHeight: "24rem", padding: "1rem", opacity: 1, transition: { duration: 0.5 } },
    closed: { maxHeight: 0, padding: "0", opacity: 0, transition: { duration: 0.5 } },
  };

  // Animation variants for the toggle button
  const buttonVariants = {
    hover: { scale: 1.02, backgroundColor: "#d1fae5", transition: { duration: 0.3 } },
    tap: { scale: 0.98 },
  };

  return (
    <motion.div
      className="border-b border-emerald-200"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Question */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-3 sm:p-4 text-left text-base sm:text-lg lg:text-xl font-medium text-gray-800 hover:bg-emerald-100 transition-colors"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        {question}
        <motion.span
          className="text-xl sm:text-2xl"
          animate={{ rotate: isOpen ? 180 : 0, transition: { duration: 0.3 } }}
        >
          {isOpen ? "−" : "+"}
        </motion.span>
      </motion.button>

      {/* Answer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="overflow-hidden bg-white text-gray-700"
            variants={answerVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <p className="text-sm sm:text-base p-3 sm:p-4">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq() {
  const faqs = [
    {
      question: "What is Telemedicine?",
      answer:
        "Telemedicine allows you to consult doctors online via video, audio, or chat from anywhere.",
    },
    {
      question: "Is it secure?",
      answer: "Yes, all consultations are encrypted and your data is kept private.",
    },
    {
      question: "Can I use it 24/7?",
      answer: "Absolutely! Our doctors are available round the clock to serve you.",
    },
    {
      question: "Do I need the internet to use the app?",
      answer:
        "You can use many features offline, like accessing your digital health records. Video consultations require internet, but we optimize for low-bandwidth connections.",
    },
    {
      question: "How do I know which doctors are available?",
      answer:
        "The app shows real-time doctor availability and their specialties. You can book appointments directly within the app.",
    },
    {
      question: "Are the consultations free or paid?",
      answer:
        "Basic consultations are free, and some specialist consultations may have a small fee. The app clearly displays any charges before you confirm.",
    },
    {
      question: "Can the app help me get medicines?",
      answer:
        "Yes, you can check the availability of medicines at nearby pharmacies and place orders if needed.",
    },
    {
      question: "Will my health records be safe?",
      answer:
        "Absolutely. All your health records are stored securely and can be accessed offline. Only you and your authorized doctors can view them.",
    },
    {
      question: "What if I don’t understand English?",
      answer:
        "The app supports multiple languages, including Punjabi and Hindi, to make it easy for everyone to use.",
    },
    {
      question: "Can I use the app if I am not tech-savvy?",
      answer:
        "Yes! The app is designed to be simple and user-friendly, with clear instructions and voice guidance for easier navigation.",
    },
    {
      question: "How quickly can I get a consultation?",
      answer:
        "Depending on doctor availability, you can get a consultation the same day, and emergency cases are prioritized.",
    },
    {
      question: "Does the app work on basic smartphones?",
      answer:
        "Yes! We optimized the app to work smoothly on both smartphones and feature phones with Android support.",
    },
    {
      question: "Can my family members access my health records?",
      answer:
        "Only with your permission. You can grant access to family members or caregivers safely through the app.",
    },
    {
      question: "Do I need to download any app?",
      answer:
        "No, you can access our platform directly from your browser on any device.",
    },
    {
      question: "Can I get a prescription online?",
      answer:
        "Yes, after consultation, your doctor can provide a digital prescription securely.",
    },
    {
      question: "Is it covered by insurance?",
      answer:
        "Some insurance plans cover telemedicine consultations. Please check with your provider.",
    },
    {
      question: "How do I pay for a consultation?",
      answer:
        "Payments can be made securely via credit/debit cards, UPI, or other supported online payment methods.",
    },
  ];

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-8 sm:mt-10 bg-white rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
    >
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </motion.div>
  );
}