import express from "express";
import {
  updateProfile,
  getPublicProfile,
  updateProfileImage,
  getVolunteerStats,
  getNGOStats,
} from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/:id", getPublicProfile);

// Protected routes
router.put("/", protect, updateProfile);
router.put("/image", protect, updateProfileImage);
router.get("/stats/volunteer", protect, getVolunteerStats);
router.get("/stats/ngo", protect, getNGOStats);

export default router;