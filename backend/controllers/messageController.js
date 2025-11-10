import asyncHandler from "express-async-handler";
import Message from "../models/Message.js";
import Notification from "../models/Notification.js";

// @desc Send message
// @route POST /api/messages
// @access Private
export const sendMessage = asyncHandler(async (req, res) => {
  const { receiver, campaign, content } = req.body;

  if (!receiver || !content) {
    res.status(400);
    throw new Error("Receiver and content are required");
  }

  const message = await Message.create({
    sender: req.user.id,
    receiver,
    campaign,
    content,
  });

  // Create notification for receiver
  await Notification.create({
    user: receiver,
    type: "new_message",
    title: "New Message",
    message: `You have a new message from ${req.user.fullName}`,
    relatedUser: req.user.id,
    relatedCampaign: campaign,
  });

  const populatedMessage = await Message.findById(message._id)
    .populate("sender", "fullName email profileImage")
    .populate("receiver", "fullName email profileImage");

  res.status(201).json(populatedMessage);
});

// @desc Get conversation between two users
// @route GET /api/messages/:userId
// @access Private
export const getConversation = asyncHandler(async (req, res) => {
  const messages = await Message.find({
    $or: [
      { sender: req.user.id, receiver: req.params.userId },
      { sender: req.params.userId, receiver: req.user.id },
    ],
  })
    .populate("sender", "fullName email profileImage")
    .populate("receiver", "fullName email profileImage")
    .sort({ createdAt: 1 });

  res.json(messages);
});

// @desc Get all conversations for user
// @route GET /api/messages
// @access Private
export const getConversations = asyncHandler(async (req, res) => {
  const messages = await Message.find({
    $or: [{ sender: req.user.id }, { receiver: req.user.id }],
  })
    .populate("sender", "fullName email profileImage")
    .populate("receiver", "fullName email profileImage")
    .sort({ createdAt: -1 });

  // Group by conversation partner
  const conversationsMap = new Map();

  messages.forEach((msg) => {
    const partnerId =
      msg.sender._id.toString() === req.user.id
        ? msg.receiver._id.toString()
        : msg.sender._id.toString();

    if (!conversationsMap.has(partnerId)) {
      conversationsMap.set(partnerId, {
        partner:
          msg.sender._id.toString() === req.user.id ? msg.receiver : msg.sender,
        lastMessage: msg,
        unreadCount: 0,
      });
    }

    // Count unread messages
    if (
      msg.receiver._id.toString() === req.user.id &&
      !msg.isRead
    ) {
      conversationsMap.get(partnerId).unreadCount += 1;
    }
  });

  const conversations = Array.from(conversationsMap.values());
  res.json(conversations);
});

// @desc Mark message as read
// @route PUT /api/messages/:id/read
// @access Private
export const markAsRead = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    res.status(404);
    throw new Error("Message not found");
  }

  if (message.receiver.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized");
  }

  message.isRead = true;
  message.readAt = Date.now();
  await message.save();

  res.json({ message: "Message marked as read" });
});

// @desc Delete message
// @route DELETE /api/messages/:id
// @access Private
export const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    res.status(404);
    throw new Error("Message not found");
  }

  if (message.sender.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to delete this message");
  }

  await message.deleteOne();
  res.json({ message: "Message deleted" });
});