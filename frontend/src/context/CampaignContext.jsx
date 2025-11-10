import React, { createContext, useState, useEffect } from "react";

export const CampaignContext = createContext();

export const CampaignProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const mockCampaigns = [
        {
          id: 1,
          title: "Flood Relief in Sindh",
          ngoName: "Pakistan Red Crescent",
          location: "Dadu, Sindh",
          disasterType: "Flood",
          urgency: "critical",
          volunteersNeeded: 50,
          volunteersJoined: 32,
          startDate: "2025-01-15",
          endDate: "2025-02-28",
        },
      ];
      setCampaigns(mockCampaigns);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  const addCampaign = (campaign) => {
    setCampaigns([...campaigns, { ...campaign, id: Date.now() }]);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <CampaignContext.Provider value={{ campaigns, loading, fetchCampaigns, addCampaign }}>
      {children}
    </CampaignContext.Provider>
  );
};