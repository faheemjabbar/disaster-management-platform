import React, { useState, useEffect, useContext } from "react";
import { Camera, Edit2, Check, X, MapPin, Mail, Phone, Award, Users } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../utils/apiEndpoints";
import LoadingSpinner from "../../components/LoadingSpinner";
import toast from "react-hot-toast";
import { assets } from "../../assets/assets";
import { ImageUpload } from "../../components/ImageUpload";

const VolunteerProfile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [editableData, setEditableData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await api.profile.get();
      setProfile(data);
      setEditableData(data);
    } catch (err) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await api.profile.getVolunteerStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData({ ...editableData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await api.profile.update(editableData);
      setProfile(editableData);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    setEditableData({ ...profile });
    setIsEditing(false);
  };

 const handleImageUpload = async (file) => {
  if (!file) return;

  const previewUrl = URL.createObjectURL(file);
  setImagePreview(previewUrl);

  const formData = new FormData();
  formData.append("profileImage", file);

  try {
    const response = await api.profile.uploadImage(formData);
    console.log("Upload response:", response); // 👈 Check this
    
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const fullImageUrl = response.profileImage.startsWith('http') 
      ? response.profileImage 
      : `${API_BASE_URL}${response.profileImage}`;
    
    console.log("Full image URL:", fullImageUrl); // 👈 Check this
    
    setProfile((prev) => ({ ...prev, profileImage: fullImageUrl }));
    setEditableData((prev) => ({ ...prev, profileImage: fullImageUrl }));
    setImagePreview(null);
    
    toast.success("Profile image updated!");
  } catch (err) {
    console.error("Upload error:", err);
    setImagePreview(null);
    toast.error(err.message || "Failed to upload image");
  }
};
  if (loading) return <LoadingSpinner fullScreen />;
  if (!profile) return <div>Profile not found</div>;

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF7E5] to-[#FFEFD0] py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center gap-8 border-b border-gray-200 pb-8">
          {/* Profile Image */}
          <div className="relative w-32 h-32">
            <img
              src={imagePreview || profile.profileImage || assets.defaultAvatar}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-4 border-[#F8D57E]"
            />

            <div className="absolute bottom-2 right-2">
              <ImageUpload
                onUpload={handleImageUpload}
                maxSize={5}
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left space-y-3">
            {!isEditing ? (
              <>
                <h2 className="text-3xl font-bold text-[#2F2F2F]">
                  {profile.fullName || profile.name || "Volunteer Name"}
                </h2>
                <p className="text-gray-700 flex items-center justify-center md:justify-start gap-2">
                  <MapPin className="w-4 h-4 text-[#F68B84]" />
                  {profile.location || profile.address || "Location not specified"}
                </p>
                <p className="text-gray-600">
                  {profile.bio || profile.description || "No bio provided"}
                </p>
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="fullName"
                  value={editableData.fullName || editableData.name || ""}
                  onChange={handleChange}
                  className="text-2xl font-bold border-b border-gray-300 focus:border-[#F68B84] outline-none w-full"
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  name="location"
                  value={editableData.location || editableData.address || ""}
                  onChange={handleChange}
                  className="text-gray-700 border-b border-gray-300 focus:border-[#F68B84] outline-none w-full"
                  placeholder="Location"
                />
                <textarea
                  name="bio"
                  value={editableData.bio || editableData.description || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#F8D57E] outline-none"
                  placeholder="Bio"
                  rows="3"
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
                  value={editableData.email || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#F68B84]"
                  placeholder="Email"
                />
                <input
                  type="tel"
                  name="phone"
                  value={editableData.phone || editableData.phoneNumber || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#F68B84]"
                  placeholder="Phone"
                />
              </>
            ) : (
              <>
                <p className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4 text-[#E27872]" />
                  {profile.email || "No email provided"}
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-4 h-4 text-[#E27872]" />
                  {profile.phone || profile.phoneNumber || "No phone provided"}
                </p>
              </>
            )}
          </div>

          {/* Stats */}
          {stats && (
            <div className="bg-[#FFF7E5] p-6 rounded-xl shadow-sm grid grid-cols-3 text-center">
              <div>
                <Users className="w-6 h-6 text-[#E27872] mx-auto mb-1" />
                <h4 className="font-bold text-gray-900">
                  {stats.approved || stats.joinedCampaigns || stats.totalCampaigns || 0}
                </h4>
                <p className="text-sm text-gray-600">Campaigns</p>
              </div>
              <div>
                <Award className="w-6 h-6 text-[#E27872] mx-auto mb-1" />
                <h4 className="font-bold text-gray-900">
                  {stats.totalApplications || 0}
                </h4>
                <p className="text-sm text-gray-600">Applications</p>
              </div>
              <div>
                <Award className="w-6 h-6 text-[#E27872] mx-auto mb-1" />
                <h4 className="font-bold text-gray-900">
                  {stats.pending || 0}
                </h4>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          )}
        </div>

        {/* SKILLS SECTION */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-[#2F2F2F] mb-3">Skills</h3>
          {isEditing ? (
            <input
              type="text"
              name="skills"
              value={
                Array.isArray(editableData.skills)
                  ? editableData.skills.join(", ")
                  : editableData.skills || ""
              }
              onChange={(e) =>
                setEditableData({
                  ...editableData,
                  skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#F68B84]"
              placeholder="Enter skills, separated by commas"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {Array.isArray(profile.skills) && profile.skills.length > 0 ? (
                profile.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 bg-[#F8D57E] text-[#2F2F2F] rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-600">No skills listed</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VolunteerProfile;