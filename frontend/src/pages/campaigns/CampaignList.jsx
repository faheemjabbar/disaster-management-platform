import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CampaignCard from "./CampaignCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { api } from "../../utils/apiEndpoints";
import toast from "react-hot-toast";

const CampaignList = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch active campaigns from API
      const data = await api.campaigns.getAll({ status: "active" });
      
      // Transform data to match frontend format
      const transformed = data.map(camp => ({
        ...camp,
        id: camp._id,
        ngoName: camp.ngo?.organizationName || camp.ngo?.fullName || "Unknown NGO",
        image: camp.image || "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800",
      }));
      
      setCampaigns(transformed);
    } catch (err) {
      console.error("Failed to fetch campaigns:", err);
      setError(err.message);
      toast.error("Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  if (error) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-[#FFF7E5] to-[#FFEFD0] flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Campaigns</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={fetchCampaigns}
            className="bg-[#F68B84] text-white px-6 py-2 rounded-lg hover:bg-[#E27872] transition"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

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

        {/* Campaigns Grid */}
        {campaigns.length === 0 ? (
          <div className="text-center text-gray-600 py-20">
            <p className="text-lg font-medium mb-2">No active campaigns found</p>
            <p className="text-sm text-gray-500">Check back later for new opportunities</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((c) => (
              <CampaignCard
                key={c.id}
                campaign={c}
                onClick={(id) => navigate(`/campaign/${id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CampaignList;