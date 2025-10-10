import mongoose, { Schema } from "mongoose";

const QRSchema = new Schema(
  {
    userIp: String,
    userId: String,
    description: String,
    isVerifiedUser: Boolean,
    imgUrl: { type: String, required: true },
    redirectTo: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    slug: { type: String, unique: true, required: true },
    updatedAt: Date,
    scans: { type: Number, default: 0 },
    dailyScans: {
      date: { type: Date },
      count: { type: Number, default: 0 },
    },
    deviceStats: {
      desktop: { type: Number, default: 0 },
      mobile: { type: Number, default: 0 },
    },
  },
  { versionKey: false }
);

export const QR = mongoose.model("qrs", QRSchema);
