// Disaster Types
export const DISASTER_TYPES = [
  "Flood",
  "Earthquake",
  "Fire",
  "Drought",
  "Cold Wave",
  "Cyclone",
  "Landslide",
  "Tsunami",
  "Wildfire",
];

// Urgency Levels
export const URGENCY_LEVELS = {
  CRITICAL: "critical",
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
};

// Campaign Status
export const CAMPAIGN_STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

// Application Status
export const APPLICATION_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

// User Types
export const USER_TYPES = {
  VOLUNTEER: "volunteer",
  NGO: "ngo",
};

// Notification Types
export const NOTIFICATION_TYPES = {
  APPLICATION_SUBMITTED: "application_submitted",
  APPLICATION_APPROVED: "application_approved",
  APPLICATION_REJECTED: "application_rejected",
  CAMPAIGN_UPDATE: "campaign_update",
  NEW_MESSAGE: "new_message",
  CAMPAIGN_STARTING_SOON: "campaign_starting_soon",
  CAMPAIGN_COMPLETED: "campaign_completed",
};

// Campaign Categories
export const CAMPAIGN_CATEGORIES = [
  "Medical Aid",
  "Food Distribution",
  "Shelter Setup",
  "Child Care",
  "Construction",
  "Counseling",
  "Logistics",
  "Education",
  "Sanitation",
  "Water Supply",
];

// Skill Categories
export const VOLUNTEER_SKILLS = [
  "Medical Professional",
  "Engineer",
  "Teacher",
  "Social Worker",
  "Logistics Coordinator",
  "Construction Worker",
  "Counselor",
  "Driver",
  "Cook",
  "Translator",
  "IT Support",
  "General Volunteer",
];

// Colors for urgency levels
export const URGENCY_COLORS = {
  critical: {
    bg: "bg-red-500",
    text: "text-red-500",
    border: "border-red-500",
  },
  high: {
    bg: "bg-orange-500",
    text: "text-orange-500",
    border: "border-orange-500",
  },
  medium: {
    bg: "bg-yellow-500",
    text: "text-yellow-500",
    border: "border-yellow-500",
  },
  low: {
    bg: "bg-green-500",
    text: "text-green-500",
    border: "border-green-500",
  },
};

// Pakistan cities (for location dropdown)
export const PAKISTAN_CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
  "Sukkur",
  "Muzaffarabad",
  "Gilgit",
  "Mirpur",
];