import express from "express";
import {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  applyToCampaign,
  manageApplication,
  getMyCampaigns,
  getMyApplications,
} from "../controllers/campaignController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getCampaigns);
router.get("/:id", getCampaignById);

// Protected routes
router.post("/", protect, createCampaign);
router.put("/:id", protect, updateCampaign);
router.delete("/:id", protect, deleteCampaign);

// Application routes
router.post("/:id/apply", protect, applyToCampaign);
router.put("/:id/volunteers/:volunteerId", protect, manageApplication);

// User-specific routes
router.get("/ngo/my-campaigns", protect, getMyCampaigns);
router.get("/volunteer/my-applications", protect, getMyApplications);

export default router;