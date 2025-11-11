// frontend/src/utils/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Helper to get auth token
const getToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem("revive_user"));
    return user?.token;
  } catch {
    return null;
  }
};

// Generic request handler with error handling
const request = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
};

// API object with all endpoints
export const api = {
  // ============ AUTH ============
  auth: {
    register: (data) => request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
    login: (data) => request("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),
    getProfile: () => request("/auth/profile"),
  },

  // ============ CAMPAIGNS ============
  campaigns: {
    // Get all campaigns with optional filters
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/campaigns${query ? `?${query}` : ""}`);
    },
    
    // Get single campaign by ID
    getById: (id) => request(`/campaigns/${id}`),
    
    // Create new campaign (NGO only)
    create: (data) => request("/campaigns", {
      method: "POST",
      body: JSON.stringify(data),
    }),
    
    // Update campaign (NGO owner only)
    update: (id, data) => request(`/campaigns/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
    
    // Delete campaign (NGO owner only)
    delete: (id) => request(`/campaigns/${id}`, {
      method: "DELETE",
    }),
    
    // Apply to campaign (Volunteer only)
    apply: (id) => request(`/campaigns/${id}/apply`, {
      method: "POST",
    }),
    
    // Manage volunteer application (NGO only)
    manageApplication: (campaignId, volunteerId, status) => request(
      `/campaigns/${campaignId}/volunteers/${volunteerId}`,
      {
        method: "PUT",
        body: JSON.stringify({ status }),
      }
    ),
    
    // Get campaigns created by logged-in NGO
    getMyCampaigns: () => request("/campaigns/ngo/my-campaigns"),
    
    // Get campaigns volunteer applied to
    getMyApplications: () => request("/campaigns/volunteer/my-applications"),
  },

// ============ PROFILE ============
profile: {
  // Get logged-in user's profile
  get: () => request("/auth/profile"),
  
  // Update profile
  update: (data) => request("/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  }),
  
  // Get public profile by ID
  getPublic: (id) => request(`/profile/${id}`),
  
  // Upload profile image - UPDATED METHOD
  uploadImage: async (formData) => {
    const token = getToken();
    
    try {
      const response = await fetch(`${API_BASE_URL}/profile/image`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type - let browser set it with boundary for FormData
        },
        body: formData, // Send FormData directly, not JSON
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error("API Error [/profile/image]:", error);
      throw error;
    }
  },
  
  // Get volunteer statistics
  getVolunteerStats: () => request("/profile/stats/volunteer"),
  
  // Get NGO statistics
  getNGOStats: () => request("/profile/stats/ngo"),
},

  // ============ MESSAGES ============
  messages: {
    // Get all conversations
    getAll: () => request("/messages"),
    
    // Get conversation with specific user
    getConversation: (userId) => request(`/messages/${userId}`),
    
    // Send message
    send: (data) => request("/messages", {
      method: "POST",
      body: JSON.stringify(data),
    }),
    
    // Mark message as read
    markRead: (id) => request(`/messages/${id}/read`, {
      method: "PUT",
    }),
    
    // Delete message
    delete: (id) => request(`/messages/${id}`, {
      method: "DELETE",
    }),
  },

  // ============ NOTIFICATIONS ============
  notifications: {
    // Get all notifications
    getAll: () => request("/notifications"),
    
    // Mark single notification as read
    markRead: (id) => request(`/notifications/${id}/read`, {
      method: "PUT",
    }),
    
    // Mark all notifications as read
    markAllRead: () => request("/notifications/read-all", {
      method: "PUT",
    }),
    
    // Delete notification
    delete: (id) => request(`/notifications/${id}`, {
      method: "DELETE",
    }),
    
    // Clear all read notifications
    clearRead: () => request("/notifications", {
      method: "DELETE",
    }),
  },
};

// Export helper functions
export { getToken };
export default api;