import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <section
      id="contact"
      className="bg-linear-to-r from-[#FFEFD0] to-[#FFF7E5] py-16 md:py-20 px-6 md:px-10 flex flex-col items-center shadow-inner"
    >
      {/* Heading */}
      <div
        data-aos="fade-up"
        className="text-center mb-12 space-y-3"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-[#2F2F2F]">
          Get in <span className="text-[#E27872]">Touch</span>
        </h2>
        <p className="text-gray-700 max-w-xl mx-auto">
          Have questions or want to collaborate? Reach out to us — we’d love to
          hear from you.
        </p>
      </div>

      {/* Content */}
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-10 bg-white rounded-2xl shadow-md p-8 md:p-10"
      >
        {/* Left: Contact Illustration */}
                <div className="flex-1 w-full">
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F6A6A1] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F6A6A1] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Type your message..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F6A6A1] focus:outline-none resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#F68B84] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#E27872] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
 w-full sm:w-auto"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right: Contact Form */}
                <div className="flex-1 flex justify-center">
          <img
            src={assets.contact} // your contact illustration
            alt="Contact illustration"
            className="w-[80%] sm:w-[70%] md:w-[85%] object-contain"
          />
        </div>

      </div>
    </section>
  );
};

export default Contact;
