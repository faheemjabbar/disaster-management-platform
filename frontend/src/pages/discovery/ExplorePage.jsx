import React, { useState, useEffect } from "react";
import { Search, Filter, MapPin, List, ChevronLeft, ChevronRight } from "lucide-react";
import CampaignCard from "../campaigns/CampaignCard";
import MapView from "./MapView";
import LoadingSpinner from "../../components/LoadingSpinner";
import { api } from "../../utils/apiEndpoints";
import toast from "react-hot-toast";

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 6;

  // Fetch campaigns from API on component mount
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const params = { status: "active" };
      
      const data = await api.campaigns.getAll(params);
      
      // Transform the data to match your component's expected structure
      const transformed = data.map(c => ({
        ...c,
        id: c._id,
        ngoName: c.ngo?.organizationName || c.ngo?.fullName,
        disasterType: c.disasterType || c.category,
      }));
      
      setCampaigns(transformed);
      setFilteredCampaigns(transformed);
    } catch (err) {
      toast.error("Failed to load campaigns");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters whenever search, urgency, or category changes
  useEffect(() => {
    const filtered = campaigns.filter((c) => {
      const matchesSearch =
        c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesUrgency = urgencyFilter === "all" || c.urgency === urgencyFilter;

      const matchesCategory = !selectedCategory || c.disasterType === selectedCategory;

      return matchesSearch && matchesUrgency && matchesCategory;
    });

    setFilteredCampaigns(filtered);
    setCurrentPage(1);
  }, [searchQuery, urgencyFilter, selectedCategory, campaigns]);

  const indexOfLast = currentPage * campaignsPerPage;
  const indexOfFirst = indexOfLast - campaignsPerPage;
  const currentCampaigns = filteredCampaigns.slice(indexOfFirst, indexOfLast);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredCampaigns.length / campaignsPerPage))
      setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF7E5] to-[#FFEFD0] py-16 px-6 md:px-12 backdrop-blur">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-[#2F2F2F]">
              Explore <span className="text-[#E27872]">Campaigns</span>
            </h1>
            <p className="text-gray-600">Discover opportunities to make a difference around you.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 bg-[#F68B84] text-white font-medium px-5 py-2.5 rounded-lg hover:bg-[#E27872] transition-all duration-200 hover:scale-[1.02]"
            >
              <Filter className="w-4 h-4" /> Filters
            </button>

            <button
              onClick={() => setShowMap(!showMap)}
              className="flex items-center gap-2 border border-[#F68B84] text-[#E27872] font-medium px-5 py-2.5 rounded-lg hover:bg-[#FFF7E5] transition-all duration-200 hover:scale-[1.02]"
            >
              {showMap ? <List className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
              {showMap ? "List View" : "Map View"}
            </button>
          </div>
        </div>

        {/* SEARCH BAR SECTION */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F6A6A1] focus:outline-none"
            />
          </div>
        </div>

        {/* FILTER POPUP MODAL */}
        {showFilters && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-5 text-gray-800 text-center">Filter Campaigns</h2>

              <div className="flex flex-col gap-6">
                {/* Urgency */}
                <div>
                  <p className="font-medium text-gray-700 mb-2">Urgency</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {["critical", "high", "medium", "low"].map((level) => (
                      <label key={level} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={urgencyFilter === level}
                          onChange={() =>
                            setUrgencyFilter(urgencyFilter === level ? "all" : level)
                          }
                        />
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <p className="font-medium text-gray-700 mb-2">Category</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {["Medical Aid", "Food Distribution", "Construction", "Counseling", "Logistics"].map((cat) => (
                      <label key={cat} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategory === cat}
                          onChange={() =>
                            setSelectedCategory(selectedCategory === cat ? "" : cat)
                          }
                        />
                        {cat}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-5 py-2 bg-[#F68B84] text-white rounded-lg hover:bg-[#E27872]"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MAIN CONTENT */}
        {!showMap ? (
          <>
            {currentCampaigns.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentCampaigns.map((c) => (
                  <CampaignCard key={c.id} campaign={c} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600 py-20">
                <p className="text-lg font-medium">No campaigns found.</p>
                <p className="text-sm text-gray-500">Try adjusting your filters or search term.</p>
              </div>
            )}

            {filteredCampaigns.length > campaignsPerPage && (
              <div className="flex justify-center items-center gap-4 mt-10">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg border border-gray-300 ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#FFF7E5]"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <span className="text-gray-700 font-medium">
                  Page {currentPage} of {Math.ceil(filteredCampaigns.length / campaignsPerPage)}
                </span>

                <button
                  onClick={nextPage}
                  disabled={currentPage === Math.ceil(filteredCampaigns.length / campaignsPerPage)}
                  className={`p-2 rounded-lg border border-gray-300 ${
                    currentPage === Math.ceil(filteredCampaigns.length / campaignsPerPage)
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#FFF7E5]"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-8">
            <MapView campaigns={filteredCampaigns} />
          </div>
        )}
      </div>
    </section>
  );
};

export default ExplorePage;