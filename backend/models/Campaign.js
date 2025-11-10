import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    disasterType: {
      type: String,
      required: true,
      enum: ["Flood", "Earthquake", "Fire", "Drought", "Cold Wave", "Cyclone", "Landslide", "Tsunami"],
    },
    location: {
      type: String,
      required: true,
    },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    urgency: {
      type: String,
      enum: ["critical", "high", "medium", "low"],
      default: "medium",
    },
    volunteersNeeded: {
      type: Number,
      required: true,
      min: 1,
    },
    volunteersJoined: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    categories: [String],
    image: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },
    ngo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    volunteers: [
      {
        volunteer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        },
        approvedAt: Date,
      },
    ],
  },
  { timestamps: true }
);

// Index for searching
campaignSchema.index({ title: "text", location: "text", disasterType: "text" });

const Campaign = mongoose.model("Campaign", campaignSchema);
export default Campaign;