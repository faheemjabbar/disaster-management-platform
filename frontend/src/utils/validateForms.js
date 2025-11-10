// Email validation
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Password validation (min 8 chars, 1 uppercase, 1 lowercase, 1 number)
export const validatePassword = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }
  return null;
};

// Phone validation (Pakistan format)
export const validatePhone = (phone) => {
  const regex = /^(\+92|0)?[0-9]{10}$/;
  return regex.test(phone.replace(/[\s-]/g, ""));
};

// URL validation
export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Required field validation
export const validateRequired = (value, fieldName = "This field") => {
  if (!value || value.trim() === "") {
    return `${fieldName} is required`;
  }
  return null;
};

// Min/Max length validation
export const validateLength = (value, min, max, fieldName = "Field") => {
  if (value.length < min) {
    return `${fieldName} must be at least ${min} characters`;
  }
  if (max && value.length > max) {
    return `${fieldName} must not exceed ${max} characters`;
  }
  return null;
};

// Number range validation
export const validateNumberRange = (value, min, max, fieldName = "Value") => {
  const num = Number(value);
  if (isNaN(num)) {
    return `${fieldName} must be a number`;
  }
  if (num < min) {
    return `${fieldName} must be at least ${min}`;
  }
  if (max && num > max) {
    return `${fieldName} must not exceed ${max}`;
  }
  return null;
};

// Date validation (must be in future)
export const validateFutureDate = (date, fieldName = "Date") => {
  const selected = new Date(date);
  const now = new Date();
  if (selected < now) {
    return `${fieldName} must be in the future`;
  }
  return null;
};

// Date range validation (endDate must be after startDate)
export const validateDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (end <= start) {
    return "End date must be after start date";
  }
  return null;
};

// Campaign form validation
export const validateCampaignForm = (formData) => {
  const errors = {};

  // Title
  const titleError = validateRequired(formData.title, "Campaign title");
  if (titleError) errors.title = titleError;

  // Description
  const descError = validateRequired(formData.description, "Description");
  if (descError) errors.description = descError;

  // Location
  const locationError = validateRequired(formData.location, "Location");
  if (locationError) errors.location = locationError;

  // Volunteers needed
  const volError = validateNumberRange(
    formData.volunteersNeeded,
    1,
    1000,
    "Volunteers needed"
  );
  if (volError) errors.volunteersNeeded = volError;

  // Dates
  const startDateError = validateFutureDate(formData.startDate, "Start date");
  if (startDateError) errors.startDate = startDateError;

  const dateRangeError = validateDateRange(
    formData.startDate,
    formData.endDate
  );
  if (dateRangeError) errors.endDate = dateRangeError;

  return Object.keys(errors).length > 0 ? errors : null;
};

// Registration form validation
export const validateRegistrationForm = (formData) => {
  const errors = {};

  // Full name
  const nameError = validateRequired(formData.fullName, "Full name");
  if (nameError) errors.fullName = nameError;

  // Email
  if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Phone
  if (!validatePhone(formData.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  // Password
  const passError = validatePassword(formData.password);
  if (passError) errors.password = passError;

  // Confirm password
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  // NGO-specific validations
  if (formData.userType === "ngo") {
    const orgError = validateRequired(
      formData.organizationName,
      "Organization name"
    );
    if (orgError) errors.organizationName = orgError;
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

// Login form validation
export const validateLoginForm = (formData) => {
  const errors = {};

  if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  const passError = validateRequired(formData.password, "Password");
  if (passError) errors.password = passError;

  return Object.keys(errors).length > 0 ? errors : null;
};