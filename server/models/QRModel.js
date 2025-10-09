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
    updatedAt: Date,
  },
  { versionKey: false }
);

export const QR = mongoose.model("qrs", QRSchema);
