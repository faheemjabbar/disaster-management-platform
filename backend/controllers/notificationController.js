import asyncHandler from "express-async-handler";
import Notification from "../models/Notification.js";

// @desc Get all notifications for user
// @route GET /api/notifications
// @access Private
export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user.id })
    .populate("relatedCampaign", "title")
    .populate("relatedUser", "fullName")
    .sort({ createdAt: -1 })
    .limit(50);

  const unreadCount = await Notification.countDocuments({
    user: req.user.id,
    isRead: false,
  });

  res.json({ notifications, unreadCount });
});

// @desc Mark notification as read
// @route PUT /api/notifications/:id/read
// @access Private
export const markNotificationAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }

  if (notification.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized");
  }

  notification.isRead = true;
  notification.readAt = Date.now();
  await notification.save();

  res.json({ message: "Notification marked as read" });
});

// @desc Mark all notifications as read
// @route PUT /api/notifications/read-all
// @access Private
export const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    { user: req.user.id, isRead: false },
    { isRead: true, readAt: Date.now() }
  );

  res.json({ message: "All notifications marked as read" });
});

// @desc Delete notification
// @route DELETE /api/notifications/:id
// @access Private
export const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }

  if (notification.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized");
  }

  await notification.deleteOne();
  res.json({ message: "Notification deleted" });
});

// @desc Clear all read notifications
// @route DELETE /api/notifications/clear
// @access Private
export const clearReadNotifications = asyncHandler(async (req, res) => {
  await Notification.deleteMany({ user: req.user.id, isRead: true });
  res.json({ message: "Read notifications cleared" });
});