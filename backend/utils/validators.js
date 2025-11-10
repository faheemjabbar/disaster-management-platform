import validator from "validator";

// Email validation
export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, message: "Email is required" };
  }
  if (!validator.isEmail(email)) {
    return { isValid: false, message: "Invalid email format" };
  }
  return { isValid: true };
};

// Password validation
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: "Password is required" };
  }
  if (password.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters" };
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: "Password must contain at least one lowercase letter" };
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: "Password must contain at least one uppercase letter" };
  }
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: "Password must contain at least one number" };
  }
  return { isValid: true };
};

// Phone validation
export const validatePhone = (phone) => {
  if (!phone) {
    return { isValid: false, message: "Phone number is required" };
  }
  if (!validator.isMobilePhone(phone, "any", { strictMode: false })) {
    return { isValid: false, message: "Invalid phone number" };
  }
  return { isValid: true };
};

// Campaign validation
export const validateCampaign = (data) => {
  const errors = {};

  if (!data.title || data.title.trim().length < 5) {
    errors.title = "Title must be at least 5 characters";
  }

  if (!data.description || data.description.trim().length < 20) {
    errors.description = "Description must be at least 20 characters";
  }

  if (!data.disasterType) {
    errors.disasterType = "Disaster type is required";
  }

  if (!data.location || !data.location.address) {
    errors.location = "Location is required";
  }

  if (!data.volunteersNeeded || data.volunteersNeeded < 1) {
    errors.volunteersNeeded = "At least 1 volunteer is required";
  }

  if (!data.startDate) {
    errors.startDate = "Start date is required";
  }

  if (!data.endDate) {
    errors.endDate = "End date is required";
  }

  if (data.startDate && data.endDate && new Date(data.startDate) >= new Date(data.endDate)) {
    errors.endDate = "End date must be after start date";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Sanitize input
export const sanitizeInput = (input) => {
  if (typeof input === "string") {
    return validator.escape(input.trim());
  }
  return input;
};

// Validate URL
export const validateURL = (url) => {
  if (!url) return { isValid: true }; // URL is optional
  if (!validator.isURL(url)) {
    return { isValid: false, message: "Invalid URL format" };
  }
  return { isValid: true };
};