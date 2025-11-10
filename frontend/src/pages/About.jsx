import React from "react";
import { assets } from "../assets/assets.js";

const About = () => {
  return (
    <section
      id="about"
      className="w-full bg-linear-to-r from-[#FFF7E5] to-[#FFEFD0] py-20 md:py-24 flex items-center justify-center shadow-inner"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 flex flex-col items-center justify-between gap-16">

        {/* TOP CONTENT */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-20 w-full"
          data-aos="fade-up"
        >
          {/* LEFT IMAGE */}
          <div className="flex-1 flex justify-center md:justify-start">
            <img
              src={assets.about}
              alt="About Revive"
              className="w-[80%] sm:w-[70%] md:w-[90%] lg:w-[80%] h-auto object-contain shadow-lg"
            />
          </div>

          {/* RIGHT TEXT */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2F2F2F] flex items-center justify-center md:justify-start gap-2">
              About
              <img
                src={assets.logo}
                alt="Revive Logo"
                className="inline-block w-20 sm:w-24 md:w-28 h-auto object-contain"
              />
            </h2>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Revive is a humanitarian platform designed to streamline disaster relief efforts.
              It connects <span className="font-semibold text-[#E27872]">NGOs, volunteers,</span> and
              local communities in real-time to ensure that help reaches where it's needed most.
            </p>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Our mission is to make <span className="font-semibold text-[#E27872]">crisis response faster, smarter, and human-driven.</span>
              By combining technology with compassion, Revive enables people to take meaningful action
              in times of need — whether through volunteering, donating, or organizing.
            </p>

            <button className="mt-4 bg-[#F68B84] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#E27872] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
              Learn More
            </button>
          </div>
        </div>

        {/* MISSION & STATS SECTION */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-[#2F2F2F]">Our Impact So Far</h3>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mt-5 max-w-4xl"
          data-aos="fade-up"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-md p-6 hover:scale-[1.03] transition-all duration-200">
            <h3 className="text-2xl font-bold text-[#E27872]">500+</h3>
            <p className="text-gray-700 font-medium mt-2">Volunteers Connected</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-md p-6 hover:scale-[1.03] transition-all duration-200">
            <h3 className="text-2xl font-bold text-[#E27872]">100+</h3>
            <p className="text-gray-700 font-medium mt-2">Active NGO Partners</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-md p-6 hover:scale-[1.03] transition-all duration-200">
            <h3 className="text-2xl font-bold text-[#E27872]">50+</h3>
            <p className="text-gray-700 font-medium mt-2">Cities Supported</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
