import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    userId: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isVerified: Boolean,
    createdAt: Date,
    lastLogin: Date,
    updatedAt: Date,
  },
  { versionKey: false }
);

export const User = mongoose.model("users", UserSchema);
