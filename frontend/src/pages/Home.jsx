import React from "react";
import { assets } from "../assets/assets.js";

const Home = ({ setShowLogin, setShowRegister, setPreSelectedRole }) => {
  return (
    <section
      id="home"
      className="w-full bg-linear-to-r from-[#FFF7E5] to-[#FFEFD0] shadow-lg py-20 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
        {/* LEFT CONTENT */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2F2F2F] leading-tight">
            Together, We <span className="text-[#E27872]">Rebuild</span> Lives 🌍
          </h1>

          <p className="text-gray-700 text-base sm:text-lg md:text-xl max-w-xl mx-auto md:mx-0">
            Revive connects NGOs and volunteers to coordinate disaster relief
            faster, smarter, and with compassion.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => {
                setPreSelectedRole("volunteer");
                setShowRegister(true);
              }}
              className="bg-[#F68B84] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#E27872] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              Join as Volunteer
            </button>

            <button
              onClick={() => {
                setPreSelectedRole("ngo");
                setShowRegister(true);
              }}
              className="border border-[#F68B84] text-[#2F2F2F] font-semibold px-6 py-3 rounded-lg hover:bg-[#F68B84] hover:text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              Partner NGO
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src={assets.hero}
            alt="Disaster Relief Illustration"
            className="w-[85%] sm:w-[70%] md:w-[90%] lg:w-[80%] h-auto object-contain drop-shadow-lg mt-5"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;