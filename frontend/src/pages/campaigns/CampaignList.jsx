import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampaignCard from "./CampaignCard";

const CampaignList = () => {
  const navigate = useNavigate();

  // Temporary mock data (replace later with API fetch)
  const [campaigns] = useState([
    {
      id: 1,
      title: "Emergency Flood Relief in Sindh",
      ngoName: "Pakistan Red Crescent",
      location: "Dadu, Sindh",
      disasterType: "Flood",
      urgency: "critical",
      volunteersNeeded: 50,
      volunteersJoined: 32,
      startDate: "2025-01-15",
      endDate: "2025-02-28",
      description:
        "Urgent need for volunteers to distribute food, water, and medical supplies.",
      categories: ["Medical Aid", "Food Distribution", "Shelter Setup"],
      image:
        "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800",
    },
    {
      id: 2,
      title: "Earthquake Recovery Support",
      ngoName: "Al-Khidmat Foundation",
      location: "Mirpur, AJK",
      disasterType: "Earthquake",
      urgency: "high",
      volunteersNeeded: 30,
      volunteersJoined: 18,
      startDate: "2025-01-20",
      endDate: "2025-03-15",
      description:
        "Help rebuild homes and provide psychological support to earthquake survivors.",
      categories: ["Construction", "Counseling", "Child Care"],
      image:
        "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800",
    },
  ]);

  // Later you'll filter/search campaigns here
  const filteredCampaigns = campaigns;

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF7E5] to-[#FFEFD0] py-16 px-6 sm:px-10 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Active Campaigns
          </h1>
          <p className="text-gray-600">
            Explore ongoing disaster relief efforts and get involved
          </p>
        </div>

        {/* Grid of Campaigns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map((c) => (
            <CampaignCard
              key={c.id}
              campaign={c}
              onClick={(id) => navigate(`/campaign/${id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampaignList;
