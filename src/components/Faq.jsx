import { useState } from "react";

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300">
      {/* Question */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left text-lg sm:text-xl font-medium text-gray-800 hover:bg-blue-100 transition-colors"
      >
        {question}
        <span className="text-2xl">{isOpen ? "−" : "+"}</span>
      </button>

      {/* Answer */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-96 p-4" : "max-h-0 p-0"
        } bg-white text-gray-700`}
      >
        <p className="text-sm sm:text-base">{answer}</p>
      </div>
    </div>
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
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-lg overflow-hidden">
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}
