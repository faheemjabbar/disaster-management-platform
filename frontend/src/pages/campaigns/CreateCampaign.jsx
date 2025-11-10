import React, { useState } from "react";
import { MapPin, Users, Upload } from "lucide-react";
import { motion } from "framer-motion";

const CreateCampaign = () => {
  const [formData, setFormData] = useState({
    title: "",
    disasterType: "",
    description: "",
    location: "",
    volunteersNeeded: "",
    startDate: "",
    endDate: "",
    urgency: "medium",
    categories: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📦 Campaign Data:", formData);
    alert("Campaign Created (frontend only)");
    // 🔒 TODO: Add API integration later
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF7E5] to-[#FFEFD0] py-16 px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 md:p-10"
      >
        <h2 className="text-3xl font-bold text-[#2F2F2F] mb-6 text-center">
          Create a <span className="text-[#E27872]">New Campaign</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campaign Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              
              Campaign Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. Flood Relief in Sindh"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F6A6A1] focus:outline-none"
            />
          </div>

          {/* Disaster Type & Urgency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Disaster Type
              </label>
              <select
                name="disasterType"
                value={formData.disasterType}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-[#F6A6A1] focus:outline-none"
              >
                <option value="">Select Type</option>
                <option value="Flood">Flood</option>
                <option value="Earthquake">Earthquake</option>
                <option value="Fire">Fire</option>
                <option value="Drought">Drought</option>
                <option value="Cold Wave">Cold Wave</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Urgency Level
              </label>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-[#F8D57E] focus:outline-none"
              >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              
            Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Describe your campaign’s purpose, needs, and goals..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F6A6A1] focus:outline-none resize-none"
            ></textarea>
          </div>

          {/* Location & Volunteers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-2 text-[#F68B84]" />
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g. Karachi, Sindh"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F6A6A1] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Users className="inline w-4 h-4 mr-2 text-[#F68B84]" />
                Volunteers Needed
              </label>
              <input
                type="number"
                name="volunteersNeeded"
                value={formData.volunteersNeeded}
                onChange={handleChange}
                required
                min="1"
                placeholder="e.g. 50"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F8D57E] focus:outline-none"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F8D57E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F8D57E] focus:outline-none"
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Categories (comma separated)
            </label>
            <input
              type="text"
              name="categories"
              value={formData.categories}
              onChange={handleChange}
              placeholder="e.g. Medical Aid, Food, Shelter"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F6A6A1] focus:outline-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Upload className="inline w-4 h-4 mr-2 text-[#F68B84]" />
              Upload Campaign Image
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-sm text-gray-600"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#F68B84] text-white font-semibold py-3 rounded-lg hover:bg-[#E27872] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Create Campaign
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default CreateCampaign;
