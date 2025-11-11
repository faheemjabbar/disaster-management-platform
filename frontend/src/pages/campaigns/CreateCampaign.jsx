import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Users, Upload, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../utils/apiEndpoints";
import toast from "react-hot-toast";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  
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
    image: "",
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  // Check if user is NGO
  React.useEffect(() => {
    if (!user) {
      toast.error("Please login first");
      navigate("/");
      return;
    }
    if (user.userType !== "ngo") {
      toast.error("Only NGOs can create campaigns");
      navigate("/");
      return;
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title || formData.title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }

    if (!formData.description || formData.description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    if (!formData.disasterType) {
      newErrors.disasterType = "Please select a disaster type";
    }

    if (!formData.location || formData.location.trim().length < 3) {
      newErrors.location = "Please enter a valid location";
    }

    if (!formData.volunteersNeeded || formData.volunteersNeeded < 1) {
      newErrors.volunteersNeeded = "At least 1 volunteer is required";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }

    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (start < today) {
        newErrors.startDate = "Start date cannot be in the past";
      }

      if (end <= start) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Show first error
      const firstError = Object.values(validationErrors)[0];
      toast.error(firstError);
      return;
    }

    try {
      setLoading(true);

      // Prepare campaign data
      const campaignData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        disasterType: formData.disasterType,
        location: formData.location.trim(),
        volunteersNeeded: parseInt(formData.volunteersNeeded),
        startDate: formData.startDate,
        endDate: formData.endDate,
        urgency: formData.urgency,
        categories: formData.categories
          .split(",")
          .map((c) => c.trim())
          .filter((c) => c.length > 0),
        image: formData.image || "",
      };

      // Create campaign via API
      await api.campaigns.create(campaignData);

      toast.success("Campaign created successfully!");
      navigate("/campaigns");
    } catch (err) {
      console.error("Failed to create campaign:", err);
      toast.error(err.message || "Failed to create campaign");
    } finally {
      setLoading(false);
    }
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
              Campaign Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. Flood Relief in Sindh"
              className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:outline-none ${
                errors.title ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#F6A6A1]"
              }`}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Disaster Type & Urgency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Disaster Type *
              </label>
              <select
                name="disasterType"
                value={formData.disasterType}
                onChange={handleChange}
                required
                className={`w-full border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:outline-none ${
                  errors.disasterType ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#F6A6A1]"
                }`}
              >
                <option value="">Select Type</option>
                <option value="Flood">Flood</option>
                <option value="Earthquake">Earthquake</option>
                <option value="Fire">Fire</option>
                <option value="Drought">Drought</option>
                <option value="Cold Wave">Cold Wave</option>
                <option value="Cyclone">Cyclone</option>
                <option value="Landslide">Landslide</option>
                <option value="Tsunami">Tsunami</option>
              </select>
              {errors.disasterType && <p className="text-red-500 text-xs mt-1">{errors.disasterType}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Urgency Level *
              </label>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-[#F8D57E] focus:outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Describe your campaign's purpose, needs, and goals..."
              className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:outline-none resize-none ${
                errors.description ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#F6A6A1]"
              }`}
            ></textarea>
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Location & Volunteers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-2 text-[#F68B84]" />
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g. Karachi, Sindh"
                className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:outline-none ${
                  errors.location ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#F6A6A1]"
                }`}
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Users className="inline w-4 h-4 mr-2 text-[#F68B84]" />
                Volunteers Needed *
              </label>
              <input
                type="number"
                name="volunteersNeeded"
                value={formData.volunteersNeeded}
                onChange={handleChange}
                required
                min="1"
                placeholder="e.g. 50"
                className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:outline-none ${
                  errors.volunteersNeeded ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#F8D57E]"
                }`}
              />
              {errors.volunteersNeeded && <p className="text-red-500 text-xs mt-1">{errors.volunteersNeeded}</p>}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:outline-none ${
                  errors.startDate ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#F8D57E]"
                }`}
              />
              {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                End Date *
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                min={formData.startDate || new Date().toISOString().split('T')[0]}
                className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:outline-none ${
                  errors.endDate ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#F8D57E]"
                }`}
              />
              {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
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
            <p className="text-xs text-gray-500 mt-1">Separate categories with commas</p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Upload className="inline w-4 h-4 mr-2 text-[#F68B84]" />
              Campaign Image (Optional)
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
            <p className="text-xs text-gray-500 mt-1">Max size: 5MB. Supported: JPG, PNG, GIF</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F68B84] text-white font-semibold py-3 rounded-lg hover:bg-[#E27872] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Creating Campaign...
              </>
            ) : (
              'Create Campaign'
            )}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default CreateCampaign;