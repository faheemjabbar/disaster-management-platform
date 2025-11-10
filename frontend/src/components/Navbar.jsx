import React, { useState, useContext } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { AuthContext } from "../context/AuthContext";



const Navbar = ({ setShowLogin}) => {
  const [visible, setVisible] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const handleLoginClick = () => {
    setShowLogin(true);
    setVisible(false);
  };


  return (
    <header className="w-full bg-[#F8D57E] shadow-md sticky top-0 left-0 z-50">
      <div className="max-w-360 mx-auto flex items-center justify-between py-3 px-4 sm:px-6 md:px-8 font-medium">
        {/* LOGO */}
        <ScrollLink 
          to="home" 
          smooth={true} 
          duration={600}
          className="flex items-center gap-1 relative cursor-pointer"
        >
          <img
            src={assets.logo}
            alt="Revive Logo"
            className="h-10 sm:h-15 w-auto object-contain scale-60 sm:scale-70 -my-1"
          />
        </ScrollLink>

        {/* CENTER LINKS (Desktop & Tablet) */}
        <ul className="hidden md:flex gap-6 lg:gap-8 text-sm text-[#3F3F3F] font-semibold">
          {["home", "about", "contact"].map((section, i) => (
            <ScrollLink
              key={i}
              to={section}
              smooth={true}
              duration={600}
              offset={-100}
              spy={true}
              activeClass="border-[#F6A6A1]"
              className="cursor-pointer hover:text-[#2F2F2F] border-b-2 border-transparent hover:border-[#F6A6A1] transition-colors duration-200"
            >
              {section === "home"
                ? "HOME"
                : section === "about"
                ? "ABOUT US"
                : "CONTACT"}
            </ScrollLink>
          ))}
        </ul>

        {/* RIGHT BUTTONS (Desktop & Tablet) */}
{/* RIGHT BUTTONS (Desktop & Tablet) */}
<div className="hidden md:flex items-center gap-3 lg:gap-4">
  {user ? (
    <>
      <Link
        to={user.userType === "ngo" ? "/ngo" : "/volunteer"}
        className="text-[#2F2F2F] font-semibold px-3 sm:px-4 py-2 rounded-lg hover:text-[#E27872] transition"
      >
        {user.fullName?.split(" ")[0] || "Profile"}
      </Link>
      <button
        onClick={logout}
        className="border border-[#F68B84] text-[#2F2F2F] font-semibold px-3 sm:px-4 py-2 rounded-lg hover:bg-[#F68B84] hover:text-white transition-all duration-200"
      >
        Logout
      </button>
    </>
  ) : (
    <button
      onClick={handleLoginClick}
      className="border border-[#F68B84] text-[#2F2F2F] font-semibold px-3 sm:px-4 py-2 rounded-lg hover:bg-[#F68B84] hover:text-white transition-all duration-200"
    >
      Login
    </button>
  )}
</div>


        {/* MOBILE MENU ICON */}
        <button
          onClick={() => setVisible(true)}
          className="md:hidden focus:outline-none"
          aria-label="Open menu"
        >
          <img
            src={assets.menu_icon}
            alt="menu"
            className="w-6 sm:w-7 cursor-pointer"
          />
        </button>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
          visible ? "w-64 p-5" : "w-0 p-0"
        } overflow-hidden flex flex-col justify-between md:hidden`}
      >
        {/* TOP (Back + Links) */}
        <div>
          <button
            onClick={() => setVisible(false)}
            className="cursor-pointer flex items-center gap-3 mb-4 hover:text-[#E27872] transition-colors"
            aria-label="Close menu"
          >
            <img
              src={assets.dropdown_icon}
              alt="back"
              className="h-4 rotate-180"
            />
            <p className="text-sm">Back</p>
          </button>

          {/* Scroll Links for Mobile */}
          <div className="flex flex-col space-y-2 text-gray-700">
            {["home", "about", "contact"].map((section, i) => (
              <ScrollLink
                key={i}
                to={section}
                smooth={true}
                duration={600}
                offset={-80}
                spy={true}
                onClick={() => setVisible(false)}
                className="py-2 pl-2 border-b border-gray-200 hover:text-[#E68E87] cursor-pointer transition-colors"
              >
                {section === "home"
                  ? "Home"
                  : section === "about"
                  ? "About Us"
                  : "Contact"}
              </ScrollLink>
            ))}
          </div>
        </div>

        {/* BOTTOM BUTTONS */}
        <div className="flex flex-col gap-3 mt-6 pb-6">
          <button
            onClick={handleLoginClick}
            className="border border-[#F68B84] text-[#2F2F2F] font-semibold px-3 sm:px-4 py-2 rounded-lg hover:bg-[#F68B84] hover:text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;