// src/pages/profiles/NGOProfile.jsx
import React, { useState } from "react";
import { Camera, Edit2, Check, X, Mail, Phone, Globe, ClipboardList, Users, Award } from "lucide-react";
import { assets } from "../../assets/assets";

const NGOProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [ngo, setNgo] = useState({
    logo: assets.logo || "https://via.placeholder.com/100",
    name: "Hope Relief Foundation",
    registrationId: "NGO-98452",
    mission: "To provide rapid response, medical aid, and sustainable recovery programs for communities affected by natural disasters across Pakistan.",
    email: "contact@hopefoundation.org",
    phone: "+92 300 4567890",
    website: "www.hopefoundation.org",
    address: "Lahore, Pakistan",
    totalCampaigns: 18,
    activeCampaigns: 3,
    volunteersEngaged: 420,
  });

  const [editable, setEditable] = useState({ ...ngo });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditable({ ...editable, [name]: value });
  };

  const handleSave = () => {
    setNgo({ ...editable });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditable({ ...ngo });
    setIsEditing(false);
  };

  const recentCampaigns = [
    {
      id: 1,
      title: "Flood Relief in Sindh",
      volunteers: 80,
      status: "Active",
      date: "Feb 2025",
    },
    {
      id: 2,
      title: "Earthquake Response in AJK",
      volunteers: 60,
      status: "Completed",
      date: "Jan 2025",
    },
    {
      id: 3,
      title: "Winter Drive Balochistan",
      volunteers: 45,
      status: "Completed",
      date: "Dec 2024",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF7E5] to-[#FFEFD0] py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 border-b border-gray-200 pb-8">
          {/* Logo */}
          <div className="relative w-32 h-32">
            <img
              src={ngo.logo}
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
                <h2 className="text-3xl font-bold text-[#2F2F2F]">{ngo.name}</h2>
                <p className="text-gray-700 font-medium">Reg. ID: {ngo.registrationId}</p>
                <p className="text-gray-600">{ngo.mission}</p>
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="name"
                  value={editable.name}
                  onChange={handleChange}
                  className="text-2xl font-bold border-b border-gray-300 focus:border-[#F68B84] outline-none w-full"
                />
                <input
                  type="text"
                  name="registrationId"
                  value={editable.registrationId}
                  onChange={handleChange}
                  className="text-gray-700 border-b border-gray-300 focus:border-[#F68B84] outline-none w-full"
                />
                <textarea
                  name="mission"
                  value={editable.mission}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#F8D57E] outline-none"
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
                  value={editable.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#F68B84]"
                />
                <input
                  type="tel"
                  name="phone"
                  value={editable.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#F68B84]"
                />
                <input
                  type="text"
                  name="website"
                  value={editable.website}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#F68B84]"
                />
              </>
            ) : (
              <>
                <p className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4 text-[#E27872]" /> {ngo.email}
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-4 h-4 text-[#E27872]" /> {ngo.phone}
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Globe className="w-4 h-4 text-[#E27872]" /> {ngo.website}
                </p>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="bg-[#FFF7E5] p-6 rounded-xl shadow-sm grid grid-cols-3 text-center">
            <div>
              <ClipboardList className="w-6 h-6 text-[#E27872] mx-auto mb-1" />
              <h4 className="font-bold text-gray-900">{ngo.totalCampaigns}</h4>
              <p className="text-sm text-gray-600">Total Campaigns</p>
            </div>
            <div>
              <Award className="w-6 h-6 text-[#E27872] mx-auto mb-1" />
              <h4 className="font-bold text-gray-900">{ngo.activeCampaigns}</h4>
              <p className="text-sm text-gray-600">Active</p>
            </div>
            <div>
              <Users className="w-6 h-6 text-[#E27872] mx-auto mb-1" />
              <h4 className="font-bold text-gray-900">{ngo.volunteersEngaged}</h4>
              <p className="text-sm text-gray-600">Volunteers</p>
            </div>
          </div>
        </div>

        {/* Recent Campaigns */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-[#2F2F2F] mb-4">Recent Campaigns</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentCampaigns.map((c) => (
              <div
                key={c.id}
                className="bg-white border border-[#F8D57E]/60 rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
              >
                <h4 className="font-bold text-[#2F2F2F]">{c.title}</h4>
                <p className="text-gray-600 text-sm mt-1">📅 {c.date}</p>
                <p className="text-gray-700 text-sm mt-1">👥 {c.volunteers} volunteers</p>
                <span
                  className={`inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full ${
                    c.status === "Active"
                      ? "bg-[#F68B84] text-white"
                      : "bg-[#F8D57E] text-gray-900"
                  }`}
                >
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NGOProfile;
