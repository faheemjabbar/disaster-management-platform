// Base URL for API
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Auth Endpoints
export const AUTH_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  GET_PROFILE: `${API_BASE_URL}/auth/profile`,
};

// Campaign Endpoints
export const CAMPAIGN_ENDPOINTS = {
  GET_ALL: `${API_BASE_URL}/campaigns`,
  GET_BY_ID: (id) => `${API_BASE_URL}/campaigns/${id}`,
  CREATE: `${API_BASE_URL}/campaigns`,
  UPDATE: (id) => `${API_BASE_URL}/campaigns/${id}`,
  DELETE: (id) => `${API_BASE_URL}/campaigns/${id}`,
  APPLY: (id) => `${API_BASE_URL}/campaigns/${id}/apply`,
  MANAGE_APPLICATION: (campaignId, volunteerId) =>
    `${API_BASE_URL}/campaigns/${campaignId}/volunteers/${volunteerId}`,
  MY_CAMPAIGNS: `${API_BASE_URL}/campaigns/ngo/my-campaigns`,
  MY_APPLICATIONS: `${API_BASE_URL}/campaigns/volunteer/my-applications`,
};

// Message Endpoints
export const MESSAGE_ENDPOINTS = {
  SEND: `${API_BASE_URL}/messages`,
  GET_ALL: `${API_BASE_URL}/messages`,
  GET_CONVERSATION: (userId) => `${API_BASE_URL}/messages/${userId}`,
  MARK_READ: (id) => `${API_BASE_URL}/messages/${id}/read`,
  DELETE: (id) => `${API_BASE_URL}/messages/${id}`,
};

// Notification Endpoints
export const NOTIFICATION_ENDPOINTS = {
  GET_ALL: `${API_BASE_URL}/notifications`,
  MARK_READ: (id) => `${API_BASE_URL}/notifications/${id}/read`,
  MARK_ALL_READ: `${API_BASE_URL}/notifications/read-all`,
  DELETE: (id) => `${API_BASE_URL}/notifications/${id}`,
  CLEAR_READ: `${API_BASE_URL}/notifications`,
};

// Profile Endpoints
export const PROFILE_ENDPOINTS = {
  UPDATE: `${API_BASE_URL}/profile`,
  GET_PUBLIC: (id) => `${API_BASE_URL}/profile/${id}`,
  UPDATE_IMAGE: `${API_BASE_URL}/profile/image`,
  VOLUNTEER_STATS: `${API_BASE_URL}/profile/stats/volunteer`,
  NGO_STATS: `${API_BASE_URL}/profile/stats/ngo`,
};

// Helper function to make authenticated requests
export const makeAuthRequest = async (url, options = {}, token) => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};