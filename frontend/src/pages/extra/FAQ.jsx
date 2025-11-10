import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How do I register as a volunteer?",
      a: 'Click the "Join as Volunteer" button on the homepage and fill out the registration form.',
    },
    {
      q: "Can NGOs post multiple campaigns?",
      a: "Yes, verified NGOs can create and manage multiple relief campaigns simultaneously.",
    },
    {
      q: "Is there a fee to use Revive?",
      a: "No, Revive is completely free for both volunteers and NGOs.",
    },
    {
      q: "How are volunteers verified?",
      a: "Volunteers are verified through their contact details and campaign participation history.",
    },
    {
      q: "What types of disasters does Revive cover?",
      a: "We support all disaster types including floods, earthquakes, fires, droughts, and more.",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF7E5] to-[#FFEFD0] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#2F2F2F] mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Find answers to common questions about Revive
        </p>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-left text-gray-900">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#F68B84] transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 text-gray-700 border-t border-gray-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
