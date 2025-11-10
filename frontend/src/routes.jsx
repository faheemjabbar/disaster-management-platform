import { createBrowserRouter } from "react-router-dom";
import App from "./App";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Campaign Pages
import Explore from "./pages/campaigns/Explore";
import CampaignDetail from "./pages/campaigns/CampaignDetail";

// Volunteer Pages
import VolunteerProfile from "./pages/volunteer/Profile";
import MyApplications from "./pages/volunteer/MyApplications";
import VolunteerDashboard from "./pages/volunteer/Dashboard";

// NGO Pages
import NGODashboard from "./pages/ngo/Dashboard";
import CreateCampaign from "./pages/ngo/CreateCampaign";
import MyCampaigns from "./pages/ngo/MyCampaigns";
import ManageApplications from "./pages/ngo/ManageApplications";

// Communication Pages
import Notifications from "./pages/communication/Notifications";
import Messages from "./pages/communication/Messages";

// Tracking Pages
import ActivityHistory from "./pages/tracking/ActivityHistory";
import Certificates from "./pages/tracking/Certificates";
import ImpactStats from "./pages/tracking/ImpactStats";

// Extra Pages
import FAQ from "./pages/extra/FAQ";
import HowItWorks from "./pages/extra/HowItWorks";
import PrivacyPolicy from "./pages/extra/PrivacyPolicy";
import TermsOfService from "./pages/extra/TermsOfService";
import NotFound from "./pages/extra/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      // Public Routes
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "faq",
        element: <FAQ />,
      },
      {
        path: "how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "terms",
        element: <TermsOfService />,
      },

      // Campaign Routes
      {
        path: "explore",
        element: <Explore />,
      },
      {
        path: "campaigns/:id",
        element: <CampaignDetail />,
      },

      // Volunteer Routes (Protected)
      {
        path: "profile",
        element: <VolunteerProfile />,
      },
      {
        path: "volunteer",
        element: <VolunteerDashboard />,
      },
      {
        path: "my-applications",
        element: <MyApplications />,
      },
      {
        path: "activity-history",
        element: <ActivityHistory />,
      },
      {
        path: "certificates",
        element: <Certificates />,
      },
      {
        path: "impact",
        element: <ImpactStats />,
      },

      // NGO Routes (Protected)
      {
        path: "ngo",
        element: <NGODashboard />,
      },
      {
        path: "ngo/create-campaign",
        element: <CreateCampaign />,
      },
      {
        path: "ngo/campaigns",
        element: <MyCampaigns />,
      },
      {
        path: "ngo/applications",
        element: <ManageApplications />,
      },

      // Communication Routes
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
    ],
  },
]);

export default router;