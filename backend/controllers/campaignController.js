import asyncHandler from "express-async-handler";
import Campaign from "../models/Campaign.js";
import Notification from "../models/Notification.js";

// @desc Create new campaign
// @route POST /api/campaigns
// @access Private (NGO only)
export const createCampaign = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    disasterType,
    location,
    coordinates,
    urgency,
    volunteersNeeded,
    startDate,
    endDate,
    categories,
    image,
  } = req.body;

  if (req.user.userType !== "ngo") {
    res.status(403);
    throw new Error("Only NGOs can create campaigns");
  }

  const campaign = await Campaign.create({
    title,
    description,
    disasterType,
    location,
    coordinates,
    urgency,
    volunteersNeeded,
    startDate,
    endDate,
    categories: categories ? categories.split(",").map((c) => c.trim()) : [],
    image,
    ngo: req.user.id,
  });

  res.status(201).json(campaign);
});

// @desc Get all campaigns
// @route GET /api/campaigns
// @access Public
export const getCampaigns = asyncHandler(async (req, res) => {
  const { search, urgency, disasterType, status } = req.query;

  let query = {};

  if (search) {
    query.$text = { $search: search };
  }

  if (urgency) {
    query.urgency = urgency;
  }

  if (disasterType) {
    query.disasterType = disasterType;
  }

  if (status) {
    query.status = status;
  } else {
    query.status = "active"; // Default to active campaigns
  }

  const campaigns = await Campaign.find(query)
    .populate("ngo", "fullName organizationName email")
    .sort({ createdAt: -1 });

  res.json(campaigns);
});

// @desc Get single campaign
// @route GET /api/campaigns/:id
// @access Public
export const getCampaignById = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id)
    .populate("ngo", "fullName organizationName email phone")
    .populate("volunteers.volunteer", "fullName email phone location");

  if (!campaign) {
    res.status(404);
    throw new Error("Campaign not found");
  }

  res.json(campaign);
});

// @desc Update campaign
// @route PUT /api/campaigns/:id
// @access Private (NGO owner only)
export const updateCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    res.status(404);
    throw new Error("Campaign not found");
  }

  // Check if user is the campaign owner
  if (campaign.ngo.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to update this campaign");
  }

  const updatedCampaign = await Campaign.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json(updatedCampaign);
});

// @desc Delete campaign
// @route DELETE /api/campaigns/:id
// @access Private (NGO owner only)
export const deleteCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    res.status(404);
    throw new Error("Campaign not found");
  }

  if (campaign.ngo.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to delete this campaign");
  }

  await campaign.deleteOne();
  res.json({ message: "Campaign removed" });
});

// @desc Apply to campaign (volunteer)
// @route POST /api/campaigns/:id/apply
// @access Private (Volunteer only)
export const applyToCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    res.status(404);
    throw new Error("Campaign not found");
  }

  if (req.user.userType !== "volunteer") {
    res.status(403);
    throw new Error("Only volunteers can apply to campaigns");
  }

  // Check if already applied
  const alreadyApplied = campaign.volunteers.some(
    (v) => v.volunteer.toString() === req.user.id
  );

  if (alreadyApplied) {
    res.status(400);
    throw new Error("You have already applied to this campaign");
  }

  // Check if campaign is full
  if (campaign.volunteersJoined >= campaign.volunteersNeeded) {
    res.status(400);
    throw new Error("Campaign is already full");
  }

  campaign.volunteers.push({
    volunteer: req.user.id,
    status: "pending",
  });

  await campaign.save();

  // Create notification for NGO
  await Notification.create({
    user: campaign.ngo,
    type: "application_submitted",
    title: "New Volunteer Application",
    message: `${req.user.fullName} has applied to ${campaign.title}`,
    relatedCampaign: campaign._id,
    relatedUser: req.user.id,
  });

  res.json({ message: "Application submitted successfully" });
});

// @desc Manage volunteer application (approve/reject)
// @route PUT /api/campaigns/:id/volunteers/:volunteerId
// @access Private (NGO owner only)
export const manageApplication = asyncHandler(async (req, res) => {
  const { status } = req.body; // "approved" or "rejected"
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    res.status(404);
    throw new Error("Campaign not found");
  }

  if (campaign.ngo.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized");
  }

  const volunteer = campaign.volunteers.find(
    (v) => v.volunteer.toString() === req.params.volunteerId
  );

  if (!volunteer) {
    res.status(404);
    throw new Error("Volunteer application not found");
  }

  volunteer.status = status;
  if (status === "approved") {
    volunteer.approvedAt = Date.now();
    campaign.volunteersJoined += 1;
  }

  await campaign.save();

  // Create notification for volunteer
  await Notification.create({
    user: req.params.volunteerId,
    type: `application_${status}`,
    title: `Application ${status === "approved" ? "Approved" : "Rejected"}`,
    message: `Your application to ${campaign.title} has been ${status}`,
    relatedCampaign: campaign._id,
  });

  res.json({ message: `Application ${status}` });
});

// @desc Get campaigns created by NGO
// @route GET /api/campaigns/ngo/my-campaigns
// @access Private (NGO only)
export const getMyCampaigns = asyncHandler(async (req, res) => {
  if (req.user.userType !== "ngo") {
    res.status(403);
    throw new Error("Access denied");
  }

  const campaigns = await Campaign.find({ ngo: req.user.id })
    .populate("volunteers.volunteer", "fullName email phone")
    .sort({ createdAt: -1 });

  res.json(campaigns);
});

// @desc Get campaigns volunteer applied to
// @route GET /api/campaigns/volunteer/my-applications
// @access Private (Volunteer only)
export const getMyApplications = asyncHandler(async (req, res) => {
  if (req.user.userType !== "volunteer") {
    res.status(403);
    throw new Error("Access denied");
  }

  const campaigns = await Campaign.find({
    "volunteers.volunteer": req.user.id,
  })
    .populate("ngo", "fullName organizationName email")
    .sort({ createdAt: -1 });

  // Format to include application status
  const applications = campaigns.map((campaign) => {
    const application = campaign.volunteers.find(
      (v) => v.volunteer.toString() === req.user.id
    );
    return {
      campaign,
      applicationStatus: application.status,
      appliedAt: application.appliedAt,
      approvedAt: application.approvedAt,
    };
  });

  res.json(applications);
});