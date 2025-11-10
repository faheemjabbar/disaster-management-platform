import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/Navbar";
import AuthNavbar from "./components/AuthNavbar";
import LandingPage from "./pages/LandingPage";
import CreateCampaign from "./pages/campaigns/CreateCampaign";
import CampaignList from "./pages/campaigns/CampaignList";
import CampaignDetails from "./pages/campaigns/CampaignDetails";
import ExplorePage from "./pages/discovery/ExplorePage";
import VolunteerProfile from "./pages/profiles/VolunteerProfile";
import NGOProfile from "./pages/profiles/NGOProfile";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import { AuthContext } from "./context/AuthContext";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [preSelectedRole, setPreSelectedRole] = useState("");
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1700, once: true });
  }, []);

  // Determine which navbar to show
  const showAuthNavbar = isAuthenticated && location.pathname !== "/";

  return (
    <>
      {/* Conditional Navbar */}
      {showAuthNavbar ? (
        <AuthNavbar />
      ) : (
        <Navbar
          setShowLogin={setShowLogin}
          setShowRegister={setShowRegister}
          setPreSelectedRole={setPreSelectedRole}
        />
      )}

      <Toaster position="top-center" />

      <Routes>
        {/* Landing Page - Home + About + Contact */}
        <Route
          path="/"
          element={
            <LandingPage
              setShowLogin={setShowLogin}
              setShowRegister={setShowRegister}
              setPreSelectedRole={setPreSelectedRole}
            />
          }
        />

        {/* Authenticated Routes */}
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/campaigns" element={<CampaignList />} />
        <Route path="/campaign/:id" element={<CampaignDetails />} />
        <Route path="/create-campaign" element={<CreateCampaign />} />
        
        {/* Profile Routes */}
        <Route path="/volunteer" element={<VolunteerProfile />} />
        <Route path="/ngo" element={<NGOProfile />} />
      </Routes>

      {/* Global Modals */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />

      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
        preSelectedRole={preSelectedRole}
      />
    </>
  );
}

export default App;