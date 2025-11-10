import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Campaign from "../models/Campaign.js";

// @desc Update user profile
// @route PUT /api/profile
// @access Private
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Update allowed fields only
  const allowedFields = [
    "fullName",
    "phone",
    "location",
    "zipCode",
    "bio",
    "profileImage",
  ];

  // NGO-specific fields
  if (user.userType === "ngo") {
    allowedFields.push("organizationName", "missionStatement");
  }

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      user[field] = req.body[field];
    }
  });

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    fullName: updatedUser.fullName,
    email: updatedUser.email,
    phone: updatedUser.phone,
    userType: updatedUser.userType,
    location: updatedUser.location,
    zipCode: updatedUser.zipCode,
    bio: updatedUser.bio,
    profileImage: updatedUser.profileImage,
    organizationName: updatedUser.organizationName,
    missionStatement: updatedUser.missionStatement,
  });
});

// @desc Get public profile
// @route GET /api/profile/:id
// @access Public
export const getPublicProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  let stats = {};

  if (user.userType === "volunteer") {
    // Get volunteer statistics
    const campaigns = await Campaign.find({
      "volunteers.volunteer": user._id,
      "volunteers.status": "approved",
    });

    stats = {
      joinedCampaigns: campaigns.length,
      // Add more stats as needed
    };
  } else if (user.userType === "ngo") {
    // Get NGO statistics
    const totalCampaigns = await Campaign.countDocuments({ ngo: user._id });
    const activeCampaigns = await Campaign.countDocuments({
      ngo: user._id,
      status: "active",
    });

    const campaigns = await Campaign.find({ ngo: user._id });
    const volunteersEngaged = campaigns.reduce(
      (sum, c) => sum + c.volunteersJoined,
      0
    );

    stats = {
      totalCampaigns,
      activeCampaigns,
      volunteersEngaged,
    };
  }

  res.json({ user, stats });
});

// @desc Update profile image
// @route PUT /api/profile/image
// @access Private
export const updateProfileImage = asyncHandler(async (req, res) => {
  const { profileImage } = req.body;

  if (!profileImage) {
    res.status(400);
    throw new Error("Profile image URL is required");
  }

  const user = await User.findById(req.user.id);
  user.profileImage = profileImage;
  await user.save();

  res.json({ message: "Profile image updated", profileImage });
});

// @desc Get volunteer statistics
// @route GET /api/profile/stats/volunteer
// @access Private (Volunteer only)
export const getVolunteerStats = asyncHandler(async (req, res) => {
  if (req.user.userType !== "volunteer") {
    res.status(403);
    throw new Error("Access denied");
  }

  const applications = await Campaign.find({
    "volunteers.volunteer": req.user.id,
  });

  const approved = applications.filter((c) =>
    c.volunteers.some(
      (v) =>
        v.volunteer.toString() === req.user.id && v.status === "approved"
    )
  );

  const pending = applications.filter((c) =>
    c.volunteers.some(
      (v) => v.volunteer.toString() === req.user.id && v.status === "pending"
    )
  );

  const stats = {
    totalApplications: applications.length,
    approved: approved.length,
    pending: pending.length,
    rejected: applications.length - approved.length - pending.length,
    // Add more detailed stats as needed
  };

  res.json(stats);
});

// @desc Get NGO statistics
// @route GET /api/profile/stats/ngo
// @access Private (NGO only)
export const getNGOStats = asyncHandler(async (req, res) => {
  if (req.user.userType !== "ngo") {
    res.status(403);
    throw new Error("Access denied");
  }

  const campaigns = await Campaign.find({ ngo: req.user.id });

  const stats = {
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter((c) => c.status === "active").length,
    completedCampaigns: campaigns.filter((c) => c.status === "completed")
      .length,
    totalVolunteersEngaged: campaigns.reduce(
      (sum, c) => sum + c.volunteersJoined,
      0
    ),
    pendingApplications: campaigns.reduce(
      (sum, c) =>
        sum + c.volunteers.filter((v) => v.status === "pending").length,
      0
    ),
  };

  res.json(stats);
});