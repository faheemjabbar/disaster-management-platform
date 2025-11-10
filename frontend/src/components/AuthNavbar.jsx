import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AuthContext } from "../context/AuthContext";
import { User, LogOut, Settings, Bell, Menu, X } from "lucide-react";

const AuthNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = user?.userType === "ngo" 
    ? [
        { name: "Explore", path: "/explore" },
        { name: "My Campaigns", path: "/campaigns" },
        { name: "Create Campaign", path: "/create-campaign" },
      ]
    : [
        { name: "Explore", path: "/explore" },
        { name: "Campaigns", path: "/campaigns" },
        { name: "My Activity", path: "/activity" },
      ];

  return (
    <header className="w-full bg-[#F8D57E] shadow-md sticky top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 sm:px-6 md:px-8 font-medium">
        
        {/* LOGO */}
        <Link to="/explore" className="flex items-center gap-1 cursor-pointer">
          <img
            src={assets.logo}
            alt="Revive Logo"
            className="h-10 sm:h-15 w-auto object-contain scale-60 sm:scale-70 -my-1"
          />
        </Link>

        {/* DESKTOP NAV LINKS */}
        <ul className="hidden md:flex gap-6 lg:gap-8 text-sm text-[#3F3F3F] font-semibold">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className="cursor-pointer hover:text-[#2F2F2F] border-b-2 border-transparent hover:border-[#F6A6A1] transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </ul>

        {/* RIGHT SIDE - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-[#FFF7E5] rounded-full transition">
            <Bell className="w-5 h-5 text-[#2F2F2F]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-[#FFF7E5] rounded-lg transition"
            >
              <div className="w-8 h-8 bg-[#F68B84] rounded-full flex items-center justify-center text-white font-bold">
                {user?.fullName?.charAt(0).toUpperCase()}
              </div>
              <span className="text-[#2F2F2F] font-semibold hidden lg:block">
                {user?.fullName?.split(" ")[0]}
              </span>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100">
                <Link
                  to={user?.userType === "ngo" ? "/ngo" : "/volunteer"}
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-[#FFF7E5] transition"
                >
                  <User className="w-4 h-4 text-[#F68B84]" />
                  <span className="text-gray-700">My Profile</span>
                </Link>
                
                <Link
                  to="/settings"
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-[#FFF7E5] transition"
                >
                  <Settings className="w-4 h-4 text-[#F68B84]" />
                  <span className="text-gray-700">Settings</span>
                </Link>

                <hr className="my-2" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden focus:outline-none"
        >
          {showMobileMenu ? (
            <X className="w-6 h-6 text-[#2F2F2F]" />
          ) : (
            <Menu className="w-6 h-6 text-[#2F2F2F]" />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {showMobileMenu && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col space-y-1 p-4">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                onClick={() => setShowMobileMenu(false)}
                className="py-2 px-3 hover:bg-[#FFF7E5] rounded-lg transition text-gray-700"
              >
                {link.name}
              </Link>
            ))}

            <hr className="my-2" />

            <Link
              to={user?.userType === "ngo" ? "/ngo" : "/volunteer"}
              onClick={() => setShowMobileMenu(false)}
              className="flex items-center gap-3 py-2 px-3 hover:bg-[#FFF7E5] rounded-lg transition"
            >
              <User className="w-4 h-4 text-[#F68B84]" />
              <span className="text-gray-700">My Profile</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 py-2 px-3 hover:bg-red-50 rounded-lg transition text-red-600"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default AuthNavbar;