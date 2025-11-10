import React from "react";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

const LandingPage = ({ setShowLogin, setShowRegister, setPreSelectedRole }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <Home
        setShowLogin={setShowLogin}
        setShowRegister={setShowRegister}
        setPreSelectedRole={setPreSelectedRole}
      />

      {/* About Section */}
      <About />

      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default LandingPage;