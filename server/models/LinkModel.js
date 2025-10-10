import mongoose, { Schema } from "mongoose";

const LinkSchema = new Schema(
  {
    userIp: String,
    userId: { type: String, required: true },
    description: String,
    isVerifiedUser: Boolean,
    redirectTo: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    createdAt: { type: Date, default: Date.now },
    expireDate: { type: Date },
    clicks: { type: Number, default: 0 },
    dailyClicks: {
      date: { type: Date },
      count: { type: Number, default: 0 },
    },

    updatedAt: Date,
    deviceStats: {
      desktop: { type: Number, default: 0 },
      mobile: { type: Number, default: 0 },
    },
  },
  { versionKey: false }
);

export const Link = mongoose.model("Link", LinkSchema);
