import express from "express";
import {
  sendMessage,
  getConversation,
  getConversations,
  markAsRead,
  deleteMessage,
} from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.post("/", protect, sendMessage);
router.get("/", protect, getConversations);
router.get("/:userId", protect, getConversation);
router.put("/:id/read", protect, markAsRead);
router.delete("/:id", protect, deleteMessage);

export default router;