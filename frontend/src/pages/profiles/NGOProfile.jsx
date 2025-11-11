import React, { useState, useEffect, useContext } from "react";
import { Camera, Edit2, Check, X, Mail, Phone, Globe, ClipboardList, Users, Award } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../utils/apiEndpoints";
import LoadingSpinner from "../../components/LoadingSpinner";
import toast from "react-hot-toast";
import { assets } from "../../assets/assets";

const NGOProfile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ngo, setNgo] = useState(null);
  const [stats, setStats] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [editable, setEditable] = useState({});

  useEffect(() => {
    fetchProfile();
    fetchStats();
    fetchCampaigns();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await api.profile.get();
      setNgo(data);
      setEditable(data);
    } catch (err) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await api.profile.getNGOStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  };

  const fetchCampaigns = async () => {
    try {
      const data = await api.campaigns.getMyCampaigns();
      setCampaigns(data.slice(0, 3)); // Show 3 most recent
    } catch (err) {
      console.error("Failed to load campaigns:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditable({ ...editable, [name]: value });
  };

  const handleSave = async () => {
    try {
      await api.profile.update(editable);
      setNgo(editable);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    setEditable({ ...ngo });
    setIsEditing(false);
  };

  if (loading) return <LoadingSpinner fullScreen />;
  if (!ngo) return <div>Profile not found</div>;

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF7E5] to-[#FFEFD0] py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 border-b border-gray-200 pb-8">
          {/* Logo */}
          <div className="relative w-32 h-32">
            <img
              src={ngo.logo || assets.logo || "https://via.placeholder.com/100"}
              alt="NGO Logo"
              className="w-full h-full object-contain rounded-full border-4 border-[#F8D57E]"
            />
            <button className="absolute bottom-2 right-2 bg-[#F68B84] p-2 rounded-full text-white hover:bg-[#E27872] transition">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left space-y-3">
            {!isEditing ? (
              <>
                <h2 className="text-3xl font-bold text-[#2F2F2F]">
                  {ngo.organizationName || ngo.fullName || "NGO Name"}
                </h2>
                <p className="text-gray-700 font-medium">
                  Reg. ID: {ngo.registrationId || ngo.registrationNumber || "N/A"}
                </p>
                <p className="text-gray-600">
                  {ngo.mission || ngo.description || "No mission statement provided"}
                </p>
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="organizationName"
                  value={editable.organizationName || editable.fullName || ""}
                  onChange={handleChange}
                  className="text-2xl font-bold border-b border-gray-300 focus:border-[#F68B84] outline-none w-full"
                  placeholder="Organization Name"
                />
                <input
                  type="text"
                  name="registrationId"
                  value={editable.registrationId || editable.registrationNumber || ""}
                  onChange={handleChange}
                  className="text-gray-700 border-b border-gray-300 focus:border-[#F68B84] outline-none w-full"
                  placeholder="Registration ID"
                />
                <textarea
                  name="mission"
                  value={editable.mission || editable.description || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#F8D57E] outline-none"
                  placeholder="Mission Statement"
                  rows="3"
                />
              </>
            )}

            {/* Buttons */}
            <div className="flex gap-3 mt-4 justify-center md:justify-start">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-[#F68B84] text-white px-4 py-2 rounded-lg hover:bg-[#E27872] transition"
                >
                  <Edit2 className="w-4 h-4" /> Edit Info
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    <Check className="w-4 h-4" /> Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Contact & Stats Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Contact Info */}
          <div className="bg-[#FFF7E5] p-6 rounded-xl shadow-sm space-y-3">
            <h3 className="text-xl font-bold text-[#2F2F2F] mb-2">Contact Info</h3>
            {isEditing ? (
              <>
                <input
                  type="email"
                  name="email"
                  value={editable.email || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#F68B84]"
                  placeholder="Email"
                />
                <input
                  type="tel"
                  name="phone"
                  value={editable.phone || editable.phoneNumber || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#F68B84]"
                  placeholder="Phone"
                />
                <input
                  type="text"
                  name="website"
                  value={editable.website || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#F68B84]"
                  placeholder="Website"
                />
              </>
            ) : (
              <>
                <p className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4 text-[#E27872]" />
                  {ngo.email || "No email provided"}
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-4 h-4 text-[#E27872]" />
                  {ngo.phone || ngo.phoneNumber || "No phone provided"}
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Globe className="w-4 h-4 text-[#E27872]" />
                  {ngo.website || "No website provided"}
                </p>
              </>
            )}
          </div>

          {/* Stats */}
          {stats && (
            <div className="bg-[#FFF7E5] p-6 rounded-xl shadow-sm grid grid-cols-3 text-center">
              <div>
                <ClipboardList className="w-6 h-6 text-[#E27872] mx-auto mb-1" />
                <h4 className="font-bold text-gray-900">{stats.totalCampaigns || 0}</h4>
                <p className="text-sm text-gray-600">Total Campaigns</p>
              </div>
              <div>
                <Award className="w-6 h-6 text-[#E27872] mx-auto mb-1" />
                <h4 className="font-bold text-gray-900">{stats.activeCampaigns || 0}</h4>
                <p className="text-sm text-gray-600">Active</p>
              </div>
              <div>
                <Users className="w-6 h-6 text-[#E27872] mx-auto mb-1" />
                <h4 className="font-bold text-gray-900">{stats.totalVolunteersEngaged || 0}</h4>
                <p className="text-sm text-gray-600">Volunteers</p>
              </div>
            </div>
          )}
        </div>

        {/* Recent Campaigns */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-[#2F2F2F] mb-4">Recent Campaigns</h3>
          {campaigns.length === 0 ? (
            <p className="text-gray-600">No campaigns yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {campaigns.map((c) => (
                <div
                  key={c._id}
                  className="bg-white border border-[#F8D57E]/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
                >
                  <h4 className="font-bold text-[#2F2F2F]">{c.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    📅 {new Date(c.startDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 text-sm mt-1">
                    👥 {c.volunteersJoined || 0}/{c.volunteersNeeded || 0} volunteers
                  </p>
                  <span
                    className={`inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full ${
                      c.status === "active"
                        ? "bg-[#F68B84] text-white"
                        : "bg-[#F8D57E] text-gray-900"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NGOProfile;