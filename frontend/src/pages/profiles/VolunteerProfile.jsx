// src/pages/profiles/VolunteerProfile.jsx
import React, { useState } from "react";
import { Camera, Edit2, Check, X, MapPin, Mail, Phone, Award, Users } from "lucide-react";
import { assets } from "../../assets/assets";

const VolunteerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Faheem Jabbar",
    email: "faheem@example.com",
    phone: "+92 300 1234567",
    location: "Karachi, Pakistan",
    skills: ["Medical Aid", "Logistics", "Teamwork"],
    bio: "Dedicated volunteer passionate about helping communities recover after disasters. Always ready to serve.",
    joinedCampaigns: 8,
    impactHours: 120,
    rating: 4.9,
    image: assets.profile_placeholder || "https://via.placeholder.com/150",
  });

  const [editableData, setEditableData] = useState({ ...profile });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData({ ...editableData, [name]: value });
  };

  const handleSave = () => {
    setProfile({ ...editableData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditableData({ ...profile });
    setIsEditing(false);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF7E5] to-[#FFEFD0] py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center gap-8 border-b border-gray-200 pb-8">
          {/* Profile Image */}
          <div className="relative w-36 h-36">
            <img
              src={profile.image}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-4 border-[#F8D57E]"
            />
            <button className="absolute bottom-2 right-2 bg-[#F68B84] p-2 rounded-full text-white hover:bg-[#E27872] transition">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left space-y-3">
            {!isEditing ? (
              <>
                <h2 className="text-3xl font-bold text-[#2F2F2F]">{profile.name}</h2>
                <p className="text-gray-700 flex items-center justify-center md:justify-start gap-2">
                  <MapPin className="w-4 h-4 text-[#F68B84]" /> {profile.location}
                </p>
                <p className="text-gray-600">{profile.bio}</p>
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="name"
                  value={editableData.name}
                  onChange={handleChange}
                  className="text-2xl font-bold border-b border-gray-300 focus:border-[#F68B84] outline-none w-full"
                />
                <input
                  type="text"
                  name="location"
                  value={editableData.location}
                  onChange={handleChange}
                  className="text-gray-700 border-b border-gray-300 focus:border-[#F68B84] outline-none w-full"
                />
                <textarea
                  name="bio"
                  value={editableData.bio}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#F8D57E] outline-none"
                />
              </>
            )}

            {/* Edit/Save Buttons */}
            <div className="flex gap-3 mt-3 justify-center md:justify-start">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-[#F68B84] text-white px-4 py-2 rounded-lg hover:bg-[#E27872] transition"
                >
                  <Edit2 className="w-4 h-4" /> Edit Profile
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

        {/* DETAILS SECTION */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-[#FFF7E5] p-6 rounded-xl shadow-sm space-y-3">
            <h3 className="text-xl font-bold text-[#2F2F2F] mb-2">Contact Info</h3>
            {isEditing ? (
              <>
                <input
                  type="email"
                  name="email"
                  value={editableData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#F68B84]"
                />
                <input
                  type="tel"
                  name="phone"
                  value={editableData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#F68B84]"
                />
              </>
            ) : (
              <>
                <p className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4 text-[#E27872]" /> {profile.email}
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-4 h-4 text-[#E27872]" /> {profile.phone}
                </p>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="bg-[#FFF7E5] p-6 rounded-xl shadow-sm grid grid-cols-3 text-center">
            <div>
              <Users className="w-6 h-6 text-[#E27872] mx-auto mb-1" />
              <h4 className="font-bold text-gray-900">{profile.joinedCampaigns}</h4>
              <p className="text-sm text-gray-600">Campaigns</p>
            </div>
            <div>
              <Award className="w-6 h-6 text-[#E27872] mx-auto mb-1" />
              <h4 className="font-bold text-gray-900">{profile.impactHours}</h4>
              <p className="text-sm text-gray-600">Hours Served</p>
            </div>
            <div>
              <Award className="w-6 h-6 text-[#E27872] mx-auto mb-1" />
              <h4 className="font-bold text-gray-900">{profile.rating}</h4>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
          </div>
        </div>

        {/* SKILLS SECTION */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-[#2F2F2F] mb-3">Skills</h3>
          {isEditing ? (
            <input
              type="text"
              name="skills"
              value={editableData.skills.join(", ")}
              onChange={(e) =>
                setEditableData({
                  ...editableData,
                  skills: e.target.value.split(",").map((s) => s.trim()),
                })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#F68B84]"
              placeholder="Enter skills, separated by commas"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-1.5 bg-[#F8D57E] text-[#2F2F2F] rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VolunteerProfile;
