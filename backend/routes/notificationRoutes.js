import express from "express";
import {
  getNotifications,
  markNotificationAsRead,
  markAllAsRead,
  deleteNotification,
  clearReadNotifications,
} from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.get("/", protect, getNotifications);
router.put("/:id/read", protect, markNotificationAsRead);
router.put("/read-all", protect, markAllAsRead);
router.delete("/:id", protect, deleteNotification);
router.delete("/", protect, clearReadNotifications);

export default router;