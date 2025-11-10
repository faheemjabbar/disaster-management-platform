import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin, preSelectedRole = "" }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: preSelectedRole,
    location: "",
    zipCode: "",
    organizationName: "",
    registrationId: "",
    missionStatement: "",
  });

  const [showPasswords, setShowPasswords] = useState(false);
  const [errors, setErrors] = useState({});

  // Update userType when preSelectedRole changes
  useEffect(() => {
    if (isOpen && preSelectedRole) {
      setFormData(prev => ({ ...prev, userType: preSelectedRole }));
    }
  }, [isOpen, preSelectedRole]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        userType: preSelectedRole,
        location: "",
        zipCode: "",
        organizationName: "",
        registrationId: "",
        missionStatement: "",
      });
      setErrors({});
      setShowPasswords(false);
    }
  }, [isOpen, preSelectedRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.userType === "ngo" && !formData.organizationName) {
      newErrors.organizationName = "Organization name is required for NGOs";
    }

    return newErrors;
  };

  
const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validateForm();
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

 toast.success("Registration successful!");
    
    onClose();
    if (onSwitchToLogin) onSwitchToLogin();
  } catch (err) {
    toast.error(err.message);
  }
};


  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[#FFF7E5] rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] p-6 relative overflow-y-auto scrollbar-thin scrollbar-thumb-[#F68B84]/60 scrollbar-track-transparent"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-[#E27872] text-xl font-bold transition-colors"
              aria-label="Close modal"
            >
              ×
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold text-center text-[#2F2F2F] mb-1 flex items-center justify-center gap-2">
              Join
              <img
                src={assets.logo}
                alt="Revive logo"
                className="h-6 w-auto object-contain"
              />
            </h2>

            <p className="text-center text-gray-600 mb-6 text-sm">
              Be part of a network connecting{" "}
              <span className="font-medium">volunteers</span> and{" "}
              <span className="font-medium">NGOs</span> for impactful
              humanitarian work.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F8D57E] focus:outline-none"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F8D57E] focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F8D57E] focus:outline-none"
                    placeholder="+92 300 1234567"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Role *
                  </label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F8D57E] focus:outline-none bg-white text-gray-700 text-sm"
                  >
                    <option value="">Select Role</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="ngo">NGO Representative</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    City / Region
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F6A6A1] focus:outline-none"
                    placeholder="Karachi"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F6A6A1] focus:outline-none"
                    placeholder="75500"
                  />
                </div>
              </div>

              {/* NGO-specific fields */}
              {formData.userType === "ngo" && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Organization Name *
                    </label>
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F6A6A1] focus:outline-none"
                      placeholder="e.g. Hope Relief Foundation"
                    />
                    {errors.organizationName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.organizationName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Registration ID
                    </label>
                    <input
                      type="text"
                      name="registrationId"
                      value={formData.registrationId}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F6A6A1] focus:outline-none"
                      placeholder="e.g. NGO-12345"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Mission Statement
                    </label>
                    <textarea
                      name="missionStatement"
                      value={formData.missionStatement}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F6A6A1] focus:outline-none resize-none"
                      placeholder="Briefly describe your organization's mission..."
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Password *
                  </label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="8"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F6A6A1] focus:outline-none transition-all duration-200"
                    placeholder="Min. 8 characters"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F6A6A1] focus:outline-none transition-all duration-200"
                    placeholder="Re-enter password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Show Password Checkbox */}
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="showPasswords"
                  checked={showPasswords}
                  onChange={() => setShowPasswords(!showPasswords)}
                  className="h-4 w-4 accent-[#F68B84] cursor-pointer"
                />
                <label
                  htmlFor="showPasswords"
                  className="text-sm text-gray-700 cursor-pointer select-none"
                >
                  Show Password
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#F6A6A1] text-white font-semibold py-2.5 rounded-lg hover:bg-[#f5928c] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Create Account
              </button>
            </form>

            <p className="text-xs text-center text-gray-500 mt-4">
              Already have an account?{" "}
              <span
                onClick={() => {
                  onClose();
                  onSwitchToLogin && onSwitchToLogin();
                }}
                className="text-[#E27872] cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>

            <p className="text-xs text-center text-gray-500 mt-2">
              By joining, you agree to our{" "}
              <span className="text-[#E27872] cursor-pointer hover:underline">
                Terms
              </span>{" "}
              and{" "}
              <span className="text-[#E27872] cursor-pointer hover:underline">
                Privacy Policy
              </span>
              .
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegisterModal;