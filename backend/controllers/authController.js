import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

// @desc Register new user
// @route POST /api/auth/register
export const registerUser = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phone,
    password,
    confirmPassword,
    userType,
    location,
    zipCode,
    organizationName,
    registrationId,
    missionStatement,
  } = req.body;

  if (!fullName || !email || !phone || !password || !userType) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("Email already registered");
  }

  const user = await User.create({
    fullName,
    email,
    phone,
    password,
    userType,
    location,
    zipCode,
    organizationName,
    registrationId,
    missionStatement,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      userType: user.userType,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Login user
// @route POST /api/auth/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      userType: user.userType,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Get logged in user profile
// @route GET /api/auth/profile
// @access Private
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(user);
});
