import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        email: "",
        password: "",
      });
      setErrors({});
      setShowPassword(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // Store in global context
      login(data);

      toast.success("Login successful! Redirecting...");
      onClose();

      // Redirect to explore page after login
      navigate("/explore");
    } catch (err) {
      toast.error(err.message || "Login failed");
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
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-[#E27872] text-xl font-bold transition-colors"
              aria-label="Close modal"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold text-center text-[#2F2F2F] mb-1 flex items-center justify-center gap-2">
              Welcome Back to
              <img
                src={assets.logo}
                alt="Revive logo"
                className="h-6 w-auto object-contain"
              />
            </h2>

            <p className="text-center text-gray-600 mb-6 text-sm">
              Log in to continue your humanitarian journey.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Email Address
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

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F6A6A1] focus:outline-none transition-all duration-200"
                  placeholder="********"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="h-4 w-4 accent-[#F68B84] cursor-pointer"
                />
                <label
                  htmlFor="showPassword"
                  className="text-sm text-gray-700 cursor-pointer select-none"
                >
                  Show Password
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#F6A6A1] text-white font-semibold py-2.5 rounded-lg hover:bg-[#f5928c] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Log In
              </button>
            </form>

            <p className="text-sm text-center text-gray-500 mt-5">
              Don't have an account?{" "}
              <span
                onClick={() => {
                  onClose();
                  onSwitchToRegister && onSwitchToRegister();
                }}
                className="text-[#E27872] cursor-pointer hover:underline"
              >
                Register here
              </span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;